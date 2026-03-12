import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TabContainer,
  ProfileTab,
  ProfilePhoto,
  ProfileInfo,
  Username,
  DisplayName,
  SimpleTab,
  FirstLastLetter,
  MiddleLetter
} from './TabNavigation.styles';

const TabNavigation = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Helper function to format username with styled first and last letters
  const formatUsername = (username) => {
    if (!username || username.length <= 2) return username?.toUpperCase();
    
    const upperUsername = username.toUpperCase();
    const first = upperUsername[0];
    const middle = upperUsername.slice(1, -1);
    const last = upperUsername[upperUsername.length - 1];
    
    return (
      <>
        <FirstLastLetter>{first}</FirstLastLetter>
        <MiddleLetter>{middle}</MiddleLetter>
        <FirstLastLetter>{last}</FirstLastLetter>
      </>
    );
  };

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
          <Username>{formatUsername(user.username)}</Username>
          {user.displayName && (
            <DisplayName>{user.displayName}</DisplayName>
          )}
        </ProfileInfo>
      </ProfileTab>
      
      <SimpleTab to="/">
        Home
      </SimpleTab>
      
      <SimpleTab to="/explore">
        Explore
      </SimpleTab>
    </TabContainer>
  );
};

export default TabNavigation;
