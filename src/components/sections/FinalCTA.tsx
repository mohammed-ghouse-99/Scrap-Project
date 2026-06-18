"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Turn Your Scrap into <br /> <span className="text-secondary tracking-tight italic">Instant Cash</span> Today
            </h2>
            <p className="text-emerald-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 1,000+ happy households in Hyderabad. Experience the most professional scrap collection service.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#sell-now" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:px-12 h-16 text-xl text-primary font-bold">
                  Sell Scrap Now
                </Button>
              </Link>
              <a href="tel:+919550131958" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white/10 sm:px-12 h-16 text-xl">
                  Call Us Directly
                </Button>
              </a>
            </div>
            
            <p className="mt-8 text-emerald-200/60 text-sm font-medium">
              Response time: &lt; 30 mins
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

