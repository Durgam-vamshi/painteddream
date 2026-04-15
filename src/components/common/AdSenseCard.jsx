import React, { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "../../config/constants";

/**
 * AdSenseCard
 * Renders a Google AdSense display ad as a full-width banner.
 * Placed OUTSIDE the product grid so it never affects product card sizes.
 */
const AdSenseCard = ({ slotId = "auto" }) => {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch (e) {
      console.warn("AdSense push error:", e);
    }
  }, []);

  return (
    <div className="w-full my-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative">
      {/* Sponsored badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-sm text-slate-500 tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
        Sponsored
      </div>

      {/* Ad container — full width banner, height driven by AdSense */}
      <div ref={adRef} className="w-full min-h-[100px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdSenseCard;
