import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileLayout from '../components/layout/ProfileLayout';
import PostsSection from '../components/profile/PostsSection';
import EditProfileForm from '../components/profile/EditProfileForm';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
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

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    background: #0052a3;
  }
`;

const MyDetailsPage = () => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      try {
        const userData = await api.getMe();
        setUser(userData);
      } catch (error) {
        setError(error.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [isAuthenticated]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleProfileUpdate = async () => {
    // Refetch user data to trigger rerender with updated information
    try {
      const userData = await api.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  if (loading) {
    return (
      <CenterContainer>
        <LoadingContainer>
          Loading your profile...
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
          Profile not found
        </ErrorContainer>
      </CenterContainer>
    );
  }

  return (
    <div>
      <EditButton onClick={handleEditToggle}>
        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
      </EditButton>
      <ProfileLayout user={user} showFollowButton={false}>
        {isEditing ? (
          <EditProfileForm 
            user={user} 
            onCancel={handleEditCancel} 
            onUpdate={handleProfileUpdate}
          />
        ) : (
          <PostsSection username={user.username} />
        )}
      </ProfileLayout>
    </div>
  );
};

export default MyDetailsPage;
