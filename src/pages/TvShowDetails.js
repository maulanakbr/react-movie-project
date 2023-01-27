import { useParams } from "react-router-dom";
import TvShowCard from "../components/TvShowCard";
import CastCrewSwiper from "../components/CastCrewSwiper";
import {
  useGetTvShowDetailsQuery,
  useGetTvShowCreditsQuery,
  useGetTvShowKeywordsQuery,
} from "../services/movieApi";
import { SMALL_IMAGE_URL } from "../apis/tmdb";

const TvShowDetails = () => {
  const { id } = useParams();

  const {
    data: dataTvShowDetails,
    isFetching: isFetchingTvShowDetails,
    error: errorTvShowDetails,
  } = useGetTvShowDetailsQuery(id);

  const {
    data: dataTvShowCredits,
    isFetching: isFetchingTvShowCredits,
    error: errorTvShowCredits,
  } = useGetTvShowCreditsQuery(id);

  const {
    data: dataTvShowKeywords,
    isFetching: isFetchingTvShowKeywords,
    error: errorTvShowKeywords,
  } = useGetTvShowKeywordsQuery(id);

  let languageNames = new Intl.DisplayNames(["en"], { type: "language" });

  return (
    <div className="mx-16 my-4">
      {isFetchingTvShowDetails ||
      isFetchingTvShowCredits ||
      isFetchingTvShowKeywords ? (
        <div>Fetching..</div>
      ) : errorTvShowDetails || errorTvShowCredits || errorTvShowKeywords ? (
        <div>Error..</div>
      ) : (
        <div>
          <TvShowCard details={dataTvShowDetails} credits={dataTvShowCredits} />
          {/* Two Parts */}
          <div className="flex">
            <div className="mr-10 flex-col">
              <CastCrewSwiper
                data={dataTvShowCredits.cast}
                title="Movie Cast"
              />
              <CastCrewSwiper
                data={dataTvShowCredits.crew}
                title="Movie Crew"
              />
            </div>
            <div className="flex-col">
              <div className="mt-8 w-full flex-col">
                <h5 className="mb-3 text-[18px] font-semibold">Keywords</h5>
                {dataTvShowKeywords.results.length === 0 ? (
                  <p className="text-[12px]">No keywords available</p>
                ) : (
                  dataTvShowKeywords.results.map((words, idx) => (
                    <p
                      key={idx}
                      className="mb-2 mr-2 inline-block rounded-md bg-zinc-800 p-2 py-2 text-center text-[13px]"
                    >
                      {words.name}
                    </p>
                  ))
                )}
              </div>
              <div className="mt-8 w-full flex-col">
                <h5 className="mb-3 text-[18px] font-semibold">Status</h5>
                <p className="text-[13px]">{dataTvShowDetails.status}</p>
              </div>
              <div className="mt-8 w-full flex-col">
                <h5 className="mb-3 text-[18px] font-semibold">Type</h5>
                <p className="text-[13px]">{dataTvShowDetails.type}</p>
              </div>
              <div className="mt-8 w-full flex-col">
                <h5 className="mb-3 text-[18px] font-semibold">
                  Original Language
                </h5>
                <p className="text-[13px]">
                  {languageNames.of(dataTvShowDetails.original_language)}
                </p>
              </div>
              <div className="mt-8 w-full flex-col">
                <h5 className="mb-3 text-[18px] font-semibold">Network</h5>
                <img
                  className="block h-[30px] w-[65px] text-zinc-300"
                  src={`${SMALL_IMAGE_URL}${dataTvShowDetails.networks[0].logo_path}`}
                  alt={dataTvShowDetails.networks[0].path}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvShowDetails;
