"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-purple-600">Logo</div>

          {/* Botão menu (mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Menu normal (desktop) */}
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Sobre
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600">
              Contato
            </a>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <a href="#" className="block text-gray-700 py-2">
            Home
          </a>
          <a href="#" className="block text-gray-700 py-2">
            Sobre
          </a>
          <a href="#" className="block text-gray-700 py-2">
            Contato
          </a>
        </div>
      )}
    </nav>
  );
}
