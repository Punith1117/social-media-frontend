import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/posts/PostList';
import useExploreFeed from '../hooks/useExploreFeed';
import api from '../services/api';

const Container = styled.div`
  padding: 1rem;
  max-width: 50vw;
  margin: 0 auto;
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

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ExplorePage = () => {
  const navigate = useNavigate();
  const { posts, loading, error, hasMore, loadMore, updatePostLike, revertPostLike } = useExploreFeed();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        context="feed"
      />

      {hasMore && (
        <LoadMoreButton onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </LoadMoreButton>
      )}

      {showBackToTop && (
        <BackToTopButton onClick={scrollToTop} title="Back to top">
          ↑
        </BackToTopButton>
      )}
    </Container>
  );
};

export default ExplorePage;
