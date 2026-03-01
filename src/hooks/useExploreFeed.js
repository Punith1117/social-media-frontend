import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

const useExploreFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const initialFetchDone = useRef(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.getExploreFeed(cursor, 5);
      setPosts(prev => [...prev, ...response.posts]);
      setCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch (error) {
      setError(error.error || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (!initialFetchDone.current) { // to fix double fetch for react strict mode
      initialFetchDone.current = true;
      loadMore();
    }
  }, []);

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

  return { posts, loading, error, cursor, hasMore, loadMore, updatePostLike, revertPostLike };
};

export default useExploreFeed;
