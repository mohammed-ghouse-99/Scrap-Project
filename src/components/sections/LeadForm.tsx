"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { formatWhatsAppLink } from "@/lib/utils";

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    weight: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setFormData({ name: "", type: "", location: "", weight: "" });
    } catch (err) {
      console.error("[LEAD_FORM] Failed to record pickup in DB:", err);
      // We do not throw or halt here, so we don't block the customer's WhatsApp experience.
    } finally {
      setSubmitting(false);
      const link = formatWhatsAppLink(formData);
      window.open(link, "_blank");
    }
  };

  return (
    <section id="sell-now" className="py-12 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-zinc-100">
          <div className="bg-primary p-8 md:w-2/5 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 italic tracking-tight uppercase leading-none">Book Your Pickup Today</h2>
              <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                Fill in the details and our team will get back to you within 30 minutes to confirm your pickup across Hyderabad.
              </p>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm leading-none mb-1">Fast Response</h4>
                  <p className="text-emerald-100 text-xs">Dedicated team for Hyderabad</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm leading-none mb-1">Accurate Scales</h4>
                  <p className="text-emerald-100 text-xs">Digital weighing guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Full Name</label>
                  <Input 
                    required
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Scrap Type</label>
                  <Input 
                    required
                    placeholder="e.g. Newspaper, Metal" 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Location (Area in Hyderabad)</label>
                <Input 
                  required
                  placeholder="e.g. Madhapur, Banjara Hills" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Approx Weight (kg)</label>
                <Input 
                  required
                  placeholder="e.g. 50kg, 100kg" 
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 h-12 text-base font-extrabold cursor-pointer" disabled={submitting}>
                {submitting ? "Booking Pickup..." : "Sell Scrap on WhatsApp"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
