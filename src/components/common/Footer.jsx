import React from "react";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎨</span>
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
              The Painted <span className="text-brand-primary">Dream</span>
            </h1>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-md font-medium">
            Transforming imagination into handcrafted reality. We specialize in bespoke Mandala art, artisanal candles, and unique personalized gifts made with soul.
          </p>
          <div className="flex gap-4 pt-2">
            {[
              { icon: <FaInstagram size={20} />, href: "https://www.instagram.com/thepainteddream2025", color: "hover:text-pink-500" },
              { icon: <FaWhatsapp size={20} />, href: "https://wa.me/9603655683", color: "hover:text-green-500" },
              { icon: <FaEnvelope size={20} />, href: "mailto:thepainteddream2025@gmail.com", color: "hover:text-cyan-500" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 shadow-lg ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Artist Contact */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <span className="w-6 h-0.5 bg-brand-primary rounded-full"></span>
            Artist Profile
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-tighter mb-1">Lead Artist</p>
              <p className="text-white font-bold">Ms. Aishwarya</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-tighter mb-1">Specialty</p>
              <p className="text-slate-300 text-sm font-medium leading-tight">Mandala Art & Custom Art Installations</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <span className="w-6 h-0.5 bg-brand-primary rounded-full"></span>
            Get In Touch
          </h3>
          <div className="space-y-4">
            <a
              href="mailto:thepainteddream2025@gmail.com"
              className="group flex flex-col hover:text-white transition-colors"
            >
              <span className="text-xs text-slate-500 uppercase tracking-tighter mb-1">Email Support</span>
              <span className="text-sm font-bold truncate">thepainteddream2025@gmail.com</span>
            </a>
            <p className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-tighter mb-1">Studio Location</span>
              <span className="text-sm font-bold text-slate-300">Hyderabad, India</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        <p>&copy; 2025 The Painted Dream. All Rights Reserved.</p>
        <p className="flex items-center gap-2">
          Made with <span className="text-brand-primary text-xs">♥</span> for Art Lovers
        </p>
      </div>
    </footer>

  );
};

export default Footer;
