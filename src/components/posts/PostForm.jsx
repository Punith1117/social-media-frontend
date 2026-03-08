import React, { useState } from 'react';
import {
  FormContainer,
  TextArea,
  CharacterCounter,
  ButtonContainer,
  Button,
  ErrorMessage
} from './PostForm.styles';

const PostForm = ({ 
  onSubmit, 
  onCancel, 
  initialContent = '', 
  disabled = false, 
  mode = 'create' 
}) => {
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxCharacters = 300;
  const isEditMode = mode === 'edit';

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
      // Reset form on successful submission only in create mode
      if (!isEditMode) {
        setContent('');
      }
    } catch (err) {
      const errorMessage = isEditMode 
        ? (err.error || 'Failed to update post')
        : (err.error || 'Failed to create post');
      setError(errorMessage);
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

  // Dynamic text based on mode
  const placeholder = isEditMode ? 'Edit your post...' : "What's on your mind?";
  const submitButtonText = isSubmitting 
    ? (isEditMode ? 'Updating...' : 'Posting...')
    : (isEditMode ? 'Update Post' : 'Post');

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextArea
          value={content}
          onChange={handleContentChange}
          placeholder={placeholder}
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
            {submitButtonText}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default PostForm;
