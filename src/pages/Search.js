import { useGetSearchMovieQuery } from "../services/movieApi";
import { SMALL_IMAGE_URL } from "../apis/tmdb";
import moment from "moment/moment";
import { Link, useParams } from "react-router-dom";

const Search = () => {
  const { query } = useParams();

  const {
    data: dataSearchMovie,
    isFetching: isFetchingSearchMovie,
    error: errorSearchMovie,
  } = useGetSearchMovieQuery(query);

  const truncate = (string) => {
    return string.length > 140 ? string.substr(0, 140 - 1) + "..." : string;
  };

  const date = (initialDate) => {
    return moment(initialDate).format("LL");
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
                  {dataSearchMovie.results?.length}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col rounded-xl">
              {dataSearchMovie.results.slice(0, 10).map((movie, idx) => (
                <div
                  key={idx}
                  className="mb-3 flex w-full overflow-hidden rounded-xl border border-zinc-800 shadow-lg"
                >
                  <div>
                    <div className="flex h-full w-[7vw]">
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          className="block h-full w-full cursor-pointer object-fill"
                          src={`${SMALL_IMAGE_URL}${movie.poster_path}`}
                          alt={movie.title}
                        />
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
