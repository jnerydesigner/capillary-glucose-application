import { FaHome } from "react-icons/fa";
import { NavUser } from "./nav-user";
import { Link } from "react-router";

const user = {
  name: "Jander da Costa Nery",
  email: "jander.webamsetr@gmail.com",
  avatar: "https://github.com/jnerydesigner.png",
};

export const Header = () => {
  return (
    <header className="flex justify-between items-center bg-gray-50 p-4 shadow-md divide-gray-200 mb-2">
      <Link to="/">
        <FaHome className="w-[30px] h-[30px]" />
      </Link>
      <h1 className="text-3xl font-bold text-gray-800">Leituras de Glicose</h1>

      <NavUser user={user} />
    </header>
  );
};
