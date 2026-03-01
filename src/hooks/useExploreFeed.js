import { useState, useEffect } from 'react';
import api from '../services/api';

const useExploreFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.getExploreFeed(cursor, 10);
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
    loadMore();
  }, []);

  return { posts, loading, error, cursor, hasMore, loadMore };
};

export default useExploreFeed;
