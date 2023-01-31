import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import TvShowDetails from "./pages/TvShowDetails";
import Footer from "./components/Footer";
import MovieList from "./pages/MovieList";
import TvShowList from "./pages/TvShowList";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query/:page" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvShowDetails />} />
        <Route path="/movie/popular/:page" element={<MovieList />} />
        <Route path="/tv/popular/:page" element={<TvShowList />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
