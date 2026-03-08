import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import CommentItem from './CommentItem';
import PaginationControls from '../posts/PaginationControls';
import {
  CommentsContainer,
  CommentsHeader,
  CommentForm,
  CommentTextarea,
  CharacterCounter,
  SubmitButton,
  ErrorMessage,
  LoadingMessage,
  NoComments
} from './CommentSection.styles';

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
