import React from "react";
import {
  PRODUCT_RECORDS_LIMIT,
  RECORDS_LIMIT,
} from "@/developmentContent/constants";

const PaginationComponent = ({ totalRecords, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalRecords / PRODUCT_RECORDS_LIMIT);

  const handleChange = (value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
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
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages, 5);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - 4);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <style>{`
        .custom-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin: 20px 0;
        }
        
        .pagination-button {
          width: 45px;
          height: 45px;
          border-radius: 6px;
          border: 2px solid #D9D4C8;
          background-color: #FFFFFF52;
          font-weight: 600;
          color: rgba(54, 54, 54, 0.75);
          font-family: var(--inter) !important;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .pagination-button:hover {
          background-color: #FDEEC9;
          border-color: #C7C9C8;
        }
        
        .pagination-button.active {
          color: #191818 !important;
          background-color: #FDEEC9;
          border: 2px solid #C7C9C8;
        }
        
        .pagination-ellipsis {
          font-weight: 600;
          color: rgba(54, 54, 54, 0.75);
          font-family: var(--inter) !important;
          font-size: 20px;
        }
        
        @media (max-width: 1024px) {
          .pagination-button {
            font-size: 15px !important;
            width: 40px;
            height: 40px;
          }
          .pagination-ellipsis {
            font-size: 15px !important;
          }
        }
        
        @media (max-width: 768px) {
          .custom-pagination {
            gap: 5px !important;
          }
        }
        
        @media (max-width: 375px) {
          .pagination-button {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>

      <div className="custom-pagination notranslate">
        {pageNumbers.map((pageNum, index) => {
          // Add ellipsis before first page if needed
          if (index === 0 && pageNum > 1) {
            return (
              <React.Fragment key={`ellipsis-start-${pageNum}`}>
                <button
                  className="pagination-button"
                  onClick={() => handleChange(1)}
                >
                  1
                </button>
                {pageNum > 2 && (
                  <span className="pagination-ellipsis">...</span>
                )}
              </React.Fragment>
            );
          }

          // Add ellipsis after last page if needed
          if (index === pageNumbers.length - 1 && pageNum < totalPages) {
            return (
              <React.Fragment key={`ellipsis-end-${pageNum}`}>
                {pageNum < totalPages - 1 && (
                  <span className="pagination-ellipsis">...</span>
                )}
                <button
                  className="pagination-button"
                  onClick={() => handleChange(totalPages)}
                >
                  {totalPages}
                </button>
              </React.Fragment>
            );
          }

          return (
            <button
              key={pageNum}
              className={`pagination-button ${
                pageNum === currentPage ? "active" : ""
              }`}
              onClick={() => handleChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default PaginationComponent;
