// src/components/Navbar.tsx
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Sobre Nós", href: "/sobre" },
  { name: "Shop", href: "/shop" },
  { name: "Receita Saudável", href: "/receitas" },
  { name: "Contato", href: "/contato" },
];

export const NavbarBlog = () => {
  const [active, setActive] = useState("/");

  return (
    <nav>
      <div className="container mx-auto flex items-center justify-center px-4 py-3">
        <ul className="flex gap-6">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
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
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
