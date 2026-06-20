"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatWhatsAppLink } from "@/lib/utils";
import { User, Phone, Package, MapPin, Zap, Scale, Sparkles } from "lucide-react";

const WEIGHT_OPTIONS = [
  { value: "Under 30kg", label: "Small (<30kg)", desc: "e.g., books, newspapers, laptop" },
  { value: "30kg - 150kg", label: "Medium (30-150kg)", desc: "e.g., washing machine, fridge, AC" },
  { value: "Above 150kg", label: "Bulk (>150kg)", desc: "e.g., warehouse scrap, office dismantle" },
];

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "",
    location: "",
    weight: "Under 30kg",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "", location: "" };

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
      isValid = false;
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
      isValid = false;
    }

    if (formData.location.trim().length < 3) {
      newErrors.location = "Please specify your area/location.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/pickups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }
      
      // Clear form on success
      setFormData({ name: "", phone: "", type: "", location: "", weight: "Under 30kg" });
    } catch (err) {
      console.error("[LEAD_FORM] Failed to record pickup in DB:", err);
    } finally {
      setSubmitting(false);
      const link = formatWhatsAppLink(formData);
      window.open(link, "_blank");
    }
  };

  return (
    <section id="sell-now" className="py-20 bg-zinc-50 relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-zinc-100/80">
          
          {/* Left Panel: High-Impact Trust Card */}
          <div className="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 p-10 md:w-2/5 text-white flex flex-col justify-between overflow-hidden border-r border-zinc-800/40">
            {/* Subtle background grid lines */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#10b981 1.5px, transparent 0)`,
                backgroundSize: '24px 24px'
              }}
            />
            {/* Ambient green glow */}
            <div className="absolute -left-16 -top-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Doorstep Collection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 italic tracking-tight uppercase leading-none">
                Book Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  Pickup Today
                </span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Fill in the details and our support team will get back to you within 30 minutes to confirm your pickup across Hyderabad.
              </p>
            </div>
            
            <div className="space-y-6 mt-12 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-400 shadow-inner">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm tracking-tight mb-0.5">Fast Response</h4>
                  <p className="text-zinc-400 text-xs font-semibold">Dedicated team for Hyderabad</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 text-emerald-400 shadow-inner">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm tracking-tight mb-0.5">Accurate Scales</h4>
                  <p className="text-zinc-400 text-xs font-semibold">Digital weighing guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Intake Form */}
          <div className="p-10 md:w-3/5 flex flex-col justify-center bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <Input 
                      required
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`pl-10 border-zinc-200 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 ${errors.name ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <Input 
                      required
                      type="tel"
                      placeholder="e.g. 9885263743" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`pl-10 border-zinc-200 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Scrap Type and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Scrap Type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Scrap Type</label>
                  <div className="relative">
                    <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <Input 
                      required
                      placeholder="e.g. Newspaper, Metal" 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="pl-10 border-zinc-200 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Location (Area in Hyderabad)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <Input 
                      required
                      placeholder="e.g. Madhapur, Banjara Hills" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className={`pl-10 border-zinc-200 focus-visible:ring-emerald-500 ${errors.location ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                  </div>
                  {errors.location && <p className="text-[10px] text-red-500 font-semibold">{errors.location}</p>}
                </div>
              </div>

              {/* Weight Grid */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Approx Weight Estimate</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {WEIGHT_OPTIONS.map((opt) => {
                    const isSelected = formData.weight === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, weight: opt.value })}
                        className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500/5 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500"
                            : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        <span className={`text-xs font-black tracking-tight ${isSelected ? "text-emerald-700" : "text-zinc-800"}`}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-1 leading-normal font-semibold">
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full gap-2.5 h-14 text-base font-black cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-2xl shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center border-none" 
                disabled={submitting}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.588 1.974 14.12 1.95 12.01 1.95c-5.437 0-9.863 4.373-9.867 9.802-.001 1.761.47 3.479 1.365 5.011L2.43 20.21l3.228-.847c1.554.849 3.033 1.246 4.708 1.25l.001-.001zM17.47 14.39c-.299-.149-1.778-.875-2.046-.974-.269-.099-.465-.149-.661.15-.196.299-.759.974-.93.1.171-.199.199-.395.498-.545.299-.15 1.778-.875 2.046-.974.269-.099.465-.149.661.15.196.299.759.974.93.1.171-.199.199-.395.498-.545.299-.15.89-.444 1.264-.616.374-.173.57-.123.668.025.099.149.395.964.498 1.162.102.198.154.42.077.568-.077.15-.346.299-.568.299-.222 0-.616-.226-1.21-.759-.465-.414-.778-.925-.869-1.077-.091-.152-.01-.234.065-.309.068-.067.15-.173.225-.26.075-.086.1-.149.15-.247.05-.099.025-.185-.012-.26-.037-.075-.328-.791-.45-1.085-.12-.29-.251-.251-.345-.256-.089-.005-.192-.005-.296-.005-.104 0-.274.039-.417.195-.143.156-.547.534-.547 1.302 0 .767.558 1.508.636 1.614.078.106 1.099 1.678 2.662 2.355.372.162.662.258.891.332.373.118.713.101.982.061.301-.045.922-.377 1.05-.742.128-.365.128-.677.089-.742-.039-.065-.143-.104-.442-.253z"/>
                </svg>
                {submitting ? "Booking Pickup..." : "Sell Scrap on WhatsApp"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
