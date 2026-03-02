import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CreatePostButton from '../common/CreatePostButton';
import SearchBar from '../common/SearchBar';

const AppLayout = ({ children }) => {
  const location = useLocation();
  
  // Pages where CreatePostButton should NOT appear
  const excludedRoutes = ['/login', '/signup', '/create-post'];
  
  // Check if current route is excluded
  const shouldShowButton = !excludedRoutes.includes(location.pathname);
  const shouldShowSearchBar = !excludedRoutes.includes(location.pathname);
  // Explore link should be visible on all pages except explore page itself

  return (
    <>
      {children}
      {shouldShowSearchBar && <SearchBar />}
      {location.pathname !== '/explore' && (
        <div style={{ 
          position: 'fixed', 
          top: '1rem', 
          left: '1rem', 
          zIndex: 1000 
        }}>
          <NavLink 
            to="/explore" 
            style={{ 
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Explore
          </NavLink>
        </div>
      )}
      {!['/login', '/signup', '/'].includes(location.pathname) && (
        <div style={{ 
          position: 'fixed', 
          top: '1rem', 
          left: '5rem', 
          zIndex: 1000 
        }}>
          <NavLink 
            to="/" 
            style={{ 
              color: '#007bff',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Home
          </NavLink>
        </div>
      )}
      {shouldShowButton && <CreatePostButton />}
    </>
  );
};

export default AppLayout;
