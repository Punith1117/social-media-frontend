import React from 'react';
import styled from 'styled-components';
import UserListItem from './UserListItem';

// Centralized colors for consistent theming
const COLORS = {
  primary: '#3b82f6',
  primaryLight: 'rgba(59, 130, 246, 0.2)',
  primaryBorder: 'rgba(59, 130, 246, 0.3)',
  background: 'rgba(20, 15, 15, 0.98)',
  text: '#e8d5c7',
  textLight: '#a8a29e',
  danger: '#dc3545'
};

const ListContainer = styled.div`
  border: 1px solid ${COLORS.primaryBorder};
  border-radius: 16px;
  background: ${COLORS.background};
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.6s ease-out;
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
`;

const ListHeader = styled.div`
  padding: 1.25rem 1rem;
  border-bottom: 1px solid ${COLORS.primaryBorder};
  font-weight: 600;
  color: ${COLORS.text};
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LoadingMessage = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: ${COLORS.text};
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
  color: ${COLORS.textLight};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  font-style: italic;
  background: rgba(220, 53, 69, 0.05);
  border-radius: 12px;
  margin: 1rem;
  border: 1px solid rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(5px);
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: scale(0.95); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
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
