import React, { useState } from "react";
import SEO from "../components/common/SEO";

const Customize = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    details: "",
    referenceImageUrl: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.match(/^[0-9]{10}$/))
      return "Enter a valid 10-digit phone number";
    if (!form.whatsapp.match(/^[0-9]{10}$/))
      return "Enter a valid 10-digit WhatsApp number";
    if (!form.details.trim()) return "Please describe your custom art";
    return null;
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    const adminNumber = "919603655683"; // Replace with your WhatsApp number

    const text = `🎨 *New Custom Art Request* 🎨

👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}
💬 *WhatsApp:* ${form.whatsapp}

🖌️ *Details:*
${form.details}

🖼️ *Reference Image:*
${form.referenceImageUrl || "N/A"}`;

    // Encode message to preserve line breaks
    const encodedText = encodeURIComponent(text);

    // Detect mobile vs desktop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${adminNumber}&text=${encodedText}` // mobile app
      : `https://wa.me/${adminNumber}?text=${encodedText}`; // web

    // Open WhatsApp chat
    window.open(whatsappURL, "_blank");

    // Reset form and show success message
    setForm({
      name: "",
      phone: "",
      whatsapp: "",
      details: "",
      referenceImageUrl: "",
    });
    setMessage({
      type: "success",
      text: "Request sent to admin via WhatsApp ✅",
    });
  };

  return (
    <main className="min-h-screen bg-surface-base py-16 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <SEO
        title="Customize"
        description="Request your custom painting or handmade gift. Share your details and we'll create magic."
        url="https://thepainteddream.in/customize"
      />
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <form className="w-full max-w-2xl glass rounded-3xl p-8 sm:p-12 relative animate-fade-in-up">

        <header className="text-center mb-10">
          <span className="text-3xl mb-4 block">🎨</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Customize Your Order</h1>
          <p className="text-slate-500 font-medium">Have a specific vision? Share it with us and we'll bring it to life.</p>
        </header>

        {message.text && (
          <div
            className={`p-4 rounded-2xl text-sm font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-500 ${message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-100"
              : "bg-green-50 text-green-700 border border-green-100"
              }`}
          >
            {message.type === "success" ? "✓ " : "⚠ "}
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Your Name</label>
            <input
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all transition-duration-300"
              placeholder="E.g. Jane Doe"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Phone</label>
            <input
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all transition-duration-300"
              placeholder="E.g. 9876543210"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">WhatsApp Number</label>
          <input
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all transition-duration-300"
            placeholder="Same as phone or different"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1 mb-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Concept Details</label>
          <textarea
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all transition-duration-300 min-h-[120px]"
            rows="4"
            placeholder="Tell us about the size, colors, or pattern you have in mind..."
            name="details"
            value={form.details}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1 mb-10">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Reference Image (URL)</label>
          <input
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all transition-duration-300"
            placeholder="Link to a photo you love (optional)"
            name="referenceImageUrl"
            value={form.referenceImageUrl}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleWhatsAppClick}
          className="w-full bg-brand-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
        >
          Send Design Request
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest">
          We'll get back to you within 24 hours
        </p>
      </form>
    </main>

  );
}

export default Customize
