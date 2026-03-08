import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FollowButton from '../profile/FollowButton';

const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(220, 53, 69, 0.2);
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: itemSlideIn 0.4s ease-out both;
  
  @keyframes itemSlideIn {
    0% {
      opacity: 0;
      transform: translateX(-15px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &:hover {
    background: rgba(220, 53, 69, 0.1);
    transform: translateX(5px);
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #dc3545, #8b4513);
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
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid rgba(220, 53, 69, 0.3);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(220, 53, 69, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  ${UserItemContainer}:hover & {
    transform: scale(1.1) rotate(5deg);
    border-color: rgba(220, 53, 69, 0.6);
    box-shadow: 
      0 6px 20px rgba(220, 53, 69, 0.3),
      0 0 15px rgba(220, 53, 69, 0.2);
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-weight: 600;
  color: #e8d5c7;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  ${UserItemContainer}:hover & {
    color: #ffffff;
    transform: translateY(-1px);
  }
`;

const DisplayName = styled.div`
  color: #a8a29e;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  ${UserItemContainer}:hover & {
    color: #e8d5c7;
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
