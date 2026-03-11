import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Github } from 'lucide-react';
import TabNavigation from '../navigation/TabNavigation';
import SearchBar from '../common/SearchBar';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(25px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1rem;
  min-height: 60px;
  box-shadow: 0 4px 20px ${props => props.theme.colors.shadow};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    border-bottom-color: ${props => props.theme.colors.primaryBorder};
    box-shadow: 0 8px 30px ${props => props.theme.colors.shadow};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0.75rem;
    min-height: auto;
    gap: 1rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const CenterSection = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    position: static;
    transform: none;
    order: -1;
  }
`;

const GitHubLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.isDarkMode ? '#ffffff' : props.theme.colors.primary};
    text-decoration: underline;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  span {
    display: inline;
  }

  @media (max-width: 1000px) and (min-width: 768px) {
    span {
      display: none;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Header = () => {
  const location = useLocation();
  
  // Pages where SearchBar should NOT appear
  const excludedRoutes = ['/login', '/signup', '/create-post'];
  
  // Check if current route is excluded
  const shouldShowSearchBar = !excludedRoutes.includes(location.pathname);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <TabNavigation />
        </LeftSection>
        <CenterSection>
          <GitHubLink 
            href="https://github.com/Punith1117/social-media-frontend" 
            target="_blank" 
            rel="noopener noreferrer"
            title="source-code"
          >
            <Github />
            <span>by punith1117</span>
          </GitHubLink>
        </CenterSection>
        <RightSection>
          {shouldShowSearchBar && <SearchBar />}
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
