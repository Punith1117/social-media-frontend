import React from 'react';
import styled from 'styled-components';
import UserListItem from './UserListItem';

const ListContainer = styled.div`
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 16px;
  background: 
    linear-gradient(135deg, rgba(20, 15, 15, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%);
  backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(220, 53, 69, 0.1);
  animation: listEntrance 0.6s ease-out 0.8s both;
  
  @keyframes listEntrance {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
      filter: blur(5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }
`;

const ListHeader = styled.div`
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(220, 53, 69, 0.3);
  font-weight: 600;
  color: #e8d5c7;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(220, 53, 69, 0.6), 
      rgba(139, 69, 19, 0.3),
      rgba(220, 53, 69, 0.6));
  }
`;

const LoadingMessage = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: #e8d5c7;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.1rem;
  animation: loadingPulse 2s ease-in-out infinite;
  
  @keyframes loadingPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const EmptyMessage = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: #a8a29e;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  font-style: italic;
  background: rgba(220, 53, 69, 0.05);
  border-radius: 12px;
  margin: 1rem;
  border: 1px solid rgba(220, 53, 69, 0.1);
  backdrop-filter: blur(5px);
  animation: emptyFadeIn 0.5s ease-out;
  
  @keyframes emptyFadeIn {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
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
