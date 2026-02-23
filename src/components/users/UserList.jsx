import React from 'react';
import styled from 'styled-components';
import UserListItem from './UserListItem';

const ListContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
`;

const ListHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  color: #333;
`;

const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
`;

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
  font-style: italic;
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
