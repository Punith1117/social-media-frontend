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
  border: 3px solid ${props => props.theme.colors.primaryBorder};
  border-radius: 8px;
  font-size: 0.9rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    background: ${props => props.theme.colors.background};
  }

  @media (max-width: 1000px) and (min-width: 768px) {
    padding: 0.625rem;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
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
  color: ${props => props.theme.colors.textLight};
  transition: all 0.3s ease;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.primaryLight};
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
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 8px 8px;
`;

export const UserResult = styled(Link)`
  display: flex;
  padding: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.primaryBorder};
  cursor: pointer;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: ${props => props.theme.colors.primaryLight};
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
  color: ${props => props.theme.colors.text};
`;

export const DisplayName = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.textLight};

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

export const LoadingMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.textLight};
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.danger};
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
