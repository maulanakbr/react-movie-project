import ImageSwiper from "../components/ImageSwiper";
import MainCard from "../components/MainCard";
import {
  useGetPopularMovieQuery,
  useGetTopRatedMovieQuery,
  useGetTrendingMovieQuery,
} from "../services/movieApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { BASE_IMAGE_URL } from "../apis/tmdb";

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
        {isFetchingTrendingMovie ? (
          <div>Fetching..</div>
        ) : errorTrendingMovie ? (
          <div>Error..</div>
        ) : (
          <Swiper
            id="main"
            modules={[Autoplay, Pagination]}
            spaceBetween={60}
            slidesPerView={2}
            centeredSlides={true}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination
            loop={true}
          >
            {dataTrendingMovie.results.slice(0, 10).map((movie, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full w-[45vw]">
                  <img
                    className="block h-full w-full rounded-xl object-cover opacity-25"
                    src={`${BASE_IMAGE_URL}${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className="absolute top-0 m-4 w-[25rem]">
              <h1 className="px-1 pb-3 font-bold">NOW TRENDING</h1>
            </div>
          </Swiper>
        )}
      </div>
      <ImageSwiper
        fetch={isFetchingPopularMovie}
        data={dataPopularMovie}
        error={errorPopularMovie}
        title={"Popular Movie"}
      />
      <ImageSwiper
        fetch={isFetchingTopRatedMovie}
        data={dataTopRatedMovie}
        error={errorTopRatedMovie}
        title={"Top Rated Movie"}
      />
    </div>
  );
};

export default Home;
