import React from "react";
import "./pagination.css";
import rightArrow from "../../../../assets/rightArrow.svg";
import leftArrow from "../../../../assets/leftArrow.svg";
const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  // generate numbers of pages
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="page previous"
      >
        <img src={leftArrow} alt=">" />
      </button>
      {generatedPages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "page active" : "page"}
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        disabled={currentPage === pages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="page next"
      >
        <img src={rightArrow} alt="<" />
      </button>
    </div>
  );
};

export default Pagination;
