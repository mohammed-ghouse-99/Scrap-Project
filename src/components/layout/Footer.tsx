import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-10 pb-12 px-6 text-zinc-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        
        {/* Brand Column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-white">ScrapEarn</span>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xs">
            Eco-friendly scrap collection service serving households and businesses across Hyderabad. Turn your waste into instant cash.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://wa.me/919550131958" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
              title="Chat on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.029 14.12 1.01 11.5 1.01c-5.45 0-9.88 4.419-9.883 9.848 0 1.748.478 3.456 1.385 4.966L2.025 21.8l6.196-1.62c.162.086.326.171.493.254z" />
              </svg>
            </a>
            <a 
              href="mailto:support@scrapearn.com" 
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
              title="Email Support"
            >
              <Mail size={16} />
            </a>
          </div>
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
            <p className="flex flex-col">
              <span className="font-bold text-zinc-300">Working Hours:</span>
              <span>Mon - Sun: 9:00 AM - 7:00 PM</span>
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
            <Link href="/admin" className="hover:text-emerald-400 transition-colors pt-2 border-t border-zinc-900 mt-1 font-semibold">Staff Login</Link>
          </div>
        </div>

        {/* Founder Card Column */}
        <div className="lg:col-span-4 bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden">
          <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-emerald-500/20 shadow-2xl mb-4">
            <Image
              src="/images/founder.jpg"
              alt="Mohammed Ghouse - Founder & CEO"
              fill
              className="object-cover scale-105"
              sizes="(max-width: 768px) 160px, 160px"
            />
          </div>
          <div>
            <h4 className="font-black text-lg text-white">Mohammed Ghouse</h4>
            <p className="text-xs text-emerald-400 font-black uppercase tracking-wider mt-0.5">Founder & CEO</p>
            <p className="text-[11px] text-zinc-400 font-medium leading-relaxed max-w-[240px] mx-auto mt-3">
              Committed to bringing professional, transparent, and eco-friendly scrap management to Hyderabad.
            </p>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-zinc-900 text-center">
        <p className="text-xs text-zinc-500 font-semibold">
          © {new Date().getFullYear()} ScrapEarn. All rights reserved. Locally serving Hyderabad.
        </p>
      </div>
    </footer>
  );
}
