import React, { useState, useEffect } from "react";
import { CartContext } from "./CartContextInstance";
import { useToasts } from "./ToastContextInstance";

export const CartProvider = ({ children }) => {
  const { addToast } = useToasts();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartHandler");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from local storage", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("cartHandler", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to local storage", error);
    }
  }, [cartItems]);

  // Compute cart total
  const cartTotal = React.useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(String(item.price).replace(/[^0-9.]/g, ""));
      return total + (isNaN(price) ? 0 : price * (item.quantity || 1));
    }, 0);
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product || !product.id) return;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: (product.quantity || 1) }];
    });
    setIsCartOpen(true);
    addToast(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    if (!productId) return;
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    if (!productId) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId) {
          const currentQty = item.quantity || 1;
          const newQty = currentQty + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const toggleCart = (state) => {
    setIsCartOpen(state !== undefined ? state : !isCartOpen);
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your gallery selection?")) {
      setCartItems([]);
    }
  };

  const value = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    isCartOpen,
    toggleCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
