import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const PostCardContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const PostHeader = styled.div`
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const PostDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const PostDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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

const LikesCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const PostCard = ({ post, onLikeUpdate }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking like button
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (onLikeUpdate) {
      onLikeUpdate(post.id, !post.isLikedByCurrentUser);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <PostCardContainer onClick={handleClick}>
      <PostHeader>
        <PostDates>
          <PostDate>{formatDate(post.createdAt)}</PostDate>
          {post.updatedAt !== post.createdAt && (
            <PostDate>Updated: {formatDate(post.updatedAt)}</PostDate>
          )}
        </PostDates>
      </PostHeader>

      <PostContent>
        {post.content}
      </PostContent>

      <PostActions>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LikeButton
            onClick={handleLike}
            disabled={!isAuthenticated}
            $isLiked={post.isLikedByCurrentUser}
          >
            {post.isLikedByCurrentUser ? '❤️' : '🤍'} 
            {post.isLikedByCurrentUser ? 'Unlike' : 'Like'}
          </LikeButton>
          <LikesCount>
            {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
          </LikesCount>
        </div>
      </PostActions>
    </PostCardContainer>
  );
};

export default PostCard;
