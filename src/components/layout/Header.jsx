import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TabNavigation from '../navigation/TabNavigation';
import SearchBar from '../common/SearchBar';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background: white;
  border-bottom: 1px solid #ccc;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1rem;
  min-height: 60px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Header = () => {
  const location = useLocation();
  
  // Pages where SearchBar should NOT appear
  const excludedRoutes = ['/login', '/signup', '/create-post'];
  
  // Check if current route is excluded
  const shouldShowSearchBar = !excludedRoutes.includes(location.pathname);

  return (
    <HeaderContainer>
      <TabNavigation />
      {shouldShowSearchBar && <SearchBar />}
    </HeaderContainer>
  );
};

export default Header;
