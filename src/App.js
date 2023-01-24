import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
