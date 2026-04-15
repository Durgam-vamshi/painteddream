import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ADMIN_PHONE } from "../../config/constants";

const WhatsAppOrderModal = ({
  product,
  isOpen,
  onClose,
  userInfo,
  setUserInfo,
  addOrder,
  pageName = "unknown"
}) => {
  if (!isOpen) return null;

  const imageForMessage = Array.isArray(product?.images)
    ? product.images[0]
    : product?.image;

  const handleSendWhatsApp = () => {
    const pageUrl = window.location.href;
    const priceText =
      product.price === "N/A" || product.price === "  N/A"
        ? "Please share the price and available customization options."
        : `₹${product.price}`;

    const message = `🛍️ *THE PAINTED DREAM ORDER INQUIRY* 🛍️\n\nHello! 👋 I'd like to order:\n\n👤 *Name:* ${userInfo.name || "Not provided"}\n📞 *Phone:* ${userInfo.phone || "Not provided"}\n\n🖼️ *Product:* ${product?.name}\n💰 *Price:* ${priceText}\n📄 *Details:* ${product?.details || "N/A"}\n\n${imageForMessage ? `🖼️ *Image:* ${imageForMessage}\n` : ""}🌐 *Page:* ${pageUrl}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

    // Log the order
    addOrder({
      productName: product?.name,
      productId: product?.id,
      customerName: userInfo.name,
      customerPhone: userInfo.phone,
      price: product?.price,
      page: pageName
    });

    window.open(whatsappURL, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl shadow-premium p-8 w-full max-w-sm relative animate-fade-in-up">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Details</h2>
        <div className="space-y-4 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone (optional)"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all"
          />
        </div>
        <button
          onClick={handleSendWhatsApp}
          className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
        >
          <FaWhatsapp size={20} /> Order on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default WhatsAppOrderModal;
