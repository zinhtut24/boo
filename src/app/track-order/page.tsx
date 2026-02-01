"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";
import { 
  Package, Truck, CheckCircle2, Search, 
  MapPin, Clock, Calendar, ArrowLeft, Heart, Sparkles, Loader2, 
  ArrowRight // 💡 ဒီကောင်လေးကို ထပ်ဖြည့်ပေးပါ
} from "lucide-react";

// --- Mock Data ---
const MOCK_ORDER = {
  id: "BOO-12345",
  status: "Shipping", 
  estimatedDelivery: "Feb 02, 2026",
  orderDate: "Jan 28, 2026",
  address: "No. 123, Pyay Road, Yangon",
  steps: [
    { name: "Order Placed", date: "Jan 28, 10:00 AM", completed: true },
    { name: "Processing", date: "Jan 29, 02:30 PM", completed: true },
    { name: "Out for Delivery", date: "Jan 30, 09:00 AM", completed: true },
    { name: "Delivered", date: "Pending", completed: false },
  ]
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResult(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 1500);
  };

  // 💡 --- BLING BLING HEARTS BACKGROUND ---
  const BlingHearts = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ 
            scale: [0.5, 1.2, 0.5], 
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 20, -20, 0]
          }}
          transition={{ duration: Math.random() * 3 + 3, repeat: Infinity }}
        >
          <Heart fill={i % 2 === 0 ? "#FFC0CB" : "#FFFFFF"} className="text-white/20" size={Math.random() * 15 + 15} />
        </motion.div>
      ))}
    </div>
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden">
      {/* 💡 --- ANIMATED BACKGROUND --- */}
      <div 
        className="fixed inset-0 z-[-1] w-full h-full"
        style={{
          background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
          backgroundSize: "400% 400%",
          animation: "bgFlow 15s ease infinite",
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes bgFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }` }} />

      <BlingHearts />

      <main className="flex-1 container mx-auto px-6 pt-32 pb-20 max-w-5xl relative z-10">
        
        {/* Back Button & Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link href="/" className="flex items-center gap-2 text-[#2C2926]/60 hover:text-[#A09080] transition-colors mb-6 group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl md:text-6xl font-serif italic text-[#2C2926]">Track Your Magic</h1>
            <Sparkles className="text-[#D09478] w-6 h-6 animate-pulse" />
          </div>
          <p className="text-[#2C2926]/50 text-sm font-light italic">Follow the journey of your special gift.</p>
        </motion.div>

        {/* --- TRACKING INPUT (Frosted Glass) --- */}
        <section className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-5">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2926]/40 group-focus-within:text-[#D09478] transition-colors" />
              <input 
                type="text" 
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="ENTER ORDER ID (E.G. BOO-12345)"
                className="w-full bg-white/60 border-none outline-none py-5 pl-14 pr-6 rounded-2xl text-[11px] font-bold tracking-[0.2em] uppercase focus:ring-2 focus:ring-[#D09478]/30 transition-all text-[#2C2926] placeholder:text-[#2C2926]/30 shadow-inner"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#2C2926] text-white px-12 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A09080] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#D09478]" />
              ) : (
                <>Track Journey <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </section>

        {/* --- RESULTS SECTION --- */}
        <AnimatePresence mode="wait">
          {showResult && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-10"
            >
              {/* Order Info Cards (Glassmorphism) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { icon: Calendar, label: "Order Date", val: MOCK_ORDER.orderDate, color: "text-blue-500", bg: "bg-blue-50/50" },
                  { icon: Clock, label: "Estimated Delivery", val: MOCK_ORDER.estimatedDelivery, color: "text-amber-500", bg: "bg-amber-50/50" },
                  { icon: MapPin, label: "Ship To", val: MOCK_ORDER.address, color: "text-emerald-500", bg: "bg-emerald-50/50" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 flex items-center gap-5 shadow-sm transition-transform hover:scale-[1.02]">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", item.bg, item.color)}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="truncate">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#2C2926]/40 mb-1">{item.label}</p>
                      <p className="text-sm font-bold text-[#2C2926] truncate">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Stepper */}
              <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white/60 shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col gap-12">
                  {MOCK_ORDER.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-8 relative group">
                      {/* Vertical Line Connector */}
                      {idx !== MOCK_ORDER.steps.length - 1 && (
                        <div className={cn(
                          "absolute left-7 top-14 w-[3px] h-full rounded-full transition-colors duration-1000",
                          step.completed ? "bg-emerald-400" : "bg-gray-200/50"
                        )} />
                      )}
                      
                      <div className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-700 shrink-0 shadow-lg",
                        step.completed ? "bg-emerald-500 text-white scale-110" : "bg-white text-gray-200"
                      )}>
                        {step.completed ? <CheckCircle2 className="w-7 h-7" /> : <Package className="w-6 h-6" />}
                      </div>

                      <div className="flex flex-col justify-center">
                        <h4 className={cn("text-lg font-serif transition-colors duration-700 italic", step.completed ? "text-[#2C2926]" : "text-gray-300")}>
                          {step.name}
                        </h4>
                        <p className={cn("text-xs font-bold uppercase tracking-widest mt-1 transition-colors", step.completed ? "text-[#A09080]" : "text-gray-300")}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Decoration Icons */}
                <Truck className="absolute -bottom-10 -right-10 w-64 h-64 text-[#A09080] opacity-[0.05] -rotate-12 pointer-events-none" />
                <img src="/images/bubududu1.png" className="absolute top-10 right-10 w-24 opacity-10 grayscale" alt="" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}