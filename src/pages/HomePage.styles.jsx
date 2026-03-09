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
  background: linear-gradient(135deg, #dc3545 0%, #8b4513 100%);
  color: #e8d5c7;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(220, 53, 69, 0.5);
  }

  @media (max-width: 768px) {
    right: 50%;
    transform: translateX(50%);
    bottom: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

export const LoadingTrigger = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;
