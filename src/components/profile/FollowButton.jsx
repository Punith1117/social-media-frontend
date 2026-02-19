import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { useFollow } from '../../hooks/useFollow';

const FollowButtonContainer = styled.div`
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.$isFollowing ? '#ccc' : '#0066cc'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${props => props.$isFollowing ? '#999' : '#0052a3'};
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const FollowButton = ({ followingId, onFollowChange }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toggleFollow, loading, isFollowing } = useFollow(followingId);

  // Don't show follow button for own profile
  const isOwnProfile = isAuthenticated && user?.id === followingId;
  if (isOwnProfile) {
    return null;
  }

  const handleFollowClick = async () => {
    if (!isAuthenticated) {
      navigate('/login');
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
