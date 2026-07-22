"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, AlertTriangle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";

interface PickupDetails {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  rating: number | null;
  feedback: string | null;
}

export default function FeedbackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [pickup, setPickup] = useState<PickupDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadDetails() {
      try {
        const res = await fetch(`/api/pickups/feedback?id=${id}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load pickup details.");
        }
        const data = await res.json();
        setPickup(data);

        // Pre-fill rating if they already reviewed
        if (data.rating) {
          setRating(data.rating);
          setComment(data.feedback || "");
          setSubmitted(true);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/pickups/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupId: id,
          rating,
          feedback: comment,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit feedback.");
      }

      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-zinc-950 text-white min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 1.5px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 relative z-10"
          >
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            <p className="text-zinc-400 text-sm font-semibold">Loading your pickup details...</p>
          </motion.div>
        )}

        {!loading && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative z-10 flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-tight italic">Review Link Invalid</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {error === "Feedback can only be submitted for completed pickups" 
                ? "This review link will become active once your scrap pickup is marked as completed by our team."
                : "The review link you clicked is invalid or has expired. Please check with support."
              }
            </p>
            <Button
              onClick={() => window.close()}
              className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl px-6 py-2.5 w-full font-bold transition-all border-none"
            >
              Close Window
            </Button>
          </motion.div>
        )}

        {!loading && !error && pickup && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10"
          >
            {/* Header / Brand */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="flex items-center gap-1.5 mb-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Service Review
              </div>
              <h2 className="text-2xl font-black italic text-white uppercase tracking-tight">
                ScrapEarn
              </h2>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center gap-4 py-6"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl flex items-center justify-center text-emerald-400 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-white uppercase tracking-tight">Review Submitted!</h3>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
                  Thank you, <strong>{pickup.name}</strong>! Your rating of {rating} stars helps us maintain our government-certified scale verification standards.
                </p>
                <Button
                  onClick={() => window.close()}
                  className="mt-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl px-6 py-2.5 w-full font-bold transition-all border-none"
                >
                  Done
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pickup details summary card */}
                <div className="bg-zinc-950/40 border border-zinc-800/40 rounded-2xl p-4 text-center">
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Recent Pickup</p>
                  <h4 className="text-sm font-extrabold text-white">
                    {pickup.type}
                  </h4>
                  <p className="text-zinc-400 text-xs mt-0.5 font-semibold">
                    {pickup.location} • customer: {pickup.name}
                  </p>
                </div>

                {/* Rating Stars Interaction */}
                <div className="flex flex-col items-center gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Rate Your Experience
                  </label>
                  <div className="flex gap-2.5 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = hoveredRating !== null ? star <= hoveredRating : star <= rating;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(null)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform duration-200 active:scale-95 cursor-pointer relative"
                        >
                          <Star
                            className={`w-9 h-9 transition-colors duration-200 ${
                              isActive 
                                ? "fill-amber-400 text-amber-400 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" 
                                : "text-zinc-700 hover:text-zinc-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest mt-2 h-4">
                    {rating === 5 && "Excellent! ⭐⭐⭐⭐⭐"}
                    {rating === 4 && "Very Good! ⭐⭐⭐⭐"}
                    {rating === 3 && "Average! ⭐⭐⭐"}
                    {rating === 2 && "Poor! ⭐⭐"}
                    {rating === 1 && "Terrible! ⭐"}
                  </span>
                </div>

                {/* Testimonial Textarea */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Write a testimonial (Optional)
                  </label>
                  <Textarea
                    placeholder="e.g. Prompt arrival, scale accuracy checked, fast cash payout!"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500 min-h-[90px]"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/10 transition-all border-none"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
