import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Share2, ClipboardCopy, CircleCheck, CircleX } from 'lucide-react';

const ShareContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ShareButtonStyled = styled.button`
  background: rgba(155, 89, 182, 0.15);
  color: #9b59b6;
  border: 1px solid rgba(155, 89, 182, 0.25);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease-out;

  &:hover:not(:disabled) {
    background: #9b59b6;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(155, 89, 182, 0.3);
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
  background: rgba(20, 15, 15, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(220, 53, 69, 0.2);
  border-radius: 12px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(220, 53, 69, 0.1),
    inset 0 1px 0 rgba(220, 53, 69, 0.2);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
  color: #d4c5a7;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: rgba(220, 53, 69, 0.15);
    color: #dc3545;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(220, 53, 69, 0.15);
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
