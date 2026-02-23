import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FollowListLayout from '../components/profile/FollowListLayout';
import UserList from '../components/users/UserList';
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

const FollowersPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user details first
        const userData = await api.getUserByUsername(username);
        setUser(userData);
        
        // Then fetch followers using user.id
        const followersData = await api.getFollowers(userData.id);
        setFollowers(followersData.followers || []);
      } catch (error) {
        setError(error.error || 'Failed to fetch followers');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) {
    return (
      <CenterContainer>
        <LoadingContainer>
          Loading followers...
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

  const handleTabChange = (tab) => {
    // Navigate to following page if needed
    if (tab === 'following') {
      navigate(`/users/${username}/following`);
    }
  };

  return (
    <FollowListLayout 
      user={user} 
      activeTab="followers"
      onTabChange={handleTabChange}
    >
      <UserList 
        users={followers}
        loading={loading}
        count={followers.length}
        title="Followers"
      />
    </FollowListLayout>
  );
};

export default FollowersPage;
