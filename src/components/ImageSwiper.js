import { SMALL_IMAGE_URL } from "../apis/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const ImageSwiper = ({ fetch, error, title, data }) => {
  return (
    <div className="m-8">
      <h5 className="mb-3 text-[18px] font-semibold">{title}</h5>
      {fetch ? (
        <div>Fetching..</div>
      ) : error ? (
        <div>Error..</div>
      ) : (
        <Swiper
          id="movieList"
          modules={[Navigation]}
          spaceBetween={14}
          slidesPerView={7}
          navigation
        >
          {data.results.slice(0, 10).map((movie, idx) => (
            <SwiperSlide key={idx}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="block h-full w-full cursor-pointer rounded-xl object-cover"
                  src={`${SMALL_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImageSwiper;
