import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';

const ConfirmationMessage = styled.p`
  color: #333;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const WarningText = styled.p`
  color: #e74c3c;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover:not(:disabled) {
    background: #e9ecef;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: 1px solid #e74c3c;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  
  &:hover:not(:disabled) {
    background: #c0392b;
    border-color: #c0392b;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isDeleting = false,
  postContent = '' 
}) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
  };

  // Truncate post content for display
  const displayContent = postContent.length > 100 
    ? postContent.substring(0, 100) + '...' 
    : postContent;

  return (
    <Modal
      title="Delete Post"
      onClose={onClose}
      showCloseButton={!isDeleting}
      closeButtonDisabled={isDeleting}
    >
      <ConfirmationMessage>
        Are you sure you want to delete this post?
        {displayContent && (
          <>
            <br />
            <br />
            <em>"{displayContent}"</em>
          </>
        )}
      </ConfirmationMessage>
      
      <WarningText>
        ⚠️ This action cannot be undone. The post will be permanently deleted.
      </WarningText>
      
      <ButtonContainer>
        <CancelButton
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </CancelButton>
        <DeleteButton
          onClick={handleConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Post'}
        </DeleteButton>
      </ButtonContainer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
