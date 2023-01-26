import { SMALL_IMAGE_URL } from "../apis/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const TvShowSwiper = ({ data, title }) => {
  return (
    <div className="my-8">
      <h5 className="mb-3 text-[18px] font-semibold">{title}</h5>
      <Swiper
        id="movieList"
        modules={[Navigation]}
        spaceBetween={14}
        slidesPerView={7}
        navigation
      >
        {data?.results.slice(0, 10).map((tv) => (
          <SwiperSlide key={tv.id}>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <Link to={`/tv/${tv.id}`}>
                <img
                  className="block h-full w-full cursor-pointer object-cover"
                  src={`${SMALL_IMAGE_URL}${tv.poster_path}`}
                  alt={tv.title}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TvShowSwiper;
