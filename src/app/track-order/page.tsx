"use client";

import { useState } from "react";
import { 
  Package, Truck, CheckCircle2, Search, 
  MapPin, Clock, Calendar, ArrowLeft 
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";

// --- Mock Data: အော်ဒါအခြေအနေ နမူနာ ---
const MOCK_ORDER = {
  id: "BOO-12345",
  status: "Shipping", // 'Processing', 'Shipping', 'Delivered'
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

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 💡 တကယ့် API နဲ့ ချိတ်ဆက်ပြီး အချက်အလက်ယူရမည့်နေရာ
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FCFBFA] text-[#2C2926]">
      <main className="container mx-auto px-6 max-w-4xl pt-32 pb-20">
        
        {/* Back Button & Title */}
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-[#A09080] transition-colors mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif italic">Track Your Magic.</h1>
          <p className="text-gray-400 text-sm mt-2 font-light">Enter your order ID to see the journey of your gift.</p>
        </div>

        {/* --- TRACKING INPUT --- */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-gray-100 mb-10">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-[#A09080] transition-colors" />
              <input 
                type="text" 
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="ORDER ID (E.G. BOO-12345)"
                className="w-full bg-gray-50 border-none outline-none py-4 pl-12 pr-6 rounded-2xl text-xs font-bold tracking-widest uppercase focus:ring-2 focus:ring-[#A09080]/20 transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#2C2926] text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#A09080] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-black/10"
            >
              {isLoading ? "Searching..." : "Track Journey"}
            </button>
          </form>
        </section>

        {/* --- RESULTS SECTION --- */}
        <AnimatePresence>
          {showResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Order Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Order Date</p>
                    <p className="text-sm font-bold">{MOCK_ORDER.orderDate}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Estimated Delivery</p>
                    <p className="text-sm font-bold">{MOCK_ORDER.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Ship To</p>
                    <p className="text-sm font-bold truncate">{MOCK_ORDER.address}</p>
                  </div>
                </div>
              </div>

              {/* Status Stepper */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col gap-10">
                  {MOCK_ORDER.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative">
                      {/* Vertical Line Connector */}
                      {idx !== MOCK_ORDER.steps.length - 1 && (
                        <div className={cn(
                          "absolute left-6 top-10 w-[2px] h-full",
                          step.completed ? "bg-emerald-500" : "bg-gray-100"
                        )} />
                      )}
                      
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors shrink-0",
                        step.completed ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-300"
                      )}>
                        {step.completed ? <CheckCircle2 className="w-6 h-6" /> : <Package className="w-5 h-5" />}
                      </div>

                      <div className="flex flex-col justify-center">
                        <h4 className={cn("text-base font-bold transition-colors", step.completed ? "text-[#2C2926]" : "text-gray-300")}>
                          {step.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Floating Decoration */}
                <Truck className="absolute -bottom-6 -right-6 w-40 h-40 text-gray-50 opacity-[0.03] -rotate-12" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </div>
  );
}