"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  ShoppingBag, Plus, Minus, Check, 
  Sparkles, RotateCcw, ChevronRight, ChevronLeft,
  CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";
import { useCartStore } from "@/store/useCartStore";

// --- STUDIO DATA CONFIGURATION ---
const STUDIO_DATA: any = {
  rose: {
    name: "Premium Rose",
    colors: [
      { id: "red", name: "Ruby Red", hex: "#B91C1C" },
      { id: "yellow", name: "Bright Yellow", hex: "#FACC15" },
      { id: "pink", name: "Soft Pink", hex: "#F472B6" },
    ],
    images: {
      "5-red": [
        "/images/F/R/RR5/1.png",
        "/images/F/R/RR5/2.png",
        "/images/F/R/RR5/3.png",
        "/images/F/R/RR5/4.png",
        "/images/F/R/RR5/5.png",
      ],
      "6-red": [
        "/images/F/R/RR6/1.png",
        "/images/F/R/RR6/2.png",
        "/images/F/R/RR6/3.png",
        "/images/F/R/RR6/4.png",
        "/images/F/R/RR6/5.png",
      ],
      "7-red": [
        "/images/F/R/RR7/1.png",
        "/images/F/R/RR7/2.png",
        "/images/F/R/RR7/3.png",
        "/images/F/R/RR7/4.png",
        "/images/F/R/RR7/5.png",
      ],
      "8-red": [
        "/images/F/R/RR8/1.png",
        "/images/F/R/RR8/2.png",
        "/images/F/R/RR8/3.png",
        "/images/F/R/RR8/4.png",
        "/images/F/R/RR8/5.png",,
      ],
      "9-red": [
        "/images/F/R/RR9/1.png",
        "/images/F/R/RR9/2.png",
        "/images/F/R/RR9/3.png",
        "/images/F/R/RR9/4.png",
        "/images/F/R/RR9/5.png",
      ],
      "10-red": [
        "/images/F/R/RR10/1.png",
        "/images/F/R/RR10/2.png",
        "/images/F/R/RR10/3.png",
        "/images/F/R/RR10/4.png",
        "/images/F/R/RR10/5.png",
      ],
      "5-yellow": [
        "/images/F/R/RY5/1.png",
        "/images/F/R/RY5/2.png",
        "/images/F/R/RY5/3.png",
        "/images/F/R/RY5/4.png",
        "/images/F/R/RY5/5.png",
      ],
      "6-yellow": [
        "/images/F/R/RY6/1.png",
        "/images/F/R/RY6/2.png",
        "/images/F/R/RY6/3.png",
        "/images/F/R/RY6/4.png",
        "/images/F/R/RY6/5.png",
      ],
      "7-yellow": [
        "/images/F/R/RY7/1.png",
        "/images/F/R/RY7/2.png",
        "/images/F/R/RY7/3.png",
        "/images/F/R/RY7/4.png",
        "/images/F/R/RY7/5.png",
      ],
      "8-yellow": [
        "/images/F/R/RY8/1.png",
        "/images/F/R/RY8/2.png",
        "/images/F/R/RY8/3.png",
        "/images/F/R/RY8/4.png",
        "/images/F/R/RY8/5.png",
      ],
      "9-yellow": [
        "/images/F/R/RY9/1.png",
        "/images/F/R/RY9/2.png",
        "/images/F/R/RY9/3.png",
        "/images/F/R/RY9/4.png",
        "/images/F/R/RY9/5.png",
      ],
      "10-yellow": [
        "/images/F/R/RY10/1.png",
        "/images/F/R/RY10/2.png",
        "/images/F/R/RY10/3.png",
        "/images/F/R/RY10/4.png",
        "/images/F/R/RY10/5.png",
      ],
      "5-pink": [
        "/images/F/R/RP5/1.png",
        "/images/F/R/RP5/2.png",
        "/images/F/R/RP5/3.png",
        "/images/F/R/RP5/4.png",
        "/images/F/R/RP5/5.png",
      ],
      "6-pink": [
        "/images/F/R/RP6/1.png",
        "/images/F/R/RP6/2.png",
        "/images/F/R/RP6/3.png",
        "/images/F/R/RP6/4.png",
        "/images/F/R/RP6/5.png",
      ],
      "7-pink": [
        "/images/F/R/RP7/1.png",
        "/images/F/R/RP7/2.png",
        "/images/F/R/RP7/3.png",
        "/images/F/R/RP7/4.png",
        "/images/F/R/RP7/5.png",
      ],
      "8-pink": [
        "/images/F/R/RP8/1.png",
        "/images/F/R/RP8/2.png",
        "/images/F/R/RP8/3.png",
        "/images/F/R/RP8/4.png",
        "/images/F/R/RP8/5.png",
      ],
      "9-pink": [
        "/images/F/R/RP9/1.png",
        "/images/F/R/RP9/2.png",
        "/images/F/R/RP9/3.png",
        "/images/F/R/RP9/4.png",
        "/images/F/R/RP9/5.png",
      ],
      "10-pink": [
        "/images/F/R/RP10/1.png",
        "/images/F/R/RP10/2.png",
        "/images/F/R/RP10/3.png",
        "/images/F/R/RP10/4.png",
        "/images/F/R/RP10/5.png",
      ],

      
    }
  },
  lily: {
    name: "Elegant Lily",
    colors: [
      { id: "white", name: "Pure White", hex: "#F8FAFC" },
      { id: "pink", name: "Deep Maroon", hex: "#c746ad" },
      { id: "red", name: "White Pink Mix", hex: "#d71442" },
    ],
    images: {
      "5-white": [
        "/images/F/L/LW5/1.png",
        "/images/F/L/LW5/2.png",
        "/images/F/L/LW5/3.png",
        "/images/F/L/LW5/4.png",
        "/images/F/L/LW5/5.png", 
      ],
      "6-white": [
        "/images/F/L/LW6/1.png",
        "/images/F/L/LW6/2.png",
        "/images/F/L/LW6/3.png",
        "/images/F/L/LW6/4.png",
        "/images/F/L/LW6/5.png", 
      ],
      "7-white": [
        "/images/F/L/LW7/1.png",
        "/images/F/L/LW7/2.png",
        "/images/F/L/LW7/3.png",
        "/images/F/L/LW7/4.png",
        "/images/F/L/LW7/5.png", 
      ],
      "8-white": [
        "/images/F/L/LW8/1.png",
        "/images/F/L/LW8/2.png",
        "/images/F/L/LW8/3.png",
        "/images/F/L/LW8/4.png",
        "/images/F/L/LW8/5.png", 
      ],
      "9-white": [
        "/images/F/L/LW9/1.png",
        "/images/F/L/LW9/2.png",
        "/images/F/L/LW9/3.png",
        "/images/F/L/LW9/4.png",
        "/images/F/L/LW9/5.png", 
      ],
      "10-white": [
        "/images/F/L/LW10/1.png",
        "/images/F/L/LW10/2.png",
        "/images/F/L/LW10/3.png",
        "/images/F/L/LW10/4.png",
        "/images/F/L/LW10/5.png", 
      ],
      "5-pink": [
        "/images/F/L/LP5/1.png",
        "/images/F/L/LP5/2.png",
        "/images/F/L/LP5/3.png",
        "/images/F/L/LP5/4.png",
        "/images/F/L/LP5/5.png", 
      ],
      "6-pink": [
        "/images/F/L/LP6/1.png",
        "/images/F/L/LP6/2.png",
        "/images/F/L/LP6/3.png",
        "/images/F/L/LP6/4.png",
        "/images/F/L/LP6/5.png", 
      ],
      "7-pink": [
        "/images/F/L/LW7/1.png",
        "/images/F/L/LW7/2.png",
        "/images/F/L/LW7/3.png",
        "/images/F/L/LW7/4.png",
        "/images/F/L/LW7/5.png", 
      ],
      "8-pink": [
        "/images/F/L/LW8/1.png",
        "/images/F/L/LW8/2.png",
        "/images/F/L/LW8/3.png",
        "/images/F/L/LW8/4.png",
        "/images/F/L/LW8/5.png", 
      ],
      "9-pink": [
        "/images/F/L/LW9/1.png",
        "/images/F/L/LW9/2.png",
        "/images/F/L/LW9/3.png",
        "/images/F/L/LW9/4.png",
        "/images/F/L/LW9/5.png", 
      ],
      "10-pink": [
        "/images/F/L/LW10/1.png",
        "/images/F/L/LW10/2.png",
        "/images/F/L/LW10/3.png",
        "/images/F/L/LW10/4.png",
        "/images/F/L/LW10/5.png", 
      ],
      "5-red": [
        "/images/F/L/LR5/1.png",
        "/images/F/L/LR5/2.png",
        "/images/F/L/LR5/3.png",
        "/images/F/L/LR5/4.png",
        "/images/F/L/LR5/5.png",
        
      ],
      "6-red": [
        "/images/F/L/LR6/1.png",
        "/images/F/L/LR6/2.png",
        "/images/F/L/LR6/3.png",
        "/images/F/L/LR6/4.png",
        "/images/F/L/LR6/5.png",
      ],
      "7-red": [
        "/images/F/L/LR7/1.png",
        "/images/F/L/LR7/2.png",
        "/images/F/L/LR7/3.png",
        "/images/F/L/LR7/4.png",
        "/images/F/L/LR7/5.png",
      ],
      "8-red": [
        "/images/F/L/LR8/1.png",
        "/images/F/L/LR8/2.png",
        "/images/F/L/LR8/3.png",
        "/images/F/L/LR8/4.png",
        "/images/F/L/LR8/5.png",
      ],
      "9-red": [
        "/images/F/L/LR9/1.png",
        "/images/F/L/LR8/2.png",
        "/images/F/L/LR9/3.png",
        "/images/F/L/LR9/4.png",
        "/images/F/L/LR9/5.png",
      ],
      "10-red": [
        "/images/F/L/LR10/1.png",
        "/images/F/L/LR10/2.png",
        "/images/F/L/LR10/3.png",
        "/images/F/L/LR10/4.png",
        "/images/F/L/LR10/5.png",
      ],
    }
  },
  lotus: {
    name: "Sacred Lotus",
    colors: [
      { id: "pink", name: "Lotus Pink", hex: "#FBCFE8" },
      { id: "white", name: "Sacred White", hex: "#FFFFFF" },
      { id: "purple", name: "Purple Lotus", hex: "#e95dc3" },
    ],
    images: {
      "5-pink": [
        "/images/F/Lo/lp5/1.png",
        "/images/F/Lo/lp5/2.png",
        "/images/F/Lo/lp5/3.png",
        "/images/F/Lo/lp5/4.png",
        "/images/F/Lo/lp5/5.png",
      ],
      "6-pink": [
        "/images/F/Lo/lp6/1.png",
        "/images/F/Lo/lp6/2.png",
        "/images/F/Lo/lp6/3.png",
        "/images/F/Lo/lp6/4.png",
        "/images/F/Lo/lp6/5.png",
      ],
      "7-pink": [
        "/images/F/Lo/lp7/1.png",
        "/images/F/Lo/lp7/2.png",
        "/images/F/Lo/lp7/3.png",
        "/images/F/Lo/lp7/4.png",
        "/images/F/Lo/lp7/5.png",
      ],
      "8-pink": [
        "/images/F/Lo/lp8/1.png",
        "/images/F/Lo/lp8/2.png",
        "/images/F/Lo/lp8/3.png",
        "/images/F/Lo/lp8/4.png",
        "/images/F/Lo/lp8/5.png",
      ],
      "9-pink": [
        "/images/F/Lo/lp9/1.png",
        "/images/F/Lo/lp9/2.png",
        "/images/F/Lo/lp9/3.png",
        "/images/F/Lo/lp9/4.png",
        "/images/F/Lo/lp9/5.png",
      ],
      "10-pink": [
        "/images/F/Lo/lp10/1.png",
        "/images/F/Lo/lp10/2.png",
        "/images/F/Lo/lp10/3.png",
        "/images/F/Lo/lp10/4.png",
        "/images/F/Lo/lp10/5.png"
      ],
      "5-white": [
        "/images/F/Lo/lw5/1.png",
        "/images/F/Lo/lw5/2.png",
        "/images/F/Lo/lw5/3.png",
        "/images/F/Lo/lw5/4.png",
        "/images/F/Lo/lw5/5.png",
      ],
      "6-white": [
       "/images/F/Lo/lw6/1.png",
        "/images/F/Lo/lw6/2.png",
        "/images/F/Lo/lw6/3.png",
        "/images/F/Lo/lw6/4.png",
        "/images/F/Lo/lw6/5.png",
      ],
      "7-white": [
        "/images/F/Lo/lw7/1.png",
        "/images/F/Lo/lw7/2.png",
        "/images/F/Lo/lw7/3.png",
        "/images/F/Lo/lw7/4.png",
        "/images/F/Lo/lw7/5.png",
      ],
      "8-white": [
        "/images/F/Lo/lw8/1.png",
        "/images/F/Lo/lw8/2.png",
        "/images/F/Lo/lw8/3.png",
        "/images/F/Lo/lw8/4.png",
        "/images/F/Lo/lw8/5.png",
      ],
      "9-white": [
        "/images/F/Lo/lw9/1.png",
        "/images/F/Lo/lw9/2.png",
        "/images/F/Lo/lw9/3.png",
        "/images/F/Lo/lw9/4.png",
        "/images/F/Lo/lw9/5.png",
      ],
      "10-white": [
        "/images/F/Lo/lw10/1.png",
        "/images/F/Lo/lw10/2.png",
        "/images/F/Lo/lw10/3.png",
        "/images/F/Lo/lw10/4.png",
        "/images/F/Lo/lw10/5.png",
      ],
      "5-purple": [
        "/images/F/Lo/pl5/1.png",
        "/images/F/Lo/pl5/2.png",
        "/images/F/Lo/pl5/3.png",
        "/images/F/Lo/pl5/4.png",
        "/images/F/Lo/pl5/5.png",
      ],
      "6-purple": [
        "/images/F/Lo/pl6/1.png",
        "/images/F/Lo/pl6/2.png",
        "/images/F/Lo/pl6/3.png",
        "/images/F/Lo/pl6/4.png",
        "/images/F/Lo/pl6/5.png",
      ],
      "7-purple": [
        "/images/F/Lo/pl7/1.png",
        "/images/F/Lo/pl7/2.png",
        "/images/F/Lo/pl7/3.png",
        "/images/F/Lo/pl7/4.png",
        "/images/F/Lo/pl7/5.png",
      ],
      "8-purple": [
        "/images/F/Lo/pl8/1.png",
        "/images/F/Lo/pl8/2.png",
        "/images/F/Lo/pl8/3.png",
        "/images/F/Lo/pl8/4.png",
        "/images/F/Lo/pl8/5.png",
      ],
      "9-purple": [
        "/images/F/Lo/pl9/1.png",
        "/images/F/Lo/pl9/2.png",
        "/images/F/Lo/pl9/3.png",
        "/images/F/Lo/pl9/4.png",
        "/images/F/Lo/pl9/5.png",
      ],
      "10-purple": [
        "/images/F/Lo/pl10/1.png",
        "/images/F/Lo/pl10/2.png",
        "/images/F/Lo/pl10/3.png",
        "/images/F/Lo/pl10/4.png",
        "/images/F/Lo/pl10/5.png",
      ],

    
    }
  }
};

