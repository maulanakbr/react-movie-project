import { PhotoIcon } from "@heroicons/react/24/outline";
import { SMALL_IMAGE_URL } from "../apis/tmdb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const CastCrewSwiper = ({ data, title }) => {
  return (
    <div className="my-8">
      <h5 className="mb-3 text-[18px] font-semibold">{title}</h5>
      <Swiper
        id="credits"
        modules={[Navigation]}
        spaceBetween={14}
        slidesPerView={5}
        navigation
      >
        {data?.slice(0, 10).map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full flex-col overflow-hidden rounded-xl bg-zinc-800 shadow-lg">
              <div className="h-[25vh] w-full">
                {item.profile_path ? (
                  <img
                    className="block h-full w-full object-cover"
                    src={`${SMALL_IMAGE_URL}${item.profile_path}`}
                    alt="cast_image"
                  />
                ) : (
                  <div>
                    <PhotoIcon className="absolute top-14 right-10 block h-[10vh] object-cover" />
                  </div>
                )}
              </div>
              <div className="flex-wrap items-center justify-center">
                <p className="w-full px-2 pt-1 text-[14px] font-bold text-zinc-300">
                  {item.name}
                </p>
                <p className="w-full px-2 text-[12px] text-zinc-300">
                  {item.character || item.job}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastCrewSwiper;
