import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const LoadingSpinner = styled.div`
  background: ${props => props.theme.isDarkMode
    ? `radial-gradient(ellipse at top, rgba(220, 53, 69, 0.15) 0%, transparent 50%), linear-gradient(135deg, rgba(20, 15, 15, 0.98) 0%, rgba(15, 10, 10, 0.95) 100%)`
    : props.theme.colors.background
  };
  backdrop-filter: blur(25px);
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  box-shadow: ${props => props.theme.colors.shadow};
  animation: spinnerEntrance 0.4s ease-out;

  @keyframes spinnerEntrance {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CreatePostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
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
        logout();
        navigate('/login', { state: { from: location.pathname } });
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
