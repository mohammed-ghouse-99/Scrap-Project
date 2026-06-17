"use client";

import { motion } from "framer-motion";
import { Newspaper, Martini, Hammer, Tablet, Factory } from "lucide-react";
import { Card } from "@/components/ui/Card";

const categories = [
  {
    icon: Newspaper,
    title: "Newspaper",
    items: ["Daily Papers", "Magazines", "Cardboard"],
    color: "bg-blue-50 text-blue-600",
    tag: "Recyclable",
  },
  {
    icon: Martini,
    title: "Plastic",
    items: ["Bottles", "Containers", "Hard Plastic"],
    color: "bg-orange-50 text-orange-600",
    tag: "Recyclable",
  },
  {
    icon: Hammer,
    title: "Metal",
    items: ["Iron", "Aluminum", "Copper", "Brass"],
    color: "bg-zinc-100 text-zinc-800",
    tag: "High Value",
  },
  {
    icon: Tablet,
    title: "E-waste",
    items: ["Mobiles", "Laptops", "Batteries", "Wires"],
    color: "bg-purple-50 text-purple-600",
    tag: "Tech Scrap",
  },
  {
    icon: Factory,
    title: "Bulk & Corporate",
    items: ["Industrial", "Construction", "Office Assets"],
    color: "bg-emerald-50 text-emerald-600",
    tag: "Bulk Rates",
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
            >
              <Card className="h-full border border-zinc-100 shadow-sm hover:shadow-md hover:border-zinc-200 p-5 rounded-2xl bg-white flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center shadow-inner`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-md">
                      {cat.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-zinc-900 mb-1.5">{cat.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed font-medium">
                    {cat.items.join(", ")}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
