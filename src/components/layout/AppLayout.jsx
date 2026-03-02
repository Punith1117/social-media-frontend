import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CreatePostButton from '../common/CreatePostButton';
import SearchBar from '../common/SearchBar';
import TabNavigation from '../navigation/TabNavigation';

const ContentContainer = styled.div`
  padding-top: 60px;

  @media (max-width: 768px) {
    padding-top: 56px;
  }
`;

const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Pages where CreatePostButton should NOT appear
  const excludedRoutes = ['/login', '/signup', '/create-post'];
  
  // Check if current route is excluded
  const shouldShowButton = !excludedRoutes.includes(location.pathname);
  const shouldShowSearchBar = !excludedRoutes.includes(location.pathname);

  return (
    <>
      <TabNavigation />
      <ContentContainer>
        {children}
      </ContentContainer>
      {shouldShowSearchBar && <SearchBar />}
      {shouldShowButton && <CreatePostButton />}
    </>
  );
};

export default AppLayout;
