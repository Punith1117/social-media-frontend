import styled from 'styled-components';

const ContentContainer = styled.div`
  flex: 3;
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
  min-height: 400px;
`;

const ProfileContent = ({ children }) => {
  return (
    <ContentContainer>
      {children}
    </ContentContainer>
  );
};

export default ProfileContent;
