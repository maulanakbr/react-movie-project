import {
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
} from "../services/movieApi";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, SMALL_IMAGE_URL } from "../apis/tmdb";
import moment from "moment/moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

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

  const runtime = (number) => {
    const duration = moment.duration(number, "minutes");
    const format = `${duration._data.hours}h${duration._data.minutes}`;

    return format;
  };

  const yearSlice = (string) => {
    return string.slice(0, 4);
  };

  return (
    <div className="mx-16 my-4">
      {isFetchingMovieDetails || isFetchingMovieCredits ? (
        <div>Fetching..</div>
      ) : errorMovieDetails || errorMovieCredits ? (
        <div>Error..</div>
      ) : (
        <div className="h-full">
          <div className="h-[85vh]">
            <div className="relative h-full bg-zinc-900">
              <div className="h-full">
                <img
                  className="block h-full w-full object-cover opacity-25 mix-blend-lighten"
                  src={`${BASE_IMAGE_URL}${dataMovieDetails.backdrop_path}`}
                  alt="backdrop_image"
                />
              </div>
              <div className="absolute top-0 flex h-full w-full items-center justify-center">
                <div className="mr-2 h-[80vh] w-[28vw] shadow-xl">
                  <img
                    className="block h-full w-full rounded-xl object-fill shadow-lg"
                    src={`${SMALL_IMAGE_URL}${dataMovieDetails.poster_path}`}
                    alt="poster_image"
                  />
                </div>
                <div className="h-[15rem] w-[40rem] flex-col p-4">
                  <h4 className="mb-2 py-1 font-bold">
                    {dataMovieDetails.title}
                    <span className="px-2 font-normal text-zinc-500">{`(${yearSlice(
                      dataMovieDetails.release_date
                    )})`}</span>
                  </h4>
                  <div className="mb-3 flex">
                    {dataMovieDetails?.genres?.slice(1, 3).map((item, idx) => (
                      <p className="pr-2 text-[17px]" key={idx}>
                        {item.name}
                      </p>
                    ))}
                    <p className="text-[17px]">
                      {runtime(dataMovieDetails.runtime)}
                    </p>
                  </div>
                  <p className="mb-2 text-[18px] italic text-zinc-500">
                    {dataMovieDetails.tagline}
                  </p>
                  <h5 className="mb-1 font-medium">Overview</h5>
                  <p>{dataMovieDetails.overview}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Swiper */}
          <div className="my-8">
            <h5 className="mb-3 text-[18px] font-semibold">Movie Cast</h5>
            {isFetchingMovieCredits ? (
              <div>Fetching..</div>
            ) : errorMovieCredits ? (
              <div>Error..</div>
            ) : (
              <Swiper
                id="cast"
                modules={[Navigation]}
                spaceBetween={14}
                slidesPerView={7}
                navigation
              >
                {dataMovieCredits?.cast.slice(0, 10).map((credit, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative h-full flex-col overflow-hidden rounded-xl bg-zinc-800 shadow-lg">
                      <div className="h-[25vh] w-full">
                        <img
                          className="block h-full w-full object-cover"
                          src={`${SMALL_IMAGE_URL}${credit.profile_path}`}
                          alt="cast_image"
                        />
                      </div>
                      <div className="flex-wrap items-center justify-center">
                        <p className="w-full px-2 pt-1 text-[14px] font-bold text-zinc-300">
                          {credit.name}
                        </p>
                        <p className="w-full px-2 text-[12px] text-zinc-300">
                          {credit.character}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
