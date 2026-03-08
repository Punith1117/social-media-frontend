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
  color: #e8d5c7;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  animation: loadingPulse 2s ease-in-out infinite;
  
  @keyframes loadingPulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background: 
    linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, rgba(192, 57, 43, 0.1) 100%);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(231, 76, 60, 0.2);
  animation: errorShake 0.3s ease-in-out;
  
  @keyframes errorShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
`;

const UserNotFoundContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #a8a29e;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  background: 
    linear-gradient(135deg, rgba(20, 15, 15, 0.8) 0%, rgba(15, 10, 10, 0.9) 100%);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(220, 53, 69, 0.1);
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
        <UserNotFoundContainer>
          User not found
        </UserNotFoundContainer>
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
