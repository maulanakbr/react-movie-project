import { Link } from "react-router-dom";

const Navbar = () => {
  const navMenu = [
    {
      id: 1,
      text: "M A Y",
      link: "/",
    },
    {
      id: 2,
      text: "Home",
      link: "/",
    },
    {
      id: 3,
      text: "Movies",
      link: "/movies",
    },
    {
      id: 4,
      text: "TV Shows",
      link: "/series",
    },
  ];

  return (
    <div className="mx-16 my-2 flex h-[10vh] items-center justify-between text-lg">
      <Link to={navMenu[0].link} key={navMenu[0].id}>
        <span className="cursor-pointer text-3xl font-bold text-red-500">
          {navMenu[0].text}
        </span>
      </Link>
      <ul className="flex items-center gap-6">
        {navMenu.slice(1, 4).map((menu) => (
          <Link to={menu.link} key={menu.id}>
            <li className="cursor-pointer font-medium">{menu.text}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
