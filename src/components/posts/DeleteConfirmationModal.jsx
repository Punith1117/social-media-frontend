import React from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';

const ConfirmationMessage = styled.p`
  color: #d4c5a7;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 400;
`;

const WarningText = styled.p`
  color: #dc3545;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  background: rgba(139, 52, 16, 0.15);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(139, 52, 16, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background: rgba(108, 117, 125, 0.15);
  color: #6b7280;
  border: 1px solid rgba(108, 117, 125, 0.25);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  margin-left: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(108, 117, 125, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }
  
  &:hover:not(:disabled) {
    background: rgba(108, 117, 125, 0.25);
    color: #7fa76cff;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const DeleteButton = styled.button`
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::before {
    width: 300px;
    height: 300px;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #c82333 0%, #a02622 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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
