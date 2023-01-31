import ItemGrid from "../components/ItemGrid";
import { useGetPopularMovieQuery } from "../services/movieApi";
import { useNavigate, useParams } from "react-router-dom";

const MovieList = () => {
  const { page } = useParams();

  const {
    data: dataPopularMovie,
    isFetching: isFetchingPopularMovie,
    error: errorPopularMovie,
  } = useGetPopularMovieQuery(page);

  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate(`/movie/popular/${parseInt(page) + 1}`);
  };

  const handlePrevButtonClick = () => {
    navigate(`/movie/popular/${parseInt(page) - 1}`);
  };

  return (
    <div>
      <ItemGrid
        fetch={isFetchingPopularMovie}
        error={errorPopularMovie}
        data={dataPopularMovie}
        currentPage={Number(page)}
        category="movie"
        handleNext={handleNextButtonClick}
        handlePrev={handlePrevButtonClick}
      />
    </div>
  );
};

export default MovieList;
