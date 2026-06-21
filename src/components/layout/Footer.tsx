import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-10 pb-12 px-6 text-zinc-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        
        {/* Brand Column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-white">MS Steel & Scrap</span>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xs">
            Eco-friendly scrap collection service serving households and businesses across Hyderabad. Turn your waste into instant cash.
          </p>
        </div>

        {/* Contact Us Column */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Contact Us</h4>
          <div className="space-y-3 text-xs md:text-sm text-zinc-400">
            <p className="flex flex-col">
              <span className="font-bold text-zinc-300">Location:</span>
              <span>Shah Ali Banda, Hyderabad, India</span>
            </p>
            <p className="flex flex-col">
              <span className="font-bold text-zinc-300">Customer Support:</span>
              <a href="tel:+919550131958" className="hover:text-emerald-400 transition-colors">+91 9550131958</a>
            </p>
            <p className="flex flex-col">
              <span className="font-bold text-zinc-300">Contact Number:</span>
              <a href="tel:+919885263743" className="hover:text-emerald-400 transition-colors">+91 9885263743</a>
            </p>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2 text-xs md:text-sm text-zinc-400">
            <Link href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link>
            <Link href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing List</Link>
            <Link href="#categories" className="hover:text-emerald-400 transition-colors">What We Take</Link>
            <Link href="#commercial-sectors" className="hover:text-emerald-400 transition-colors">Enterprise Solutions</Link>
            <Link href="#why-us" className="hover:text-emerald-400 transition-colors">Why Choose Us</Link>
            <Link href="#sell-now" className="hover:text-emerald-400 transition-colors">Book Free Pickup</Link>
          </div>
        </div>

        {/* Founder Card Column */}
        <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
          <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-emerald-500/20 shadow-2xl mb-4">
            <Image
              src="/images/founder.jpg"
              alt="Founder"
              fill
              className="object-cover scale-105"
              sizes="(max-width: 768px) 160px, 160px"
            />
          </div>
          <div>
            <h4 className="font-black text-base text-white">Chief Executive Officer</h4>
            <p className="text-[11px] text-zinc-400 font-medium leading-relaxed max-w-[240px] mx-auto mt-2">
              Committed to bringing professional, eco-friendly scrap management to Hyderabad.
            </p>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-zinc-900 text-center">
        <p className="text-xs text-zinc-500 font-semibold">
          © {new Date().getFullYear()} MS Steel & Scrap. All rights reserved. Locally serving Hyderabad.
        </p>
      </div>
    </footer>
  );
}
