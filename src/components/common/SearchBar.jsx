import React, { useState, useEffect } from 'react';
import { useDebounced } from '../../hooks/useDebounced';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  CloseButton,
  ResultsDropdown,
  UserResult,
  Avatar,
  UserInfo,
  Username,
  DisplayName,
  NoResults,
  LoadingMessage,
  ErrorMessage
} from './SearchBar.styles';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const debouncedValue = useDebounced(inputValue);

  // Optimize Cloudinary images for search results (smaller size, faster loading)
  const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }
    
    // Add Cloudinary transformations for thumbnail
    const transformations = 'w_100,h_100,c_fill,q_auto:good,f_auto';
    return url.replace('/upload/', `/upload/${transformations}/`);
  };

  // Clear error when input changes
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [inputValue]);

  // API call when debounced value changes
  useEffect(() => {
    const searchUsers = async () => {
      const trimmed = debouncedValue.trim();
      
      // Reset states
      setResults([]);
      setError(null);
      
      // Validation checks
      if (!trimmed) {
        setIsOpen(false);
        return;
      }
      
      if (trimmed.length < 3) {
        setIsOpen(true);
        return;
      }
      
      if (trimmed.length > 20) {
        setIsOpen(true);
        return;
      }

      // Perform search
      setLoading(true);
      setIsOpen(true);
      
      try {
        const response = await api.searchUsers(trimmed);
        setResults(response.users || []);
      } catch (err) {
        setError(err.error || 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchUsers();
  }, [debouncedValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setResults([]);
    setIsOpen(false);
    setError(null);
  };

  const getMessage = () => {
    const trimmed = debouncedValue.trim();
    
    if (loading) return null;
    if (error) return { type: 'error', message: error };
    if (!trimmed) return null;
    if (trimmed.length < 3) return { type: 'validation', message: 'Enter at least 3 characters to search' };
    if (trimmed.length > 20) return { type: 'validation', message: 'Search must be 20 characters or less' };
    if (!loading && !error && results.length === 0) return { type: 'no-results', message: 'No users found' };
    
    return null;
  };

  const message = getMessage();

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue && (
          <CloseButton 
            onClick={handleClear} 
            type="button"
            title="Clear search"
            aria-label="Clear search"
          >
            ×
          </CloseButton>
        )}
        
        {isOpen && (
          <ResultsDropdown>
            {loading && <LoadingMessage>Loading...</LoadingMessage>}
            
            {message && (
              <>
                {message.type === 'error' && <ErrorMessage>{message.message}</ErrorMessage>}
                {message.type === 'validation' && <NoResults>{message.message}</NoResults>}
                {message.type === 'no-results' && <NoResults>{message.message}</NoResults>}
              </>
            )}
            
            {results.map(user => (
              <UserResult key={user.id} to={`/users/${user.username}`}>
                <Avatar src={getOptimizedImageUrl(user.profilePhotoUrl) || '/default-avatar.svg'} alt={user.username} />
                <UserInfo>
                  <Username>{user.username}</Username>
                  <DisplayName>{user.displayName}</DisplayName>
                </UserInfo>
              </UserResult>
            ))}
          </ResultsDropdown>
        )}
      </SearchInputWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
