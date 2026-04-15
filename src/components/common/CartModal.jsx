import React, { useState } from "react";
import { FaTimes, FaTrash, FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContextInstance";

const ADMIN_PHONE = "919603655683";

const CartModal = () => {
  const { cartItems, cartTotal, isCartOpen, toggleCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "", address: "" };
  });

  if (!isCartOpen) return null;

  const handleChange = (e) => {
    const updatedInfo = { ...userInfo, [e.target.name]: e.target.value };
    setUserInfo(updatedInfo);
    localStorage.setItem("whatsappUserInfo", JSON.stringify(updatedInfo));
  };

  const getProductImage = (product) => {
    if (!product) return "No Image";
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return product.image || "No Image";
  };

  const handleOrder = () => {
    const orderItems = cartItems
      .map((item, index) => {
        const img = getProductImage(item);
        const price = item.price === "N/A" || item.price === "  N/A" ? "Custom" : `₹${item.price}`;
        return `${index + 1}. *${item.name}*
   💰 Price: ${price}
   🖼️ Image: ${img}
   🔢 Qty: ${item.quantity || 1}`;
      })
      .join("\n\n");

    const message = `🛍️ *THE PAINTED DREAM - BULK ORDER* 🛍️

👤 *Customer Details:*
------------------
Name: ${userInfo.name || "Not Provided"}
Phone: ${userInfo.phone || "Not Provided"}
Address: ${userInfo.address || "Not Provided"}

🛒 *Order Summary:*
------------------
${orderItems}

------------------
🌐 Page: ${window.location.href}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex sm:justify-end items-end sm:items-stretch bg-slate-900/60 backdrop-blur-sm transition-all duration-500 animate-in fade-in"
      onClick={() => toggleCart(false)}
    >
      <div
        className="w-full sm:max-w-md bg-white h-[90vh] sm:h-full shadow-2xl flex flex-col transform transition-transform duration-500 animate-in slide-in-from-bottom sm:slide-in-from-right rounded-t-[2.5rem] sm:rounded-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col bg-white relative shrink-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:mb-6 sm:hidden" />

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Your Gallery</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-bold uppercase">
                  {cartItems.length} Items
                </span>
                {cartItems.length > 0 && (
                  <button onClick={clearCart} className="text-[10px] text-red-400 hover:text-red-600 font-bold uppercase transition-colors">
                    Clear All
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="p-2.5 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-all border border-slate-100"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scrollbar-hide pb-28 sm:pb-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="bg-slate-50 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border border-slate-100 shadow-inner group transition-all">
                <FaShoppingCart className="text-3xl sm:text-4xl text-slate-200 group-hover:text-brand-primary/20 transition-colors" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-slate-900 mb-2">Your collection is empty</p>
                <p className="text-xs sm:text-sm text-slate-500 max-w-[200px] mx-auto">Discover unique handcrafted art to fill your dream gallery.</p>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="bg-brand-primary text-white px-8 sm:px-10 py-3 sm:py-3.5 rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.03] active:scale-[0.97] transition-all text-sm sm:text-base"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id || Math.random()}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-sm transition-all group"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={getProductImage(item)}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl sm:rounded-2xl shadow-sm border border-white transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate mb-0.5">{item.name}</h3>
                    <p className="text-[10px] sm:text-xs font-bold text-brand-primary uppercase tracking-wider">
                      {item.price === "N/A" || item.price === "  N/A" ? "Custom" : `₹${item.price}`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <div className="flex items-center bg-white border border-slate-100 rounded-lg sm:rounded-xl p-0.5 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-brand-primary font-bold transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-xs font-extrabold w-6 text-center text-slate-700">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-brand-primary font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-8 bg-white border-t border-slate-100 space-y-3 sm:space-y-5 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.1)] shrink-0 z-10 sm:pb-8 pb-8">
            <div className="flex items-center justify-between px-1 sm:px-2">
              <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Estimated Price</span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-900">₹{cartTotal}</span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={userInfo.name}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none transition-all"
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={userInfo.address}
                onChange={handleChange}
                rows="2"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none transition-all resize-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="WhatsApp Number"
                value={userInfo.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-5 sm:py-3.5 text-xs sm:text-sm focus:ring-2 focus:ring-brand-primary focus:bg-white outline-none transition-all"
              />
            </div>

            <button
              onClick={handleOrder}
              disabled={!userInfo.name || !userInfo.phone}
              className={`w-full flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4.5 rounded-xl sm:rounded-2xl font-bold text-white transition-all transform text-sm sm:text-base mt-2
                ${!userInfo.name || !userInfo.phone
                  ? "bg-slate-200 cursor-not-allowed text-slate-400"
                  : "bg-green-600 hover:bg-green-700 shadow-xl shadow-green-100 hover:-translate-y-1 active:scale-[0.98]"
                }`}
            >
              <FaWhatsapp size={18} className="sm:hidden" />
              <FaWhatsapp size={20} className="hidden sm:inline-block" />
              Send Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
