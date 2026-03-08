import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostList from '../components/posts/PostList';
import useFeed from '../hooks/useFeed';
import api from '../services/api';
import { Container, BackToTopButton, LoadingTrigger } from './ExplorePage.styles';

const ExplorePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, loading, error, hasMore, loadMore, updatePostLike, revertPostLike } = useFeed('explore');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const loadingTriggerRef = useRef(null);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    // Only set up observer after initial posts are loaded
    if (posts.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingTriggerRef.current) {
      observer.observe(loadingTriggerRef.current);
    }

    return () => {
      if (loadingTriggerRef.current) {
        observer.unobserve(loadingTriggerRef.current);
      }
    };
  }, [loading, hasMore, loadMore, posts.length]);

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
        logout();
        navigate('/login', { state: { from: location.pathname } });
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
        <LoadingTrigger ref={loadingTriggerRef}>
          {loading && <div>Loading more posts...</div>}
        </LoadingTrigger>
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
