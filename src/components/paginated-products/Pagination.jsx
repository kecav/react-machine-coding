import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const prevPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage);
  };

  const nextPage = () => {
    setCurrentPage(currentPage < totalPages-1 ? currentPage + 1 : currentPage);
  };

  return (
    <div className="pagination-btns">
      <button className="prev" onClick={prevPage}>
        {" "}
        {`<`}{" "}
      </button>
      {new Array(totalPages).fill(0).map((a, index) => {
        const className =
          currentPage === index ? "page-btn active" : "page-btn";
        return (
          <button
            key={index}
            className={className}
            onClick={() => setCurrentPage(index)}
          >
            {index}
          </button>
        );
      })}
      <button className="prev" onClick={nextPage}>
        {" "}
        {`>`}{" "}
      </button>
    </div>
  );
};

export default Pagination;
