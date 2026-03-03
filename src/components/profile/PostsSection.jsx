import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import PostList from '../posts/PostList';
import PaginationControls from '../posts/PaginationControls';

const PostsContainer = styled.div`
  padding: 1rem;
`;

const PostsSection = ({ username }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.getPostsByUser(username, page, 5);
      setPosts(response.posts);
      setPagination(response.pagination);
      setError(null);
    } catch (error) {
      setError(error.error || 'Failed to load posts');
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      setCurrentPage(1);
      fetchPosts(1);
    }
  }, [username]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPosts(page);
  };

  const handleLikeUpdate = async (postId, shouldLike) => {
    try {
      // Optimistic update
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? {
              ...post,
              isLikedByCurrentUser: shouldLike,
              likesCount: shouldLike ? post.likesCount + 1 : post.likesCount - 1
            }
          : post
      ));

      if (shouldLike) {
        await api.likePost(postId);
      } else {
        await api.unlikePost(postId);
      }
    } catch (error) {
      // Revert optimistic update on error
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? {
              ...post,
              isLikedByCurrentUser: !shouldLike,
              likesCount: shouldLike ? post.likesCount - 1 : post.likesCount + 1
            }
          : post
      ));
      
      console.error('Like/unlike failed:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      // Optimistic update - remove post from state immediately
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      // Call API to delete post
      await api.deletePost(postId);
      
      // Success - post already removed from state
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        // Auth error - redirect to login
        navigate('/login', { state: { from: location.pathname } });
      } else {
        // Other errors - refetch posts to restore correct state
        fetchPosts(currentPage);
      }
      
      // Re-throw error to let PostCard know deletion failed
      throw error;
    }
  };

  return (
    <PostsContainer>
      <PostList 
        posts={posts}
        loading={loading}
        error={error}
        onLikeUpdate={handleLikeUpdate}
        onDelete={handleDelete}
        emptyMessage={`${username} hasn't posted anything yet`}
      />
      
      {pagination && (
        <PaginationControls 
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </PostsContainer>
  );
};

export default PostsSection;
