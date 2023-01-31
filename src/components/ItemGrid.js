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
  window.scroll(0, 0);

  return (
    <div className="mx-16 mb-8">
      <div className="flex">
        <div className="mr-4 h-[60vh] w-[25%] overflow-hidden rounded-2xl border border-zinc-800 shadow-lg">
          <h5 className="w-full bg-red-500 p-4 text-[18px] font-semibold">
            Page Results
          </h5>
          <div className="mt-2 flex bg-zinc-400 text-zinc-900">
            <p className="m-2 w-[70%] p-1 font-semibold">
              {category === "movie" ? "Popular Movies" : "Popular TV Shows"}
            </p>
            <p className="m-2 w-[30%]  bg-zinc-300 p-1 text-center font-semibold">
              {data?.total_pages}
            </p>
          </div>
        </div>
        <div className="h-full flex-col">
          <div className="mb-8 grid h-full w-full grid-cols-4 gap-6">
            {fetch ? (
              <div>Fetching..</div>
            ) : error ? (
              <div>Error..</div>
            ) : (
              data?.results.map((movie, idx) => (
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
      </div>
    </div>
  );
};

export default ItemGrid;
