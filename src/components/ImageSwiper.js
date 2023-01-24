import { SMALL_IMAGE_URL } from "../apis/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const ImageSwiper = ({ fetch, error, data, title }) => {
  return (
    <div className="m-8">
      <h5 className="mb-3 text-[18px] font-semibold">{title}</h5>
      {fetch ? (
        <div>Fetching..</div>
      ) : error ? (
        <div>Error..</div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={14}
          slidesPerView={7}
          grabCursor={true}
          navigation
        >
          {data.results.slice(0, 10).map((movie, idx) => (
            <SwiperSlide key={idx}>
              <img
                className="block h-full w-full rounded-xl object-cover"
                src={`${SMALL_IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImageSwiper;
