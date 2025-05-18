import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavbarBlog } from "./nav-bar-blog";
import Link from "next/link";

export const HeaderBlog = () => {
  return (
    <div className="container mx-auto h-auto md:h-[100px] bg-white flex justify-between items-center flex-col md:flex-row px-4 shadow-2xs">
      <div className="h-10 w-10 md:h-20 md:w-20 rounded-full shadow-2xs">
        <Image
          src="/sangue-doce-logo.png"
          alt="logo da sangue doce"
          className="rounded-full"
          width={500}
          height={500}
          priority
        />
      </div>
      <NavbarBlog />
      <div className="flex justify-center items-center flex-row gap-6 mt-2 md:mt-0">
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
          href="/login"
          className="flex justify-center items-center flex-row gap-4"
        >
          <FaRegCircleUser />
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
};
