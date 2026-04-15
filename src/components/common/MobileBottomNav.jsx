import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaFire, FaPaintBrush, FaSearch } from "react-icons/fa";

const MobileBottomNav = () => {
    const links = [
        { to: "/", icon: <FaHome size={20} />, label: "Home" },
        { to: "/gallery", icon: <FaFire size={20} />, label: "Gallery" },
        { to: "/customize", icon: <FaPaintBrush size={20} />, label: "Custom" },
        { to: "/search", icon: <FaSearch size={20} />, label: "Search" },
    ];

    return (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-[60] glass border-t border-white/20 pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300
              ${isActive ? "text-brand-primary scale-110 font-bold" : "text-slate-500 hover:text-slate-800"}
            `}
                    >
                        <div className={`transition-transform duration-300`}>
                            {link.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-tighter font-medium">{link.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default MobileBottomNav;
