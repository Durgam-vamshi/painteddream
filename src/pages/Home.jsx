import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { optimizeCloudinaryUrl } from "../utils/cloudinaryHelper";
import { useProducts } from "../context/ProductContextInstance";
import ProductCarousel from "../components/common/ProductCarousel";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import SEO from "../components/common/SEO";
import { useCart } from "../context/CartContextInstance";
import AdSenseCard from "../components/common/AdSenseCard";
import WhatsAppOrderModal from "../components/common/WhatsAppOrderModal";
import { ADMIN_PHONE } from "../config/constants";

// ProductCarousel removed (imported)




const Home = () => {
  const { addToCart } = useCart();
  const { products, addOrder } = useProducts();
  const carouselImages = [
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999063/MAIN_rns2jm.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0002_ophrkn.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0004_t0sfko.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0003_dgrnuj.jpg",
  ];

  const trendingProducts = products.filter((p) => p.sourcePage === "home");

  // State
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "" };
  });

  // Hero Auto-slide
  useEffect(() => {
    const itv = setInterval(
      () => setHeroIndex((p) => (p + 1) % carouselImages.length),
      4000
    );
    return () => clearInterval(itv);
  }, [carouselImages.length]);






  const prevHero = () =>
    setHeroIndex((p) => (p === 0 ? carouselImages.length - 1 : p - 1));

  const nextHero = () =>
    setHeroIndex((p) => (p + 1) % carouselImages.length);


  return (
    <main className="bg-gray-50 min-h-screen pb-10">
      <SEO
        title="Home"
        description="Discover handcrafted gifts, mandala art, scented candles, and custom frames at The Painted Dream in Hyderabad."
        url="https://thepainteddream.in/"
      />
      {/* Hero Carousel */}
      {/* <div className="relative w-full h-44 sm:h-80 overflow-hidden shadow-md">
        <div
          className="flex transition-transform duration-700 h-full"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full flex-shrink-0 object-cover h-full"
              alt="banner"
            />
          ))}
        </div>
      </div> */}

      {/* Hero Carousel */}
      <div className="relative w-full h-64 sm:h-[500px] overflow-hidden shadow-premium mb-8 animate-fade-in-up">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {carouselImages.map((img, i) => (
            <div key={i} className="w-full flex-shrink-0 relative h-full">
              <img
                src={optimizeCloudinaryUrl(img)}
                className="w-full h-full object-cover"
                alt="The Painted Dream featured banner"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* ⬅ LEFT ARROW */}
        <button
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2
               glass text-slate-800 p-3 rounded-full
               hover:bg-brand-primary hover:text-white transition-all z-10 hidden sm:block shadow-premium"
        >
          ❮
        </button>

        {/* ➡ RIGHT ARROW */}
        <button
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2
               glass text-slate-800 p-3 rounded-full
               hover:bg-brand-primary hover:text-white transition-all z-10 hidden sm:block shadow-premium"
        >
          ❯
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-2 transition-all duration-300 rounded-full ${i === heroIndex ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      </div>



      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Masterpieces</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover our curated collection of handcrafted art, where every piece tells a story of passion and dream.
          </p>
          <div className="h-1.5 w-24 bg-brand-primary mx-auto mt-8 rounded-full shadow-sm" />
        </header>

        {/* Product Grid — AdSense placed BETWEEN chunks, never inside the grid */}
        {(() => {
          const CHUNK = 8;
          const chunks = [];
          for (let i = 0; i < trendingProducts.length; i += CHUNK) {
            chunks.push(trendingProducts.slice(i, i + CHUNK));
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
                      style={{ animationDelay: `${globalIdx * 100}ms` }}
                    >
                      <Link to={`/product/${p.id}`} className="block relative overflow-hidden h-24 sm:h-48">
                        {Array.isArray(p.images) ? (
                          <ProductCarousel
                            images={p.images}
                            altText={p.name}
                            className="h-full w-full"
                          />
                        ) : (
                          <img
                            src={optimizeCloudinaryUrl(p.image)}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            alt={p.name}
                            loading="lazy"
                          />
                        )}
                      </Link>

                      <div className="p-2 flex flex-col flex-grow">
                        <Link to={`/product/${p.id}`}>
                          <h3 className="text-[12px] sm:text-base font-bold truncate leading-tight hover:text-brand-primary transition">
                            {p.name}
                          </h3>
                        </Link>
                        <p className="text-[10px] sm:text-sm text-gray-500 line-clamp-1 mb-1">
                          {p.details}
                        </p>
                        <p className="text-[11px] sm:text-sm font-bold text-green-700 mb-2">
                          {p.price === "N/A" || p.price === "  N/A" ? "Contact us" : `₹${p.price}`}
                        </p>

                        <div className="flex gap-2 mt-auto">
                          <button
                            onClick={(e) => { e.preventDefault(); addToCart(p); }}
                            className="flex-1 bg-[#024785] text-white text-[10px] sm:text-xs py-1.5 rounded flex items-center justify-center gap-1 active:scale-95 transition hover:bg-[#00386b]"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedProduct(p);
                              setIsModalOpen(true);
                            }}
                            className="flex-1 bg-green-600 text-white text-[10px] sm:text-xs py-1.5 rounded flex items-center justify-center gap-1 active:scale-95 transition hover:bg-green-700"
                          >
                            <FaWhatsapp size={12} /> Order
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AdSense banner between chunks — completely outside the product grid */}
              {chunkIdx < chunks.length - 1 && (
                <AdSenseCard key={`ad-home-${chunkIdx}`} slotId="auto" />
              )}
            </React.Fragment>
          ));
        })()}
      </section>


      {/* WhatsApp Modal */}
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
        pageName="home"
      />

    </main>
  );
};

export default Home;
