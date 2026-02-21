import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CenterContainer } from '../styles/MinimalStyles';

const PostContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  gap: 2rem;
`;

const PostSection = styled.div`
  flex: 2;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1.5rem;
`;

const CommentsSection = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1.5rem;
`;

const PostHeader = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;
`;

const PostDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const PostDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const PostContent = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: 1rem;
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

  &:hover {
    background: ${props => props.$isLiked ? '#c0392b' : '#e9ecef'};
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

const NoComments = styled.div`
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 1rem;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #cc0000;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CommentsHeader = styled.h3`
  margin-bottom: 1rem;
  color: #333;
`;

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.getPostById(id);
        setPost(response.post);
      } catch (error) {
        setError(error.error || 'Post not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLiking(true);
    
    try {
      // Optimistic update
      setPost(prev => ({
        ...prev,
        isLikedByCurrentUser: !prev.isLikedByCurrentUser,
        likesCount: prev.isLikedByCurrentUser ? prev.likesCount - 1 : prev.likesCount + 1
      }));

      if (post.isLikedByCurrentUser) {
        await api.unlikePost(post.id);
      } else {
        await api.likePost(post.id);
      }
    } catch (error) {
      // Revert optimistic update on error
      setPost(prev => ({
        ...prev,
        isLikedByCurrentUser: !prev.isLikedByCurrentUser,
        likesCount: prev.isLikedByCurrentUser ? prev.likesCount + 1 : prev.likesCount - 1
      }));
      
      // Handle auth errors
      if (error.status === 401 || error.status === 403) {
        navigate('/login');
      } else {
        console.error('Like/unlike failed:', error);
      }
    } finally {
      setLiking(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <CenterContainer>
        <LoadingContainer>
          Loading post...
        </LoadingContainer>
      </CenterContainer>
    );
  }

  if (error) {
    return (
      <CenterContainer>
        <ErrorContainer>
          {error}
        </ErrorContainer>
      </CenterContainer>
    );
  }

  if (!post) {
    return (
      <CenterContainer>
        <ErrorContainer>
          Post not found
        </ErrorContainer>
      </CenterContainer>
    );
  }

  return (
    <CenterContainer>
      <BackButton onClick={() => navigate(-1)}>
        ← Back
      </BackButton>
      
      <PostContainer>
        <PostSection>
          <PostHeader>
            <AuthorInfo>
              <AuthorName>{post.author?.username || 'Unknown User'}</AuthorName>
            </AuthorInfo>
            <PostDates>
              <PostDate>Created: {formatDate(post.createdAt)}</PostDate>
              {post.updatedAt && post.updatedAt !== post.createdAt && (
                <PostDate>Updated: {formatDate(post.updatedAt)}</PostDate>
              )}
            </PostDates>
          </PostHeader>

          <PostContent>
            {post.content}
          </PostContent>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LikeButton
              onClick={handleLike}
              disabled={liking || !isAuthenticated}
              $isLiked={post.isLikedByCurrentUser}
            >
              {post.isLikedByCurrentUser ? '❤️' : '🤍'} 
              {post.isLikedByCurrentUser ? 'Unlike' : 'Like'}
            </LikeButton>
            <LikesCount>
              {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
            </LikesCount>
          </div>
        </PostSection>

        <CommentsSection>
          <CommentsHeader>Comments</CommentsHeader>
          <NoComments>
            No comments yet
          </NoComments>
        </CommentsSection>
      </PostContainer>
    </CenterContainer>
  );
};

export default PostDetailPage;
