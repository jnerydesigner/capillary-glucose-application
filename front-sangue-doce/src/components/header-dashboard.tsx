import { FaHome } from "react-icons/fa";

import Link from "next/link";
import { NavBarUserMenu } from "./nav-bar-user-menu";

export const Header = () => {
  return (
    <header className="flex justify-between items-center bg-gray-50 p-4 shadow-md divide-gray-200 mb-2">
      <Link href="/">
        <FaHome className="w-[30px] h-[30px]" />
      </Link>
      <h1 className="text-3xl font-bold text-gray-800">Leituras de Glicose</h1>
      <NavBarUserMenu />
    </header>
  );
};
