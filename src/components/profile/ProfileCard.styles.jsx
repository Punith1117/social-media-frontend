import styled from 'styled-components';

export const ProfileCardContainer = styled.div`
  background: 
    radial-gradient(ellipse at top, rgba(220, 53, 69, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.98) 0%, rgba(15, 10, 10, 0.95) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(220, 53, 69, 0.2),
    inset 0 2px 4px rgba(220, 53, 69, 0.3),
    inset 0 -2px 4px rgba(139, 69, 19, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  animation: cardEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @keyframes cardEntrance {
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
      rgba(220, 53, 69, 0.8), 
      rgba(139, 69, 19, 0.6),
      rgba(220, 53, 69, 0.8),
      transparent
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    animation: bloodFlow 3s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(220, 53, 69, 0.05) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  @keyframes bloodFlow {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 40px 80px rgba(0, 0, 0, 0.6),
      0 0 0 2px rgba(220, 53, 69, 0.4),
      0 0 30px rgba(220, 53, 69, 0.3),
      inset 0 2px 8px rgba(220, 53, 69, 0.4),
      inset 0 -2px 8px rgba(139, 69, 19, 0.3);
    border-color: rgba(220, 53, 69, 0.5);
    
    &::before {
      opacity: 1;
      animation-duration: 1.5s;
    }

    &::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 20px;
    margin-bottom: 1.25rem;
    text-align: center;
    align-items: center;
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }
`;

export const ProfilePhoto = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(220, 53, 69, 0.3);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  animation: avatarPulse 2s ease-in-out infinite;
  margin-bottom: 1rem;

  @keyframes avatarPulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(220, 53, 69, 0.1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(45deg, #dc3545, #8b4513);
    z-index: -1;
    opacity: 0;
    transition: all 0.4s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(220, 53, 69, 0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -2;
  }

  &:hover {
    transform: scale(1.1) rotate(5deg);
    border-color: rgba(220, 53, 69, 0.6);
    box-shadow: 
      0 8px 25px rgba(220, 53, 69, 0.4),
      0 0 20px rgba(220, 53, 69, 0.3),
      inset 0 0 15px rgba(220, 53, 69, 0.2);
    
    &::after {
      opacity: 1;
      transform: scale(1.1);
    }

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    border-width: 2px;
    
    &:hover {
      transform: scale(1.05) rotate(2deg);
    }
  }
`;

export const UserName = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #e8d5c7;
  font-size: 1.75rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  line-height: 1.2;

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

  ${ProfileCardContainer}:hover & {
    color: #dc3545;
    transform: translateX(3px);
    
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const UsernameFirstChar = styled.span`
  font-size: 1.2em;
  font-weight: 900;
`;

export const UsernameMiddleChars = styled.span`
  font-size: 0.8em;
`;

export const UsernameLastChar = styled.span`
  font-size: 1.2em;
  font-weight: 900;
`;

export const DisplayName = styled.p`
  font-size: 1.2rem;
  color: #a8a29e;
  font-weight: 400;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(220, 53, 69, 0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${ProfileCardContainer}:hover & {
    color: #d4c5a7;
    border-color: rgba(220, 53, 69, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Bio = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #d4c5a7;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 0 0 1rem 0;
  font-weight: 400;
  letter-spacing: -0.01em;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: bioFadeIn 0.6s ease-out 0.4s both;

  @keyframes bioFadeIn {
    0% {
      opacity: 0;
      transform: translateY(15px);
      filter: blur(3px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  ${ProfileCardContainer}:hover & {
    color: #e8d5c7;
    transform: translateX(3px);
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export const JoinDate = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #a8a29e;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: joinDateFadeIn 0.5s ease-out 0.6s both;

  @keyframes joinDateFadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${ProfileCardContainer}:hover & {
    color: #dc3545;
    background: rgba(220, 53, 69, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const EditButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
  animation: editButtonFadeIn 0.5s ease-out 0.8s both;

  @keyframes editButtonFadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    text-align: right !important;
    align-self: flex-end;
    width: 100%;
  }
`;
