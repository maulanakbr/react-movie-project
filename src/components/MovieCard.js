import { BASE_IMAGE_URL, SMALL_IMAGE_URL } from "../apis/tmdb";
import { ClockIcon } from "@heroicons/react/24/outline";
import moment from "moment/moment";

const MovieCard = ({ details, credits }) => {
  const runtime = (number) => {
    const duration = moment.duration(number, "minutes");
    const format = `${duration._data.hours}h ${duration._data.minutes}m`;

    return format;
  };

  const yearSlice = (string) => {
    return string.slice(0, 4);
  };

  const findDirector = credits?.crew.filter((crew) => crew.job === "Director");

  return (
    <div className="h-full">
      <div className="h-[85vh]">
        <div className="relative h-full bg-zinc-900">
          <div className="h-full">
            <img
              className="block h-full w-full object-cover opacity-25 mix-blend-lighten"
              src={`${BASE_IMAGE_URL}${
                details?.backdrop_path || details?.poster_path
              }`}
              alt="backdrop_image"
            />
          </div>
          <div className="absolute top-0 flex h-full w-full items-center justify-center">
            <div className="mr-2 h-[80vh] w-[28vw] shadow-xl">
              <img
                className="block h-full w-full rounded-xl object-fill shadow-lg"
                src={`${SMALL_IMAGE_URL}${details?.poster_path}`}
                alt="poster_image"
              />
            </div>
            <div className="h-[15rem] w-[40rem] flex-col p-4">
              <h4 className="mb-2 py-1 font-bold">
                {details.title}
                <span className="px-2 font-normal text-zinc-500">{`(${yearSlice(
                  details.release_date
                )})`}</span>
              </h4>
              <div className="mb-2 flex">
                {details?.genres?.slice(0, 3).map((item, idx) => (
                  <p className="pr-2 text-[17px]" key={idx}>
                    {item.name}
                  </p>
                ))}
                <div className="mx-2 flex items-center justify-center">
                  <ClockIcon className="h-[16px] w-[16px] text-red-500" />
                  <p className="px-1 text-[17px]">{runtime(details.runtime)}</p>
                </div>
              </div>
              <p className="mb-2 text-[18px] italic text-zinc-500">
                {details.tagline}
              </p>
              <h5 className="mb-1 font-medium">Overview</h5>
              <p className="mb-3">{details.overview}</p>
              <div>
                <p className="font-medium">{findDirector[0]?.name}</p>
                <p>{findDirector[0]?.job}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
