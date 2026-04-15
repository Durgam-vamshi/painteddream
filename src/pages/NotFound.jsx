import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

/**
 * NotFound Page (404)
 * A visually stunning error page to handle non-existent routes.
 */
const NotFound = () => {
    return (
        <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden bg-surface-base">
            <SEO 
                title="404 - Art Lost in Space" 
                description="Oops! The art piece you're looking for seems to have drifted away. Return home to The Painted Dream." 
            />

            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            {/* Error Content */}
            <header className="relative mb-8">
                <span className="text-[120px] md:text-[180px] font-black text-slate-100 select-none">404</span>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Art Piece <span className="text-brand-primary">Missing</span>
                    </h1>
                </div>
            </header>

            <p className="text-lg text-slate-500 max-w-md mx-auto mb-12 font-medium leading-relaxed">
                Oops! Looks like this dream hasn't been painted yet, or the page has moved to a new gallery.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link
                    to="/"
                    className="px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-premium hover:shadow-premium-hover hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                    <span>Back to Gallery</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
                
                <Link
                    to="/gallery"
                    className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all duration-300"
                >
                    Browse Collections
                </Link>
            </div>

            {/* Decorative Icon */}
            <div className="mt-20 text-6xl animate-bounce">🎨</div>
        </main>
    );
};

export default NotFound;
