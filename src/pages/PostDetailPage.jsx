import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { HeartHandshake, FileEdit, Trash, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DeleteConfirmationModal from '../components/posts/DeleteConfirmationModal';
import CommentSection from '../components/comments/CommentSection';
import ShareButton from '../components/common/ShareButton';
import {
  PageContainer,
  PostContainer,
  PostSection,
  PostHeader,
  AuthorInfo,
  AuthorPhoto,
  AuthorDetails,
  AuthorName,
  AuthorDisplayName,
  PostDate,
  PostDates,
  PostContent,
  LikeButton,
  EditButton,
  ButtonContainer,
  DeleteButton,
  LikesCount,
  LoadingContainer,
  ErrorContainer,
  BackButton
} from './PostDetailPage.styles';

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
      }
    } finally {
      setIsDeleting(false);
    }
  };

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
    navigate(`/users/${post.author.username}`);
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
      <PageContainer>
        <LoadingContainer>
          Loading post...
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorContainer>
          {error}
        </ErrorContainer>
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer>
        <ErrorContainer>
          Post not found
        </ErrorContainer>
      </PageContainer>
    );
  }

  // Check if current user is post owner - ONLY after confirming post exists
  const isPostOwner = user?.id === post.authorId;

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
      </BackButton>
      
      <PostContainer>
        <PostSection>
          <PostHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <AuthorInfo onClick={handleAuthorClick}>
                  {post.author?.profilePhotoUrl ? (
                    <AuthorPhoto src={getOptimizedImageUrl(post.author.profilePhotoUrl)} alt={post.author.username} />
                  ) : (
                    <AuthorPhoto src="/default-avatar.svg" alt={post.author.username} />
                  )}
                  <AuthorDetails>
                    <AuthorName>{post.author?.username || 'Unknown User'}</AuthorName>
                    {post.author?.displayName && (
                      <AuthorDisplayName>{post.author.displayName}</AuthorDisplayName>
                    )}
                  </AuthorDetails>
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
              <HeartHandshake 
                size={18} 
                title={post.isLikedByCurrentUser ? "Unlike" : "Like"}
                fill={post.isLikedByCurrentUser ? "currentColor" : "none"}
              />
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
    </PageContainer>
  );
};

export default PostDetailPage;
