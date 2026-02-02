"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, ArrowRight, Heart } from "lucide-react";
import Footer from "@/components/layout/footer";

export default function VisionPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // 💡 --- BLING BLING HEARTS BACKGROUND ---
  const BlingHearts = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ 
            scale: [0.5, 1.2, 0.5], 
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 20, -20, 0]
          }}
          transition={{ duration: Math.random() * 3 + 3, repeat: Infinity }}
        >
          <Heart fill={i % 2 === 0 ? "#FFC0CB" : "#FFFFFF"} className="text-white/20" size={Math.random() * 15 + 10} />
        </motion.div>
      ))}
    </div>
  );

  if (!mounted) return null;

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
      <style dangerouslySetInnerHTML={{ __html: `@keyframes bgFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }` }} />

      <BlingHearts />

      <div className="relative z-10 w-full text-[#2C2926] pt-32 pb-10">
        
        {/* --- SECTION 1: OUR STORY (Compact & Elegant) --- */}
        <section className="px-6 container mx-auto max-w-5xl mb-16">
          <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-xl grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#A09080]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Established 2024</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif leading-tight text-[#2C2926]">
                Our <span className="italic text-[#D09478]">Genesis.</span>
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Founded in the heart of Yangon, **Boo** transcends the traditional gift shop. We emerged from a desire to blend artisanal craftsmanship with modern innovation. <br /><br />
                We don&apos;t just sell products; we curate experiences. By integrating immersive **3D Studio** design with handcrafted floral mastery, we transform your deepest intentions into tangible art.
              </p>
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden shadow-inner bg-white/20 border border-white/40 group">
              <img 
                src="/images/gift.png" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Shop Story" 
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE VISION (Grid) --- */}
        <section className="px-6 container mx-auto max-w-5xl mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-3 mb-4">
              <h2 className="text-2xl font-serif flex items-center gap-3 text-[#2C2926]">
                <Sparkles className="w-5 h-5 text-[#A09080]" /> The Vision
              </h2>
            </div>
            
            {[
              { 
                title: "Bespoke Artistry", 
                desc: "Empowering you to architect one-of-a-kind arrangements that reflect your personal signature.", 
                color: "bg-white/50" 
              },
              { 
                title: "Pure Connection", 
                desc: "Ensuring every gift acts as a heartbeat, carrying warmth and genuine affection across distances.", 
                color: "bg-white/30" 
              },
              { 
                title: "Digital Soul", 
                desc: "Harnessing 3D technology to bridge the gap between imagination and reality.", 
                color: "bg-white/50" 
              }
            ].map((item, i) => (
              <div key={i} className={`${item.color} backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-sm hover:shadow-md transition-all duration-500`}>
                <h3 className="text-lg font-serif mb-3 text-[#D09478]">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: THE MESSAGE (Statement Box) --- */}
        <section className="px-6 container mx-auto max-w-5xl">
          <div className="bg-[#2C2926] rounded-[2.5rem] p-10 text-center relative overflow-hidden group border border-white/10 shadow-2xl">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A09080]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 space-y-6">
              <Heart className="w-6 h-6 text-[#A09080] mx-auto animate-pulse" />
              <h2 className="text-2xl md:text-4xl font-serif italic text-white leading-tight tracking-tight">
                &quot;Gifts are fleeting, but the <br /> emotions they evoke last forever.&quot;
              </h2>
              <div className="pt-4">
                <Link href="/shop/collection" className="inline-flex items-center gap-3 bg-white text-[#2C2926] px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#A09080] hover:text-white transition-all shadow-lg active:scale-95">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-[9px] text-[#A09080] uppercase tracking-[0.4em] pt-4 font-bold opacity-80">Architecture of Memories • 2026</p>
            </div>
            
            {/* Subtle Animated GIF overlay */}
            <img src="/images/bubu2.gif" className="absolute -bottom-2 -left-2 w-20 h-20 opacity-30 grayscale" alt="" />
          </div>
        </section>

        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </main>
  );
}