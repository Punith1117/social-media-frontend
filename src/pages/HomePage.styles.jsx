import styled from 'styled-components';

export const Container = styled.main`
  padding: 1rem;
  max-width: 50vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0.5rem;
  }
`;

export const BackToTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 20vw;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 8px 25px ${props => props.theme.colors.primary}66;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #7c2d12 100%);
    box-shadow: 0 12px 35px ${props => props.theme.colors.primary}80;
  }

  @media (max-width: 768px) {
    right: 1rem;
    left: 1rem;
    bottom: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
    margin: 0 auto;
  }
`;

export const LoadingTrigger = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;
