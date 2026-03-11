import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FollowButton from '../profile/FollowButton';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  danger: '#dc3545',
  accent: '#8b4513'
};

const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  position: relative;
  transition: all 0.3s ease;
  animation: fadeIn 0.4s ease-out both;
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateX(-15px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  &:hover {
    background: ${COLORS.primaryLight};
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, ${COLORS.primary}, ${COLORS.accent});
      animation: slideIn 0.3s ease-out;
    }
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @keyframes slideIn {
    0% { transform: scaleY(0); }
    100% { transform: scaleY(1); }
  }
`;

const UserItemLink = styled(Link)`
  display: flex;
  align-items: center;
  flex: 1;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid ${COLORS.primaryBorder};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  ${UserItemContainer}:hover & {
    border-color: ${COLORS.primary};
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-weight: 600;
  color: ${COLORS.text};
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  ${UserItemContainer}:hover & {
    color: ${COLORS.primary};
  }
`;

const DisplayName = styled.div`
  color: ${COLORS.textLight};
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  transition: all 0.3s ease;
  
  ${UserItemContainer}:hover & {
    color: ${COLORS.text};
  }
`;

const UserListItem = ({ user }) => {
  // Optimize Cloudinary images for list view (smaller size, faster loading)
  const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }
    
    // Add Cloudinary transformations for thumbnail
    const transformations = 'w_100,h_100,c_fill,q_auto:good,f_auto';
    return url.replace('/upload/', `/upload/${transformations}/`);
  };

  return (
    <UserItemContainer>
      <UserItemLink to={`/users/${user.username}`}>
        <UserAvatar 
          src={getOptimizedImageUrl(user.profilePhotoUrl) || '/default-avatar.svg'} 
          alt={user.displayName || user.username || 'User avatar'}
        />
        <UserInfo>
          <Username>{user.username}</Username>
          {user.displayName && (
            <DisplayName>{user.displayName}</DisplayName>
          )}
        </UserInfo>
      </UserItemLink>
      <FollowButton followingId={user.id} />
    </UserItemContainer>
  );
};

export default UserListItem;
