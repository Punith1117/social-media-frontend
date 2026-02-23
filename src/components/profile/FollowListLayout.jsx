import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LayoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const UserDetails = styled.div`
  h2 {
    margin: 0 0 0.25rem 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const BackButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background: #0052a3;
  }
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#0066cc' : 'transparent'};
  color: ${props => props.$active ? '#0066cc' : '#666'};
  cursor: pointer;
  
  &:hover {
    color: #0066cc;
  }
`;

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
