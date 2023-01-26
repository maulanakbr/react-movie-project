import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import CastCrewSwiper from "../components/CastCrewSwiper";
import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetMovieKeywordsQuery,
} from "../services/movieApi";

const MovieDetails = () => {
  const { id } = useParams();

  const {
    data: dataMovieDetails,
    isFetching: isFetchingMovieDetails,
    error: errorMovieDetails,
  } = useGetMovieDetailsQuery(id);

  const {
    data: dataMovieCredits,
    isFetching: isFetchingMovieCredits,
    error: errorMovieCredits,
  } = useGetMovieCreditsQuery(id);

  const {
    data: dataMovieKeywords,
    isFetching: isFetchingMovieKeywords,
    error: errorMovieKeywords,
  } = useGetMovieKeywordsQuery(id);

  // console.log(dataKeywords);

  return (
    <div className="mx-16 my-4">
      {isFetchingMovieDetails ||
      isFetchingMovieCredits ||
      isFetchingMovieKeywords ? (
        <div>Fetching..</div>
      ) : errorMovieDetails || errorMovieCredits || errorMovieKeywords ? (
        <div>Error..</div>
      ) : (
        <div>
          <MovieCard details={dataMovieDetails} credits={dataMovieCredits} />
          {/* Two Parts */}
          <div className="flex">
            <div className="mr-10 flex-col">
              <CastCrewSwiper data={dataMovieCredits.cast} title="Movie Cast" />
              <CastCrewSwiper data={dataMovieCredits.crew} title="Movie Crew" />
            </div>
            <div className="my-8 w-full flex-col">
              <h5 className="mb-3 text-[18px] font-semibold">Keywords</h5>
              {dataMovieKeywords.keywords.length === 0 ? (
                <p className="text-[13px]">No keywords available</p>
              ) : (
                dataMovieKeywords.keywords.map((words, idx) => (
                  <p
                    key={idx}
                    className="mb-2 mr-2 inline-block rounded-md bg-zinc-800 p-2 py-2 text-center text-[13px]"
                  >
                    {words.name}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
