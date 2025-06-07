// src/components/Navbar.jsx

import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Ícones

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "#home" },
    { label: "Nossa História", href: "#historia" },
    { label: "Presentes", href: "#presentes" },
    { label: "RSVP", href: "#rsvp" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Nome dos noivos */}
        <a href="#home" className="text-xl font-bold text-pink-600">
          Ana & João
        </a>

        {/* Ícone do menu mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-pink-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Links do menu (desktop) */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-pink-600 transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Menu colapsado (mobile) */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
              className="block py-2 text-gray-700 hover:text-pink-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
