import React from "react";
import { useNavigate } from "react-router-dom";

const selectedRange = (start, end) => {
  return [...Array(end - start).keys()].map((item) => item + start);
};

const scale = ({ totalPages, generatedPages, currentPage }) => {
  const ceiling = Math.ceil(generatedPages / 2);
  const floor = Math.floor(generatedPages / 2);

  if (totalPages < generatedPages) {
    return { start: 1, end: totalPages + 1 };
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: generatedPages + 1 };
  } else if (currentPage + floor >= totalPages) {
    return { start: totalPages - generatedPages + 1, end: totalPages + 1 };
  } else {
    return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
  }
};

const PaginationItem = ({
  currentPage,
  setCurrentPage,
  page,
  query,
  navigate,
}) => {
  return (
    <li
      className={
        currentPage === page
          ? "mx-2 cursor-pointer px-4 text-red-500"
          : currentPage > page
          ? "mx-2 cursor-pointer px-4 text-zinc-800"
          : "mx-2 cursor-pointer px-4"
      }
      onClick={() => {
        setCurrentPage(page);
        navigate(`/search/${query}/${page}`);
      }}
    >
      {page}
    </li>
  );
};

const Pagination = ({ currentPage, query, setCurrentPage, data, page }) => {
  const navigate = useNavigate();

  const totalPages = data?.total_pages;

  const pageScale = scale({ totalPages, generatedPages: 5, currentPage });
  const pages = selectedRange(pageScale.start, pageScale.end);

  const isFirstPage = currentPage === 1 ? true : false;
  const isLastPage = currentPage === totalPages ? true : false;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    navigate(`/search/${query}/${parseInt(page) + 1}`);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    navigate(`/search/${query}/${parseInt(page) - 1}`);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    navigate(`/search/${query}/${totalPages}`);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    navigate(`/search/${query}/${1}`);
  };

  return (
    <div className="flex h-[2rem] items-center justify-center">
      <button
        className="mx-4 cursor-pointer disabled:cursor-default disabled:text-zinc-800"
        onClick={handleFirstPage}
        disabled={isFirstPage}
      >
        First
      </button>
      <button
        className="mx-4 cursor-pointer disabled:cursor-default disabled:text-zinc-800"
        onClick={handlePrevPage}
        disabled={isFirstPage}
      >
        Prev
      </button>
      <ul className="flex justify-center">
        {pages.map((page, idx) => (
          <PaginationItem
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            page={page}
            query={query}
            navigate={navigate}
            key={idx}
          />
        ))}
      </ul>
      <button
        className="mx-4 cursor-pointer disabled:cursor-default disabled:text-zinc-800"
        onClick={handleNextPage}
        disabled={isLastPage}
      >
        Next
      </button>
      <button
        className="mx-4 cursor-pointer disabled:cursor-default disabled:text-zinc-800"
        onClick={handleLastPage}
        disabled={isLastPage}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
