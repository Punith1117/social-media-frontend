import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutContainer,
  Header,
  UserInfo,
  UserAvatar,
  UserDetails,
  BackButton,
  Tabs,
  Tab
} from './FollowListLayout.styles';

const FollowListLayout = ({ user, children, activeTab, onTabChange }) => {
  return (
    <LayoutContainer>
      <Header>
        <UserInfo>
          <UserAvatar 
            src={user.profilePhotoUrl || '/default-avatar.svg'} 
            alt={user.displayName || user.username || 'User avatar'}
          />
          <UserDetails>
            <h2>{user.username}</h2>
            {user.displayName && <p>{user.displayName}</p>}
          </UserDetails>
        </UserInfo>
        <BackButton to={`/users/${user.username}`}>
          Back to Profile
        </BackButton>
      </Header>
      
      <Tabs>
        <Tab 
          $active={activeTab === 'followers'} 
          onClick={() => onTabChange('followers')}
        >
          Followers
        </Tab>
        <Tab 
          $active={activeTab === 'following'} 
          onClick={() => onTabChange('following')}
        >
          Following
        </Tab>
      </Tabs>
      
      {children}
    </LayoutContainer>
  );
};

export default FollowListLayout;
