import { Link } from "react-router-dom";

const Navbar = () => {
  const navMenu = ["Home", "Movies", "TV Series"];

  return (
    <div className="mx-16 my-2 flex h-[10vh] items-center justify-between text-lg">
      <Link to="/">
        <span className="cursor-pointer text-3xl font-bold text-red-500">
          M A Y
        </span>
      </Link>
      <ul className="flex items-center gap-6">
        {navMenu.map((menu, idx) => (
          <li className="cursor-pointer font-medium" key={idx}>
            {menu}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
