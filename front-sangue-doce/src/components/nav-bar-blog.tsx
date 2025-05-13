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
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-center flex-col md:flex-row px-4 py-3">
        <ul className="flex gap-6 flex-col md:flex-row">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setActive(item.href)}
                className={cn(
                  "flex justify-center items-center text-sm transition-colors hover:text-primary",
                  active === item.href
                    ? "font-semibold text-primary border-b-2 border-primary pb-1"
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
