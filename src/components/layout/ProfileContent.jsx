import styled from 'styled-components';

const ContentContainer = styled.div`
  flex: 3;
  background: 
    radial-gradient(ellipse at top, rgba(220, 53, 69, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, rgba(26, 15, 15, 0.9) 0%, rgba(15, 10, 10, 0.95) 100%);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 16px;
  min-height: 400px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(220, 53, 69, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
    flex: none;
    border-radius: 12px;
  }
`;

const ProfileContent = ({ children }) => {
  return (
    <ContentContainer>
      {children}
    </ContentContainer>
  );
};

export default ProfileContent;
