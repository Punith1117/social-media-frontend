import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Share2, ClipboardCopy, CircleCheck, CircleX } from 'lucide-react';

const ShareContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ShareButtonStyled = styled.button`
  background: rgba(59, 130, 246, 0.1);
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primaryBorder};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary};
    color: #ffffff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const FallbackDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: ${props => props.theme.colors.background};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.colors.dangerBorder};
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const DropdownOption = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.dangerLight};
    color: ${props => props.theme.colors.danger};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.dangerBorder};
  }
`;

const ShareButton = ({ post }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFallback(false);
      }
    };

    if (showFallback) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFallback]);

  const handleShare = async () => {
    const shareData = {
      title: `Post by ${post.author?.username || 'Anonymous'}`,
      text: `${post.content?.slice(0, 110)}...` || 'Check out this post',
      url: `${window.location.origin}/posts/${post.id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      setShowFallback(true);
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    handleShare();
  };

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/posts/${post.id}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseDropdown = (e) => {
    e.stopPropagation();
    setShowFallback(false);
  };

  return (
    <ShareContainer>
      <ShareButtonStyled onClick={handleShareClick}>
        <Share2 size={18} title="Share" />
      </ShareButtonStyled>
      
      {showFallback && !navigator.share && (
        <FallbackDropdown ref={dropdownRef}>
          <DropdownOption onClick={handleCopyLink}>
            {copied ? <CircleCheck size={16} title="Copied!" /> : <ClipboardCopy size={16} title="Copy Link" />}
          </DropdownOption>
          <DropdownOption onClick={handleCloseDropdown}>
            <CircleX size={16} title="Close" />
          </DropdownOption>
        </FallbackDropdown>
      )}
    </ShareContainer>
  );
};

export default ShareButton;
