import { Link } from "react-router-dom";

const Footer = () => {
  const footerMenu = ["Home", "Movies", "TV Series"];

  return (
    <div className="mt-8 flex h-[40vh] items-center justify-center border-t border-zinc-800 text-lg">
      <div>
        <Link to="/">
          <span className="block cursor-pointer text-center text-3xl font-bold text-red-500">
            M A Y
          </span>
        </Link>
        <ul className="my-4 flex justify-center gap-6">
          {footerMenu.map((menu, idx) => (
            <li className="cursor-pointer font-medium" key={idx}>
              {menu}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
