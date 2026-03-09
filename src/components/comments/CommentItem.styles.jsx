import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CommentContainer = styled.div`
  border-bottom: 1px solid rgba(220, 53, 69, 0.15);
  background: 
    radial-gradient(ellipse at top, rgba(220, 53, 69, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.3) 0%, rgba(15, 10, 10, 0.2) 100%);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  padding: 1rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: commentEntrance 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

  @keyframes commentEntrance {
    0% {
      opacity: 0;
      transform: translateX(-20px);
      filter: blur(5px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
      filter: blur(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #dc3545, #8b4513);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    background: 
      radial-gradient(ellipse at top, rgba(220, 53, 69, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, rgba(20, 15, 15, 0.4) 0%, rgba(15, 10, 10, 0.3) 100%);
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 0.7;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    margin-bottom: 0.5rem;
  }
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  text-decoration: none;
  color: inherit;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(220, 53, 69, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 10px;
  }
  
  &:hover {
    background: rgba(220, 53, 69, 0.12);
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }
`;

export const AuthorPhoto = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(220, 53, 69, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  &:hover {
    transform: scale(1.1) rotate(3deg);
    border-color: rgba(220, 53, 69, 0.6);
    box-shadow: 
      0 4px 15px rgba(220, 53, 69, 0.3),
      0 0 10px rgba(220, 53, 69, 0.2);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export const AuthorName = styled.span`
  font-weight: 700;
  color: #e8d5c7;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #dc3545, #8b4513);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 2px;
  }

  ${AuthorInfo}:hover & {
    color: #dc3545;
    transform: translateX(2px);
    
    &::after {
      width: 100%;
    }
  }
`;

export const CommentDate = styled.span`
  color: #a8a29e;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  background: rgba(220, 53, 69, 0.08);
  border: 1px solid rgba(220, 53, 69, 0.15);
`;

export const CommentContent = styled.div`
  color: #d4c5a7;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: -0.01em;
`;

export const DeleteButton = styled.button`
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.25);
  padding: 0.4rem 0.6rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: #e74c3c;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
