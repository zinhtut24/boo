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
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "6-red": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "7-red": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "8-red": [
        "/images/red/8/8.jpg",
        "/images/red/8/81.jpg",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "9-red": [
        "/images/red/9/9.jpg",
        "/images/red/9/91.jpg",
        "/images/",
        "/images/",
        "/images/",
      ],
      "10-red": [
        "/images/red/10/10.jpg",
        "/images/red/10/101.jpg",
        "/images/red/10/102.jpg",
        "/images/red/10/1001.jpg",
        "/images/red/10/10001.png",
      ],
      "5-yellow": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "6-yellow": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "7-yellow": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "8-yellow": [
        "/images/red/8/8.jpg",
        "/images/red/8/81.jpg",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "9-yellow": [
        "/images/red/9/9.jpg",
        "/images/red/9/91.jpg",
        "/images/",
        "/images/",
        "/images/",
      ],
      "10-yellow": [
        "/images/red/10/10.jpg",
        "/images/red/10/101.jpg",
        "/images/red/10/102.jpg",
        "/images/red/10/1001.jpg",
        "/images/red/10/10001.png",
      ],
      "5-pink": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "6-pink": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "7-pink": [
        "/images/studio/rose-5-red-s1.png",
        "/images/studio/rose-5-red-s2.png",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "8-pink": [
        "/images/red/8/8.jpg",
        "/images/red/8/81.jpg",
        "/images/studio/rose-5-red-s3.png",
        "/images/studio/rose-5-red-s4.png",
        "/images/studio/rose-5-red-s5.png",
      ],
      "9-pink": [
        "/images/red/9/9.jpg",
        "/images/red/9/91.jpg",
        "/images/",
        "/images/",
        "/images/",
      ],
      "10-pink": [
        "/images/red/10/10.jpg",
        "/images/red/10/101.jpg",
        "/images/red/10/102.jpg",
        "/images/red/10/1001.jpg",
        "/images/red/10/10001.png",
      ],
    }
  },
  lily: {
    name: "Elegant Lily",
    colors: [
      { id: "white", name: "Pure White", hex: "#F8FAFC" },
      { id: "maroon", name: "Deep Maroon", hex: "#4C0519" },
      { id: "whitepink", name: "White Pink Mix", hex: "#FFD1DC" },
    ],
    images: {
      "5-white": [
        "/images/studio/lily-5-white-s1.png", "/images/studio/lily-5-white-s2.png"
      ],
      "6-white": [
        "/images/studio/lily-5-white-s1.png", "/images/studio/lily-5-white-s2.png"
      ],
      "7-white": [
        "/images/studio/lily-5-white-s1.png", "/images/studio/lily-5-white-s2.png"
      ],
      "8-white": [
        "/images/studio/lily-5-white-s1.png", "/images/studio/lily-5-white-s2.png"
      ],
      "9-white": [
        "/images/studio/lily-5-white-s1.png", "/images/studio/lily-5-white-s2.png"
      ],
      "10-white": [
        "/images/studio/lily-5-white-s1.png", "/images/studio/lily-5-white-s2.png"
      ],
    }
  },
  lotus: {
    name: "Sacred Lotus",
    colors: [
      { id: "pink", name: "Lotus Pink", hex: "#FBCFE8" },
      { id: "white", name: "Sacred White", hex: "#FFFFFF" },
    ],
    images: {
      "5-pink": ["/images/studio/lotus-5-pink-s1.png", "/images/studio/lotus-5-pink-s2.png"],
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentFlowerData = STUDIO_DATA[flowerType];
  
  const currentColor = useMemo(() => {
    return currentFlowerData.colors.find((c: any) => c.id === colorId) || currentFlowerData.colors[0];
  }, [flowerType, colorId]);

  const availableStyles = useMemo(() => {
    const key = `${count}-${currentColor.id}`;
    return currentFlowerData.images[key] || ["/images/studio/placeholder.png"];
  }, [flowerType, count, currentColor]);

  const currentPreviewImage = availableStyles[styleIndex] || availableStyles[0];

  const handleReset = () => {
    setCount(5);
    setFlowerType("rose");
    setColorId("red");
    setStyleIndex(0);
  };

  const handleAddToCart = () => {
    const bespokeItem = {
      id: `bespoke-${Date.now()}`, 
      name: `Bespoke ${currentFlowerData.name}`,
      price: count * 4500 + 10000,
      img: currentPreviewImage, 
      quantity: 1,
      details: `${count} blooms, ${currentColor.name}` 
    };
    addToCart(bespokeItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!mounted) return null;

  return (
    <main 
      className="flex flex-col w-full min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(-45deg, #cb967d, #f5c9ea, #edf7c1, #e5c5b1)",
        backgroundSize: "400% 400%",
        animation: "bgFlow 10s ease infinite",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bgFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      {/* --- ✨ BLING LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(60)].map((_, i) => {
          const rand = Math.random();
          let color = rand > 0.6 ? "#F5ABE4" : rand > 0.3 ? "#2C2926" : "#FFFFFF";
          return (
            <motion.div
              key={`bling-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: "2px",
                height: "2px",
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
              animate={{
                y: [0, Math.random() * -100, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{ duration: Math.random() * 8 + 5, repeat: Infinity }}
            />
          );
        })}
      </div>

      <div className="relative z-10 w-full text-[#2C2926] pt-32 font-sans pb-20">
        {/* Success Notification Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 20 }}
              className="fixed top-28 right-6 z-[100] bg-[#2C2926] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
            >
              <div className="w-8 h-8 rounded-full bg-[#A09080] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A09080]">Success</p>
                <p className="text-xs font-medium">Added to Shopping Bag!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-6 max-w-[1200px]">
          <header className="mb-12 flex flex-col items-center">
            <div className="flex items-center gap-2 text-[#A09080] mb-3">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Bespoke Studio</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight text-center">Customize Your Bouquet</h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* --- LEFT: VISUAL PREVIEW --- */}
            <div className="space-y-6">
              <div className="relative aspect-square w-full max-w-[480px] mx-auto rounded-[2.5rem] overflow-hidden bg-white/40 backdrop-blur-md shadow-xl border border-white/60 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPreviewImage}
                    src={currentPreviewImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full object-cover"
                    alt="Arrangement Preview"
                  />
                </AnimatePresence>

                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button 
                    onClick={() => setStyleIndex(prev => (prev > 0 ? prev - 1 : availableStyles.length - 1))}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center pointer-events-auto hover:bg-white transition-all active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setStyleIndex(prev => (prev < availableStyles.length - 1 ? prev + 1 : 0))}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center pointer-events-auto hover:bg-white transition-all active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="max-w-[480px] mx-auto">
                <div className="flex gap-3 overflow-x-auto pb-4 px-1 custom-scrollbar text-[#2C2926]">
                  {availableStyles.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setStyleIndex(idx)}
                      className={cn(
                        "relative min-w-[80px] aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300",
                        styleIndex === idx ? "border-[#A09080] scale-105" : "border-white opacity-50 hover:opacity-100"
                      )}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="style-thumb" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT: CUSTOMIZATION PANEL --- */}
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-[3rem] border border-white/60 shadow-sm space-y-8 max-w-[500px] mx-auto lg:mx-0">
              
              <section className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#A09080]">1. Flower Species</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(STUDIO_DATA).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFlowerType(type);
                        setColorId(STUDIO_DATA[type].colors[0].id);
                        setStyleIndex(0);
                      }}
                      className={cn(
                        "py-3 rounded-xl border transition-all text-[10px] font-bold uppercase tracking-wider",
                        flowerType === type ? "bg-[#2C2926] border-[#2C2926] text-white" : "border-white/60 bg-white/30 text-gray-500 hover:bg-white/60"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#A09080]">2. Bloom Count</h3>
                <div className="flex items-center justify-between bg-white/30 p-4 rounded-2xl border border-white/60 shadow-inner">
                  <button 
                    disabled={count <= 5}
                    onClick={() => { setCount(count - 1); setStyleIndex(0); }}
                    className="w-8 h-8 rounded-full bg-white/60 border border-white/60 flex items-center justify-center hover:bg-white disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <span className="text-3xl font-serif">{count}</span>
                    <span className="text-[8px] uppercase font-bold text-gray-400 ml-2">Blooms</span>
                  </div>
                  <button 
                    disabled={count >= 10}
                    onClick={() => { setCount(count + 1); setStyleIndex(0); }}
                    className="w-8 h-8 rounded-full bg-white/60 border border-white/60 flex items-center justify-center hover:bg-white disabled:opacity-30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#A09080]">3. Select Shade</h3>
                  <span className="text-[9px] font-bold text-gray-400 uppercase italic">{currentColor.name}</span>
                </div>
                <div className="flex gap-3">
                  {currentFlowerData.colors.map((c: any) => (
                    <button
                      key={c.id}
                      onClick={() => { setColorId(c.id); setStyleIndex(0); }}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                        currentColor.id === c.id ? "border-[#A09080] scale-110 shadow-md ring-2 ring-white" : "border-white/60 opacity-60 hover:opacity-100"
                      )}
                      style={{ backgroundColor: c.hex }}
                    >
                      {currentColor.id === c.id && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </section>

              <div className="pt-6 border-t border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-[9px] font-bold uppercase text-gray-400 mb-1">Estimated Price</p>
                    <p className="text-3xl font-serif text-[#2C2926]">{(count * 4500 + 10000).toLocaleString()} MMK</p>
                  </div>
                  <button onClick={handleReset} className="text-[9px] font-bold uppercase text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-[#2C2926] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#A09080] transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Shopping bag <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}