import React from 'react';
import styled from 'styled-components';
import { Trash } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const CommentContainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    padding: 0.75rem 0;
  }
  
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
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  
  &:hover {
    background: rgba(0, 123, 255, 0.05);
    border-radius: 4px;
  }
`;

const AuthorPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
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
  padding: 0.2rem 0.4rem;
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Optimize Cloudinary images for profile photos (smaller size, faster loading)
  const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }
    
    // Add Cloudinary transformations for thumbnail
    const transformations = 'w_100,h_100,c_fill,q_auto:good,f_auto';
    return url.replace('/upload/', `/upload/${transformations}/`);
  };
  
  const handleAuthorClick = () => {
    navigate(`/users/${comment.author.username}`);
  };
  
  const handleDelete = async () => {
    try {
      // Optimistic update - remove comment immediately
      onDelete(comment.id);
      
      // Then call API
      await api.deleteComment(comment.id);
    } catch (error) {
      // Handle authorization errors for authenticated operation
      if (error.status === 401 || error.status === 403) {
        logout();
        navigate('/login', { state: { from: location.pathname } });
        return;
      }
      
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
        <AuthorInfo onClick={handleAuthorClick}>
          {comment.author?.profilePhotoUrl ? (
            <AuthorPhoto src={getOptimizedImageUrl(comment.author.profilePhotoUrl)} alt={comment.author.username} />
          ) : (
            <AuthorPhoto src="/default-avatar.svg" alt={comment.author.username} />
          )}
          <AuthorName>{comment.author?.username || 'Unknown User'}</AuthorName>
        </AuthorInfo>
        
        {isCommentAuthor && (
          <DeleteButton
            onClick={handleDelete}
          >
            <Trash size={16} title="Delete" />
          </DeleteButton>
        )}
      </CommentHeader>
      
      <CommentContent>
        {comment.content}
      </CommentContent>
      
      <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
    </CommentContainer>
  );
};

export default CommentItem;
