import React from 'react';
import { useLocation } from 'react-router-dom';
import CreatePostButton from '../common/CreatePostButton';
import SearchBar from '../common/SearchBar';

const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Pages where CreatePostButton should NOT appear
  const excludedRoutes = ['/login', '/signup', '/create-post'];
  
  // Check if current route is excluded
  const shouldShowButton = !excludedRoutes.includes(location.pathname);
  const shouldShowSearchBar = !excludedRoutes.includes(location.pathname);

  return (
    <>
      {children}
      {shouldShowSearchBar && <SearchBar />}
      {shouldShowButton && <CreatePostButton />}
    </>
  );
};

export default AppLayout;
