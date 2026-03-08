import React from 'react';
import { 
  PaginationContainer, 
  PaginationButton, 
  PageInfo 
} from './PaginationControls.styles';

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
