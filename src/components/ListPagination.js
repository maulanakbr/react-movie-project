const ListPagination = ({ currentPage, handleNext, handlePrev }) => {
  return (
    <div>
      <div
        className={
          currentPage === 1 ? "flex justify-end" : "flex justify-between"
        }
      >
        {currentPage !== 1 && (
          <button
            className="h-[3rem] rounded-xl bg-red-500 p-2 shadow-xl"
            onClick={handlePrev}
          >
            <h5 className="px-2 text-lg font-medium">Prev</h5>
          </button>
        )}
        <button
          className="h-[3rem] rounded-xl bg-red-500 p-2 shadow-xl"
          onClick={handleNext}
        >
          <h5 className="px-2 text-lg font-medium">Next</h5>
        </button>
      </div>
    </div>
  );
};

export default ListPagination;
