import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { optimizeCloudinaryUrl } from "../utils/cloudinaryHelper";
import { useProducts } from "../context/ProductContextInstance";
import { useCart } from "../context/CartContextInstance";
import { FaWhatsapp, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import SEO from "../components/common/SEO";
import ProductCarousel from "../components/common/ProductCarousel";
import { ADMIN_PHONE, ADSENSE_CLIENT_ID } from "../config/constants";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, addOrder } = useProducts();
  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [id, products]);

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [enlargedIndex, setEnlargedIndex] = useState(-1);
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "" };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);


  if (!product) return <div className="p-10 text-center">Loading product...</div>;

  const images = Array.isArray(product.images)
    ? product.images
    : [product.image];

  const handleWhatsAppOrder = () => {
    // ADMIN_PHONE imported from constants
    const pageUrl = window.location.href;
    const priceText =
      product.price === "N/A" || product.price === "  N/A"
        ? "Custom"
        : `₹${product.price}`;

    const img = Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.image || "No Image";

    const message = `🛍️ *THE PAINTED DREAM - ORDER INQUIRY* 🛍️

👤 *Customer Details:*
------------------
Name: ${userInfo.name || "Not Provided"}
Phone: ${userInfo.phone || "Not Provided"}

🛒 *Product Details:*
------------------
*${product.name}*
💰 Price: ${priceText}
🖼️ Image: ${img}
📄 Details: ${product.details}

------------------
🌐 Page: ${pageUrl}`;

    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

    // Log the order
    addOrder({
      productName: product.name,
      productId: product.id,
      customerName: userInfo.name,
      customerPhone: userInfo.phone,
      price: product.price,
      page: "product_details"
    });

    window.open(url, "_blank");
  };


  const handleChange = (e) => {
    const updated = { ...userInfo, [e.target.name]: e.target.value };
    setUserInfo(updated);
    localStorage.setItem("whatsappUserInfo", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-surface-base py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title={product.name}
        description={product.details.substring(0, 160)}
        image={images[0]}
        url={`https://thepainteddream.in/product/${product.id}`}
        type="product"
        productData={product}
      />

      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
        </button>

        <div className="bg-surface-card rounded-3xl shadow-premium border border-slate-100 overflow-hidden animate-fade-in-up">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2 lg:w-3/5 relative bg-slate-50 p-6 sm:p-12">
              <div
                className="aspect-square relative overflow-hidden rounded-2xl bg-white shadow-inner flex items-center justify-center cursor-zoom-in group"
                onClick={() => setEnlargedIndex(mainImageIndex)}
              >
                <img
                  src={optimizeCloudinaryUrl(images[mainImageIndex])}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 right-4 glass p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-slate-600">Click to enlarge</span>
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex gap-4 mt-8 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImageIndex(i)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === mainImageIndex ? "border-brand-primary ring-4 ring-brand-primary/10" : "border-transparent hover:border-slate-300"
                        }`}
                    >
                      <img src={optimizeCloudinaryUrl(img)} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 lg:w-2/5 p-8 sm:p-12 flex flex-col justify-center border-l border-slate-50">
              <div className="mb-8">
                <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{product.name}</h1>
                <p className="text-2xl font-bold text-brand-primary">
                  {product.price === "N/A" ? "Enquire Now" : `₹${product.price}`}
                </p>
              </div>

              <div className="space-y-8 mb-12">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-6 h-0.5 bg-brand-primary rounded-full"></span>
                    Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{product.details}</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">Your Details</h3>
                  <div className="space-y-3 relative z-10">
                    <input
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    />
                    <input
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      placeholder="Phone (Optional)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-brand-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <FaWhatsapp className="text-xl" /> Order on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {enlargedIndex >= 0 && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/95 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setEnlargedIndex(-1)}
        >
          <div
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 glass text-slate-800 p-3 rounded-full z-10 hover:bg-white transition-all shadow-premium"
              onClick={() => setEnlargedIndex(-1)}
            >
              &times;
            </button>

            {/* Prev Button */}
            {images.length > 1 && (
              <button
                className="absolute left-4 glass text-slate-800 p-4 rounded-full z-10 hover:bg-white transition-all shadow-premium hidden sm:block"
                onClick={(e) => {
                  e.stopPropagation();
                  setEnlargedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                }}
              >
                &#10094;
              </button>
            )}

            <img
              src={images[enlargedIndex]}
              alt="Enlarged view"
              className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500"
            />

            {/* Next Button */}
            {images.length > 1 && (
              <button
                className="absolute right-4 glass text-slate-800 p-4 rounded-full z-10 hover:bg-white transition-all shadow-premium hidden sm:block"
                onClick={(e) => {
                  e.stopPropagation();
                  setEnlargedIndex((prev) => (prev + 1) % images.length);
                }}
              >
                &#10095;
              </button>
            )}

            <p className="absolute bottom-10 glass px-6 py-2 rounded-full text-slate-600 font-medium text-sm">
              Tap outside to close
            </p>
          </div>
        </div>
      )}
    </main>
  );
};


export default ProductDetails;
