import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
    flex-wrap: wrap;
  }
`;

export const PaginationButton = styled.button`
  background: ${props => props.$active 
    ? props.theme.colors.primary 
    : props.theme.colors.background};
  color: ${props => props.$active ? '#ffffff' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.$active 
      ? props.theme.colors.primary 
      : props.theme.colors.primaryLight};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textLight};
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
`;

export const PageInfo = styled.span`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0 0.5rem;
  padding: 0.25rem 0.5rem;
  background: ${props => props.theme.colors.primaryLight};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 4px;
  
  @media (max-width: 768px) {
    margin: 0.25rem;
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
`;
