import { createContext, useContext } from 'react';
import api from '../services/api';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const updateUserProfile = async (userData) => {
    try {
      const updatedUser = await api.updateUser(userData);
      
      return { success: true, data: updatedUser };
    } catch (error) {
      return { 
        success: false, 
        error: error.error || 'Profile update failed',
        field: error.field 
      };
    }
  };

  const uploadProfilePhoto = async (file) => {
    try {
      const response = await api.uploadProfilePhoto(file);
      
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error.error || 'Photo upload failed',
        field: error.field 
      };
    }
  };

  const deleteProfilePhoto = async () => {
    try {
      await api.deleteProfilePhoto();
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.error || 'Photo deletion failed',
        field: error.field 
      };
    }
  };

  const getUserByUsername = async (username) => {
    try {
      const user = await api.getUserByUsername(username);
      return { success: true, data: user };
    } catch (error) {
      return { 
        success: false, 
        error: error.error || 'Failed to fetch user',
        field: error.field 
      };
    }
  };

  const value = {
    updateUserProfile,
    uploadProfilePhoto,
    deleteProfilePhoto,
    getUserByUsername
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
