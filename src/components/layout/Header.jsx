import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TabNavigation from '../navigation/TabNavigation';
import SearchBar from '../common/SearchBar';
import LogoutButton from '../common/LogoutButton';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background: 
    radial-gradient(ellipse at top, rgba(220, 53, 69, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(20, 15, 15, 0.98) 0%, rgba(15, 10, 10, 0.95) 100%);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(220, 53, 69, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1rem;
  min-height: 60px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(220, 53, 69, 0.1),
    inset 0 1px 0 rgba(220, 53, 69, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(220, 53, 69, 0.6), 
      rgba(139, 69, 19, 0.4),
      rgba(220, 53, 69, 0.6),
      transparent
    );
    opacity: 0.8;
  }

  &:hover {
    border-bottom-color: rgba(220, 53, 69, 0.5);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(220, 53, 69, 0.2),
      0 0 20px rgba(220, 53, 69, 0.15),
      inset 0 1px 0 rgba(220, 53, 69, 0.3);
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
  
  // Pages where SearchBar and LogoutButton should NOT appear
  const excludedRoutes = ['/login', '/signup', '/create-post'];
  
  // Check if current route is excluded
  const shouldShowSearchBar = !excludedRoutes.includes(location.pathname);
  const shouldShowLogoutButton = !excludedRoutes.includes(location.pathname);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <TabNavigation />
        </LeftSection>
        <RightSection>
          {shouldShowSearchBar && <SearchBar />}
          {shouldShowLogoutButton && <LogoutButton />}
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
