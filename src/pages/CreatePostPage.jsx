import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { CenterContainer } from '../styles/MinimalStyles';
import PostForm from '../components/posts/PostForm';

const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const PageTitle = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (content) => {
    setIsLoading(true);

    try {
      const response = await api.createPost(content);
      
      // Success: Navigate to user's profile page
      navigate(`/users/${user.username}`);
      
    } catch (error) {
      setIsLoading(false);
      
      // Handle authentication errors
      if (error.status === 401 || error.status === 403) {
        navigate('/login');
        return;
      }
      
      // Re-throw the error to be handled by CreatePostForm
      throw error;
    }
  };

  const handleCancel = () => {
    // Cancel: Navigate back by 1 page
    navigate(-1);
  };

  // Don't render content if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      <CenterContainer>
        <LoadingOverlay>
          <LoadingSpinner>
            Redirecting to login...
          </LoadingSpinner>
        </LoadingOverlay>
      </CenterContainer>
    );
  }

  return (
    <CenterContainer>
      <PageContainer>
        <PageTitle>Create Post</PageTitle>
        
        {isLoading ? (
          <LoadingOverlay>
            <LoadingSpinner>
              Creating post...
            </LoadingSpinner>
          </LoadingOverlay>
        ) : null}
        
        <PostForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          disabled={isLoading}
          mode="create"
        />
      </PageContainer>
    </CenterContainer>
  );
};

export default CreatePostPage;
