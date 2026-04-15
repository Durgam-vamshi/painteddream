import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaPaintBrush, FaFire, FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useCart } from "../../context/CartContextInstance";


const Navbar = () => {
  const { cartItems, toggleCart } = useCart();

  const linkClasses = ({ isActive }) =>
    `relative flex items-center gap-1 sm:gap-2 font-medium transition-all duration-300
     ${isActive ? "text-brand-primary scale-105" : "text-slate-600 hover:text-brand-primary"}
     after:content-[''] after:absolute after:-bottom-1 after:left-0
     after:h-[2px] after:bg-brand-primary after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20">
      <div
        className="
          max-w-7xl w-full mx-auto
          flex items-center
          justify-between
          px-4 sm:px-6 lg:px-8
          h-16 sm:h-20
        "
      >

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
          <img
            src={logo}
            alt="The Painted Dream Logo"
            className="h-10 sm:h-10 md:h-12 lg:h-14 w-auto"
          />
          <span className="hidden sm:inline text-lg md:text-xl font-bold text-gray-800">
            The Painted Dream
          </span>
        </Link>


        <div className="flex items-center gap-10 sm:gap-6 md:gap-8">
          {/* Menu */}
          <div
            className="
              hidden sm:flex items-center
              gap-10 sm:gap-6 md:gap-8
              text-xs sm:text-sm md:text-base
              whitespace-nowrap
            "
          >
            <NavLink to="/" className={linkClasses}>
              <FaHome className="text-base sm:text-lg md:text-xl" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/gallery" className={linkClasses}>
              <FaFire className="text-base sm:text-lg md:text-xl" />
              <span>Gallery</span>
            </NavLink>

            <NavLink to="/customize" className={linkClasses}>
              <FaPaintBrush className="text-base sm:text-lg md:text-xl" />
              <span>Customize</span>
            </NavLink>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCart(true)}
              className="relative p-2 text-slate-700 hover:text-brand-primary transition-all hover:scale-110 active:scale-95"
            >
              <FaShoppingCart className="text-xl sm:text-2xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-secondary text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-white animate-pulse transition-all duration-300 scale-110">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
