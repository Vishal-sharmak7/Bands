import React, { useState } from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/file.png"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="  top-0 bg-white z-50">
      <div className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto">
        {/* Logo */}
        <img className="h-16 w-16 md:h-20 md:w-20 object-cover" src={logo} alt="Logo" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-semibold text-lg">
          <Link to="/" className="hover:text-red-700 transition-transform duration-300 hover:scale-110">Home</Link>
          <Link to="/songs" className="hover:text-red-700 transition-transform duration-300 hover:scale-110">Songs</Link>
          <Link to="/concerts" className="hover:text-red-700 transition-transform duration-300 hover:scale-110">Concerts</Link>
          <Link to="/store" className="hover:text-red-700 transition-transform duration-300 hover:scale-110">Store</Link>
          <Link to="/about" className="hover:text-red-700 transition-transform duration-300 hover:scale-110">About</Link>
          <Link to="/booking" className="hover:text-red-700 transition-transform duration-300 hover:scale-110">Booking</Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden" onClick={toggleMenu}>
          <span className="text-3xl cursor-pointer transition-transform duration-300">
            {menuOpen ? '✖' : '☰'}
          </span>
        </div>
      </div>

      {/* Mobile Navigation with animation */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-96 p-4' : 'max-h-0 p-0'} md:hidden bg-white shadow-md`}>
        <div className="flex flex-col gap-4 font-semibold text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-red-700">Home</Link>
          <Link to="/songs" onClick={() => setMenuOpen(false)} className="hover:text-red-700">Songs</Link>
          <Link to="/concerts" onClick={() => setMenuOpen(false)} className="hover:text-red-700">Concerts</Link>
          <Link to="/store" onClick={() => setMenuOpen(false)} className="hover:text-red-700">Store</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-red-700">About</Link>
          <Link to="/booking" onClick={() => setMenuOpen(false)} className="hover:text-red-700">Booking</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
