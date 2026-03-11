import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageContainer = styled.div`
  padding: 1rem;
  position: relative;
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.95) 0%, rgba(15, 10, 10, 0.9) 100%);
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const PostContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem;
  }
`;

export const PostSection = styled.div`
  flex: 2;
  background: 
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.98) 0%, rgba(15, 10, 10, 0.95) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(59, 130, 246, 0.2),
    inset 0 2px 4px rgba(59, 130, 246, 0.3),
    inset 0 -2px 4px rgba(139, 69, 19, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: postEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

  @keyframes postEntrance {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      filter: blur(10px);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-5px) scale(1.02);
      filter: blur(2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(59, 130, 246, 0.8), 
      rgba(139, 69, 19, 0.6),
      rgba(59, 130, 246, 0.8),
      transparent
    );
    opacity: 0.7;
    animation: bloodFlow 3s ease-in-out infinite;
  }

  @keyframes bloodFlow {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
  }
`;

export const PostHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  animation: headerFadeIn 0.5s ease-out 0.2s both;

  @keyframes headerFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-15px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const AuthorInfo = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
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
    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 12px;
  }
  
  &:hover {
    background: rgba(59, 130, 246, 0.12);
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
  }
`;

export const AuthorPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(59, 130, 246, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  animation: avatarPulse 2s ease-in-out infinite;

  @keyframes avatarPulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
    }
  }

  &:hover {
    transform: scale(1.1) rotate(5deg);
    border-color: rgba(59, 130, 246, 0.6);
    box-shadow: 
      0 8px 25px rgba(59, 130, 246, 0.4),
      0 0 20px rgba(59, 130, 246, 0.3),
      inset 0 0 15px rgba(59, 130, 246, 0.2);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 2px;
    
    &:hover {
      transform: scale(1.05) rotate(2deg);
    }
  }
`;

export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  font-weight: 700;
  color: #e8d5c7;
  font-size: 1rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b4513);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 2px;
  }

  ${AuthorInfo}:hover & {
    color: #3b82f6;
    transform: translateX(3px);
    
    &::after {
      width: 100%;
    }
  }
`;

export const AuthorDisplayName = styled.span`
  font-size: 0.9rem;
  color: #a8a29e;
  font-weight: 400;
`;

export const PostDate = styled.span`
  color: #a8a29e;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

export const PostDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #d4c5a7;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin-bottom: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 1.5rem;
  background: 
    linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 69, 19, 0.08) 100%),
    radial-gradient(circle at top right, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
  animation: contentFadeIn 0.6s ease-out 0.3s both;

  @keyframes contentFadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
      filter: blur(5px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(59, 130, 246, 0.2), 
      transparent
    );
    transition: left 0.8s ease;
  }

  &:hover {
    color: #e8d5c7;
    background: 
      linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(139, 69, 19, 0.12) 100%),
      radial-gradient(circle at top right, rgba(59, 130, 246, 0.15) 0%, transparent 50%);
    border-color: rgba(59, 130, 246, 0.4);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.3),
      0 5px 15px rgba(59, 130, 246, 0.2),
      inset 0 1px 0 rgba(59, 130, 246, 0.3);
    
    &::before {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const LikeButton = styled.button`
  background: ${props => props.$isLiked 
    ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' 
    : 'rgba(231, 76, 60, 0.15)'};
  color: ${props => props.$isLiked ? '#ffffff' : '#e74c3c'};
  border: ${props => props.$isLiked 
    ? 'none' 
    : '1px solid rgba(231, 76, 60, 0.25)'};
  padding: 0.7rem 1.3rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease-out, color 0.3s ease-out, border 0.3s ease-out, transform 0.2s ease-out;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(231, 76, 60, 0.4),
      0 3px 10px rgba(231, 76, 60, 0.2);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.1rem;
    font-size: 0.8rem;
  }
`;

export const EditButton = styled.button`
  background: rgba(243, 156, 18, 0.15);
  color: #f39c12;
  border: 1px solid rgba(243, 156, 18, 0.25);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-out;

  &:hover:not(:disabled) {
    background: #f39c12;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

export const DeleteButton = styled.button`
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.25);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-out;

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

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

export const LikesCount = styled.span`
  color: #a8a29e;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #a8a29e;
  font-size: 1.1rem;
  font-weight: 500;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 12px;
  margin: 1rem;
`;

export const BackButton = styled.button`
  background: 
    radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%),
    linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #e8d5c7;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  font-weight: 600;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 0.5rem;
    margin-bottom: 0;
    z-index: 10;
    transform: translateY(-50%);
    padding: 0.5rem 0.75rem;
  }
  
  &:hover {
    background: 
      radial-gradient(ellipse at center, rgba(59, 130, 246, 0.25) 0%, transparent 70%),
      linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 69, 19, 0.1) 100%);
    border-color: rgba(59, 130, 246, 0.5);
    color: #ffffff;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 8px 25px rgba(59, 130, 246, 0.3),
      0 0 20px rgba(59, 130, 246, 0.2);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-50%) scale(1.05);
    }
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
  
  @media (max-width: 768px) {
    &:active {
      transform: translateY(-50%) scale(0.98);
    }
  }
`;
