import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 1000px) and (min-width: 768px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  font-size: 0.9rem;
  background: 
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 70%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.6) 0%, rgba(15, 10, 10, 0.4) 100%);
  backdrop-filter: blur(10px);
  color: #e8d5c7;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &::placeholder {
    color: #a8a29e;
  }

  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
    background: 
      radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%),
      linear-gradient(135deg, rgba(20, 15, 15, 0.7) 0%, rgba(15, 10, 10, 0.5) 100%);
  }

  @media (max-width: 768px) {
    padding: 0.375rem;
    font-size: 0.8rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #a8a29e;
  transition: all 0.3s ease;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #e8d5c7;
    background: rgba(59, 130, 246, 0.2);
  }

  @media (max-width: 768px) {
    right: 0.375rem;
    font-size: 1rem;
    width: 20px;
    height: 20px;
  }
`;

export const ResultsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: 
    radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.98) 0%, rgba(15, 10, 10, 0.95) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  border-radius: 0 0 8px 8px;
`;

export const UserResult = styled(Link)`
  display: flex;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  cursor: pointer;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: rgba(59, 130, 246, 0.15);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const Username = styled.div`
  font-weight: 500;
  color: #e8d5c7;
`;

export const DisplayName = styled.div`
  font-size: 0.8rem;
  color: #a8a29e;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #a8a29e;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

export const LoadingMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #a8a29e;
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: #e74c3c;
  font-size: 0.9rem;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.8rem;
    line-height: 1.2;
  }
`;
