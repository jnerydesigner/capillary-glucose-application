import { NavbarBlog } from "./navbar-blog";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router";

export const HeaderBlog = () => {
  return (
    <div className="w-full h-[95px] bg-white flex justify-between items-center flex-row px-4 shadow-2xs">
      <div className="h-20 w-20 rounded-full shadow-2xs">
        <img
          src="/sangue-doce-logo.png"
          alt="logo da sangue doce"
          className="rounded-full"
        />
      </div>
      <NavbarBlog />
      <div className="flex justify-center items-center flex-row gap-6">
        <div className="relative">
          <FaRegHeart />
          <p className="absolute text-[0.6rem] text-white top-[-10px] right-0 font-bold bg-red-500 rounded-full w-3.5 text-center">
            1
          </p>
        </div>
        <div className="relative">
          <LuShoppingBasket />
          <p className="absolute text-[0.6rem] text-white top-[-10px] right-0 font-bold bg-red-500 rounded-full w-3.5 text-center">
            1
          </p>
        </div>
        <Link
          to="/login"
          className="flex justify-center items-center flex-row gap-4"
        >
          <FaRegCircleUser />
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
};
