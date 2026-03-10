import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { isTokenExpired } from '../utils/tokenUtils';

const useFeed = (feedType = 'explore') => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const initialFetchDone = useRef(false);
  const { logout } = useAuth();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
  
    setLoading(true);
    setError(null);
  
    try {
      // Check if token is expired before making request
      const token = localStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        logout();
        setError('Token expired. Please login again.');
        return;
      }
      
      const response = feedType === 'home' 
        ? await api.getHomeFeed(cursor, 5)
        : await api.getExploreFeed(cursor, 5);
      setPosts(prev => [...prev, ...response.posts]);
      setCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (error) {
      // Handle authentication errors gracefully
      if (error.status === 401 || error.status === 403) {
        setError('Authentication failed. Please login again.');
        logout();
      } else {
        setError(error.error || 'Failed to load posts');
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, feedType, cursor, logout]);

  // Initial fetch
  useEffect(() => {
    if (!initialFetchDone.current) { // to fix double fetch for react strict mode
      initialFetchDone.current = true;
      loadMore();
    }
  }, [loadMore]);

  const updatePostLike = (postId, shouldLike) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            isLikedByCurrentUser: shouldLike,
            likesCount: shouldLike ? post.likesCount + 1 : post.likesCount - 1
          }
        : post
    ));
  };

  const revertPostLike = (postId, shouldLike) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            isLikedByCurrentUser: !shouldLike,
            likesCount: shouldLike ? post.likesCount - 1 : post.likesCount + 1
          }
        : post
    ));
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  return { posts, loading, error, cursor, hasMore, loadMore, updatePostLike, revertPostLike, deletePost };
};

export default useFeed;
