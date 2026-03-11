import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CenterContainer } from '../styles/MinimalStyles';
import PostForm from '../components/posts/PostForm';

const PageContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    max-width: 98%;
    padding: 0.5rem;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.danger};
  background: ${props => props.theme.colors.dangerLight};
  border: 1px solid ${props => props.theme.colors.dangerBorder};
  border-radius: 4px;
  margin: 1rem 0;
`;

const WarningMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.warning};
  background: ${props => props.theme.colors.warningLight};
  border: 1px solid ${props => props.theme.colors.warningBorder};
  border-radius: 4px;
  margin: 1rem 0;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }
`;

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isAuthenticated) {
        setIsUnauthorized(true);
        setLoading(false);
        return;
      }

      try {
        const response = await api.getPostById(id);
        const postData = response.post;
        
        // Check if current user is the post owner
        if (user?.id !== postData.authorId) {
          setIsUnauthorized(true);
          setError('You are not authorized to edit this post');
          return;
        }
        
        setPost(postData);
        setError(null);
        setIsUnauthorized(false);
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          setIsUnauthorized(true);
          setError('You are not authorized to edit this post');
        } else if (error.status === 404) {
          setError('Post not found');
        } else {
          setError(error.error || 'Failed to load post');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, isAuthenticated, user?.id]);

  const handleSubmit = async (content) => {
    setIsSubmitting(true);

    try {
      await api.updatePost(post.id, content);
      
      // Success: Navigate to post detail page
      navigate(`/posts/${post.id}`);
      
    } catch (error) {
      setIsSubmitting(false);
      
      // Handle authentication errors
      if (error.status === 401 || error.status === 403) {
        logout();
        navigate('/login', { state: { from: location.pathname } });
        return;
      }
      
      // Re-throw the error to be handled by PostForm
      throw error;
    }
  };

  const handleCancel = () => {
    // Cancel: Navigate back by 1 page
    navigate(-1);
  };

  if (loading) {
    return (
      <CenterContainer>
        <div>Loading post...</div>
      </CenterContainer>
    );
  }

  if (isUnauthorized) {
    return (
      <CenterContainer>
        <PageContainer>
          <PageTitle>Edit Post</PageTitle>
          <WarningMessage>
            {error || 'You are not authorized to edit this post'}
          </WarningMessage>
        </PageContainer>
      </CenterContainer>
    );
  }

  if (error && !isUnauthorized) {
    return (
      <CenterContainer>
        <PageContainer>
          <PageTitle>Edit Post</PageTitle>
          <ErrorMessage>
            {error}
          </ErrorMessage>
        </PageContainer>
      </CenterContainer>
    );
  }

  if (!post) {
    return (
      <CenterContainer>
        <PageContainer>
          <PageTitle>Edit Post</PageTitle>
          <ErrorMessage>
            Post not found
          </ErrorMessage>
        </PageContainer>
      </CenterContainer>
    );
  }

  return (
    <CenterContainer>
      <PageContainer>
        <PageTitle>Edit Post</PageTitle>
        
        {isSubmitting ? (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000 
          }}>
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              Updating post...
            </div>
          </div>
        ) : null}
        
        <PostForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialContent={post.content}
          disabled={isSubmitting}
          mode="edit"
        />
      </PageContainer>
    </CenterContainer>
  );
};

export default EditPostPage;
