import styled from 'styled-components';

const PostsContainer = styled.div`
  padding: 1rem;
  text-align: center;
  color: #666;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoPostsMessage = styled.div`
  font-size: 1.1rem;
  color: #999;
`;

const PostsSection = ({ username }) => {
  return (
    <PostsContainer>
      <NoPostsMessage>
        {username} hasn't posted anything yet
      </NoPostsMessage>
    </PostsContainer>
  );
};

export default PostsSection;
