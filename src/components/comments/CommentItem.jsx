import React from 'react';
import { Trash } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../../services/api';
import {
  CommentContainer,
  CommentHeader,
  AuthorInfo,
  AuthorPhoto,
  AuthorName,
  CommentDate,
  CommentContent,
  DeleteButton
} from './CommentItem.styles';

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
        <AuthorInfo to={`/users/${comment.author.username}`}>
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
