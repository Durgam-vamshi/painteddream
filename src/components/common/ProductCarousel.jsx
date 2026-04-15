import React, { useState, useEffect } from "react";
import { optimizeCloudinaryUrl } from "../../utils/cloudinaryHelper";

const ProductCarousel = ({ images = [], onClick, altText, className }) => {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const itv = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(itv);
  }, [images]);

  const handlePrev = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    setIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  };

  const handleNext = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    setIndex((p) => (p + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg shadow-md group ${className || "h-64 sm:h-96"}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img
        src={optimizeCloudinaryUrl(images[index])}
        className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
        onClick={() => onClick && onClick(images[index], index)}
        alt={`${altText} - view ${index + 1}`}
      />

      {/* ⬅ */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2
                     bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ❮
        </button>
      )}

      {/* ➡ */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ❯
        </button>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
