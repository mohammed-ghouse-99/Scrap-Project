"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/75 border-b border-zinc-900/60 backdrop-blur-md text-white transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="group-hover:rotate-6 transition-transform duration-300">
            <Logo className="w-8 h-8" />
          </div>
          <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">ScrapEarn</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm font-bold text-zinc-300 hover:text-emerald-400 transition-colors relative group py-2">
            How It Works
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
          <Link href="#pricing" className="text-sm font-bold text-zinc-300 hover:text-emerald-400 transition-colors relative group py-2">
            Pricing
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
          <Link href="#categories" className="text-sm font-bold text-zinc-300 hover:text-emerald-400 transition-colors relative group py-2">
            What We Take
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="#sell-now">
            <Button size="sm" className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 border-none text-zinc-950 font-black px-6 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-105 cursor-pointer">
              Sell Now
            </Button>
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-zinc-300 hover:text-white transition-colors focus:outline-none cursor-pointer bg-transparent border-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 bg-zinc-950/95 border-b border-zinc-900/60 backdrop-blur-2xl px-6 py-6 shadow-2xl flex flex-col gap-4 text-white z-40 md:hidden"
            >
              <Link 
                href="#how-it-works" 
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-zinc-300 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-900"
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-zinc-300 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-900"
              >
                Pricing
              </Link>
              <Link 
                href="#categories" 
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-zinc-300 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-900"
              >
                What We Take
              </Link>
              <Link 
                href="#sell-now"
                onClick={() => setIsOpen(false)}
                className="mt-2"
              >
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-black py-3.5 rounded-xl cursor-pointer">
                  Sell Now
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
