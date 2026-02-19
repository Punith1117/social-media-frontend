import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useFollow = (userId) => {
  const [followStats, setFollowStats] = useState({
    followersCount: 0,
    followingCount: 0,
    isFollowing: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuth();

  // Fetch follow stats when userId changes
  useEffect(() => {
    const fetchFollowStats = async () => {
      if (!userId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const stats = await api.getFollowStats(userId);
        setFollowStats(stats);
      } catch (error) {
        const errorMessage = error.error || 'Failed to fetch follow stats';
        setError(errorMessage);
        console.error('Error fetching follow stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowStats();
  }, [userId, currentUser]);

  const followUser = useCallback(async () => {
    if (!userId) return { success: false, error: 'User ID required' };
    
    // Prevent self-following
    if (currentUser?.id === userId) {
      return { success: false, error: 'You cannot follow yourself' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await api.followUser(userId);
      
      // Update local state optimistically
      setFollowStats(prev => ({
        ...prev,
        isFollowing: true,
        followersCount: prev.followersCount + 1
      }));
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.error || 'Failed to follow user';
      setError(errorMessage);
      
      // Revert state on error
      setFollowStats(prev => ({
        ...prev,
        isFollowing: false,
        followersCount: prev.followersCount - 1
      }));
      
      return { 
        success: false, 
        error: errorMessage,
        field: error.field 
      };
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser]);

  const unfollowUser = useCallback(async () => {
    if (!userId) return { success: false, error: 'User ID required' };
    
    // Prevent self-unfollowing
    if (currentUser?.id === userId) {
      return { success: false, error: 'You cannot unfollow yourself' };
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await api.unfollowUser(userId);
      
      // Update local state optimistically
      setFollowStats(prev => ({
        ...prev,
        isFollowing: false,
        followersCount: prev.followersCount - 1
      }));
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.error || 'Failed to unfollow user';
      setError(errorMessage);
      
      // Revert state on error
      setFollowStats(prev => ({
        ...prev,
        isFollowing: true,
        followersCount: prev.followersCount + 1
      }));
      
      return { 
        success: false, 
        error: errorMessage,
        field: error.field 
      };
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser]);

  const toggleFollow = useCallback(async () => {
    if (followStats.isFollowing) {
      return await unfollowUser();
    } else {
      return await followUser();
    }
  }, [followStats.isFollowing, followUser, unfollowUser]);

  const refreshStats = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const stats = await api.getFollowStats(userId);
      setFollowStats(stats);
      return { success: true, data: stats };
    } catch (error) {
      const errorMessage = error.error || 'Failed to refresh follow stats';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage,
        field: error.field 
      };
    } finally {
      setLoading(false);
    }
  }, [userId, currentUser]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Data
    followStats,
    loading,
    error,
    
    // Actions
    followUser,
    unfollowUser,
    toggleFollow,
    refreshStats,
    clearError,
    
    // Computed
    isFollowing: followStats.isFollowing,
    followersCount: followStats.followersCount,
    followingCount: followStats.followingCount
  };
};
