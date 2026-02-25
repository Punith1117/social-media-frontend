import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ShareContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ShareButtonStyled = styled.button`
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 0.5rem;

  &:hover {
    background: #e9ecef;
  }
`;

const FallbackDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const DropdownOption = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #f8f9fa;
  }
`;

const ShareButton = ({ post }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = async () => {
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

  return (
    <ShareContainer>
      <ShareButtonStyled onClick={handleShare}>
        🔗 Share
      </ShareButtonStyled>
      
      {showFallback && !navigator.share && (
        <FallbackDropdown>
          <DropdownOption onClick={handleCopyLink}>
            {copied ? '✅ Copied!' : '📋 Copy Link'}
          </DropdownOption>
          <DropdownOption onClick={() => setShowFallback(false)}>
            ✖️ Close
          </DropdownOption>
        </FallbackDropdown>
      )}
    </ShareContainer>
  );
};

export default ShareButton;
