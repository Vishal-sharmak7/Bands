import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/file.png";
import toast from "react-hot-toast";
import { LuShoppingCart,LuX,LuListMinus } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const isLoggedIn = localStorage.getItem("token");
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loggout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userId");
    toast.success("User logout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <header className="top-0 bg-white z-50 sticky   ">
      <div className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto">
        <img
          className="h-16 w-16 md:h-20 md:w-20 object-cover hover:scale-105"
          src={logo}
          alt="Logo"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-semibold text-lg ">
          <Link to="/" className="hover:text-red-700 transition ease-in hover:scale-110 focus:text-red-600">Home</Link>
          <Link to="/songs" className="hover:text-red-700 transition ease-in  hover:scale-110 focus:text-red-600">Songs</Link>
          <Link to="/concerts" className="hover:text-red-700 transition ease-in hover:scale-110 focus:text-red-600">Concerts</Link>
          <Link to="/store" className="hover:text-red-700 transition ease-in hover:scale-110 focus:text-red-600">Store</Link>
          <Link to="/about" className="hover:text-red-700 transition ease-in hover:scale-110 focus:text-red-600">About</Link>
          <Link to="/booking" className="hover:text-red-700 transition ease-in hover:scale-110 focus:text-red-600">Booking</Link>
        </nav>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Register</Link>
              <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Login</Link>
            </>
          ) : (
            <div className="relative">
              <div onClick={toggleUserMenu} className="cursor-pointer text-2xl text-red-700">
                <FaRegUserCircle />
              </div>
              <div className={`absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50 transition-all ${userMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <ul className="text-gray-700 text-sm py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setUserMenuOpen(false); navigate("/profile"); }}>Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setUserMenuOpen(false); navigate("/orders"); }}>Order</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setUserMenuOpen(false); loggout(); }}>Logout</li>
                </ul>
              </div>
            </div>
          )}
          <Link to="/cart" className="text-2xl text-black hover:scale-125 transition">
            <LuShoppingCart />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <LuX/> : <LuListMinus />}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex flex-col gap-4 font-semibold text-lg">
          <div className="flex justify-end">
            <span className="text-2xl cursor-pointer" onClick={toggleMenu}><LuX /></span>
          </div>
          <Link to="/" onClick={toggleMenu} className="hover:text-red-700">Home</Link>
          <Link to="/songs" onClick={toggleMenu} className="hover:text-red-700">Songs</Link>
          <Link to="/concerts" onClick={toggleMenu} className="hover:text-red-700">Concerts</Link>
          <Link to="/store" onClick={toggleMenu} className="hover:text-red-700">Store</Link>
          <Link to="/about" onClick={toggleMenu} className="hover:text-red-700">About</Link>
          <Link to="/booking" onClick={toggleMenu} className="hover:text-red-700">Booking</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/register" onClick={toggleMenu} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Register</Link>
              <Link to="/login" onClick={toggleMenu} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Login</Link>
            </>
          ) : (
            <>
            <hr />
            <p className="italic text-xl text-red-800">Hello {loggedInUser}</p>
              <button onClick={() => { toggleMenu(); navigate("/profile"); }} className="px-4 py-2 text-left hover:bg-gray-100">Profile</button>
              <button onClick={() => { toggleMenu(); navigate("/orders"); }} className="px-4 py-2 text-left hover:bg-gray-100">Orders</button>
              <button onClick={() => { toggleMenu(); loggout(); }} className="px-4 py-2 text-left hover:bg-gray-100">Logout</button>
            </>
          )}
          <Link to="/cart" onClick={toggleMenu} className="text-2xl grid items-center justify-center bg-red-500 text-white h-10 rounded-2xl hover:scale-125 transition">
            <LuShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;