import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounced } from '../../hooks/useDebounced';
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
  const navigate = useNavigate();

  // Optimize Cloudinary images for search results (smaller size, faster loading)
  const getOptimizedImageUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) {
      return url;
    }
    
    // Add Cloudinary transformations for thumbnail
    const transformations = 'w_100,h_100,c_fill,q_auto:good,f_auto';
    return url.replace('/upload/', `/upload/${transformations}/`);
  };

  // API call when debounced value changes
  useEffect(() => {
    const searchUsers = async () => {
      const trimmed = debouncedValue.trim();
      if (!trimmed || trimmed.length < 3 || trimmed.length > 20) {
        setResults([]);
        // Don't close dropdown if there's input - show validation message
        if (trimmed.length > 0) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await api.searchUsers(trimmed);
        setResults(response.users);
        setIsOpen(true);
      } catch (err) {
        console.error('Search error:', err);
        setError('Search failed');
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
  };

  const handleUserClick = (username) => {
    navigate(`/users/${username}`);
    setIsOpen(false);
    setInputValue('');
    setResults([]);
  };

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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {!loading && !error && debouncedValue.trim().length > 0 && debouncedValue.trim().length < 3 && (
              <NoResults>Enter at least 3 characters to search</NoResults>
            )}
            {!loading && !error && debouncedValue.trim().length > 20 && (
              <NoResults>Search must be 20 characters or less</NoResults>
            )}
            {!loading && !error && results.length === 0 && debouncedValue.trim().length >= 3 && debouncedValue.trim().length <= 20 && (
              <NoResults>No users found</NoResults>
            )}
            {!loading && !error && results.map(user => (
              <UserResult key={user.id} onClick={() => handleUserClick(user.username)}>
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
