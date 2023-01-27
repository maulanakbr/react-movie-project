import { useGetSearchMovieQuery } from "../services/movieApi";
import { SMALL_IMAGE_URL } from "../apis/tmdb";
import moment from "moment/moment";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Search = () => {
  const { query, page } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  window.scrollTo(0, 0);

  const {
    data: dataSearchMovie,
    isFetching: isFetchingSearchMovie,
    error: errorSearchMovie,
  } = useGetSearchMovieQuery({ query, page });

  const truncate = (string) => {
    return string.length > 140 ? string.substr(0, 140 - 1) + "..." : string;
  };

  const date = (initialDate) => {
    return moment(initialDate).format("LL");
  };

  const totalPage = Math.ceil(
    dataSearchMovie?.total_results / dataSearchMovie?.total_pages
  );

  const pages = Array.from({ length: totalPage }, (_, idx) => idx + 1);

  const handleNextPage = (element) => {
    setCurrentPage(currentPage + 1);
    navigate(`/search/${query}/${parseInt(page) + 1}`);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    navigate(`/search/${query}/${parseInt(page) - 1}`);
  };

  return (
    <div className="mx-8 mt-4 mb-8">
      {isFetchingSearchMovie ? (
        <div>Fetching..</div>
      ) : errorSearchMovie ? (
        <div>Error..</div>
      ) : (
        <div className="mx-8 flex">
          <div className="flex w-full rounded-2xl">
            <div className="mr-4 h-[60vh] w-[30%] rounded-2xl">
              <h5 className="w-full rounded-t-2xl bg-red-500 p-4 text-[18px] font-semibold">
                Search Results
              </h5>
              <div className="mt-2 flex bg-zinc-400 text-zinc-900">
                <p className="m-2 w-[70%] p-1 font-semibold">Movies</p>
                <p className="m-2 w-[30%] rounded-2xl bg-zinc-300 p-1 text-center font-semibold">
                  {dataSearchMovie.total_results}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col rounded-xl">
              {dataSearchMovie?.results.map((movie, idx) => (
                <div
                  key={idx}
                  className="mb-3 flex w-full overflow-hidden rounded-xl border border-zinc-800 shadow-lg"
                >
                  <div className="relative">
                    <div className="flex h-full w-[7vw]">
                      <Link to={`/movie/${movie.id}`}>
                        {movie.poster_path ? (
                          <img
                            className="block h-full w-full cursor-pointer object-fill"
                            src={`${SMALL_IMAGE_URL}${movie.poster_path}`}
                            alt={movie.title}
                          />
                        ) : (
                          <div>
                            <PhotoIcon className="absolute top-10 right-[1.5vw] block h-[7vh] object-cover" />
                          </div>
                        )}
                      </Link>
                    </div>
                  </div>
                  <div className="m-2 w-full">
                    <Link to={`/movie/${movie.id}`}>
                      <p className="cursor-pointer pt-2 font-bold">
                        {movie.title}
                      </p>
                    </Link>
                    <p className="pb-2 font-medium text-zinc-500">
                      {date(movie.release_date)}
                    </p>
                    <p className="pb-2">{truncate(movie.overview)}</p>
                  </div>
                </div>
              ))}
              <ul className="mt-3 flex justify-center">
                {pages.map((page, idx) => (
                  <li
                    className={
                      currentPage === page
                        ? "mr-2 cursor-pointer pr-4 text-red-500"
                        : currentPage > page
                        ? "mr-2 cursor-pointer pr-4 text-zinc-800"
                        : "mr-2 cursor-pointer pr-4"
                    }
                    onClick={
                      currentPage === idx
                        ? handleNextPage
                        : currentPage < idx
                        ? (element) => {
                            const id = parseInt(element.target.id);
                            setCurrentPage(id);
                            navigate(`/search/${query}/${page}`);
                            console.log(currentPage);
                            console.log(idx);
                          }
                        : currentPage - idx === 2
                        ? handlePrevPage
                        : currentPage > idx
                        ? (element) => {
                            const id = parseInt(element.target.id);
                            setCurrentPage(id);
                            navigate(`/search/${query}/${page}`);
                          }
                        : null
                    }
                    id={page}
                    key={idx}
                  >
                    {page}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
