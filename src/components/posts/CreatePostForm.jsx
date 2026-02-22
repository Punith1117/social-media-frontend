import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 250px;
  min-width: 300px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  line-height: 1.5;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const CharacterCounter = styled.div`
  text-align: right;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: ${props => {
    if (props.characters > 280) return '#dc3545'; // Red for 281-300
    if (props.characters > 200) return '#fd7e14'; // Orange for 201-280
    return '#28a745'; // Green for 0-200
  }};
  font-weight: ${props => props.characters > 280 ? '600' : '400'};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$variant === 'cancel' ? '#6c757d' : '#007bff'};
  background: ${props => props.$variant === 'cancel' ? '#6c757d' : '#007bff'};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.$variant === 'cancel' ? '#5a6268' : '#0056b3'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

const CreatePostForm = ({ onSubmit, onCancel, initialContent = '', disabled = false }) => {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxCharacters = 300;

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    
    // Prevent typing beyond 300 characters
    if (newContent.length <= maxCharacters) {
      setContent(newContent);
      
      // Clear error when user starts typing
      if (error && newContent.trim()) {
        setError('');
      }
    }
  };

  const validateContent = () => {
    if (!content.trim()) {
      setError('Content is required');
      return false;
    }
    
    if (content.length > maxCharacters) {
      setError(`Content exceeds ${maxCharacters} character limit`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateContent()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(content.trim());
      // Reset form on successful submission
      setContent('');
    } catch (err) {
      setError(err.error || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent('');
    setError('');
    if (onCancel) {
      onCancel();
    }
  };

  const isFormValid = content.trim().length > 0 && content.length <= maxCharacters;
  const characterCount = content.length;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={handleContentChange}
          placeholder="What's on your mind?"
          disabled={disabled || isSubmitting}
          maxLength={maxCharacters}
        />
        
        <CharacterCounter characters={characterCount}>
          {characterCount} / {maxCharacters}
        </CharacterCounter>

        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        <ButtonContainer>
          <Button
            type="button"
            $variant="cancel"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={!isFormValid || disabled || isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default CreatePostForm;
