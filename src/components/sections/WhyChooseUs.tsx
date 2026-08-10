"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Scale, MapPin } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Secure & Regulated",
    description: "Licensed scrap handlers ensuring compliance, proper recycling, and safety first.",
  },
  {
    icon: Zap,
    title: "On-Demand 60m Pickup",
    description: "Scheduled or immediate pickup windows across Hyderabad with status updates.",
  },
  {
    icon: Scale,
    title: "Precision Digital Weighing",
    description: "Verified digital weighing scales. We pay accurately for every gram.",
  },
  {
    icon: MapPin,
    title: "Local Hyderabad Network",
    description: "Deep local logistics ensuring fast responses and friendly, native support.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 1.5px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black mb-3 leading-tight text-zinc-900"
          >
            Why 1,000+ Hyderabadis <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 italic font-black">
              trust ScrapEarn.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium"
          >
            We've brought modernization and corporate transparency to the recycling market. No more price guessing or manual scales.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center text-center p-6 bg-zinc-50/50 border border-zinc-200/70 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center flex-shrink-0 text-emerald-600 shadow-sm mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                <f.icon className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-base text-zinc-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">{f.title}</h4>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-semibold">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
