"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Scale, Wallet, MapPin, Zap } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "1",
    icon: Smartphone,
    title: "Book in 30 Seconds",
    description: "Send photos or details via WhatsApp or our lead form. Slot scheduled instantly.",
  },
  {
    number: "2",
    icon: Scale,
    title: "Digital Weighing",
    description: "Our team arrives with certified digital scales. 100% accurate doorside weights.",
  },
  {
    number: "3",
    icon: Wallet,
    title: "Instant Payout",
    description: "Get paid via UPI (GPay/PhonePe) or cash before we load a single item.",
  },
];

export function Hero() {
  return (
    <section id="how-it-works" className="relative pt-24 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-zinc-950 text-white">
      {/* Premium Dark Tech Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(22, 163, 74, 0.15) 1px, transparent 0), linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 0), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 0)`,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }}
      />
      
      {/* Glowing Neon Blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Brand Value Proposition */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="inline-flex self-start items-center gap-2 bg-emerald-950/60 border border-emerald-900/50 px-4 py-2 rounded-full mb-6"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-black uppercase tracking-widest text-[9px]">Serving All of Hyderabad</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05] lowercase"
            >
              sell your scrap the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 italic font-black relative overflow-hidden inline-block pb-1">
                smart way.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed font-medium"
            >
              Professional doorstep pickup across Hyderabad. Get accurate digital weighing, transparent market rates, and instant cash payment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-row flex-wrap items-center gap-4"
            >
              <Link href="#sell-now" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 px-8 py-6 rounded-xl text-base font-bold shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 border-none text-zinc-950 cursor-pointer transform hover:scale-[1.02] transition-all duration-300">
                  Sell Scrap Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="#pricing" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 rounded-xl text-base font-bold border-zinc-800 hover:border-zinc-700 bg-transparent text-white cursor-pointer hover:bg-zinc-900 transition-all duration-300">
                  Check Rate Catalog
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-3 gap-4"
            >
              {[
                { title: "5,000+ kgs", desc: "Recycled Monthly" },
                { title: "Digital Scales", desc: "100% Certified" },
                { title: "UPI / Cash", desc: "Instant Payout" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black text-white">{stat.title}</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-1">{stat.desc}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Right Side: How It Works Process Card */}
          <div className="lg:col-span-5 relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-300">3 Steps to Cash</span>
                </div>
                <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest">MS PROCESS</span>
              </div>

              {/* Timeline Container */}
              <div className="relative space-y-6">
                {/* Vertical connected line */}
                <div className="absolute left-5 top-5 bottom-5 w-[1.5px] bg-gradient-to-b from-emerald-500/80 via-emerald-500/30 to-emerald-500/5 -translate-x-1/2 z-0 hidden sm:block" />

                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start relative z-10 group">
                    {/* Circle Number */}
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-950/50 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 font-black text-xs shadow-inner group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-400 transition-all duration-300">
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-white flex items-center gap-1.5 group-hover:text-emerald-400 transition-colors">
                        <step.icon className="w-3.5 h-3.5 text-emerald-500" />
                        {step.title}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-semibold mt-1 leading-relaxed">
                        {step.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mini Booking Feed */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 bg-zinc-950/30 -mx-6 -mb-6 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="text-emerald-500 w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Recent Pickups Log</span>
                </div>
                
                <div className="overflow-hidden h-7 relative">
                  <motion.div
                    animate={{ y: [0, -28, -56, 0] }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="space-y-1 absolute left-0 right-0"
                  >
                    <div className="text-[10px] font-medium text-zinc-400 flex justify-between h-6 items-center">
                      <span>Madhapur: 140kg Iron</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1"><Zap size={8} /> Completed</span>
                    </div>
                    <div className="text-[10px] font-medium text-zinc-400 flex justify-between h-6 items-center">
                      <span>Gachibowli: 35kg E-Waste</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1"><Zap size={8} /> Completed</span>
                    </div>
                    <div className="text-[10px] font-medium text-zinc-400 flex justify-between h-6 items-center">
                      <span>Secunderabad: 80kg Brass</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1"><Zap size={8} /> Completed</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
