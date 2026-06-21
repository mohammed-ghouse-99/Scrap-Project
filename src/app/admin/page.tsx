"use client";

import { useState, useEffect } from "react";
import { Plus, Save, Trash2, RefreshCw, CheckCircle2, AlertCircle, Calendar, MapPin, User, Phone as PhoneIcon, Share2, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ScrapRate {
  id?: string;
  name: string;
  category: string;
  price: number | string;
  unit: string;
  image?: string;
}

interface Pickup {
  id: string;
  name: string;
  phone?: string | null;
  type: string;
  location: string;
  weight: string;
  status: string;
  rating?: number | null;
  feedback?: string | null;
  createdAt: string;
}

const CATEGORIES = ["Normal Recyclables", "Paper & Books", "Large Appliances", "Small Appliances", "Metals", "Bulk & Corporate", "Other"];

const CATEGORY_DEFAULTS: Record<string, string> = {
  "Normal Recyclables": "/images/warehouse/books.png",
  "Large Appliances": "/images/warehouse/double_door.png",
  "Small Appliances": "/images/warehouse/microwave.png",
  "Metals": "/images/scrap/metals.png",
  "Bulk & Corporate": "/images/scrap/metals.png",
  "Other": "/images/warehouse/plastic.png"
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  const [rates, setRates] = useState<ScrapRate[]>([]);
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [activeTab, setActiveTab] = useState<"rates" | "pickups">("rates");
  const [loading, setLoading] = useState(true);
  const [pickupsLoading, setPickupsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin_authenticated") === "true";
      if (isAuth) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRates();
      fetchPickups();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin9550") {
      localStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rates");
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setRates(data);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load rates" });
    } finally {
      setLoading(false);
    }
  };

  const fetchPickups = async () => {
    setPickupsLoading(true);
    try {
      const res = await fetch("/api/pickups");
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setPickups(data);
      }
    } catch (error) {
      console.error("Failed to load pickups:", error);
    } finally {
      setPickupsLoading(false);
    }
  };

  const handleSave = async (rate: ScrapRate) => {
    if (!rate.name || rate.name.trim() === "") {
      setMessage({ type: "error", text: "Item name cannot be empty." });
      return;
    }
    if (rate.price === undefined || rate.price === null || isNaN(Number(rate.price)) || Number(rate.price) < 0) {
      setMessage({ type: "error", text: "Price must be a valid positive number." });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rate),
      });

      if (res.ok) {
        setMessage({ type: "success", text: `${rate.name} updated successfully!` });
        fetchRates();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error saving rate" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePickupStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/pickups", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Pickup status updated successfully!" });
        fetchPickups();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update status" });
    }
  };

  const handleShareFeedback = (pickup: Pickup) => {
    let phoneVal = pickup.phone || "";
    if (!phoneVal) {
      const manualPhone = prompt(`No contact number is recorded for ${pickup.name}'s booking. Please enter their WhatsApp number (e.g. 9885263743):`);
      if (!manualPhone) return;
      phoneVal = manualPhone;
    }

    let cleanPhone = phoneVal.replace(/\D/g, "");
    if (cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone;
    }
    const origin = window.location.origin;
    const feedbackUrl = `${origin}/feedback/${pickup.id}`;
    const message = `Hi ${pickup.name}, thank you for choosing MS Steel & Scrap! Please take 10 seconds to rate your pickup experience here: ${feedbackUrl}`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const addNewRate = () => {
    const defaultCategory = "Metals";
    setRates([{ 
      name: "", 
      category: defaultCategory, 
      price: 0, 
      unit: "kg",
      image: CATEGORY_DEFAULTS[defaultCategory]
    }, ...rates]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background radial overlays */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#10b981 1.5px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10 text-center"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black italic text-white uppercase tracking-tight">
              Admin Access Gate
            </h2>
            <p className="text-zinc-400 text-xs mt-1 font-semibold">
              Enter your access key to manage MS Steel & Scrap
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                Access Key
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-zinc-950 border border-zinc-850 rounded-xl px-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-center font-bold tracking-widest"
              />
              {authError && (
                <p className="text-[10px] text-red-500 font-bold mt-1 text-center">
                  Invalid Access Key. Please try again.
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/10 transition-all border-none"
            >
              Verify & Unlock
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  const renderKanbanCard = (pickup: Pickup) => {
    return (
      <div
        key={pickup.id}
        draggable
        onDragStart={(e) => e.dataTransfer.setData("text/plain", pickup.id)}
        className="bg-zinc-950/60 border border-zinc-850 hover:border-emerald-500/30 p-4 rounded-2xl shadow-md cursor-grab active:cursor-grabbing hover:shadow-lg transition-all space-y-3 relative group"
      >
        {/* Date & Drag Handle Indicator */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Calendar size={12} className="text-zinc-600" />
            {new Date(pickup.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
          {/* Drag dots icon hint */}
          <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors font-bold">⠿ DRAG</span>
        </div>

        {/* Customer Details */}
        <div className="space-y-1">
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <User size={14} className="text-emerald-500" />
            {pickup.name}
          </h4>
          <p className="text-xs text-zinc-400 flex items-center gap-2 font-semibold">
            <PhoneIcon size={12} className="text-zinc-600" />
            {pickup.phone || "No Contact"}
          </p>
        </div>

        {/* Material & Weight */}
        <div className="bg-zinc-900/60 border border-zinc-850/50 rounded-xl p-2.5 space-y-1">
          <p className="text-[11px] text-zinc-400 font-bold leading-tight">
            <span className="text-zinc-600">Material:</span> {pickup.type}
          </p>
          <p className="text-[11px] text-zinc-400 font-bold">
            <span className="text-zinc-600">Est. Weight:</span> {pickup.weight}
          </p>
        </div>

        {/* Location */}
        <div className="text-xs text-zinc-400 flex items-center gap-1.5 font-semibold">
          <MapPin size={12} className="text-emerald-500" />
          <span>{pickup.location}</span>
        </div>

        {/* Action Controls & Rating display */}
        <div className="pt-2 border-t border-zinc-900 flex flex-col gap-2">
          {/* Touch fallback selector (quick move buttons) */}
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Quick Move:</span>
            <div className="flex gap-1">
              {pickup.status !== "PENDING" && (
                <button
                  onClick={() => handleUpdatePickupStatus(pickup.id, "PENDING")}
                  className="text-[9px] font-extrabold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-850 px-2 py-1 rounded-md border border-zinc-850 transition-colors cursor-pointer"
                  title="Revert to Pending"
                >
                  Pending
                </button>
              )}
              {pickup.status !== "COMPLETED" && (
                <button
                  onClick={() => handleUpdatePickupStatus(pickup.id, "COMPLETED")}
                  className="text-[9px] font-extrabold text-emerald-400 hover:text-white bg-emerald-950/20 hover:bg-emerald-900/30 px-2 py-1 rounded-md border border-emerald-900/30 transition-colors cursor-pointer"
                  title="Mark Completed"
                >
                  Complete
                </button>
              )}
              {pickup.status !== "CANCELLED" && (
                <button
                  onClick={() => handleUpdatePickupStatus(pickup.id, "CANCELLED")}
                  className="text-[9px] font-extrabold text-rose-400 hover:text-white bg-rose-950/20 hover:bg-rose-900/30 px-2 py-1 rounded-md border border-rose-900/30 transition-colors cursor-pointer"
                  title="Cancel Booking"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* WhatsApp share feedback / Star ratings */}
          {pickup.status === "COMPLETED" && (
            <div className="pt-1.5 border-t border-zinc-900/85">
              {pickup.rating ? (
                <div className="space-y-1">
                  <div className="flex text-amber-400 gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star 
                        key={i} 
                        size={11} 
                        className={i < (pickup.rating || 0) ? "fill-amber-400 text-amber-400" : "text-zinc-850"} 
                      />
                    ))}
                  </div>
                  {pickup.feedback && (
                    <span className="text-[10px] text-zinc-500 block italic leading-snug font-semibold" title={pickup.feedback}>
                      "{pickup.feedback}"
                    </span>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleShareFeedback(pickup)}
                  className="w-full flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 py-2 rounded-xl border border-emerald-500/10 hover:border-emerald-500/25 transition-all cursor-pointer"
                >
                  <Share2 size={11} /> Request Review
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#10b981 1.5px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black italic text-white uppercase tracking-tight">
              MS Steel & Scrap <span className="text-emerald-400">Admin</span>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm font-semibold">
              Manage scrap market rates and view incoming customer bookings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "rates" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addNewRate}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/10 transition-colors cursor-pointer text-sm border-none"
              >
                <Plus size={20} />
                Add New Item
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                localStorage.removeItem("admin_authenticated");
                setIsAuthenticated(false);
                setPassword("");
              }}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer text-xs border-none"
            >
              Logout
            </motion.button>
          </div>
        </header>

        {/* Tab Controls */}
        <div className="flex border-b border-zinc-850 mb-8 gap-6 text-sm font-semibold">
          <button
            onClick={() => { setActiveTab("rates"); setMessage(null); }}
            className={`pb-4 border-b-2 px-1 transition-all cursor-pointer ${
              activeTab === "rates"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Scrap Rates Manager
          </button>
          <button
            onClick={() => { setActiveTab("pickups"); setMessage(null); }}
            className={`pb-4 border-b-2 px-1 transition-all cursor-pointer ${
              activeTab === "pickups"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Pickup Bookings ({pickups.length})
          </button>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
                message.type === "success" 
                  ? "bg-emerald-950/40 border-emerald-800/40 text-emerald-300" 
                  : "bg-rose-950/40 border-rose-800/40 text-rose-300"
              }`}
            >
              {message.type === "success" ? <CheckCircle2 size={20} className="text-emerald-400" /> : <AlertCircle size={20} className="text-rose-400" />}
              <span className="font-semibold text-sm">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === "rates" ? (
          <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800/80 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950/80 border-b border-zinc-850">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Item Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Price (₹)</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Unit</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/60">
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="px-6 py-6"><div className="h-10 bg-zinc-800/50 rounded-xl w-full"></div></td>
                      </tr>
                    ))
                  ) : rates.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-zinc-500 font-semibold text-sm">
                        No rates found. Click "Add New Item" to begin.
                      </td>
                    </tr>
                  ) : (
                    rates.map((rate, idx) => (
                      <tr key={rate.id || idx} className="hover:bg-zinc-900/20 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={rate.name}
                            placeholder="e.g. Iron"
                            onChange={(e) => {
                              const newRates = [...rates];
                              newRates[idx].name = e.target.value;
                              setRates(newRates);
                            }}
                            className="w-full bg-zinc-950/50 border border-zinc-850 rounded-xl px-3 py-2 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-semibold"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={rate.category}
                            onChange={(e) => {
                              const newCategory = e.target.value;
                              const newRates = [...rates];
                              const oldCategory = newRates[idx].category;
                              
                              if (!newRates[idx].image || newRates[idx].image === CATEGORY_DEFAULTS[oldCategory]) {
                                newRates[idx].image = CATEGORY_DEFAULTS[newCategory];
                              }
                              
                              newRates[idx].category = newCategory;
                              setRates(newRates);
                            }}
                            className="bg-zinc-950/50 border border-zinc-850 text-zinc-300 text-sm rounded-xl focus:ring-emerald-500 p-2 cursor-pointer focus:outline-none font-semibold"
                          >
                            {CATEGORIES.map(c => <option key={c} value={c} className="bg-zinc-900 text-white">{c}</option>)}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={rate.price}
                            onChange={(e) => {
                              const newRates = [...rates];
                              newRates[idx].price = e.target.value;
                              setRates(newRates);
                            }}
                            className="w-24 bg-zinc-950/50 border border-zinc-850 text-white font-bold rounded-xl focus:ring-emerald-500 p-2 focus:outline-none text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={rate.unit}
                            onChange={(e) => {
                              const newRates = [...rates];
                              newRates[idx].unit = e.target.value;
                              setRates(newRates);
                            }}
                            className="w-16 bg-transparent border-none focus:ring-0 text-zinc-400 text-sm focus:outline-none font-semibold"
                          />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSave(rate)}
                              disabled={saving}
                              className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors inline-flex cursor-pointer border-none"
                            >
                              <Save size={20} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={async () => {
                                if (confirm(`Delete ${rate.name}?`)) {
                                  try {
                                    const res = await fetch(`/api/rates?id=${rate.id}`, { method: "DELETE" });
                                    if (res.ok) fetchRates();
                                  } catch (err) {
                                    setMessage({ type: "error", text: "Failed to delete" });
                                  }
                                }
                              }}
                              className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors inline-flex cursor-pointer border-none"
                            >
                              <Trash2 size={20} />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* COLUMN 1: PENDING */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("text/plain");
                if (id) handleUpdatePickupStatus(id, "PENDING");
              }}
              className="bg-zinc-900/30 border border-zinc-850 rounded-3xl p-5 backdrop-blur-md min-h-[500px] flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                <h3 className="font-extrabold text-sm text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Pending Requests
                </h3>
                <span className="bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {pickups.filter(p => p.status === "PENDING").length}
                </span>
              </div>
              
              <div className="flex-1 space-y-4 overflow-y-auto max-h-[700px] pr-1">
                {pickupsLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse bg-zinc-900/50 h-32 rounded-2xl border border-zinc-850" />
                  ))
                ) : pickups.filter(p => p.status === "PENDING").length === 0 ? (
                  <p className="text-zinc-600 text-xs text-center py-12 font-semibold">No pending requests</p>
                ) : (
                  pickups.filter(p => p.status === "PENDING").map(p => renderKanbanCard(p))
                )}
              </div>
            </div>

            {/* COLUMN 2: COMPLETED */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("text/plain");
                if (id) handleUpdatePickupStatus(id, "COMPLETED");
              }}
              className="bg-zinc-900/30 border border-zinc-850 rounded-3xl p-5 backdrop-blur-md min-h-[500px] flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                <h3 className="font-extrabold text-sm text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Completed Pickups
                </h3>
                <span className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {pickups.filter(p => p.status === "COMPLETED").length}
                </span>
              </div>
              
              <div className="flex-1 space-y-4 overflow-y-auto max-h-[700px] pr-1">
                {pickupsLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse bg-zinc-900/50 h-32 rounded-2xl border border-zinc-850" />
                  ))
                ) : pickups.filter(p => p.status === "COMPLETED").length === 0 ? (
                  <p className="text-zinc-600 text-xs text-center py-12 font-semibold">No completed pickups</p>
                ) : (
                  pickups.filter(p => p.status === "COMPLETED").map(p => renderKanbanCard(p))
                )}
              </div>
            </div>

            {/* COLUMN 3: CANCELLED */}
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const id = e.dataTransfer.getData("text/plain");
                if (id) handleUpdatePickupStatus(id, "CANCELLED");
              }}
              className="bg-zinc-900/30 border border-zinc-850 rounded-3xl p-5 backdrop-blur-md min-h-[500px] flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                <h3 className="font-extrabold text-sm text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Cancelled Bookings
                </h3>
                <span className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  {pickups.filter(p => p.status === "CANCELLED").length}
                </span>
              </div>
              
              <div className="flex-1 space-y-4 overflow-y-auto max-h-[700px] pr-1">
                {pickupsLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse bg-zinc-900/50 h-32 rounded-2xl border border-zinc-850" />
                  ))
                ) : pickups.filter(p => p.status === "CANCELLED").length === 0 ? (
                  <p className="text-zinc-600 text-xs text-center py-12 font-semibold">No cancelled bookings</p>
                ) : (
                  pickups.filter(p => p.status === "CANCELLED").map(p => renderKanbanCard(p))
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center relative z-10 pb-8">
          <button 
            onClick={activeTab === "rates" ? fetchRates : fetchPickups}
            className="text-zinc-500 hover:text-emerald-400 flex items-center gap-2 mx-auto text-sm font-semibold transition-colors cursor-pointer bg-transparent border-none"
          >
            <RefreshCw size={14} className={(loading || pickupsLoading) ? "animate-spin" : ""} />
            Sync with Neon Database
          </button>
        </footer>
      </div>
    </div>
  );
}
