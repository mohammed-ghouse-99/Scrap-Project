"use client";

import { motion } from "framer-motion";
import { Smartphone, Scale, Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    number: "01",
    icon: Smartphone,
    title: "Book in 30 Seconds",
    description: "Send a photo or input details via WhatsApp or our lead form. We coordinate a convenient doorstep slot instantly.",
  },
  {
    number: "02",
    icon: Scale,
    title: "Digital Weighing",
    description: "Our team arrives with certified digital weighing scales. We guarantee 100% accurate measurement right in front of you.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Instant UPI / Cash Payout",
    description: "Get paid instantly via GPay, PhonePe, Bank Transfer, or Cash on the spot before we load a single item.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-zinc-50 relative overflow-hidden border-t border-b border-zinc-100/80">
      {/* Background Graphic Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -translate-y-1/2 hidden md:block z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2 block">Simple Flow</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-zinc-900 leading-none">How It Works</h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto font-medium leading-relaxed">
            Experience a stress-free scrap collection process in Hyderabad. Three simple steps to cash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <Card className="h-full bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:border-zinc-200/80 p-8 rounded-3xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
                {/* Massive Number Outline */}
                <div className="absolute -top-3 -right-2 text-8xl font-black text-zinc-100 select-none opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
                  {step.number}
                </div>
                
                {/* Circular Icon Container */}
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-lg font-extrabold text-zinc-900 mb-3 relative z-10">{step.title}</h3>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
