import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

/**
 * Toast Component
 * A single notification item with animations.
 */
const Toast = ({ message, type = "success", onClose }) => {
    const isSuccess = type === "success";

    return (
        <div 
            className={`
                pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-premium border backdrop-blur-md animate-slide-in-right transition-all
                ${isSuccess 
                    ? "bg-emerald-50/90 border-emerald-100 text-emerald-800" 
                    : "bg-red-50/90 border-red-100 text-red-800"
                }
            `}
        >
            <div className={`p-1 rounded-full ${isSuccess ? "bg-emerald-100" : "bg-red-100"}`}>
                {isSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
            </div>
            
            <span className="font-bold text-sm tracking-tight">{message}</span>
            
            <button 
                onClick={onClose}
                className="ml-2 p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
                <FaTimes size={12} className="opacity-50" />
            </button>
        </div>
    );
};

export default Toast;
