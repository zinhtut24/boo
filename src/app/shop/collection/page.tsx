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

// --- PRODUCTS ဒေတာများ အားလုံး အရင်အတိုင်း ထားရှိပါသည် ---
const CATEGORIES = ["All", "Flower Bouquet", "Plush Toys", "Blind Box", "Lipstick", "Bag", "Chocolate"];
const STATUS_FILTERS = ["Everything", "New Arrivals", "Pre-order"];

const PRODUCTS = [
  // --- Flower Bouquet ---
  { id: "fb-1", name: "Classic Red Rose", price: 45000, category: "Flower Bouquet", status: "New Arrivals", img: "/images/Flowers/Rose/download (6).png" },
  { id: "fb-2", name: "White Lily Bloom", price: 55000, category: "Flower Bouquet", status: "Pre-order", img: "/images/Flowers/Lilie/download (1).png" },
  { id: "fb-3", name: "Lotus Elegance", price: 45000, category: "Flower Bouquet", status: "New Arrivals", img: "/images/Flowers/Lotus Flower/download1.png" },
  { id: "fb-4", name: "Mixed Bouquet", price: 55000, category: "Flower Bouquet", status: "Pre-order", img: "/images/Img/Flower Bouquet/download (1).png" },

  // --- Plush Toys ---
  { id: "pt-1", name: "Bu Bu", price: 35000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Bu Bu/1.png" },
  { id: "pt-2", name: "Du Du", price: 35000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Du Du/1.png" },
  { id: "pt-3", name: "Capibara", price: 35000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Capibara/1.png" },
  { id: "pt-4", name: "Hello Kitty", price: 35000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Hello Kitty/1.png" },
  { id: "pt-5", name: "Rabbit Bunny", price: 35000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Rabbit Bunny/1.png" },
  { id: "pt-6", name: "Teddy Bears", price: 35000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Teddy Bears/1.png" },
  { id: "pt-7", name: "White Rabbit", price: 35000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/White rabbit/1.png" },

  // --- Blind Box ---
  { id: "bb-1", name: "Nommi V1", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv1/nomiv1.png" },
  { id: "bb-2", name: "Nommi V6", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv6/nomi_v6.png" },
  { id: "bb-3", name: "Nommi V7", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomi7/nomi_v7.png" },
  { id: "bb-4", name: "Nommi V9", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv9/Nomi_v8.png" },
  { id: "bb-5", name: "Skullpanda2", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/skullpanda2/skullpanda2.png" },
  { id: "bb-6", name: "Crybaby", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/crybaby/crybaby1.png" },
  { id: "bb-7", name: "Lapupu", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/lapupu1/lapupu1.png" },

  // --- Lipstick ---
  { id: "ls-2", name: "Judydool_Lipgloss", price: 25000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/judydoll_lipgloss/02/02.png" },
  { id: "ls-1", name: "Romand Juicy", price: 25000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/romandjuicyseries/lip1/gold.png" },
  { id: "ls-3", name: "Timephoria", price: 25000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/timephoria/01/01.png" },
  { id: "ls-4", name: "Bbia Glow Tint", price: 25000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/bbia_glow_tint/1/1.png" },
  { id: "ls-5", name: "Mac Lipmatte", price: 25000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/mac_lipmatte/1/1.png" },

  // --- Bag ---
  { id: "bg-1", name: "Charles & Keith", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/CK.png" },
  { id: "bg-2", name: "Coach", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/COach.png" },
  { id: "bg-3", name: "Dior", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Dior 1.png" },
  { id: "bg-4", name: "Gucci", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Gucci.png" },
  { id: "bg-5", name: "Louis Vuitton", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Louis Vuitton 1.png" },
  { id: "bg-6", name: "Mossdoom", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Mossdoom 1.png" },
  { id: "bg-7", name: "Prada", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/PRADA 1.png" },
  { id: "bg-8", name: "Vintage Handbag Retro Satchel", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Vintage Handbag Retro Satchel.png" },
  { id: "bg-9", name: "YSL", price: 125000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/YSL.png" },

  // --- Chocolate ---
  { id: "ch-1", name: "Cake Chocolate", price: 15000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Cake Chocolate/1.png" },
  { id: "ch-2", name: "Dubai Chocolate", price: 15000, category: "Chocolate", status: "Pre-order", img: "/images/chocolate/Dubai Chocolate/2.png" },
  { id: "ch-3", name: "Marshmallows Chocolate", price: 15000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Marshmallows Chocolate/1.png" },
  { id: "ch-4", name: "Strawberry Fruit Chocolate", price: 15000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Strawberry Fruit Chocolate/3.png" },
  { id: "ch-5", name: "Valitine Chocolate", price: 15000, category: "Chocolate", status: "New Arrivals", img: "/images/chocolate/Valitine Chocolate/1.png" },
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

  if (!mounted) return null;

  return (
    <main 
      className="flex flex-col w-full min-h-screen relative" 
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
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                width: "2px", height: "2px", backgroundColor: color, boxShadow: `0 0 8px ${color}`,
              }}
              animate={{ y: [0, Math.random() * -100, 0], opacity: [0.1, 0.6, 0.1] }}
              transition={{ duration: Math.random() * 8 + 5, repeat: Infinity }}
            />
          );
        })}
      </div>

      <div className="relative z-10 w-full text-[#2C2926]">
        
        {/* SUCCESS TOAST */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
              className="fixed top-24 right-6 z-[100] bg-[#2C2926] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-[#A09080] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A09080]">Added to bag</p>
                <p className="text-xs font-medium">Magic item added!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="pt-32 pb-8 bg-white/30 backdrop-blur-xl border-b border-white/20">
          <div className="container mx-auto px-10 max-w-[1600px]">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 text-[#A09080] justify-center lg:justify-start mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em]">The Bespoke Universe</span>
                </div>
                <h1 className="text-3xl font-serif italic tracking-tight">Curated Studio</h1>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="relative w-full md:w-64 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 group-focus-within:text-[#A09080]" />
                  <input 
                    type="text" placeholder="SEARCH MAGIC..."
                    className="w-full bg-white/30 backdrop-blur-sm rounded-xl py-2.5 pl-10 pr-4 text-[10px] uppercase tracking-widest outline-none border border-white/40 focus:border-[#A09080] transition-all"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex bg-white/30 backdrop-blur-sm p-1 rounded-xl border border-white/40">
                  {STATUS_FILTERS.map(status => (
                    <button key={status} onClick={() => setActiveStatus(status)} className={cn("px-5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all", activeStatus === status ? "bg-white text-[#2C2926] shadow-sm" : "text-gray-500 hover:text-[#2C2926]")}>{status}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-10 max-w-[1600px] py-16 flex flex-col lg:flex-row gap-20">
          <aside className="lg:w-64 shrink-0 relative">
            <div className="sticky top-32 space-y-8 pr-10 border-r border-white/10 min-h-[400px] flex flex-col justify-between">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Collections</h3>
                <div className="flex flex-col space-y-2">
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("flex items-center justify-between py-3.5 px-5 rounded-2xl text-[11px] uppercase tracking-wider transition-all duration-300", activeCategory === cat ? "bg-[#2C2926] text-white shadow-xl scale-105" : "text-gray-500 hover:text-[#A09080] hover:bg-white/40")}>
                      {cat} {activeCategory === cat && <ChevronRight className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 💡 --- MINIMALIST BACK TO TOP LINK --- 💡 */}
              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="mt-10 self-start ml-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-gray-400 hover:text-[#2C2926] hover:bg-white/40 transition-all flex items-center justify-center shadow-lg group active:scale-90"
                  >
                    <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((p) => {
                const isSaved = wishlist.some(item => item.id === p.id);
                return (
                  <div key={p.id} className="group animate-in fade-in duration-700">
                    <div className="relative aspect-[3.5/5] rounded-[2.2rem] overflow-hidden bg-white/40 backdrop-blur-md mb-6 border border-white/60 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700">
                      <Link href={`/shop/product/${p.id}`}><img src={p.img} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={p.name} /></Link>
                      <div className="absolute top-5 left-5 z-20"><span className={cn("px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest backdrop-blur-md", p.status === "Pre-order" ? "bg-amber-100/90 text-amber-700" : "bg-white/90 text-[#A09080]")}>{p.status}</span></div>
                      <button onClick={() => toggleWishlist({ id: p.id, name: p.name, price: `${p.price.toLocaleString()} MMK`, img: p.img })} className={cn("absolute top-5 right-5 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all", isSaved ? "bg-rose-500 text-white opacity-100" : "bg-white/80 text-gray-400 hover:text-rose-500")}><Heart className={cn("w-4 h-4", isSaved && "fill-current")} /></button>
                      <button onClick={() => handleQuickAdd(p)} className="absolute inset-x-5 bottom-5 bg-[#2C2926]/95 text-white py-4 rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2"><ShoppingBag className="w-3.5 h-3.5" /> Quick Add</button>
                    </div>
                    <div className="space-y-1 px-2">
                      <h3 className="text-[12px] font-medium tracking-tight text-[#2C2926] uppercase line-clamp-1 group-hover:text-[#A09080] transition-colors">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-[12px] font-bold text-[#2C2926]">{Math.floor(p.price).toLocaleString()} <span className="text-[9px] text-gray-400 font-normal ml-0.5">MMK</span></p>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-[#A09080] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </main>
  );
}