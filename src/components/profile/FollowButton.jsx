import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useFollow } from '../../hooks/useFollow';

const FollowButtonContainer = styled.div`
  margin-top: 1rem;
  animation: buttonFadeIn 0.6s ease-out 0.7s both;

  @keyframes buttonFadeIn {
    0% {
      opacity: 0;
      transform: translateY(15px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.6rem;
  background: ${props => props.$isFollowing 
    ? '#2a1810' 
    : '#1a2a1a'};
  color: ${props => props.$isFollowing ? '#d2691e' : '#4ade80'};
  border: 1px solid ${props => props.$isFollowing 
    ? '#8b4513' 
    : '#16a34a'};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: ${props => props.$isFollowing 
      ? '#3a2818' 
      : '#2a3a2a'};
    border-color: ${props => props.$isFollowing 
      ? '#cd853f' 
      : '#22c55e'};
    color: ${props => props.$isFollowing ? '#f4a460' : '#86efac'};
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  
  &:disabled {
    background: #1a1a1a;
    color: #6b7280;
    border-color: #374151;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: all 0.1s ease;
  }
`;

const FollowButton = ({ followingId, onFollowChange }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFollow, loading, isFollowing } = useFollow(followingId);

  // Don't show follow button for own profile
  const isOwnProfile = isAuthenticated && user?.id === followingId;
  if (isOwnProfile) {
    return null;
  }

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    const result = await toggleFollow();
    
    if (result.success) {
      // Notify parent component of the change
      if (onFollowChange) {
        onFollowChange(!result.isFollowing);
      }
    } else {
      console.error('Follow/unfollow error:', result.error);
    }
  };

  return (
    <FollowButtonContainer>
      <Button
        onClick={handleFollowClick}
        disabled={loading}
        $isFollowing={isFollowing}
      >
        {loading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </FollowButtonContainer>
  );
};

export default FollowButton;
