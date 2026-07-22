"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  RefreshCw, 
  Search, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Wallet, 
  Scale,
  ArrowRight
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

interface ScrapRate {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string | null;
}



const WAREHOUSE_MAPPING: Record<string, string> = {
  "Battery (Inverters)": "/images/warehouse/batteries.png",
  "Inverter Battery": "/images/warehouse/batteries.png",
  "Double Door Fridge": "/images/warehouse/double_door.png",
  "Single Door Fridge": "/images/warehouse/fridge_single_manual.png",
  "Front Load Washing Machine": "/images/warehouse/washing_machine_front.png",
  "Washing Machine": "/images/warehouse/Washing_machine.png",
  "Ceiling Fan / Motor": "/images/warehouse/ceiling_fan.jpg",
  "Books": "/images/warehouse/books.png",
  "Cardboard": "/images/warehouse/cardboard.jpg",
  "Plastic": "/images/warehouse/plastic.png",
  "Copper": "/images/warehouse/copper.png",
  "Aluminium": "/images/warehouse/aluminium.png",
  "Brass": "/images/warehouse/brass.png",
  "Heavy Iron": "/images/warehouse/iron_heavy.png",
  "Lightweight Iron": "/images/warehouse/iron_light.png",
  "Newspaper": "/images/warehouse/newspaper.png",
  "UPS": "/images/warehouse/ups.png",
  "DVD / E-Waste": "/images/warehouse/ewaste.jpg",
  "Microwave": "/images/warehouse/microwave.png",
};

export function Pricing() {
  const [rates, setRates] = useState<ScrapRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("/api/rates");
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setRates(data);
        }
      } catch (error) {
        console.error("Pricing fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(rates.map(r => r.category)));
    return ["All", ...cats];
  }, [rates]);

  const groupedRates = useMemo(() => {
    const list = rates.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === "All" || r.category === activeTab;
      return matchesSearch && matchesTab;
    });

    // Group by category
    const groups: Record<string, ScrapRate[]> = {};
    list.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [rates, search, activeTab]);

  return (
    <section id="pricing" className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        


        <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-600 font-bold tracking-tighter uppercase text-xs mb-2"
            >
              <div className="w-6 h-0.5 bg-emerald-600" />
              Official Market Rates
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-4 lowercase"
            >
              scrap <span className="text-emerald-600 italic">cycle</span> catalog.
            </motion.h2>
            <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-xl">
              Transparent, real-time pricing for industrial and household recyclables across Hyderabad.
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input 
                type="text" 
                placeholder="Search specific waste type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-zinc-50 border-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-emerald-500 rounded-2xl py-5 pl-12 pr-8 w-full lg:w-96 font-medium transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === cat 
                      ? "bg-zinc-900 text-white shadow-lg shadow-zinc-200" 
                      : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Catalog Content */}
        <div className="space-y-12 min-h-[600px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-400">
              <RefreshCw className="w-10 h-10 animate-spin text-emerald-500" />
              <p className="font-bold tracking-widest uppercase text-xs">Synchronizing with warehouse...</p>
            </div>
          ) : Object.keys(groupedRates).length > 0 ? (
            Object.entries(groupedRates).map(([category, items], catIdx) => (
              <div key={category} className="relative">
                <div className="sticky top-24 z-20 bg-white/80 backdrop-blur-md py-4 mb-10 border-b border-zinc-100 flex items-center justify-between">
                  <h3 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
                    <span className="text-emerald-500 opacity-20 font-black">0{catIdx + 1}</span>
                    {category}
                  </h3>
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{items.length} Items</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item, itemIdx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: itemIdx * 0.03 }}
                      viewport={{ once: true }}
                      className="group relative bg-white border border-zinc-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col"
                    >
                      {/* Image Container */}
                      <div className="relative h-32 md:h-36 w-full overflow-hidden flex-shrink-0">
                        {(() => {
                          const displayImage = WAREHOUSE_MAPPING[item.name.trim()] || item.image;
                          if (displayImage) {
                            return (
                              <div className="absolute inset-0 bg-zinc-100">
                                <Image 
                                  src={displayImage} 
                                  alt={item.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.95] group-hover:brightness-105"
                                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                              </div>
                            );
                          }
                          return (
                            <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center text-zinc-300">
                              <Zap size={24} strokeWidth={1.5} />
                            </div>
                          );
                        })()}
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter text-zinc-900">
                          {item.unit}
                        </div>
                      </div>

                      <div className="p-4 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="text-base md:text-lg font-bold text-zinc-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1">
                            {item.name}
                           </h4>
                        </div>

                        {item.name === "Plastic" && (
                          <div className="mb-2.5 flex flex-wrap gap-1 animate-in fade-in slide-in-from-bottom-1 duration-500">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 w-full mb-0.5">Grades</span>
                            {[5, 7, 12].map((p, i) => (
                              <div key={p} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[8px] font-black tracking-tight flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                                T{i + 1}: ₹{p}
                              </div>
                            ))}
                          </div>
                        )}

                        {item.name.trim() === "Washing Machine" && (
                          <div className="mb-2.5 flex flex-wrap gap-1 animate-in fade-in slide-in-from-bottom-1 duration-500">
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 w-full mb-0.5">Types</span>
                            <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[8px] font-black tracking-tight flex items-center gap-1">
                              Semi: ₹700
                            </div>
                            <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[8px] font-black tracking-tight flex items-center gap-1">
                              Front: ₹900
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-50">
                          <div className="flex flex-col">
                            <span className="text-zinc-400 text-[8px] font-black uppercase tracking-widest mb-0.5">Rate</span>
                            <span className="text-xl md:text-2xl font-black text-zinc-900 tabular-nums">₹{item.price}</span>
                          </div>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              const event = new CustomEvent("select-scrap-type", { detail: { name: item.name } });
                              window.dispatchEvent(event);
                              document.getElementById("sell-now")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer border-none"
                            title={`Book pickup for ${item.name}`}
                          >
                            <ArrowRight size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-zinc-100 rounded-[3rem]">
               <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No scrap items found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-zinc-900 rounded-3xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 group">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight italic">Have a bulk requirements?</h3>
            <p className="text-zinc-400 text-sm md:text-base">Special industrial rates available for quantities above 500kg.</p>
          </div>
          <button className="relative z-10 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-black px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 text-sm">
             Call for Quote <ArrowRight size={16} />
          </button>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 hidden md:block" />
        </div>

      </div>
    </section>
  );
}
