import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem 0;
`;

const PaginationButton = styled.button`
  background: ${props => props.$active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: 1px solid ${props => props.$active ? '#007bff' : '#ddd'};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0.5rem;
`;

const PaginationControls = ({ pagination, onPageChange }) => {
  const { page, totalPages, total, limit } = pagination;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    onPageChange(pageNum);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(totalPages, page + 2);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  return (
    <PaginationContainer>
      <PaginationButton 
        onClick={handlePrevious} 
        disabled={page === 1}
      >
        Previous
      </PaginationButton>

      {getPageNumbers().map(pageNum => (
        <PaginationButton
          key={pageNum}
          onClick={() => handlePageClick(pageNum)}
          $active={pageNum === page}
        >
          {pageNum}
        </PaginationButton>
      ))}

      <PaginationButton 
        onClick={handleNext} 
        disabled={page === totalPages}
      >
        Next
      </PaginationButton>

      <PageInfo>
        {total} total
      </PageInfo>
    </PaginationContainer>
  );
};

export default PaginationControls;
