import { SMALL_IMAGE_URL } from "../apis/tmdb";
import { Link } from "react-router-dom";
import ListPagination from "./ListPagination";

const ItemGrid = ({
  fetch,
  error,
  data,
  category,
  currentPage,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className="mx-16 mb-8">
      <div className="mb-8 grid h-full w-full grid-cols-5 gap-6">
        {fetch ? (
          <div>Fetching..</div>
        ) : error ? (
          <div>Error..</div>
        ) : (
          data?.map((movie, idx) => (
            <div
              className="h-[45vh] overflow-hidden rounded-xl shadow-lg"
              key={idx}
            >
              <Link to={`/${category}/${movie.id}`}>
                <img
                  className="block h-full w-full cursor-pointer object-fill"
                  src={`${SMALL_IMAGE_URL}${movie.poster_path}`}
                  alt="movie_poster"
                />
              </Link>
            </div>
          ))
        )}
      </div>
      <ListPagination
        currentPage={currentPage}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
};

export default ItemGrid;
