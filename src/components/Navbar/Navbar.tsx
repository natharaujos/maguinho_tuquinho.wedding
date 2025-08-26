import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import admins from "../../constants/admins";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const navLinks = [
    { label: "Início", onClick: () => navigate("/") },
    {
      label: "Nossa História",
      onClick: () => navigate("/"),
    },
    { label: "Presentes", onClick: () => navigate("/") },
    {
      label: "Meus Pagamentos",
      onClick: () => navigate("/my-payments"),
    },
  ];

  const confirmedRoute = {
    label: "Confirmados",
    onClick: () => navigate("/confirmeds"),
  };

  if (user?.email && admins.includes(user?.email)) {
    navLinks.push(confirmedRoute);
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Nome dos noivos */}
        <a
          href="#home"
          className="text-2xl font-bold text-pink-600"
          onClick={() => navigate("/")}
        >
          Maguinha & Tuquinho
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
            <button
              key={link.label}
              className="text-gray-700 hover:text-pink-600 transition font-medium"
              onClick={link.onClick}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu colapsado (mobile) */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                link.onClick();
                setIsOpen(false);
              }}
              className="block py-2 text-gray-700 hover:text-pink-600"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
