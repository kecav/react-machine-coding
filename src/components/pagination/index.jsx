import React, { useState } from "react";
import "./style.css";

const PaginationComponent = ({ nextPageLength, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the range of page numbers to display
  const getVisiblePages = () => {
    const half = Math.floor(nextPageLength / 2);
    let start = Math.max(0, currentPage - half);
    let end = start + nextPageLength - 1;

    if (end >= totalPages - 1) {
      end = totalPages - 1;
      start = Math.max(0, end - nextPageLength + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageChangeHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="paginated">
      <footer>
        <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
          {"<<"}
        </button>
        {getVisiblePages().map((page) => (
          <button
            key={page}
            className={page === currentPage ? "page-btn active" : "page-btn"}
            onClick={() => pageChangeHandler(page)}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        >
          {">>"}
        </button>
      </footer>
    </div>
  );
};

const Pagination = () => {
  return <PaginationComponent nextPageLength={5} totalPages={12} />;
};

export default Pagination;
// import React, { useEffect, useState } from "react";
// import "./style.css";

// const PaginationComponent = ({ nextPageLength, totalPages }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pages, setPages] = useState([0, 1]);

//   const pageChangeHandler = (nextPage) => {
//     setCurrentPage(nextPage);
//   };

//   const prevPage = () => {
//     setCurrentPage(currentPage === 0 ? 0 : currentPage - 1);
//   };

//   const nextPage = () => {
//     setCurrentPage(currentPage === totalPages ? currentPage : currentPage + 1);
//   };

//   const getArray = (from, to) => {
//     const array = [];
//     for (let i = Math.max(0, from); i <= Math.min(to, totalPages); i++)
//       array.push(i);
//     return array;
//   };

//   useEffect(() => {
//     let newPages = [];
//     if (currentPage == 0) {
//       newPages = getArray(0, 2 * nextPageLength);
//     } else if (currentPage == totalPages) {
//       newPages = getArray(totalPages - nextPageLength, totalPages);
//     } else {
//       newPages = getArray(
//         currentPage - nextPageLength,
//         currentPage + nextPageLength
//       );
//     }
//     setPages(newPages);
//   }, [currentPage]);

//   return (
//     <div className="paginated">
//       <footer>
//         <button onClick={prevPage} disabled={currentPage === 0}>
//           {" "}
//           {`<`}{" "}
//         </button>
//         {pages.map((cp, ind) => {
//           const className = cp === currentPage ? "page-btn active" : "page-btn";
//           return (
//             <button
//               className={className}
//               key={ind}
//               onClick={() => pageChangeHandler(cp)}
//             >
//               {cp}
//             </button>
//           );
//         })}

//         <button onClick={nextPage} disabled={currentPage === totalPages}>
//           {" "}
//           {`>`}{" "}
//         </button>
//       </footer>
//     </div>
//   );
// };

// const Pagination = () => {
//   return <PaginationComponent nextPageLength={2} totalPages={10} />;
// };

// export default Pagination;
