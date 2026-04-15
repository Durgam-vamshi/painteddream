import { createContext, useContext } from "react";

/**
 * ToastContext
 * Instance for global notification management.
 */
export const ToastContext = createContext();

export const useToasts = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToasts must be used within a ToastProvider");
    }
    return context;
};
