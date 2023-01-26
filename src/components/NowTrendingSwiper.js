import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { BASE_IMAGE_URL } from "../apis/tmdb";

const NowTrendingSwiper = ({ data }) => {
  return (
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
      {data.results.slice(0, 10).map((movie, idx) => (
        <SwiperSlide key={idx}>
          <div className="h-full w-[45vw] overflow-hidden rounded-xl border-2 border-zinc-800 shadow-lg">
            <img
              className="block h-full w-full rounded-2xl object-cover p-2 opacity-25"
              src={`${BASE_IMAGE_URL}${movie.backdrop_path}`}
              alt={movie.title}
            />
          </div>
        </SwiperSlide>
      ))}
      <div className="absolute top-0 z-10 m-4 w-[25rem]">
        <h1 className="px-1 pb-3 font-bold">NOW TRENDING</h1>
      </div>
    </Swiper>
  );
};

export default NowTrendingSwiper;
