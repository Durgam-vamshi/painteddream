import React, { useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";
import { ProductContext } from "./ProductContextInstance";

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    // Initial Load & Hot Reload Support
    useEffect(() => {
        // Since we are using local data, we just ensure products and orders are set.
        // In a real local-only app, you might sync these to localStorage.
        // For now, we rely on the initial state of `products` from initialProducts.
        setProducts(initialProducts);
    }, [initialProducts]);

    const addProduct = async (newProduct) => {
        const productWithId = { ...newProduct, id: Date.now().toString(), _id: Date.now().toString() };
        setProducts([productWithId, ...products]);
        return { success: true };
    };

    const updateProduct = async (updatedProduct) => {
        const id = updatedProduct._id || updatedProduct.id;
        setProducts(products.map(p => (p._id === id || p.id === id) ? updatedProduct : p));
        return { success: true };
    };

    const deleteProduct = async (id) => {
        setProducts(products.filter(p => p.id !== id && p._id !== id));
        return { success: true };
    };

    const addOrder = async (order) => {
        const newOrder = { ...order, _id: Date.now().toString() };
        setOrders([newOrder, ...orders]);
    };

    const clearOrders = async () => {
        if (!window.confirm("This will clear ALL orders. Proceed?")) return;
        setOrders([]);
    };

    const exportProducts = () => {
        const code = `export const products = ${JSON.stringify(products, null, 2)};`;
        const blob = new Blob([code], { type: "application/javascript" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "products.js";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            exportProducts,
            orders,
            addOrder,
            clearOrders,
            loading
        }}>
            {children}
        </ProductContext.Provider>
    );
};
