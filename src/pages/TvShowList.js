import ItemGrid from "../components/ItemGrid";
import { useGetPopularTvShowQuery } from "../services/movieApi";
import { useNavigate, useParams } from "react-router-dom";

const TvShowList = () => {
  const { page } = useParams();

  const {
    data: dataPopularTvShow,
    isFetching: isFetchingPopularTvShow,
    error: errorPopularTvShow,
  } = useGetPopularTvShowQuery(page);

  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate(`/tv/popular/${parseInt(page) + 1}`);
  };

  const handlePrevButtonClick = () => {
    navigate(`/tv/popular/${parseInt(page) - 1}`);
  };

  return (
    <div>
      <ItemGrid
        fetch={isFetchingPopularTvShow}
        error={errorPopularTvShow}
        data={dataPopularTvShow?.results}
        currentPage={page}
        category="tv"
        handleNext={handleNextButtonClick}
        handlePrev={handlePrevButtonClick}
      />
    </div>
  );
};

export default TvShowList;
