import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProfileLayout from '../components/layout/ProfileLayout';
import PostsSection from '../components/profile/PostsSection';
import api from '../services/api';
import { CenterContainer } from '../styles/MinimalStyles';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #cc0000;
`;

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getUserByUsername(username);
        setUser(userData);
      } catch (error) {
        setError(error.error || 'User not found');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username]);

  if (loading) {
    return (
      <CenterContainer>
        <LoadingContainer>
          Loading profile...
        </LoadingContainer>
      </CenterContainer>
    );
  }

  if (error) {
    return (
      <CenterContainer>
        <ErrorContainer>
          {error}
        </ErrorContainer>
      </CenterContainer>
    );
  }

  if (!user) {
    return (
      <CenterContainer>
        <ErrorContainer>
          User not found
        </ErrorContainer>
      </CenterContainer>
    );
  }

  return (
    <ProfileLayout user={user} showFollowButton={true}>
      <PostsSection username={user.username} />
    </ProfileLayout>
  );
};

export default UserProfilePage;
