import styled from 'styled-components';

const ContentContainer = styled.section`
  flex: 3;
  background: ${props => props.theme.isDarkMode
    ? `radial-gradient(ellipse at top, rgba(220, 53, 69, 0.05) 0%, transparent 50%), linear-gradient(135deg, rgba(26, 15, 15, 0.9) 0%, rgba(15, 10, 10, 0.95) 100%)`
    : props.theme.colors.background
  };
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  min-height: 400px;
  box-shadow: ${props => props.theme.colors.shadow};
  
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
