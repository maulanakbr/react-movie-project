import { useGetSearchMovieQuery } from "../services/movieApi";
import { SMALL_IMAGE_URL } from "../apis/tmdb";
import moment from "moment/moment";
import { Link, useParams } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Pagination from "../components/Pagination";

const Search = () => {
  const { query, page } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  window.scrollTo(0, 0);

  const {
    data: dataSearchMovie,
    isFetching: isFetchingSearchMovie,
    error: errorSearchMovie,
  } = useGetSearchMovieQuery({ query, page });

  const truncate = (string) => {
    return string?.length > 140 ? string.substr(0, 140 - 1) + "..." : string;
  };

  const date = (initialDate) => {
    return moment(initialDate).format("LL");
  };

  const moviesCount = dataSearchMovie?.results.filter(
    (result) => result.media_type === "movie"
  ).length;

  const tvShowsCount = dataSearchMovie?.results.filter(
    (result) => result.media_type === "tv"
  ).length;

  const peopleCount = dataSearchMovie?.results.filter(
    (result) => result.media_type === "person"
  ).length;

  return (
    <div className="mx-8 mt-4 mb-8">
      {isFetchingSearchMovie ? (
        <div>Fetching..</div>
      ) : errorSearchMovie ? (
        <div>Error..</div>
      ) : (
        <div className="mx-8 flex">
          <div className="flex w-full rounded-2xl">
            <div className="mr-4 h-[60vh] w-[30%] overflow-hidden rounded-2xl border border-zinc-800 shadow-lg">
              <h5 className="w-full bg-red-500 p-4 text-[18px] font-semibold">
                Search Results
              </h5>
              <div className="mt-2 flex bg-zinc-400 text-zinc-900">
                <p className="m-2 w-[70%] p-1 font-semibold">Movies</p>
                <p className="m-2 w-[30%]  bg-zinc-300 p-1 text-center font-semibold">
                  {moviesCount}
                </p>
              </div>
              <div className="mt-2 flex bg-zinc-400 text-zinc-900">
                <p className="m-2 w-[70%] p-1 font-semibold">TV Shows</p>
                <p className="m-2 w-[30%]  bg-zinc-300 p-1 text-center font-semibold">
                  {tvShowsCount}
                </p>
              </div>
              <div className="mt-2 flex bg-zinc-400 text-zinc-900">
                <p className="m-2 w-[70%] p-1 font-semibold">People</p>
                <p className="m-2 w-[30%]  bg-zinc-300 p-1 text-center font-semibold">
                  {peopleCount}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col rounded-xl">
              {dataSearchMovie?.total_results === 0 ? (
                <div className="h-[50vh]">There is no results available</div>
              ) : (
                dataSearchMovie?.results.map((movie, idx) => (
                  <div
                    key={idx}
                    className="mb-3 flex w-full overflow-hidden rounded-xl border border-zinc-800 shadow-lg"
                  >
                    <div className="relative">
                      <div className="flex h-full w-[7vw]">
                        <Link
                          to={
                            movie.media_type === "movie"
                              ? `/movie/${movie.id}`
                              : `/tv/${movie.id}`
                          }
                        >
                          {movie.poster_path || movie.profile_path ? (
                            <img
                              className="block h-full w-full cursor-pointer object-fill"
                              src={`${SMALL_IMAGE_URL}${
                                movie.poster_path || movie.profile_path
                              }`}
                              alt={movie.title || movie.name}
                            />
                          ) : (
                            <div className="flex h-full w-[7vw]">
                              <PhotoIcon className="absolute top-5 right-[1.5vw] block h-[7vh] object-cover" />
                            </div>
                          )}
                        </Link>
                      </div>
                    </div>
                    <div className="m-2 w-full">
                      <Link
                        to={
                          movie.media_type === "movie"
                            ? `/movie/${movie.id}`
                            : `/tv/${movie.id}`
                        }
                      >
                        <p className="cursor-pointer pt-2 font-bold">
                          {movie.title || movie.name}
                        </p>
                      </Link>
                      <p className="pb-2 font-medium text-zinc-500">
                        {date(movie.release_date)}
                      </p>
                      <p className="pb-2">{truncate(movie.overview)}</p>
                    </div>
                  </div>
                ))
              )}
              {dataSearchMovie?.total_results && (
                <Pagination
                  currentPage={currentPage}
                  query={query}
                  setCurrentPage={setCurrentPage}
                  data={dataSearchMovie}
                  page={page}
                  key={page}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
