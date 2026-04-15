import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { optimizeCloudinaryUrl } from "../utils/cloudinaryHelper";
import { useProducts } from "../context/ProductContextInstance";
import ProductCarousel from "../components/common/ProductCarousel";
import { FaWhatsapp, FaShoppingCart, FaFilter } from "react-icons/fa";
import SEO from "../components/common/SEO";
import { useCart } from "../context/CartContextInstance";
import AdSenseCard from "../components/common/AdSenseCard";
import WhatsAppOrderModal from "../components/common/WhatsAppOrderModal";
import { ADMIN_PHONE } from "../config/constants";

const Gallery = () => {
  const { addToCart } = useCart();
  const { products, addOrder } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "" };
  });

  // Extract unique categories from all products
  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category).filter(Boolean);
    const uniqueCategories = ["All", ...new Set(allCategories)];
    return uniqueCategories;
  }, [products]);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <main className="min-h-screen bg-surface-base py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Our Gallery"
        description="Explore our exquisite collection of handcrafted products including candles, keychains, frames, and more in Hyderabad."
        url="https://thepainteddream.in/gallery"
      />

      <section className="max-w-7xl mx-auto">
        <header className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Our Gallery</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover our complete collection of handmade artistry.
          </p>
          <div className="h-1.5 w-24 bg-brand-primary mx-auto mt-6 rounded-full" />
        </header>

        <div className="mb-10 animate-fade-in-up w-full px-2 sm:px-4" style={{ animationDelay: "100ms" }}>
          <div className="flex flex-row md:flex-wrap items-center justify-start md:justify-center gap-3 overflow-x-auto md:overflow-visible pb-4 hide-scrollbar w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/30"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid — AdSense placed BETWEEN chunks, never inside the grid */}
        {filteredProducts.length > 0 ? (() => {
          const CHUNK = 8;
          const chunks = [];
          for (let i = 0; i < filteredProducts.length; i += CHUNK) {
            chunks.push(filteredProducts.slice(i, i + CHUNK));
          }
          return chunks.map((chunk, chunkIdx) => (
            <React.Fragment key={chunkIdx}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {chunk.map((p, idx) => {
                  const globalIdx = chunkIdx * CHUNK + idx;
                  return (
                    <div
                      key={p.id}
                      className="group bg-surface-card rounded-2xl shadow-sm hover:shadow-premium border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 animate-fade-in-up"
                      style={{ animationDelay: `${(globalIdx % 12) * 50}ms` }}
                    >
                      <Link to={`/product/${p.id}`} className="block relative overflow-hidden h-32 sm:h-48">
                        {Array.isArray(p.images) && p.images.length > 0 ? (
                          <ProductCarousel
                            images={p.images}
                            altText={p.name}
                            className="h-full w-full"
                          />
                        ) : (
                          <img
                            src={optimizeCloudinaryUrl(p.image) || "/placeholder.jpg"}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt={p.name}
                            loading="lazy"
                          />
                        )}
                        {p.category && (
                          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-md shadow-sm text-slate-700">
                            {p.category}
                          </span>
                        )}
                      </Link>

                      <div className="p-3 sm:p-4 flex flex-col flex-grow bg-white">
                        <Link to={`/product/${p.id}`}>
                          <h3 className="text-sm sm:text-lg font-bold text-slate-900 truncate leading-tight group-hover:text-brand-primary transition-colors">
                            {p.name}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 mt-1 mb-2">
                          {p.details}
                        </p>
                        <div className="mt-auto flex items-center justify-between mb-3">
                          <span className="text-sm sm:text-base font-bold text-green-700">
                            {p.price === "N/A" || p.price === "  N/A" ? "Contact us" : `₹${p.price}`}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => { e.preventDefault(); addToCart(p); }}
                            className="flex-1 bg-[#024785] text-white text-xs sm:text-sm py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition hover:bg-[#00386b] font-medium"
                          >
                            <FaShoppingCart size={14} className="hidden sm:block" /> Add
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedProduct(p);
                              setIsModalOpen(true);
                            }}
                            className="flex-1 bg-green-600 text-white text-xs sm:text-sm py-2 rounded-lg flex items-center justify-center gap-1 active:scale-95 transition hover:bg-green-700 font-medium"
                          >
                            <FaWhatsapp size={14} className="hidden sm:block" /> Order
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AdSense banner between chunks — completely outside the product grid */}
              {chunkIdx < chunks.length - 1 && (
                <AdSenseCard key={`ad-gallery-${chunkIdx}`} slotId="auto" />
              )}
            </React.Fragment>
          ));
        })() : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <FaFilter size={48} className="text-slate-200 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No products found</h3>
            <p>Try selecting a different category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-6 text-brand-primary font-medium hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section >

      <WhatsAppOrderModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          localStorage.setItem("whatsappUserInfo", JSON.stringify(userInfo));
        }}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        addOrder={addOrder}
        pageName="gallery"
      />
    </main >
  );
};

export default Gallery;
