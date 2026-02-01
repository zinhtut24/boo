"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Play, ChevronRight, Sparkles, 
  Truck, ShieldCheck, Star, ChevronLeft, Heart 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Product3D from "@/components/canvas/product3D";
import Footer from "@/components/layout/footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeBouquet, setActiveBouquet] = useState(0);
  
  const [stickerMessage, setStickerMessage] = useState<string | null>(null);
  const [clickHearts, setClickHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const bouquetImages = [
    "/images/F/R/RR5/1.png",
    "/images/F/L/LW5/1.png",            
    "/images/F/Lo/lp5/1.png"       
  ];

  const nextBouquet = () => setActiveBouquet((prev) => (prev + 1) % bouquetImages.length);
  const prevBouquet = () => setActiveBouquet((prev) => (prev - 1 + bouquetImages.length) % bouquetImages.length);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleStickerClick = (msg: string, e: React.MouseEvent) => {
    setStickerMessage(msg);
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX,
      y: e.clientY
    }));
    setClickHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => setStickerMessage(null), 2500);
    setTimeout(() => {
      setClickHearts((prev) => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 1000);
  };

  const FloatingHeartsBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(14)].map((_, i) => {
        const pinkShades = ["#fea1af", "#f65aa8", "#FFC0CB", "#fc9ae5"];
        const color = pinkShades[i % pinkShades.length];
        const size = Math.random() * 30 + 30;
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
              opacity: [0, 0.7, 0],
              scale: [0.6, 1, 0.6],
            }}
            transition={{ duration: Math.random() * 5 + 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={size} fill={color} stroke="none" />
          </motion.div>
        );
      })}
    </div>
  );

  if (!mounted) return <div className="min-h-screen bg-[#FCFBFA]" />;

  const collections = [
    { id: "fb-1", name: "Eternal Roses", price: "32500 MMK", img: "/images/F/R/RR5/1.png", link: "/shop/product/fb-1" },
    { id: "pt-4", name: "Kuromi", price: "12000 MMK", img: "/images/Plush/Hello Kitty/1.png", link: "/shop/product/pt-4" },
    { id: "bb-5", name: "Skullpanda Blind Box", price: "85000 MMK", img: "/images/Blindbox/skullpanda2/skullpanda2.png", link: "/shop/product/bb-5" },
    { id: "ls-1", name: "Romand Juicy", price: "24000 MMK", img: "/images/lipstick/romandjuicyseries/lip1/gold.png", link: "/shop/product/ls-1" },
    { id: "bg-3", name: "Dior", price: "16,000,000 MMK", img: "/images/Img/Bags/Dior 1.png", link: "/shop/product/bg-3" },
  ];

  return (
    <main className="flex flex-col w-full min-h-screen relative overflow-x-hidden">
      <div 
        className="fixed inset-0 z-[-1] w-full h-full"
        style={{
          background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
          backgroundSize: "400% 400%",
          animation: "bgFlow 10s ease infinite",
        }}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bgFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        ::selection { background-color: #ef9adb; color: white; }
      `}} />

      <motion.div className="fixed w-4 h-4 bg-white/40 rounded-full blur-md pointer-events-none z-[100]" animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }} transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }} />

      <div className="relative z-10 w-full text-[#2C2926]">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-10 overflow-hidden">
          <FloatingHeartsBackground />

          <AnimatePresence>
            {clickHearts.map((heart) => (
              <motion.div key={heart.id} initial={{ opacity: 1, scale: 0, x: heart.x - 12, y: heart.y - 12 }} animate={{ opacity: 0, scale: 1.5, y: heart.y - 150, x: heart.x + (Math.random() * 100 - 50) }} exit={{ opacity: 0 }} className="fixed z-[100] pointer-events-none text-pink-600"><Heart fill="currentColor" size={24} /></motion.div>
            ))}
          </AnimatePresence>

          {/* Stickers */}
          <motion.div className="absolute left-[5%] top-[15%] md:top-[20%] z-20 cursor-pointer flex flex-col items-center" onClick={(e) => handleStickerClick("Hello Bubu! Do you love me? ✨", e)}>
            <motion.img src="/images/bubu1.png" className="w-16 md:w-32 lg:w-40" whileHover={{ rotate: -15, scale: 1.1 }} />
            <AnimatePresence>{stickerMessage?.includes("Bubu") && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[10px] font-bold uppercase text-white bg-[#D09478] px-4 py-1.5 rounded-full shadow-xl border border-white/20 whitespace-nowrap">{stickerMessage}</motion.span>}</AnimatePresence>
          </motion.div>

          <motion.div className="absolute right-[5%] top-[20%] md:top-[25%] z-20 cursor-pointer flex flex-col items-center" onClick={(e) => handleStickerClick("I love you. DuDu! 💖", e)}>
            <motion.img src="/images/dudu1.png" className="w-16 md:w-28 lg:w-36 opacity-90" whileTap={{ scale: 0.9 }} />
            <AnimatePresence>{stickerMessage?.includes("Dudu") && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[10px] font-bold uppercase text-white bg-[#2C2926] px-4 py-1.5 rounded-full shadow-xl whitespace-nowrap">{stickerMessage}</motion.span>}</AnimatePresence>
          </motion.div>

          {/* Hero Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container max-w-6xl text-center space-y-6 md:space-y-10 relative z-10">
            <div className="flex items-center justify-center gap-4">
              <span className="h-[2px] w-8 md:w-12 bg-[#2C2926]" />
              <span className="text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-black text-[#2C2926]">Est. 2024 • Luxury Gifting</span>
              <span className="h-[2px] w-8 md:w-12 bg-[#2C2926]" />
            </div>
            <h1 className="text-6xl md:text-[110px] font-serif leading-[0.9] tracking-tighter text-[#2C2926]">Art of <br /> <span className="italic font-light text-[#D09478] drop-shadow-sm">Memories.</span></h1>
            <p className="text-sm md:text-xl max-w-xl mx-auto font-medium leading-relaxed text-[#2C2926] px-4">Where luxury flowers, couture plushies, and the iconic Boo Blind Box converge to create unforgettable memories.</p>
            <div className="flex flex-col items-center justify-center pt-4 md:pt-6 space-y-8 md:space-y-12 w-full">
              <Link href="/shop/collection" className="bg-[#2C2926] text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-[#D09478] transition-all shadow-2xl flex items-center gap-2 group z-20">Explore Shop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
              
              <div className="relative w-full h-12 md:h-20 flex items-center overflow-visible">
                <motion.div className="absolute flex items-center" animate={{ x: ["-20vw", "100vw", "-20vw"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
                  <motion.div className="flex flex-col items-center" animate={{ scaleX: [1, 1, -1, -1, 1] }} transition={{ duration: 18, repeat: Infinity, times: [0, 0.48, 0.5, 0.98, 1] }}>
                    <img src="/images/budurun.gif" className="w-14 md:w-24 drop-shadow-2xl" alt="Running" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. TRUST INDICATORS */}
        <section className="bg-white/60 py-12 md:py-20 border-y border-white/40 backdrop-blur-2xl relative">
          <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
            {[{ icon: <Truck />, title: "Curated Delivery", desc: "Yangon-wide premium shipping" }, { icon: <ShieldCheck />, title: "Bespoke Quality", desc: "Global artisanal sourcing" }, { icon: <Star />, title: "Luxury Standard", desc: "Handcrafted creative vision" }].map((item, idx) => (
              <motion.div key={idx} className="group flex flex-col items-center px-4">
                <div className="text-[#8B7E6F] p-4 md:p-5 bg-white rounded-full mb-4 md:mb-5 shadow-md border border-white/40">{item.icon}</div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#2C2926] mb-1">{item.title}</h4>
                <p className="text-[11px] text-[#2C2926] font-bold uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. 3D STUDIO PREVIEW */}
        <section className="py-16 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-2 items-center gap-10 md:gap-20">
            <FloatingHeartsBackground />
            <div className="relative group">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative aspect-square rounded-[3rem] md:rounded-[4rem] border-2 border-white/60 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-md bg-white/20">
                <AnimatePresence mode="wait"><motion.div key={activeBouquet} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="w-full h-full p-8 md:p-10 flex items-center justify-center bg-transparent"><Product3D imageUrl={bouquetImages[activeBouquet]} /></motion.div></AnimatePresence>
                <button onClick={prevBouquet} className="absolute left-4 md:left-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-30 shadow-lg"><ChevronLeft className="w-5 h-5 text-[#2C2926]" /></button>
                <button onClick={nextBouquet} className="absolute right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-30 shadow-lg"><ChevronRight className="w-6 h-6 text-[#2C2926]" /></button>
              </motion.div>
            </div>
            <div className="space-y-6 md:space-y-8 px-4 relative z-10 text-center md:text-left">
              <h2 className="text-5xl md:text-8xl font-serif text-[#2C2926]">Masterpiece <span className="italic font-light text-[#D09478]">Studio.</span></h2>
              <p className="text-sm md:text-lg text-[#2C2926] leading-relaxed font-bold italic border-l-4 border-[#D09478] pl-6 md:pl-8">Every flower has a story; every gift is a memory.</p>
              <Link href="/studio" className="inline-flex items-center gap-4 bg-[#2C2926] text-white px-10 py-4 md:px-12 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-[#D09478] transition-all shadow-2xl">Launch Studio <ChevronRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* 4. COLLECTIONS SECTION */}
        <section className="py-16 md:py-32 bg-white/30 backdrop-blur-2xl relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex justify-between items-end mb-10 md:mb-16 px-4 border-b-2 border-[#2C2926]/10 pb-6">
              <div><h2 className="text-3xl md:text-4xl font-serif text-[#2C2926]">Curated Universe</h2><p className="text-[#8B7E6F] text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-black mt-2">Signature Collections</p></div>
              <Link href="/shop/collection" className="text-[11px] font-black uppercase border-b-2 border-[#2C2926] pb-1 hover:text-[#D09478] hover:border-[#D09478] transition-all">Browse All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 px-4">
              {collections.map((item) => (
                <Link key={item.id} href={item.link}>
                  <motion.div whileHover={{ y: -10 }} className="group cursor-pointer space-y-4 text-center relative">
                    <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-white relative shadow-md group-hover:shadow-2xl transition-all duration-1000 border-2 border-white"><img src={item.img} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={item.name} /></div>
                    <h3 className="text-[11px] md:text-[12px] font-black uppercase tracking-widest text-[#2C2926] group-hover:text-[#D09478] transition-colors">{item.name}</h3>
                    <p className="text-[11px] md:text-[12px] text-[#8B7E6F] font-black">{item.price}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Position 2 Runner */}
        <div className="relative w-full h-20 md:h-24 flex items-center overflow-visible bg-white/20 backdrop-blur-md border-y-2 border-white/40">
          <motion.div className="absolute flex items-center" animate={{ x: ["100vw", "-20vw", "100vw"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <motion.div className="flex flex-col items-center" animate={{ scaleX: [1, 1, -1, -1] }} transition={{ duration: 20, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}>
              <img src="/images/budu.gif" className="w-14 md:w-28 drop-shadow-2xl" alt="Running 2" />
            </motion.div>
          </motion.div>
        </div>

        {/* 5. COLLABORATION SECTION */}
        <section className="py-16 md:py-24 bg-white/40 backdrop-blur-2xl relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
            <motion.div className="space-y-4 mb-12 md:mb-16"><h3 className="text-[11px] tracking-[0.6em] uppercase text-[#2C2926] font-black">The Boo Circle</h3><p className="text-xl text-[#8B7E6F] font-bold italic font-serif">Proudly partnering with:</p></motion.div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center opacity-80 hover:opacity-100 transition-all duration-1000">
              {["FLORA CO.", "SCENT STUDIO", "PLUSH & CO.", "ROYAL EXPRESS", "BOX ARTISAN"].map((brand) => (
                <div key={brand} className="text-lg md:text-xl font-serif font-black tracking-tighter text-[#2C2926] hover:text-[#D09478] transition-colors cursor-default">{brand}</div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}