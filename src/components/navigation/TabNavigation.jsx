import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const TabContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #ccc;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 60px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  min-width: 200px;
  gap: 0.75rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Username = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
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

  if (!isAuthenticated) {
    return (
      <TabContainer>
        <SimpleTab to="/login">
          Login
        </SimpleTab>
        <SimpleTab to="/signup">
          Sign Up
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
        <ProfileInfo>
          <Username>@{user.username}</Username>
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
