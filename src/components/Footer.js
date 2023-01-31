import { Link } from "react-router-dom";

const Footer = () => {
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
      link: "/movie/popular",
    },
    {
      id: 4,
      text: "TV Shows",
      link: "/tv/popular",
    },
  ];

  return (
    <div className="flex h-[40vh] items-center justify-center border-t border-zinc-800 text-lg">
      <div>
        <Link to={navMenu[0].link} key={navMenu[0].id}>
          <span className="block cursor-pointer text-center text-3xl font-bold text-red-500">
            {navMenu[0].text}
          </span>
        </Link>
        <ul className="my-4 flex justify-center gap-6">
          {navMenu.slice(1, 4).map((menu) => (
            <Link
              to={menu.text !== "Home" ? `${menu.link}/1` : menu.link}
              key={menu.id}
            >
              <li className="cursor-pointer font-medium">{menu.text}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
