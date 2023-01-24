import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { BASE_IMAGE_URL } from "../apis/tmdb";
import { useGetPopularMovieQuery } from "../services/movieApi";

const MainCard = () => {
  const [searchItem, setSearchItem] = useState("");

  const navigate = useNavigate();

  const { data } = useGetPopularMovieQuery();

  const backgroundImage = data?.results[1].poster_path;

  const handleSearchField = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchItem) return navigate(`/search/${searchItem}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") return navigate(`/search/${searchItem}`);
  };

  return (
    <div className="relative m-8 h-[50vh] bg-zinc-900 mix-blend-lighten">
      <div className="h-full w-full">
        <img
          className="block h-full w-full rounded-xl object-cover opacity-25"
          src={`${BASE_IMAGE_URL}${backgroundImage}`}
          alt="background_image"
        />
      </div>
      <div className="absolute top-[20vh] right-0 left-0">
        <div className="relative m-auto h-[10rem] w-[60rem] flex-col">
          <div className="mb-4">
            <h3 className="pb-2">Sit back and relax,</h3>
            <h3 className="pb-2">Discover and enjoy our movie services!</h3>
          </div>
          <input
            className="h-[6vh] w-full rounded-2xl p-4 text-zinc-300 focus:outline-none"
            type="text"
            placeholder="Search.."
            value={searchItem}
            onChange={handleSearchField}
            onKeyDown={handleSearchKeyDown}
          />
          <MagnifyingGlassIcon
            className="absolute top-[17vh] bottom-0 right-4 h-[20px] w-[20px] cursor-pointer"
            onClick={handleSearchClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCard;
