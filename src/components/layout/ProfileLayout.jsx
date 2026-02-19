import React from 'react';
import styled from 'styled-components';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';

const LayoutContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1rem;
  padding: 1rem;
`;

const ProfileLayout = ({ user, children, showFollowButton = false }) => {
  return (
    <LayoutContainer>
      <ProfileSidebar user={user} showFollowButton={showFollowButton} />
      <ProfileContent>
        {children}
      </ProfileContent>
    </LayoutContainer>
  );
};

export default ProfileLayout;
