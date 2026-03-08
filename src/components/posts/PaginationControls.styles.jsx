import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(220, 53, 69, 0.3), 
      rgba(139, 69, 19, 0.2),
      rgba(220, 53, 69, 0.3),
      transparent
    );
  }
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 1rem 0;
    flex-wrap: wrap;
  }
`;

export const PaginationButton = styled.button`
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, rgba(220, 53, 69, 0.9) 0%, rgba(139, 69, 19, 0.8) 100%)' 
    : 'radial-gradient(ellipse at center, rgba(220, 53, 69, 0.15) 0%, rgba(15, 10, 10, 0.95) 100%)'};
  color: ${props => props.$active ? '#ffffff' : '#e8d5c7'};
  border: ${props => props.$active 
    ? '1px solid rgba(220, 53, 69, 0.5)' 
    : '1px solid rgba(220, 53, 69, 0.3)'};
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  box-shadow: 
    ${props => props.$active 
      ? '0 8px 25px rgba(220, 53, 69, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
      : '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(220, 53, 69, 0.1)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(220, 53, 69, 0.3), 
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.05);
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, rgba(220, 53, 69, 1) 0%, rgba(139, 69, 19, 0.9) 100%)' 
      : 'radial-gradient(ellipse at center, rgba(220, 53, 69, 0.25) 0%, rgba(15, 10, 10, 0.98) 100%)'};
    border-color: rgba(220, 53, 69, 0.6);
    box-shadow: 
      ${props => props.$active 
        ? '0 12px 35px rgba(220, 53, 69, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
        : '0 8px 25px rgba(220, 53, 69, 0.3), inset 0 1px 0 rgba(220, 53, 69, 0.2)'};
    
    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
    background: radial-gradient(ellipse at center, rgba(220, 53, 69, 0.05) 0%, rgba(15, 10, 10, 0.9) 100%);
    border-color: rgba(220, 53, 69, 0.1);
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 8px;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px) scale(1.02);
    }
  }
`;

export const PageInfo = styled.span`
  color: #a8a29e;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    font-size: 0.8rem;
  }
`;
