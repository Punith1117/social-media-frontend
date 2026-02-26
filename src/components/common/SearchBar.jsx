import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounced } from '../../hooks/useDebounced';
import api from '../../services/api';
import styled from 'styled-components';

// Minimal styled components
const SearchContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #666;
`;

const ResultsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
`;

const UserResult = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: #f5f5f5;
  }
`;

const ProfilePhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #666;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-weight: 500;
  color: #333;
`;

const DisplayName = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: #666;
`;

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
      if (!trimmed || trimmed.length < 3) {
        setResults([]);
        setIsOpen(false);
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
      <div style={{ position: 'relative' }}>
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
            {loading && <div style={{ padding: '1rem', textAlign: 'center' }}>Loading...</div>}
            {error && <div style={{ padding: '1rem', textAlign: 'center', color: 'red' }}>{error}</div>}
            {!loading && !error && results.length === 0 && debouncedValue.trim().length >= 3 && (
              <NoResults>No users found</NoResults>
            )}
            {!loading && !error && results.map(user => (
              <UserResult key={user.id} onClick={() => handleUserClick(user.username)}>
                {user.profilePhotoUrl ? (
                  <ProfilePhoto src={getOptimizedImageUrl(user.profilePhotoUrl)} alt={user.username} />
                ) : (
                  <DefaultAvatar>{user.username[0]?.toUpperCase()}</DefaultAvatar>
                )}
                <UserInfo>
                  <Username>{user.username}</Username>
                  <DisplayName>{user.displayName}</DisplayName>
                </UserInfo>
              </UserResult>
            ))}
          </ResultsDropdown>
        )}
      </div>
    </SearchContainer>
  );
};

export default SearchBar;
