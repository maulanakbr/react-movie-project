import ImageSwiper from "../components/ImageSwiper";
import MainCard from "../components/MainCard";
import NowTrendingSwiper from "../components/NowTrendingSwiper";
import {
  useGetPopularMovieQuery,
  useGetTopRatedMovieQuery,
  useGetTrendingMovieQuery,
} from "../services/movieApi";

const Home = () => {
  const {
    data: dataPopularMovie,
    isFetching: isFetchingPopularMovie,
    error: errorPopularMovie,
  } = useGetPopularMovieQuery();

  const {
    data: dataTrendingMovie,
    isFetching: isFetchingTrendingMovie,
    error: errorTrendingMovie,
  } = useGetTrendingMovieQuery();

  const {
    data: dataTopRatedMovie,
    isFetching: isFetchingTopRatedMovie,
    error: errorTopRatedMovie,
  } = useGetTopRatedMovieQuery();

  return (
    <div className="mx-8">
      <MainCard />
      <div className="relative mx-8 mt-4 mb-8 bg-zinc-900 mix-blend-lighten">
        {isFetchingTrendingMovie ||
        isFetchingPopularMovie ||
        isFetchingTopRatedMovie ? (
          <div>Fetching..</div>
        ) : errorTrendingMovie || errorPopularMovie || errorTopRatedMovie ? (
          <div>Error..</div>
        ) : (
          <>
            <NowTrendingSwiper data={dataTrendingMovie} />
            <ImageSwiper data={dataPopularMovie} title={"Popular Movie"} />
            <ImageSwiper data={dataTopRatedMovie} title={"Top Rated Movie"} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
