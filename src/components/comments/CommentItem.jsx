import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const CommentContainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const CommentDate = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

const CommentContent = styled.div`
  color: #333;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: 1px solid #e74c3c;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: #c0392b;
    border-color: #c0392b;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CommentItem = ({ comment, onDelete }) => {
  const { user } = useAuth();
  
  const handleDelete = async () => {
    try {
      // Optimistic update - remove comment immediately
      onDelete(comment.id);
      
      // Then call API
      await api.deleteComment(comment.id);
    } catch (error) {
      // If delete fails, parent component needs to refetch to restore state
      console.error('Delete comment failed:', error);
      // Signal to parent that delete failed so it can refetch
      onDelete(comment.id, true); // Pass error flag
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const isCommentAuthor = user?.id === comment.authorId;
  
  return (
    <CommentContainer>
      <CommentHeader>
        <AuthorInfo>
          <AuthorName>{comment.author?.username || 'Unknown User'}</AuthorName>
          <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
        </AuthorInfo>
        
        {isCommentAuthor && (
          <DeleteButton
            onClick={handleDelete}
          >
            🗑️ Delete
          </DeleteButton>
        )}
      </CommentHeader>
      
      <CommentContent>
        {comment.content}
      </CommentContent>
    </CommentContainer>
  );
};

export default CommentItem;
