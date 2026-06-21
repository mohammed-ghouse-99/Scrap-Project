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

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">MS Steel & Scrap Admin</h1>
            <p className="text-slate-500 mt-1">Manage scrap market rates and view incoming customer bookings.</p>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "rates" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addNewRate}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-colors cursor-pointer"
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
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition-colors cursor-pointer text-sm"
            >
              Logout
            </motion.button>
          </div>
        </header>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 mb-8 gap-6 text-sm font-semibold">
          <button
            onClick={() => { setActiveTab("rates"); setMessage(null); }}
            className={`pb-4 border-b-2 px-1 transition-all cursor-pointer ${
              activeTab === "rates"
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Scrap Rates Manager
          </button>
          <button
            onClick={() => { setActiveTab("pickups"); setMessage(null); }}
            className={`pb-4 border-b-2 px-1 transition-all cursor-pointer ${
              activeTab === "pickups"
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
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
                  ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                  : "bg-rose-50 border-rose-100 text-rose-800"
              }`}
            >
              {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              <span className="font-medium">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === "rates" ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price (₹)</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="px-6 py-4"><div className="h-10 bg-slate-100 rounded-lg w-full"></div></td>
                      </tr>
                    ))
                  ) : rates.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        No rates found. Click "Add New Item" to begin.
                      </td>
                    </tr>
                  ) : (
                    rates.map((rate, idx) => (
                      <tr key={rate.id || idx} className="hover:bg-slate-50/50 transition-colors">
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
                            className="w-full bg-transparent border-none focus:ring-0 font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none"
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
                            className="bg-slate-100/50 text-slate-600 text-sm rounded-lg border-none focus:ring-emerald-500 p-2 cursor-pointer focus:outline-none"
                          >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
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
                            className="w-24 bg-slate-100/50 text-slate-900 font-semibold rounded-lg border-none focus:ring-emerald-500 p-2 focus:outline-none"
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
                            className="w-16 bg-transparent border-none focus:ring-0 text-slate-500 text-sm focus:outline-none"
                          />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSave(rate)}
                              disabled={saving}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors inline-flex cursor-pointer"
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
                              className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-flex cursor-pointer"
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
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Material Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Weight</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pickupsLoading ? (
                    Array(4).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={8} className="px-6 py-4"><div className="h-10 bg-slate-100 rounded-lg w-full"></div></td>
                      </tr>
                    ))
                  ) : pickups.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                        No pickup requests recorded yet.
                      </td>
                    </tr>
                  ) : (
                    pickups.map((pickup) => (
                      <tr key={pickup.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(pickup.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2 font-medium text-slate-900">
                            <User size={16} className="text-slate-400" />
                            {pickup.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm whitespace-nowrap">
                          <span className="flex items-center gap-1.5">
                            <PhoneIcon size={14} className="text-slate-400" />
                            {pickup.phone || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-700 text-sm font-semibold">
                          {pickup.type}
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-slate-400" />
                            {pickup.location}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-900 font-semibold text-sm">
                          {pickup.weight}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={pickup.status}
                            onChange={(e) => handleUpdatePickupStatus(pickup.id, e.target.value)}
                            className={`text-xs font-bold rounded-full px-3 py-1.5 border cursor-pointer focus:outline-none transition-colors ${
                              pickup.status === "PENDING"
                                ? "bg-amber-50 text-amber-800 border-amber-200 focus:ring-amber-500"
                                : pickup.status === "COMPLETED"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200 focus:ring-emerald-500"
                                : "bg-rose-50 text-rose-800 border-rose-200 focus:ring-rose-500"
                            }`}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          {pickup.status === "COMPLETED" ? (
                            pickup.rating ? (
                              <div className="flex flex-col gap-0.5">
                                <div className="flex text-amber-400 gap-0.5">
                                  {Array(5).fill(0).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={12} 
                                      className={i < (pickup.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
                                    />
                                  ))}
                                </div>
                                {pickup.feedback && (
                                  <span className="text-[10px] text-slate-500 max-w-[120px] truncate block font-semibold" title={pickup.feedback}>
                                    {pickup.feedback}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => handleShareFeedback(pickup)}
                                className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md border border-emerald-200/50 transition-colors cursor-pointer"
                              >
                                <Share2 size={12} /> Request Review
                              </button>
                            )
                          ) : (
                            <span className="text-slate-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center">
          <button 
            onClick={activeTab === "rates" ? fetchRates : fetchPickups}
            className="text-slate-400 hover:text-emerald-600 flex items-center gap-2 mx-auto text-sm font-medium transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={(loading || pickupsLoading) ? "animate-spin" : ""} />
            Sync with Neon Database
          </button>
        </footer>
      </div>
    </div>
  );
}
