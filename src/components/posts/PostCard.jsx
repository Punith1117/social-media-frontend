import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeartHandshake, FileEdit, Trash } from 'lucide-react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ShareButton from '../common/ShareButton';
import {
  PostCardContainer,
  PostHeader,
  AuthorPhoto,
  AuthorInfo,
  AuthorUsername,
  AuthorDisplayName,
  PostDates,
  PostDate,
  PostContent,
  PostActions,
  LikeButton,
  ButtonContainer,
  EditButton,
  DeleteButton,
  LikeSection,
  UsernameFirstChar,
  UsernameMiddleChars,
  UsernameLastChar,
  LikesCount,
  AuthorSection
} from './PostCard.styles';

const PostCard = ({ post, onLikeUpdate, onDelete, context = 'profile' }) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking like button
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
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
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete button
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
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

  const truncateText = (text, maxLines = 3) => {
    // Simple truncation - split by lines and join first 3 lines with ellipsis if needed
    const lines = text.split('\n');
    if (lines.length <= maxLines) {
      return text;
    }
    
    const truncatedLines = lines.slice(0, maxLines);
    const lastLine = truncatedLines[maxLines - 1];
    
    // If the last line is too long, truncate it further
    if (lastLine.length > 100) {
      truncatedLines[maxLines - 1] = lastLine.substring(0, 97) + '...';
    }
    
    return truncatedLines.join('\n') + '...';
  };

  // Check if current user is the post owner
  const isPostOwner = user?.id === post.authorId;

  return (
    <>
      <PostCardContainer>
        {context === 'feed' && (
          <PostHeader to={`/users/${post.author?.username}`}>
          {post.author?.profilePhotoUrl ? (
            <AuthorPhoto src={getOptimizedImageUrl(post.author.profilePhotoUrl)} alt={post.author.username} />
          ) : (
            <AuthorPhoto src="/default-avatar.svg" alt={post.author.username} />
          )}
          <AuthorInfo>
            <AuthorUsername>
              {post.author?.username && (
                <>
                  <UsernameFirstChar>{post.author.username.charAt(0)}</UsernameFirstChar>
                  <UsernameMiddleChars>{post.author.username.slice(1, -1)}</UsernameMiddleChars>
                  <UsernameLastChar>{post.author.username.charAt(post.author.username.length - 1)}</UsernameLastChar>
                </>
              )}
            </AuthorUsername>
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

        <PostContent to={`/posts/${post.id}`}>
          {truncateText(post.content)}
        </PostContent>

        <PostActions>
          <LikeSection>
            <LikeButton
              onClick={handleLike}
              disabled={!isAuthenticated || isLikeInProgress}
              $isLiked={post.isLikedByCurrentUser}
            >
              <HeartHandshake 
                size={18} 
                title={post.isLikedByCurrentUser ? "Unlike" : "Like"}
                fill={post.isLikedByCurrentUser ? "currentColor" : "none"}
              />
            </LikeButton>
            <LikesCount>
              {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
            </LikesCount>
          </LikeSection>
          
          <ShareButton post={post} />
          
          {isPostOwner && (
            <ButtonContainer>
              <EditButton
                onClick={handleEditClick}
                disabled={isDeleting}
              >
                <FileEdit size={18} title="Edit" />
              </EditButton>
              <DeleteButton
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                <Trash size={18} title="Delete" />
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
