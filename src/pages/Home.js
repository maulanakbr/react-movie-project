import MovieSwiper from "../components/MovieSwiper";
import TvShowSwiper from "../components/TvShowSwiper";
import MainCard from "../components/MainCard";
import NowTrendingSwiper from "../components/NowTrendingSwiper";
import {
  useGetPopularMovieQuery,
  useGetTopRatedMovieQuery,
  useGetTrendingMovieQuery,
  useGetPopularTvShowQuery,
  useGetTopRatedTvShowQuery,
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

  const {
    data: dataPopularTvShow,
    isFetching: isFetchingPopularTvShow,
    error: errorPopularTvShow,
  } = useGetPopularTvShowQuery();

  const {
    data: dataTopRatedTvShow,
    isFetching: isFetchingTopRatedTvShow,
    error: errorTopRatedTvShow,
  } = useGetTopRatedTvShowQuery();

  window.scroll(0, 0);

  return (
    <div className="mx-8">
      <MainCard />
      <div className="relative mx-8 mt-4 mb-8 bg-zinc-900 mix-blend-lighten">
        {isFetchingTrendingMovie ||
        isFetchingPopularMovie ||
        isFetchingTopRatedMovie ||
        isFetchingPopularTvShow ||
        isFetchingTopRatedTvShow ? (
          <div>Fetching..</div>
        ) : errorTrendingMovie ||
          errorPopularMovie ||
          errorTopRatedMovie ||
          errorPopularTvShow ||
          errorTopRatedTvShow ? (
          <div>Error..</div>
        ) : (
          <div>
            <NowTrendingSwiper data={dataTrendingMovie} />
            <MovieSwiper data={dataPopularMovie} title={"Popular Movies"} />
            <MovieSwiper data={dataTopRatedMovie} title={"Top Rated Movies"} />
            <TvShowSwiper data={dataPopularTvShow} title={"Popular TV Shows"} />
            <TvShowSwiper
              data={dataTopRatedTvShow}
              title={"Top Rated TV Shows"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
