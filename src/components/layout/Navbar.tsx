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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="bg-zinc-950/70 border border-zinc-800/60 backdrop-blur-xl rounded-full px-6 py-2.5 flex items-center justify-between shadow-2xl shadow-black/40 text-white">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="group-hover:rotate-6 transition-transform duration-350">
              <Logo className="w-8 h-8" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">MS Steel & Scrap</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm font-semibold text-zinc-300 hover:text-emerald-400 transition-colors relative group py-2">
              How It Works
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
            <Link href="#pricing" className="text-sm font-semibold text-zinc-300 hover:text-emerald-400 transition-colors relative group py-2">
              Pricing
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
            <Link href="#categories" className="text-sm font-semibold text-zinc-300 hover:text-emerald-400 transition-colors relative group py-2">
              What We Take
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#sell-now">
              <Button size="sm" className="hidden sm:flex bg-emerald-500 hover:bg-emerald-600 border-none text-zinc-950 font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-105">
                Sell Now
              </Button>
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1 text-zinc-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 mt-3 bg-zinc-950/95 border border-zinc-800/80 backdrop-blur-2xl rounded-3xl p-6 shadow-3xl flex flex-col gap-4 text-white z-40 md:hidden"
            >
              <Link 
                href="#how-it-works" 
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-zinc-300 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-900"
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-zinc-300 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-900"
              >
                Pricing
              </Link>
              <Link 
                href="#categories" 
                onClick={() => setIsOpen(false)}
                className="text-base font-semibold text-zinc-300 hover:text-emerald-400 transition-colors py-2 border-b border-zinc-900"
              >
                What We Take
              </Link>
              <Link 
                href="#sell-now"
                onClick={() => setIsOpen(false)}
                className="mt-2"
              >
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold py-3 rounded-xl">
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
