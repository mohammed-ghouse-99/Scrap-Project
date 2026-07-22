"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Cyber Towers.",
    role: "Corporate Office",
    text: "ScrapEarn handled our IT scrap professionally and provided proper documentation for secure disposal.",
    rating: 5,
  },
  {
    id: 2,
    name: "Balaji Traders",
    role: "Industrial Plant",
    text: "We generate tons of metal scrap monthly. ScrapEarn set up dedicated bins and their logistics are flawless. Best rates in Hyderabad.",
    rating: 5,
  },
  {
    id: 3,
    name: "Success The School",
    role: "Educational Institution",
    text: "Clearing out decades of old desks, computers, and paper was a daunting task.",
    rating: 5,
  },
  {
    id: 4,
    name: "Canara Bank",
    role: "Banking Sector",
    text: "Secure paper shredding and hard drive destruction were our top priorities.",
    rating: 5,
  },
  {
    id: 5,
    name: "Red Rose Constructions",
    role: "Construction Firm",
    text: "Efficient removal of TMT bar offcuts and site debris. They keep our sites clean and provide great value for our scrap steel.",
    rating: 4,
  },
];

// Duplicate the array to create a seamless infinite loop
const repeatedReviews = [...reviews, ...reviews, ...reviews];

export function Reviews() {
  return (
    <section className="py-12 bg-zinc-950 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950"></div>

      <div className="container mx-auto px-4 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Industry Leaders</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-medium">
            See what our enterprise partners have to say about our bulk collection and corporate disposal services.
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex gap-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {repeatedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[350px] md:w-[450px] flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-800/80 transition-colors"
            >
              <div className="flex text-emerald-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < review.rating ? "fill-emerald-500" : "fill-zinc-700 text-zinc-700"}
                  />
                ))}
              </div>
              <Quote className="text-zinc-700 w-10 h-10 mb-4" />
              <p className="text-zinc-300 text-lg mb-8 leading-relaxed font-medium">"{review.text}"</p>
              <div className="mt-auto border-t border-zinc-800 pt-6">
                <h4 className="text-white font-bold text-lg">{review.name}</h4>
                <p className="text-emerald-500 text-sm font-black uppercase tracking-widest mt-1">
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades for Marquee Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
