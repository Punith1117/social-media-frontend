import React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #cc0000;
`;

const NoPostsContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
`;

const PostList = ({ 
  posts, 
  loading, 
  error, 
  onLikeUpdate,
  onDelete,
  emptyMessage = "No posts yet" 
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        Loading posts...
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        {error}
      </ErrorContainer>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <NoPostsContainer>
        {emptyMessage}
      </NoPostsContainer>
    );
  }

  return (
    <PostListContainer>
      {posts.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLikeUpdate={onLikeUpdate}
          onDelete={onDelete}
        />
      ))}
    </PostListContainer>
  );
};

export default PostList;
