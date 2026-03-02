import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ShareButton from '../common/ShareButton';

const PostCardContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  position: relative;

  &:hover {
    background: #f8f9fa;
  }
`;

const AuthorPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorUsername = styled.div`
  font-weight: 500;
  color: #333;
`;

const AuthorDisplayName = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const PostDates = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #666;
`;

const PostDate = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

const PostContent = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
`;

const LikeButton = styled.button`
  background: ${props => props.$isLiked ? '#e74c3c' : '#f8f9fa'};
  color: ${props => props.$isLiked ? 'white' : '#333'};
  border: 1px solid ${props => props.$isLiked ? '#e74c3c' : '#ddd'};
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 0.5rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const EditButton = styled.button`
  background: #007bff;
  color: white;
  border: 1px solid #007bff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 0.5rem;

  &:hover {
    background: #0056b3;
    border-color: #0056b3;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: 1px solid #e74c3c;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: auto;

  &:hover {
    background: #c0392b;
    border-color: #c0392b;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LikesCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  position: relative;
`;

const PostCard = ({ post, onLikeUpdate, onDelete, context = 'profile' }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLikeInProgress, setIsLikeInProgress] = useState(false);

  // Optimize Cloudinary images for profile photos (smaller size, faster loading)
  const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }
    
    // Add Cloudinary transformations for thumbnail
    const transformations = 'w_100,h_100,c_fill,q_auto:good,f_auto';
    return url.replace('/upload/', `/upload/${transformations}/`);
  };

  const handleClick = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking like button
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsLikeInProgress(true);
    
    // Capture current state before any mutations
    const wasLiked = post.isLikedByCurrentUser;
    
    try {
      // Call parent's like update function
      onLikeUpdate(post.id, !wasLiked);
    } catch (error) {
      // Error handling is done at parent level
      console.error('Like/unlike failed:', error);
    } finally {
      setIsLikeInProgress(false);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking edit button
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete button
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    try {
      if (onDelete) {
        await onDelete(post.id);
      }
      setShowDeleteModal(false);
    } catch (error) {
      // Error handling is done at parent level
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if current user is the post owner
  const isPostOwner = user?.id === post.authorId;

  return (
    <>
      <PostCardContainer>
        {context === 'feed' && (
          <PostHeader onClick={(e) => {
            e.stopPropagation();
            navigate(`/users/${post.author?.username}`);
          }}>
            {post.author?.profilePhotoUrl ? (
              <AuthorPhoto src={getOptimizedImageUrl(post.author.profilePhotoUrl)} alt={post.author.username} />
            ) : (
              <AuthorPhoto src="/default-avatar.svg" alt={post.author.username} />
            )}
            <AuthorInfo>
              <AuthorUsername>{post.author?.username}</AuthorUsername>
              <AuthorDisplayName>{post.author?.displayName}</AuthorDisplayName>
            </AuthorInfo>
            <PostDates>
              <PostDate>{formatDate(post.createdAt)}</PostDate>
              {post.updatedAt !== post.createdAt && (
                <PostDate>Updated: {formatDate(post.updatedAt)}</PostDate>
              )}
            </PostDates>
          </PostHeader>
        )}

        {context === 'profile' && (
          <PostHeader>
            <PostDates>
              <PostDate>{formatDate(post.createdAt)}</PostDate>
              {post.updatedAt !== post.createdAt && (
                <PostDate>Updated: {formatDate(post.updatedAt)}</PostDate>
              )}
            </PostDates>
          </PostHeader>
        )}

        <PostContent>
          {post.content}
        </PostContent>

        <PostActions>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LikeButton
              onClick={handleLike}
              disabled={!isAuthenticated || isLikeInProgress}
              $isLiked={post.isLikedByCurrentUser}
            >
              {post.isLikedByCurrentUser ? '❤️' : '🤍'} 
              {post.isLikedByCurrentUser ? 'Unlike' : 'Like'}
            </LikeButton>
            <LikesCount>
              {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
            </LikesCount>
          </div>
          
          <ShareButton post={post} />
          
          {isPostOwner && (
            <ButtonContainer>
              <EditButton
                onClick={handleEditClick}
                disabled={isDeleting}
              >
                ✏️ Edit
              </EditButton>
              <DeleteButton
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                🗑️ Delete
              </DeleteButton>
            </ButtonContainer>
          )}
        </PostActions>
      </PostCardContainer>
      
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        postContent={post.content}
      />
    </>
  );
};

export default PostCard;
