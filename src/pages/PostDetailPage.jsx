import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CenterContainer } from '../styles/MinimalStyles';
import DeleteConfirmationModal from '../components/posts/DeleteConfirmationModal';
import CommentSection from '../components/comments/CommentSection';
import ShareButton from '../components/common/ShareButton';

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

const EditButton = styled.button`
  background: #007bff;
  color: white;
  border: 1px solid #007bff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
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

const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: 1px solid #e74c3c;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;

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

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liking, setLiking] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      navigate('/login', { state: { from: location.pathname } });
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
        logout();
        navigate('/login', { state: { from: location.pathname } });
      } else {
        console.error('Like/unlike failed:', error);
      }
    } finally {
      setLiking(false);
    }
  };

  const handleEditClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDeleteClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    try {
      await api.deletePost(post.id);
      // Navigate to user's profile page after successful deletion
      navigate(`/users/${post.author.username}`);
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        logout();
        navigate('/login', { state: { from: location.pathname } });
      } else {
        // For other errors, keep modal open and show error
        console.error('Delete failed:', error);
        // TODO: Show error message to user
      }
    } finally {
      setIsDeleting(false);
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

  // Check if current user is post owner - ONLY after confirming post exists
  const isPostOwner = user?.id === post.authorId;

  return (
    <CenterContainer>
      <BackButton onClick={() => navigate(-1)}>
        ← Back
      </BackButton>
      
      <PostContainer>
        <PostSection>
          <PostHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <AuthorInfo>
                  <AuthorName>{post.author?.username || 'Unknown User'}</AuthorName>
                </AuthorInfo>
                <PostDates>
                  <PostDate>Created: {formatDate(post.createdAt)}</PostDate>
                  {post.updatedAt && post.updatedAt !== post.createdAt && (
                    <PostDate>Updated: {formatDate(post.updatedAt)}</PostDate>
                  )}
                </PostDates>
              </div>
              
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
            </div>
          </PostHeader>

          <PostContent>
            {post.content}
          </PostContent>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            <ShareButton post={post} />
          </div>
        </PostSection>

        <CommentSection postId={post.id} />
      </PostContainer>
      
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        postContent={post.content}
      />
    </CenterContainer>
  );
};

export default PostDetailPage;
