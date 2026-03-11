import React from 'react';
import styled from 'styled-components';
import UserListItem from './UserListItem';

const ListContainer = styled.div`
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 16px;
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  animation: ${props => props.theme.animations.fadeIn} 0.6s ease-out;
`;

const ListHeader = styled.div`
  padding: 1.25rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.primaryBorder};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LoadingMessage = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const EmptyMessage = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  font-style: italic;
  background: rgba(220, 53, 69, 0.05);
  border-radius: 12px;
  margin: 1rem;
  border: 1px solid rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(5px);
  animation: ${props => props.theme.animations.fadeIn} 0.5s ease-out;
`;

const UserList = ({ users, loading, count, title }) => {
  if (loading) {
    return (
      <ListContainer>
        <LoadingMessage>Loading...</LoadingMessage>
      </ListContainer>
    );
  }

  if (!users || users.length === 0) {
    return (
      <ListContainer>
        <ListHeader>{title}</ListHeader>
        <EmptyMessage>No users found</EmptyMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <ListHeader>{title} ({count})</ListHeader>
      {users.map(user => (
        user && user.id ? (
          <UserListItem key={user.id} user={user} />
        ) : null
      ))}
    </ListContainer>
  );
};

export default UserList;
