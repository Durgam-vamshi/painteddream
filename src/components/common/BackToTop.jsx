import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

/**
 * BackToTop Button
 * A floating button that enables smooth scrolling back to the page hero.
 */
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-24 left-6 z-40 p-4 rounded-full shadow-premium transition-all duration-500 transform
                bg-white/80 backdrop-blur-md border border-slate-100 text-brand-primary
                hover:bg-brand-primary hover:text-white hover:-translate-y-2 active:scale-95
                ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-50 pointer-events-none"}
            `}
            aria-label="Back to top"
        >
            <FaArrowUp size={20} />
        </button>
    );
};

export default BackToTop;
