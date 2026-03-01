import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/posts/PostList';
import useExploreFeed from '../hooks/useExploreFeed';
import api from '../services/api';

const Container = styled.div`
  padding: 1rem;
`;

const LoadMoreButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem auto;
  display: block;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ExplorePage = () => {
  const navigate = useNavigate();
  const { posts, loading, error, hasMore, loadMore, updatePostLike, revertPostLike } = useExploreFeed();

  const handleLikeUpdate = async (postId, shouldLike) => {
    try {
      // Optimistic update
      updatePostLike(postId, shouldLike);

      if (shouldLike) {
        await api.likePost(postId);
      } else {
        await api.unlikePost(postId);
      }
    } catch (error) {
      // Revert optimistic update on error
      revertPostLike(postId, shouldLike);
      
      if (error.status === 401 || error.status === 403) {
        navigate('/login');
      }
      console.error('Like/unlike failed:', error);
      throw error;
    }
  };

  return (
    <Container>
      <PostList
        posts={posts}
        loading={loading && posts.length === 0}
        error={error}
        onLikeUpdate={handleLikeUpdate}
        emptyMessage="No posts to explore"
      />

      {hasMore && (
        <LoadMoreButton onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </LoadMoreButton>
      )}
    </Container>
  );
};

export default ExplorePage;
