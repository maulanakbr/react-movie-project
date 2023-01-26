import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import CreditsSwiper from "../components/CreditsSwiper";
import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetKeywordsQuery,
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
    data: dataKeywords,
    isFetching: isFetchingKeywords,
    error: errorKeywords,
  } = useGetKeywordsQuery(id);

  // console.log(dataKeywords);

  return (
    <div className="mx-16 my-4">
      {isFetchingMovieDetails ||
      isFetchingMovieCredits ||
      isFetchingKeywords ? (
        <div>Fetching..</div>
      ) : errorMovieDetails || errorMovieCredits || errorKeywords ? (
        <div>Error..</div>
      ) : (
        <div>
          <MovieCard details={dataMovieDetails} credits={dataMovieCredits} />
          {/* Two Parts */}
          <div className="flex">
            <div className="mr-6 flex-col">
              <CreditsSwiper data={dataMovieCredits.cast} title="Movie Cast" />
              <CreditsSwiper data={dataMovieCredits.crew} title="Movie Crew" />
            </div>
            <div className="my-8 w-full flex-col">
              <h5 className="mb-3 text-[18px] font-semibold">Keywords</h5>
              {dataKeywords.keywords.map((words, idx) => (
                <p
                  key={idx}
                  className="mb-2 mr-2 inline-block rounded-md bg-zinc-800 p-2 py-2 text-center text-[12px]"
                >
                  {words.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
