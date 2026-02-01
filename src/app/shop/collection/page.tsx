"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, Search, ShoppingBag, ArrowRight, Sparkles, ChevronRight,
  CheckCircle2, ArrowUp 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

const CATEGORIES = ["All", "Flower Bouquet", "Plush Toys", "Blind Box", "Lipstick", "Bag", "Chocolate"];
const STATUS_FILTERS = ["Everything", "New Arrivals", "Pre-order"];

const PRODUCTS = [
  // --- Flower Bouquet ---
  { id: "fb-1", name: "Classic Red Rose", price: 32500, category: "Flower Bouquet", status: "New Arrivals", img: "/images/F/R/RR5/1.png", },
  { id: "fb-2", name: "White Lily Bloom", price: 32500, category: "Flower Bouquet", status: "Pre-order", img:"/images/F/L/LW5/1.png",},
  { id: "fb-3", name: "Lotus Elegance", price: 32500, category: "Flower Bouquet", status: "New Arrivals", img: "/images/F/Lo/lp5/1.png", },

  // --- Plush Toys ---
  { id: "pt-1", name: "Bu Bu", price: 20000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Bu Bu/1.png" },
  { id: "pt-2", name: "Du Du", price: 18000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Du Du/1.png" },
  { id: "pt-3", name: "Capibara", price: 15000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Capibara/1.png" },
  { id: "pt-4", name: "Kuromi", price: 12000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Hello Kitty/1.png" },
  { id: "pt-5", name: "Rabbit Bunny", price: 20000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Rabbit Bunny/1.png" },
  { id: "pt-6", name: "Teddy Bears", price: 20000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Teddy Bears/1.png" },
  { id: "pt-7", name: "White Rabbit", price: 25000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/White rabbit/1.png" },

  // --- Blind Box ---
  { id: "bb-1", name: "Nommi V1", price: 45000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv1/nomiv1.png" },
  { id: "bb-2", name: "Nommi V6", price: 60000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv6/nomi_v6.png" },
  { id: "bb-3", name: "Nommi V7", price: 63000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomi7/nomi_v7.png" },
  { id: "bb-4", name: "Nommi V8", price: 47000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv9/nomi_v8.png" },
  { id: "bb-5", name: "Skullpanda", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/skullpanda2/skullpanda2.png" },
  { id: "bb-6", name: "Crybaby", price: 75000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/crybaby/crybaby1.png" },
  { id: "bb-7", name: "Lapupu", price: 125000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/lapupu1/lapupu1.png" },

  // --- Lipstick ---
  { id: "ls-1", name: "Romand Juicy", price: 24000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/romandjuicyseries/lip1/gold.png" },
  { id: "ls-3", name: "Timephoria", price: 45000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/timephoria/01/01.png" },
  { id: "ls-2", name: "Judydool_Lipgloss", price: 31000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/judydoll_lipgloss/02/02.png" },
  { id: "ls-4", name: "Bbia Glow Tint", price: 29000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/bbia_glow_tint/1/1.png" },
  { id: "ls-5", name: "MAC", price: 75000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/mac_lipmatte/1/1.png" },

  // --- Bag ---
  { id: "bg-1", name: "Charles & Keith", price: 219900, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/CK.png" },
  { id: "bg-2", name: "Coach", price: 480000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/COach.png" },
  { id: "bg-3", name: "Dior", price: 16000000, category: "Bag", status: "Pre-order", img: "/images/Img/Bags/Dior 1.png" },
  { id: "bg-4", name: "Gucci", price: 5000000, category: "Bag", status: "Pre-order", img: "/images/Img/Bags/Gucci.png" },
  { id: "bg-5", name: "Louis Vuitton", price: 30000000, category: "Bag", status: "Pre-order", img: "/images/Img/Bags/Louis Vuitton 1.png" },
  { id: "bg-6", name: "Mossdoom", price: 65000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Mossdoom 1.png" },
  { id: "bg-7", name: "Prada", price: 10000000, category: "Bag", status: "Pre-order", img: "/images/Img/Bags/PRADA 1.png" },
  { id: "bg-8", name: "Vintage Handbag Retro Satchel", price: 100000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Vintage Handbag Retro Satchel.png" },
  { id: "bg-9", name: "YSL", price: 11000000, category: "Bag", status: "Pre-order", img: "/images/Img/Bags/YSL.png" },

  // --- Chocolate ---
  { id: "ch-1", name: "Cake Chocolate", price: 25000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Cake Chocolate/1.png" },
  { id: "ch-2", name: "Dubai Chocolate", price: 35000, category: "Chocolate", status: "Pre-order", img: "/images/chocolate/Dubai Chocolate/2.png" },
  { id: "ch-3", name: "Marshmallows Chocolate", price: 45000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Marshmallows Chocolate/1.png" },
  { id: "ch-4", name: "Strawberry Fruit Chocolate", price: 55000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Strawberry Fruit Chocolate/3.png" },
  { id: "ch-5", name: "Valitine Chocolate", price: 20000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Valitine Chocolate/1.png" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("Everything");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => { 
    setMounted(true); 

    const handleScroll = () => {
      if (window.scrollY > 400) setShowScrollTop(true);
      else setShowScrollTop(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickAdd = (product: any) => {
    addToCart({ id: product.id, name: product.name, price: product.price, img: product.img, quantity: 1 });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesStatus = activeStatus === "Everything" || p.status === activeStatus;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [activeCategory, activeStatus, searchQuery]);

  const FloatingHeartsBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => {
        const pinkShades = ["#FFB6C1", "#FF69B4", "#FFC0CB", "#F5ABE4"];
        const color = pinkShades[i % pinkShades.length];
        const size = Math.random() * 20 + 20;
        return (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "drop-shadow(0 0 5px rgba(255, 105, 180, 0.3))"
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.8, 0],
              scale: [0.6, 1, 0.6],
            }}
            transition={{ 
              duration: Math.random() * 5 + 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart size={size} fill={color} stroke="none" />
          </motion.div>
        );
      })}
    </div>
  );

  if (!mounted) return null;

  return (
    <main className="flex flex-col w-full min-h-screen relative">
      <div 
        className="fixed inset-0 z-[-1] w-full h-full"
        style={{
          background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
          backgroundSize: "400% 400%",
          animation: "bgFlow 10s ease infinite",
        }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bgFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      <div className="relative z-10 w-full text-[#2C2926]">
        
        {/* SUCCESS TOAST */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-[100] bg-[#2C2926] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <CheckCircle2 className="w-5 h-5 text-[#D09478]" />
              <p className="text-xs font-semibold tracking-wide">Item added to your bag</p>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="pt-32 pb-8 bg-white/20 backdrop-blur-xl border-b border-white/20">
          <FloatingHeartsBackground /> 
          <div className="container mx-auto px-10 max-w-[1600px]">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 text-[#2C2926]/70 justify-center lg:justify-start mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">The Bespoke Universe</span>
                </div>
                <h1 className="text-4xl font-serif italic text-[#2C2926]">Curated Studio</h1>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2926]/40" />
                  <input 
                    type="text" placeholder="Search Magic..."
                    className="w-full bg-white/40 backdrop-blur-md rounded-xl py-2.5 pl-11 pr-4 text-[11px] font-medium uppercase tracking-widest outline-none border border-white/40 focus:border-[#2C2926]/30 transition-all placeholder:text-[#2C2926]/30"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex bg-white/30 backdrop-blur-md p-1 rounded-xl border border-white/40">
                  {STATUS_FILTERS.map(status => (
                    <button key={status} onClick={() => setActiveStatus(status)} className={cn("px-5 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-widest transition-all", activeStatus === status ? "bg-white text-[#2C2926] shadow-sm" : "text-[#2C2926]/50 hover:text-[#2C2926]")}>{status}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-10 max-w-[1600px] py-16 flex flex-col lg:flex-row gap-20">
          <aside className="lg:w-64 shrink-0 relative">
            <div className="sticky top-32 space-y-8 pr-10 border-r border-white/20 min-h-[400px]">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2C2926]/40 mb-6">Collections</h3>
              <div className="flex flex-col space-y-1">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("flex items-center justify-between py-3.5 px-5 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-all", activeCategory === cat ? "bg-[#2C2926] text-white shadow-lg" : "text-[#2C2926]/60 hover:text-[#2C2926] hover:bg-white/40")}>
                    {cat} {activeCategory === cat && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((p) => {
                const isSaved = wishlist.some(item => item.id === p.id);
                return (
                  <div key={p.id} className="group cursor-pointer">
                    <div className="relative aspect-[3.5/5] rounded-[2rem] overflow-hidden bg-white/40 backdrop-blur-md mb-5 border border-white/50 group-hover:shadow-2xl transition-all duration-500">
                      <Link href={`/shop/product/${p.id}`}><img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={p.name} /></Link>
                      <div className="absolute top-4 left-4 z-20"><span className={cn("px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest backdrop-blur-md", p.status === "Pre-order" ? "bg-amber-100/80 text-amber-700" : "bg-white/80 text-[#2C2926]")}>{p.status}</span></div>
                      <button onClick={() => toggleWishlist({ id: p.id, name: p.name, price: `${p.price.toLocaleString()} MMK`, img: p.img })} className={cn("absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all", isSaved ? "bg-rose-500 text-white opacity-100" : "bg-white/60 text-[#2C2926] hover:text-rose-500")}><Heart className={cn("w-4 h-4", isSaved && "fill-current")} /></button>
                      <button onClick={() => handleQuickAdd(p)} className="absolute inset-x-4 bottom-4 bg-[#2C2926]/90 text-white py-3.5 rounded-xl text-[9px] font-bold uppercase tracking-widest opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2"><ShoppingBag className="w-3.5 h-3.5" /> Add to Bag</button>
                    </div>
                    <div className="space-y-1 px-2">
                      <h3 className="text-[12px] font-semibold text-[#2C2926] uppercase line-clamp-1">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-[12px] font-bold text-[#2C2926]">{Math.floor(p.price).toLocaleString()} <span className="text-[9px] font-normal opacity-60">MMK</span></p>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2C2926]/20 group-hover:text-[#D09478] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-10 left-6 z-50 w-12 h-12 rounded-full bg-[#2C2926] text-white shadow-2xl flex items-center justify-center hover:bg-[#D09478] transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </main>
  );
}