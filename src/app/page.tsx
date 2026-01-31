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
  
  // 💡 Sticker Interaction
  const [stickerMessage, setStickerMessage] = useState<string | null>(null);

  const bouquetImages = [
    "/images/F/R/RR5/3.png",
    "/images/F/L/LW5/5.png",            
    "/images/F/Lo/LotusP5/1.png"       
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

  const handleStickerClick = (msg: string) => {
    setStickerMessage(msg);
    setTimeout(() => setStickerMessage(null), 2500); 
  };

const FloatingHeartsBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 💡 အရေအတွက်ကို ၁၅ ခုပဲ ထားလိုက်ပါသည် */}
      {[...Array(16)].map((_, i) => {
        const pinkShades = ["#FFB6C1", "#FF69B4", "#FFC0CB", "#F5ABE4"];
        const color = pinkShades[i % pinkShades.length];
        const size = Math.random() * 9 + 9; // အရွယ်အစားကိုလည်း နည်းနည်းလေး ပိုသေးလိုက်ပါတယ်
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
              y: [0, -80, 0], // အတက်အဆင်းကိုလည်း နည်းနည်းလျှော့ထားသည်
              opacity: [0, 0.7, 0], // အမြဲလင်းမနေဘဲ ဖျတ်ခနဲ ပေါ်လာရုံပဲ ထားသည်
              scale: [0.6, 1, 0.6],
            }}
            transition={{ 
              duration: Math.random() * 5 + 7, // ပိုနှေးနှေးလေး သွားစေရန်
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

  if (!mounted) return <div className="min-h-screen bg-[#FCFBFA]" />;

  const collections = [
    { id: "fb-1", name: "Eternal Roses", price: "2000 MMK", img: "/images/Flowers/Rose/download (6).png", link: "/shop/product/fb-1" },
    { id: "pt-4", name: "Hello Kitty", price: "35000 MMK", img: "/images/Plush/Hello Kitty/1.png", link: "/shop/product/pt-4" },
    { id: "bb-5", name: "Skullpanda2 Blind Box", price: "125000 MMK", img: "/images/Blindbox/skullpanda2/skullpanda2.png", link: "/shop/product/bb-5" },
    { id: "ls-1", name: "Romand Juicy", price: "25000 MMK", img: "/images/lipstick/romandjuicyseries/lip1/gold.png", link: "/shop/product/ls-1" },
    { id: "bg-3", name: "Dior", price: "125000 MMK", img: "/images/Img/Bags/Dior 1.png", link: "/shop/product/bg-3" },
  ];

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
        ::selection { background-color: #ef9adb; color: white; }
      `}} />

      {/* --- ✨ INTERACTIVE SPARKLE TRAIL --- */}
      <motion.div 
        className="fixed w-4 h-4 bg-white/40 rounded-full blur-md pointer-events-none z-[100]"
        animate={{ x: mousePos.x - 8, y: mousePos.y - 8 }}
        transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
      />

      
      {/* --- ❤️ VIBRANT PINK FLOATING HEARTS LAYER --- */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(35)].map((_, i) => {
          // အသဲပုံအရောင်များကို Pink shades များထဲမှ ရွေးချယ်မည်
          const pinkShades = ["#FFB6C1", "#FF69B4", "#FFC0CB", "#F5ABE4"];
          const color = pinkShades[i % pinkShades.length];
          const size = Math.random() * 15 + 10; // အရွယ်အစားကို ပိုသိသာအောင် မြှင့်ထားသည်
          
          return (
            <motion.div
              key={`heart-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 110}%`,
                filter: "drop-shadow(0 0 5px rgba(255, 105, 180, 0.3))" // Pink Glow ထည့်ထားသည်
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.6, 0], // ပိုမြင်သာအောင် 0.6 အထိ တင်ထားသည်
                scale: [0.6, 1.3, 0.6],
                rotate: [0, 45, -45, 0]
              }}
              transition={{ 
                duration: Math.random() * 12 + 10, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart size={size} fill={color} stroke="none" />
            </motion.div>
          );
        })}
      </div> */}

      <div className="relative z-10 w-full text-[#2C2926]">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <FloatingHeartsBackground /> {/* 💡 Section 2 နောက်ခံအသဲပုံ */}
          {/* 🧸 Interactive Sticker Left (Bubu) */}
          <motion.div 
            className="absolute left-[5%] top-[20%] z-20 cursor-pointer flex flex-col items-center"
            onClick={() => handleStickerClick("Hello Bubu! Do you love me? ✨")}
          >
            <motion.img 
              src="/images/bubu1.png" 
              className="w-16 md:w-32 lg:w-40 pointer-events-auto" 
              whileHover={{ rotate: -15, scale: 1.1 }} 
            />
            <AnimatePresence>
              {stickerMessage?.includes("Bubu") && (
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white bg-[#D09478] px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">{stickerMessage}</motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 🧸 Interactive Sticker Right (Dudu) */}
          <motion.div 
            className="absolute right-[5%] top-[25%] z-20 cursor-pointer flex flex-col items-center"
            onClick={() => handleStickerClick("I love you. DuDu! 💖")}
          >
            <motion.img 
              src="/images/dudu1.png" 
              className="w-16 md:w-28 lg:w-36 pointer-events-auto opacity-80" 
              whileTap={{ scale: 0.9 }} 
            />
            <AnimatePresence>
              {stickerMessage?.includes("Dudu") && (
                <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white bg-[#2C2926] px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">{stickerMessage}</motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2 }} className="container max-w-6xl text-center space-y-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4">
              <span className="h-[1px] w-12 bg-[#A09080]/60" />
              <span className="text-[11px] tracking-[0.6em] uppercase font-bold text-[#A09080]">Est. 2024 • Luxury Gifting</span>
              <span className="h-[1px] w-12 bg-[#A09080]/60" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-7xl md:text-[110px] font-serif leading-[0.9] tracking-tighter">
              Art of <br /> <span className="italic font-light text-[#D09478]">Memories.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-base md:text-xl max-w-xl mx-auto font-light leading-relaxed opacity-80 px-4">
              Where luxury flowers, couture plushies, and the iconic Boo Blind Box converge to create unforgettable memories.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col items-center justify-center pt-6 space-y-12 w-full">
              <Link href="/shop/collection" className="bg-[#2C2926] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#D09478] transition-all duration-500 shadow-xl flex items-center gap-2 group z-20">
                Explore Shop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              
              <div className="relative w-full h-20 flex items-center overflow-visible">
                <motion.div 
                  className="absolute flex items-center"
                  animate={{ x: ["-20vw", "100vw", "-20vw"] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    animate={{ scaleX: [1, 1, -1, -1, 1] }}
                    transition={{ duration: 18, repeat: Infinity, times: [0, 0.48, 0.5, 0.98, 1] }}
                  >
                    <img src="/images/budurun.gif" className="w-16 md:w-24 drop-shadow-xl" alt="Running" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. TRUST INDICATORS */}
        <section className="bg-white/40 py-20 border-y border-white/40 backdrop-blur-xl relative">
          <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            
            {[
              { icon: <Truck />, title: "Curated Delivery", desc: "Yangon-wide premium shipping" },
              { icon: <ShieldCheck />, title: "Bespoke Quality", desc: "Global artisanal sourcing" },
              { icon: <Star />, title: "Luxury Standard", desc: "Handcrafted creative vision" }
            ].map((item, idx) => (
              <motion.div key={`trust-${idx}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} whileHover={{ y: -8 }} className="group flex flex-col items-center cursor-default px-4">
                <div className="text-[#A09080] p-5 bg-white/60 rounded-full mb-5 shadow-sm border border-white/40 transition-all duration-500 group-hover:bg-[#A09080] group-hover:text-white group-hover:shadow-lg group-hover:scale-110">
                  {item.icon}
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2C2926] mb-2 group-hover:text-[#A09080] transition-colors">{item.title}</h4>
                <p className="text-[10px] text-[#2C2926]/50 uppercase tracking-widest font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. 3D STUDIO PREVIEW */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-2 items-center gap-20">
            <FloatingHeartsBackground />
            <div className="relative group">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative aspect-square bg-white/40 rounded-[4rem] border border-white/60 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.div key={activeBouquet} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="w-full h-full p-10 flex items-center justify-center"><Product3D imageUrl={bouquetImages[activeBouquet]} /></motion.div>
                </AnimatePresence>
                <button onClick={prevBouquet} className="absolute left-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"><ChevronLeft className="w-6 h-6 text-[#2C2926]" /></button>
                <button onClick={nextBouquet} className="absolute right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"><ChevronRight className="w-6 h-6 text-[#2C2926]" /></button>
              </motion.div>
            </div>
            <div className="space-y-8 px-4">
              <h2 className="text-5xl md:text-8xl font-serif text-[#2C2926]">Masterpiece <span className="italic font-light text-[#D09478]">Studio.</span></h2>
              <p className="text-base md:text-lg text-[#2C2926]/70 leading-relaxed font-light italic border-l-4 border-[#D09478]/40 pl-8">Every flower has a story; every gift is a memory. Create your own luxury floral arrangement in our real-time studio—where your imagination becomes a reality.</p>
              <Link href="/studio" className="inline-flex items-center gap-4 bg-[#2C2926] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#D09478] transition-all shadow-xl">Launch Studio <ChevronRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* 4. COLLECTIONS SECTION */}
        <section className="py-32 bg-white/10 backdrop-blur-md relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex justify-between items-end mb-16 px-4">
              <div>
                <h2 className="text-4xl font-serif text-[#2C2926]">Curated Universe</h2>
                <p className="text-[#A09080] text-[10px] uppercase tracking-[0.4em] font-bold mt-2">Signature Collections</p>
              </div>
              <Link href="/shop/collection" className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#2C2926] pb-1 hover:text-[#D09478] hover:border-[#D09478] transition-all">Browse All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-4">
              {collections.map((item) => (
                <Link key={item.id} href={item.link}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="group cursor-pointer space-y-4 text-center relative">
                    <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-white/40 relative shadow-sm group-hover:shadow-2xl transition-all duration-1000 border border-white/60">
                      <img src={item.img} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt={item.name} />
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-[#2C2926]/80 to-transparent"><span className="text-[9px] text-white font-bold uppercase tracking-[0.2em]">Shop Now</span></div>
                    </div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#2C2926] group-hover:text-[#A09080] transition-colors">{item.name}</h3>
                    <p className="text-[11px] text-[#A09080] font-bold">{item.price}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        
        <div className="relative w-full h-24 flex items-center overflow-visible bg-white/10 backdrop-blur-sm border-y border-white/20">
        <FloatingHeartsBackground /> 
          <motion.div 
            className="absolute flex items-center"
            animate={{ x: ["100vw", "-20vw", "100vw"] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ scaleX: [1, 1, -1, -1] }}
              transition={{ duration: 20, repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
            >
              <img src="/images/budu.gif" className="w-16 md:w-28 drop-shadow-xl" alt="Running 2" />
              <div className="text-[10px] font-bold text-[#D09478] uppercase mt-1 tracking-tighter"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* 5. COLLABORATION SECTION */}
        <section className="py-24 bg-white/20 backdrop-blur-xl relative">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-4 mb-16">
              <h3 className="text-[10px] tracking-[0.6em] uppercase text-[#2C2926]/60 font-bold">The Boo Circle</h3>
              <p className="text-lg text-[#A09080] italic font-serif">Proudly partnering with:</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-1000">
              {["FLORA CO.", "SCENT STUDIO", "PLUSH & CO.", "GEM CRAFT", "BOX ARTISAN"].map((brand) => (
                <div key={brand} className="text-xl font-serif font-bold tracking-tighter text-[#2C2926] hover:text-[#A09080] transition-colors cursor-default">{brand}</div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}