import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CenterContainer } from '../styles/MinimalStyles';
import PostForm from '../components/posts/PostForm';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const PageTitle = styled.h1`
  color: #e8d5c7;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  text-align: center;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  animation: titleFadeIn 0.6s ease-out;

  @keyframes titleFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #dc3545, #8b4513);
    border-radius: 2px;
    animation: titleUnderline 0.8s ease-out 0.3s both;
  }

  @keyframes titleUnderline {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 60px;
      opacity: 1;
    }
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
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#856404', 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '4px',
            margin: '1rem 0'
          }}>
            {error || 'You are not authorized to edit this post'}
          </div>
        </PageContainer>
      </CenterContainer>
    );
  }

  if (error && !isUnauthorized) {
    return (
      <CenterContainer>
        <PageContainer>
          <PageTitle>Edit Post</PageTitle>
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#60a5fa', 
            background: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px',
            margin: '1rem 0'
          }}>
            {error}
          </div>
        </PageContainer>
      </CenterContainer>
    );
  }

  if (!post) {
    return (
      <CenterContainer>
        <PageContainer>
          <PageTitle>Edit Post</PageTitle>
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#60a5fa', 
            background: '#f8d7da', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px',
            margin: '1rem 0'
          }}>
            Post not found
          </div>
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
