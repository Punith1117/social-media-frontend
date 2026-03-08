import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ProfileCardContainer,
  ProfilePhoto,
  UserName,
  UsernameFirstChar,
  UsernameMiddleChars,
  UsernameLastChar,
  DisplayName,
  Bio,
  JoinDate,
  EditButtonContainer
} from './ProfileCard.styles';

const ProfileCard = ({ user, showFollowButton = false, editButton = null }) => {
  const { user: currentUser } = useAuth();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isOwnProfile = currentUser?.id === user.id;

  const RenderUsername = (username) => {
    if (!username || username.length <= 2) {
      return <UserName>{username}</UserName>;
    }

    return (
      <UserName>
        <UsernameFirstChar>{username.charAt(0)}</UsernameFirstChar>
        <UsernameMiddleChars>{username.slice(1, -1)}</UsernameMiddleChars>
        <UsernameLastChar>{username.charAt(username.length - 1)}</UsernameLastChar>
      </UserName>
    );
  };

  return (
    <ProfileCardContainer>
      <ProfilePhoto 
        src={user.profilePhotoUrl || '/default-avatar.svg'} 
        alt={`${user.username}'s profile`}
      />
      {RenderUsername(user.username)}
      {user.displayName && (
        <DisplayName>{user.displayName}</DisplayName>
      )}
      {user.bio && <Bio>{user.bio}</Bio>}
      <JoinDate>Joined {formatDate(user.createdAt)}</JoinDate>
      {editButton && (
        <EditButtonContainer>
          {editButton}
        </EditButtonContainer>
      )}
      {showFollowButton && !isOwnProfile && (
        <div style={{ marginTop: '1rem' }}>
          {/* FollowButton will be added here */}
        </div>
      )}
    </ProfileCardContainer>
  );
};

export default ProfileCard;
