import React, { useMemo, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { optimizeCloudinaryUrl } from "../utils/cloudinaryHelper";
import { useProducts } from "../context/ProductContextInstance";
import { useCart } from "../context/CartContextInstance";
import SEO from "../components/common/SEO";
import { FaSearch, FaArrowLeft, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import ProductCarousel from "../components/common/ProductCarousel";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get("q") || "";
    const [searchInput, setSearchInput] = useState(query);
    const { products } = useProducts();
    const { addToCart } = useCart();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
        }
    };

    const results = useMemo(() => {
        if (!query.trim() || !Array.isArray(products)) return [];
        const lowerQuery = query.toLowerCase();
        return products.filter((p) =>
            (p.name?.toLowerCase() || "").includes(lowerQuery) ||
            (p.category?.toLowerCase() || "").includes(lowerQuery) ||
            (p.details?.toLowerCase() || "").includes(lowerQuery)
        );
    }, [query, products]);

    return (
        <main className="bg-surface-base min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <SEO
                title={query ? `"${query}" - Search Results` : "Search Gallery"}
                description={`Search results for ${query} at The Painted Dream handcrafted gifts and arts gallery.`}
                url={`https://thepainteddream.in/search?q=${query}`}
            />

            <section className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-16 animate-fade-in-up">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-8 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Gallery
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-6">
                            <div className="bg-brand-primary p-4 rounded-2xl shadow-lg shadow-brand-primary/20">
                                <FaSearch className="text-2xl text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                    {query ? (
                                        <>Results for <span className="text-brand-primary font-black italic">"{query}"</span></>
                                    ) : (
                                        "Search Gallery"
                                    )}
                                </h1>
                                {query && (
                                    <p className="text-slate-500 mt-2 font-medium">
                                        Found <span className="text-brand-primary font-bold">{results.length}</span> matching handcrafted pieces
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Mobile and Desktop In-Page Search Bar */}
                        <form onSubmit={handleSearch} className="w-full md:w-auto flex-grow max-w-md relative mt-6 md:mt-0 md:ml-6">
                            <input
                                type="text"
                                placeholder="Search artworks, candles..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-6 pr-12 focus:ring-2 focus:ring-brand-primary outline-none transition-shadow text-slate-700"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary transition-colors">
                                <FaSearch size={18} />
                            </button>
                        </form>
                    </div>
                </header>

                {results.length === 0 ? (
                    <div className="text-center py-20 bg-surface-card rounded-3xl shadow-premium border border-slate-100 max-w-2xl mx-auto px-8 animate-fade-in-up">
                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <FaSearch className="text-4xl text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">
                            {query ? "No artworks found" : "Start Searching"}
                        </h2>
                        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                            {query ? (
                                <>
                                    We couldn't find matches for "<span className="font-bold underline text-slate-700">{query}</span>".
                                    Maybe try searching for "Mandala", "Frames", or "Scented".
                                </>
                            ) : (
                                "Enter a search term above to explore our collections."
                            )}
                        </p>
                        <Link to="/" className="inline-flex items-center gap-3 bg-brand-primary text-white px-10 py-4 rounded-2xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 font-bold active:scale-95">
                            Explore All Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                        {results.map((p, idx) => (
                            <div
                                key={p.id}
                                className="group bg-surface-card rounded-2xl shadow-sm hover:shadow-premium border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 animate-fade-in-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <Link to={`/product/${p.id}`} className="block relative overflow-hidden h-24 sm:h-48">
                                    {Array.isArray(p.images) && p.images.length > 0 ? (
                                        <ProductCarousel
                                            images={p.images}
                                            altText={p.name}
                                            className="h-full w-full"
                                        />
                                    ) : (
                                        <img
                                            src={optimizeCloudinaryUrl(p.image || (p.images && p.images[0]))}
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
                                                window.location.href = `/product/${p.id}`;
                                            }}
                                            className="flex-1 bg-green-600 text-white text-[10px] sm:text-xs py-1.5 rounded flex items-center justify-center gap-1 active:scale-95 transition hover:bg-green-700"
                                        >
                                            <FaWhatsapp size={12} /> Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>

    );
};

export default SearchResults;
