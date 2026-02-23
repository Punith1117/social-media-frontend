import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FollowButton from '../profile/FollowButton';

const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const UserItemLink = styled(Link)`
  display: flex;
  align-items: center;
  flex: 1;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-weight: 600;
  color: #333;
`;

const DisplayName = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const UserListItem = ({ user }) => {
  return (
    <UserItemContainer>
      <UserItemLink to={`/users/${user.username}`}>
        <UserAvatar 
          src={user.profilePhotoUrl || '/default-avatar.svg'} 
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
