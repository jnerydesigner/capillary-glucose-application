"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Sobre Nós", href: "/blog/about" },
  { name: "Shop", href: "/blog/shop" },
  { name: "Receita Saudável", href: "/blog/eating-healthy" },
  { name: "Contato", href: "/blog/contact" },
];

export const NavbarBlog = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-center px-4 py-3">
        <ul className="flex gap-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setActive(item.href)}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  active === item.href
                    ? "font-semibold text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
