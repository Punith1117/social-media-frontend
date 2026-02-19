import React, { useMemo } from 'react';
import styled from 'styled-components';
import ProfileCard from '../profile/ProfileCard';
import UserStats from '../profile/UserStats';
import FollowButton from '../profile/FollowButton';
import { useFollow } from '../../hooks/useFollow';

const SidebarContainer = styled.div`
  flex: 1;
  max-width: 300px;
`;

const ProfileSidebar = ({ user, showFollowButton = false }) => {
  const userId = useMemo(() => user?.id, [user?.id]);
  const { followStats, loading: statsLoading, refreshStats } = useFollow(userId);

  const handleFollowChange = async () => {
    // Refetch stats to get the most up-to-date data from server
    await refreshStats();
  };

  if (statsLoading) {
    return (
      <SidebarContainer>
        <div>Loading profile...</div>
      </SidebarContainer>
    );
  }

  return (
    <SidebarContainer>
      <ProfileCard user={user} showFollowButton={false} />
      <UserStats 
        followersCount={followStats.followersCount}
        followingCount={followStats.followingCount}
        username={user.username}
      />
      {showFollowButton && (
        <FollowButton
          followingId={user.id}
          onFollowChange={handleFollowChange}
        />
      )}
    </SidebarContainer>
  );
};

export default ProfileSidebar;
