"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const sectors = [
  {
    title: "Industrial Scrap",
    desc: "Factory dismantling, heavy machinery, and bulk metal offcuts handled with industrial-grade logistics.",
    image: "/images/commercial/industrial.jpg",
    features: ["Heavy Machinery", "Bulk Logistics", "Factory Cleanouts"]
  },
  {
    title: "Corporate Scrap",
    desc: "Secure IT asset disposition, bulk e-waste, and office furniture removal for corporate campuses.",
    image: "/images/commercial/corporate.jpg",
    features: ["Data Destruction", "E-Waste Compliance", "Asset Recovery"]
  },
  {
    title: "Educational Scrap",
    desc: "Comprehensive cleanouts for schools and universities, from old desks to outdated computer labs.",
    image: "/images/commercial/educational.jpg",
    features: ["Campus Cleanouts", "Lab Equipment", "Library Purges"]
  },
  {
    title: "Banking Scrap",
    desc: "Highly secure paper shredding, server disposal, and sensitive equipment destruction for financial institutions.",
    image: "/images/commercial/banking.jpg",
    features: ["Secure Shredding", "Server Disposal", "Audit Trails"]
  },
  {
    title: "Construction Scrap",
    desc: "Site cleanups, TMT bar offcuts, and structural steel recycling for major construction projects.",
    image: "/images/commercial/construction.jpg",
    features: ["Site Cleanups", "Structural Steel", "Rubble Management"]
  },
  {
    title: "Vehicle Scrap",
    desc: "End-of-life vehicle dismantling and authorized scrapping for fleets and individual vehicles.",
    image: "/images/commercial/vehicle.jpg",
    features: ["Fleet Scrapping", "Certificate of Destruction", "Parts Recycling"]
  }
];

export function CommercialSectors() {
  return (
    <section className="py-12 bg-zinc-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 mb-4 leading-tight">
            Enterprise <span className="text-emerald-600">Scrap Solutions</span>
          </h2>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed">
            Tailored, high-volume scrap management for specific industries—from secure banking disposal to heavy industrial dismantling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector, idx) => (
            <motion.div 
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-1.5 border border-zinc-200/70 shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all flex flex-col cursor-pointer"
            >
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 flex-shrink-0">
                <div className="absolute inset-0 bg-zinc-200">
                  <Image 
                    src={sector.image}
                    alt={sector.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent"></div>
                <h3 className="absolute bottom-3 left-4 text-lg font-black text-white pr-4">{sector.title}</h3>
              </div>
              
              <div className="px-3 pb-4 flex-grow flex flex-col">
                <p className="text-zinc-500 text-xs md:text-sm font-medium mb-4 flex-grow leading-relaxed">{sector.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-zinc-100">
                  {sector.features.map(feature => (
                    <span key={feature} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100/50 rounded-lg text-[11px] font-black tracking-tight flex items-center gap-1 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors duration-300">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 group-hover:bg-white transition-colors duration-300"></span>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="https://wa.me/919550131958?text=Hello,%20I%20would%20like%20to%20request%20a%20corporate%20bulk%20pickup." 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-md group cursor-pointer"
          >
            Request Corporate Pickup
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
