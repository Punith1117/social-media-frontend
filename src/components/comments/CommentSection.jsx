import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearExpiredToken } from '../../utils/tokenUtils';
import api from '../../services/api';
import CommentItem from './CommentItem';
import PaginationControls from '../posts/PaginationControls';

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentsHeader = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const CharacterCounter = styled.div`
  font-size: 0.8rem;
  color: ${props => props.$overLimit ? '#e74c3c' : '#666'};
  text-align: right;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  border: 1px solid #007bff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover:not(:disabled) {
    background: #0056b3;
    border-color: #0056b3;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 1rem;
`;

const NoComments = styled.div`
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 1rem;
`;

const CommentSection = ({ postId }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');
  
  // Fetch comments for a specific page
  const fetchComments = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getCommentsByPost(postId, page, 5);
      setComments(response.comments);
      setPagination(response.pagination);
    } catch (error) {
      setError(error.error || 'Failed to load comments');
      setComments([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial load
  useEffect(() => {
    if (postId) {
      fetchComments(1);
    }
  }, [postId]);
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    fetchComments(newPage);
  };
  
  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setFormError('Content is required');
      return;
    }
    
    if (content.length > 100) {
      setFormError('Content must be 100 characters or less');
      return;
    }
    
    setSubmitting(true);
    setFormError('');
    
    try {
      await api.createComment(postId, content);
      setContent('');
      // Refetch comments after successful creation
      fetchComments(pagination?.page || 1);
    } catch (error) {
      // Handle authorization errors for authenticated operation
      if (error.status === 401 || error.status === 403) {
        logout();
        navigate('/login', { state: { from: location.pathname } });
        return;
      }
      
      setFormError(error.error || 'Failed to create comment');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle comment deletion with optimistic update
  const handleDeleteComment = (commentId, isError = false) => {
    if (isError) {
      // Delete failed, refetch to restore correct state
      fetchComments(pagination?.page || 1);
      return;
    }
    
    // Optimistic update
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    
    // Handle pagination edge case
    if (updatedComments.length === 0 && pagination && pagination.page > 1) {
      // If we deleted the last comment on a page > 1, go to previous page
      fetchComments(pagination.page - 1);
    } else if (updatedComments.length === 0 && pagination && pagination.page === 1) {
      // If we deleted the last comment on page 1, update pagination
      setPagination(prev => prev ? { ...prev, total: Math.max(0, prev.total - 1) } : null);
    }
  };
  
  const isOverLimit = content.length > 100;
  const isSubmitDisabled = !content.trim() || isOverLimit || submitting;
  
  return (
    <CommentsContainer>
      <CommentsHeader>Comments</CommentsHeader>
      
      {/* Comment Form - only for authenticated users */}
      {isAuthenticated && (
        <CommentForm onSubmit={handleSubmit}>
          <CommentTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            disabled={submitting}
          />
          <CharacterCounter $overLimit={isOverLimit}>
            {content.length}/100 characters
          </CharacterCounter>
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          <SubmitButton type="submit" disabled={isSubmitDisabled}>
            {submitting ? 'Posting...' : 'Post Comment'}
          </SubmitButton>
        </CommentForm>
      )}
      
      {/* Comments List */}
      {loading ? (
        <LoadingMessage>Loading comments...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : comments.length === 0 ? (
        <NoComments>No comments yet</NoComments>
      ) : (
        <>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={handleDeleteComment}
            />
          ))}
          
          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <PaginationControls
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </CommentsContainer>
  );
};

export default CommentSection;
