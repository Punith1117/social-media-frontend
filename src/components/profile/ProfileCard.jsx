import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  
  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const ProfilePhoto = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0066cc;
  margin-bottom: 1rem;
`;

const UserName = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

const DisplayName = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.3;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Bio = styled.p`
  margin: 0 0 1rem 0;
  color: #333;
  line-height: 1.4;
`;

const JoinDate = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #999;
`;

const EditButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: right !important;
    align-self: flex-end;
    width: 100%;
  }
`;

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

  return (
    <ProfileCardContainer>
      <ProfilePhoto 
        src={user.profilePhotoUrl || '/default-avatar.svg'} 
        alt={`${user.username}'s profile`}
      />
      <UserName>{user.username}</UserName>
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
