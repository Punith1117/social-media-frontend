import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CreatePostButton from '../common/CreatePostButton';
import Header from './Header';

const ContentContainer = styled.main`
  padding-top: 0px;
`;

const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Pages where CreatePostButton should NOT appear
  const excludedRoutes = ['/login', '/signup', '/create-post'];
  
  // Check if current route is excluded
  const shouldShowButton = !excludedRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      <ContentContainer>
        {children}
      </ContentContainer>
      {shouldShowButton && <CreatePostButton />}
    </>
  );
};

export default AppLayout;
