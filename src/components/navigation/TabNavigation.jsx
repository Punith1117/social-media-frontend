import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const Tab = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
    color: #0066cc;
  }

  &.active {
    color: #0066cc;
    background: #e7f3ff;
  }
`;

const ProfileTab = styled(Tab)`
  min-width: 250px;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
`;

const ProfilePhoto = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e0e0e0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
`;

const Username = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DisplayName = styled.span`
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SimpleTab = styled(Tab)`
  min-width: 80px;
  justify-content: center;
`;

const TabNavigation = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Optimize Cloudinary images for navigation (smaller size, faster loading)
  const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }
    // Add Cloudinary transformations for smaller size and better performance
    const transformations = 'w_84,h_84,c_fill,q_auto,f_auto';
    return url.replace('/upload/', `/upload/${transformations}/`);
  };

  if (!isAuthenticated) {
    // On auth pages, only show explore link
    if (location.pathname === '/login' || location.pathname === '/signup') {
      return (
        <TabContainer>
          <SimpleTab to="/explore">
            Explore
          </SimpleTab>
        </TabContainer>
      );
    }
    
    // On other pages, show login/signup
    return (
      <TabContainer>
        <SimpleTab to="/login">
          Login
        </SimpleTab>
        <SimpleTab to="/signup">
          Sign Up
        </SimpleTab>
        <SimpleTab to="/explore">
          Explore
        </SimpleTab>
      </TabContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <TabContainer>
      <ProfileTab to="/me">
        <ProfilePhoto 
          src={getOptimizedImageUrl(user.profilePhotoUrl) || '/default-avatar.svg'} 
          alt={user.username} 
        />
        <ProfileInfo>
          <Username>@{user.username}</Username>
          {user.displayName && (
            <DisplayName>{user.displayName}</DisplayName>
          )}
        </ProfileInfo>
      </ProfileTab>
      
      <SimpleTab to="/">
        Home
      </SimpleTab>
      
      <SimpleTab to="/explore">
        Feed
      </SimpleTab>
    </TabContainer>
  );
};

export default TabNavigation;