export default function StudioPage() {
  const { addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [flowerType, setFlowerType] = useState("rose");
  const [count, setCount] = useState(5);
  const [colorId, setColorId] = useState("red");
  const [styleIndex, setStyleIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const currentFlowerData = STUDIO_DATA[flowerType];
  const currentColor = useMemo(() => currentFlowerData.colors.find((c: any) => c.id === colorId) || currentFlowerData.colors[0], [flowerType, colorId]);
  const availableStyles = useMemo(() => {
    const key = `${count}-${currentColor.id}`;
    return currentFlowerData.images[key] || ["/images/studio/placeholder.png"];
  }, [flowerType, count, currentColor]);

  const currentPreviewImage = availableStyles[styleIndex] || availableStyles[0];

  const handleReset = () => { setCount(5); setFlowerType("rose"); setColorId("red"); setStyleIndex(0); };
  const handleAddToCart = () => {
    const bespokeItem = { id: `bespoke-${Date.now()}`, name: `Bespoke ${currentFlowerData.name}`, price: count * 4500 + 10000, img: currentPreviewImage, quantity: 1, details: `${count} blooms, ${currentColor.name}` };
    addToCart(bespokeItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!mounted) return null;

  return (
    <main className="flex flex-col w-full min-h-screen relative overflow-x-hidden antialiased">
      <div 
        className="fixed inset-0 z-[-1] w-full h-full"
        style={{
          background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
          backgroundSize: "400% 400%",
          animation: "bgFlow 10s ease infinite",
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes bgFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}} />

      <div className="flex-1 flex flex-col pt-32 pb-20">
        <AnimatePresence>
          {showToast && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-28 right-6 z-[100] bg-[#2C2926] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
              <CheckCircle2 className="w-5 h-5 text-[#D09478]" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D09478]">Success</p>
                <p className="text-xs font-semibold">Added to Shopping Bag!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-6 max-w-[1200px]">
          <header className="mb-12 flex flex-col items-center">
            <div className="flex items-center gap-2 text-[#2C2926]/60 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Bespoke Studio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif italic text-center text-[#2C2926] font-medium">Customize Your Bouquet</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* PREVIEW */}
            <div className="space-y-6">
              <div className="relative aspect-square w-full max-w-[480px] mx-auto rounded-[2.5rem] overflow-hidden bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40">
                <AnimatePresence mode="wait">
                  <motion.img key={currentPreviewImage} src={currentPreviewImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full object-cover" alt="Preview" />
                </AnimatePresence>
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button onClick={() => setStyleIndex(prev => (prev > 0 ? prev - 1 : availableStyles.length - 1))} className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md shadow-lg flex items-center justify-center pointer-events-auto hover:bg-white active:scale-90 transition-all">
                    <ChevronLeft className="w-5 h-5 text-[#2C2926]" />
                  </button>
                  <button onClick={() => setStyleIndex(prev => (prev < availableStyles.length - 1 ? prev + 1 : 0))} className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md shadow-lg flex items-center justify-center pointer-events-auto hover:bg-white active:scale-90 transition-all">
                    <ChevronRight className="w-5 h-5 text-[#2C2926]" />
                  </button>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar max-w-[480px] mx-auto">
                {availableStyles.map((img: string, idx: number) => (
                  <button key={idx} onClick={() => setStyleIndex(idx)} className={cn("min-w-[84px] aspect-square rounded-xl overflow-hidden border-2 transition-all shadow-sm", styleIndex === idx ? "border-[#2C2926] scale-105" : "border-white/40 opacity-50")}>
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
            </div>

            {/* PANEL */}
            <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/60 shadow-inner space-y-8 max-w-[500px] mx-auto lg:mx-0">
              <section className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/40">1. Flower Species</h3>
                <div className="grid grid-cols-3 gap-2.5">
                  {Object.keys(STUDIO_DATA).map((type) => (
                    <button key={type} onClick={() => { setFlowerType(type); setColorId(STUDIO_DATA[type].colors[0].id); setStyleIndex(0); }} className={cn("py-3.5 rounded-xl border text-[11px] font-semibold uppercase tracking-wider transition-all", flowerType === type ? "bg-[#2C2926] text-white shadow-lg" : "bg-white/40 text-[#2C2926]/60 border-white/40 hover:bg-white/60")}>{type}</button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/40">2. Bloom Count</h3>
                <div className="flex items-center justify-between bg-white/30 p-5 rounded-2xl border border-white/60 shadow-sm">
                  <button disabled={count <= 5} onClick={() => { setCount(count - 1); setStyleIndex(0); }} className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors shadow-sm"><Minus className="w-4 h-4 text-[#2C2926]" /></button>
                  <div className="text-center">
                    <span className="text-3xl font-serif text-[#2C2926] font-medium">{count}</span>
                    <span className="text-[9px] uppercase font-bold text-[#2C2926]/40 ml-2">Blooms</span>
                  </div>
                  <button disabled={count >= 10} onClick={() => { setCount(count + 1); setStyleIndex(0); }} className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors shadow-sm"><Plus className="w-4 h-4 text-[#2C2926]" /></button>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/40">3. Select Shade</h3>
                  <span className="text-[10px] font-semibold text-[#D09478] uppercase italic tracking-wide">{currentColor.name}</span>
                </div>
                <div className="flex gap-4">
                  {currentFlowerData.colors.map((c: any) => (
                    <button key={c.id} onClick={() => { setColorId(c.id); setStyleIndex(0); }} className={cn("w-11 h-11 rounded-full border-2 transition-all flex items-center justify-center shadow-md", currentColor.id === c.id ? "border-[#2C2926] scale-110 ring-2 ring-white" : "border-white/60")} style={{ backgroundColor: c.hex }}>
                      {currentColor.id === c.id && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </section>

              <div className="pt-8 border-t border-white/20">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#2C2926]/40 mb-1">Estimated Price</p>
                    <p className="text-3xl font-serif text-[#2C2926] font-medium">{(count * 4500 + 10000).toLocaleString()} <span className="text-sm font-sans opacity-40">MMK</span></p>
                  </div>
                  <button onClick={handleReset} className="text-[10px] font-bold uppercase text-[#2C2926]/30 hover:text-red-400 transition-colors flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Reset</button>
                </div>
                <button onClick={handleAddToCart} className="w-full bg-[#2C2926] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#D09478] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98]">
                  <ShoppingBag className="w-4 h-4" /> 
                  Add to Shopping bag 
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}