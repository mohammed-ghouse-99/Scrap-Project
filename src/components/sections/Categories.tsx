"use client";

import { motion } from "framer-motion";
import { Newspaper, Martini, Hammer, Tablet, Factory, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

const categories = [
  {
    icon: Newspaper,
    title: "Paper Scrap",
    items: ["Newspapers", "Textbooks", "Cardboard Box Packaging"],
    tag: "100% Recyclable",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: Martini,
    title: "Plastics",
    items: ["PET Bottles", "LDPE Containers", "Hard Plastics"],
    tag: "Eco-Grade",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: Hammer,
    title: "High-Value Metals",
    items: ["Copper Wire", "Aluminium Offcuts", "Brass & Iron"],
    tag: "Premium Payout",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100/60",
  },
  {
    icon: Tablet,
    title: "Digital E-waste",
    items: ["Old Mobiles", "Laptops", "Inverter Batteries", "Wires"],
    tag: "Specialized",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-100",
  },
  {
    icon: Factory,
    title: "Bulk & Corporate",
    items: ["Industrial Machineries", "Construction Steel", "Office Assets"],
    tag: "Custom Rates",
    badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
];

export function Categories() {
  return (
    <section id="categories" className="py-16 bg-zinc-50 border-t border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">Our Catalog</span>
            <h2 className="text-3xl md:text-5xl font-black mb-3 text-zinc-900 leading-none">What We Collect</h2>
            <p className="text-zinc-500 text-sm font-medium">
              We accept a wide range of materials. Turn your household and commercial waste into immediate cash.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-100/60 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Eco-Friendly</span>
            <span className="px-3 py-1 bg-emerald-100/60 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Recyclable</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="h-full cursor-pointer group"
              onClick={() => {
                const element = document.getElementById("pricing");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <Card className="h-full border border-zinc-200/70 shadow-sm group-hover:shadow-lg group-hover:border-emerald-500/20 p-5 rounded-2xl bg-white flex flex-col justify-between transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-emerald-50 border border-emerald-100/50 rounded-xl flex items-center justify-center text-emerald-600 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${cat.badgeColor}`}>
                      {cat.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed font-semibold">
                      {cat.items.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 pt-4 mt-4 border-t border-zinc-100/50">
                  Check live pricing <ArrowRight size={12} className="text-emerald-500" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
