"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineDescription } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { PiBowlFoodBold } from "react-icons/pi";
import { IoMailSharp } from "react-icons/io5";
import { Menu, X } from "lucide-react";

const menuItems = [
  { name: "Home", href: "/", icon: <FaHome className="mr-2" /> },
  {
    name: "Sobre Nós",
    href: "/blog/about",
    icon: <MdOutlineDescription className="mr-2" />,
  },
  {
    name: "Shop",
    href: "/blog/shop",
    icon: <FaBasketShopping className="mr-2" />,
  },
  {
    name: "Receita Saudável",
    href: "/blog/eating-healthy",
    icon: <PiBowlFoodBold className="mr-2" />,
  },
  {
    name: "Contato",
    href: "/blog/contact",
    icon: <IoMailSharp className="mr-2" />,
  },
];

export const NavbarBlog = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  return (
    <nav className="w-full">
      <div className="flex md:hidden justify-start">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out px-2 md:flex md:justify-center md:items-center",
          isOpen ? "block md:flex" : "hidden md:flex"
        )}
      >
        <ul
          className={cn(
            "flex flex-col md:flex-row md:items-center md:gap-6 mt-4 md:mt-0",
            "bg-white md:bg-transparent w-full md:w-auto p-4 md:p-0 rounded shadow md:shadow-none"
          )}
        >
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setActive(item.href)}
                className={cn(
                  "flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-100 md:hover:bg-transparent",
                  active === item.href
                    ? "font-semibold text-primary border-b-2 border-primary md:border-none"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
