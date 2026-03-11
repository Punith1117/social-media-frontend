import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FileEdit, CircleX } from 'lucide-react';
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
  color: #60a5fa;
`;

const EditButton = styled.button`
  background: rgba(243, 156, 18, 0.15);
  color: #f39c12;
  border: 1px solid rgba(243, 156, 18, 0.25);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-out;
  margin-bottom: 1rem;

  &:hover:not(:disabled) {
    background: #f39c12;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const MyDetailsPage = () => {
  const { isAuthenticated } = useAuth();
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
    <ProfileLayout 
      user={user} 
      showFollowButton={false}
      editButton={
        <EditButton onClick={handleEditToggle}>
          {isEditing ? <CircleX size={18} title="Cancel Edit" /> : <FileEdit size={18} title="Edit Profile" />}
        </EditButton>
      }
    >
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
  );
};

export default MyDetailsPage;
