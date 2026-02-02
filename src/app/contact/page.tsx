"use client";

import { useState, useEffect } from "react";
import { 
  Mail, Phone, MapPin, Send, MessageCircle, 
  Instagram, Facebook, Sparkles, Heart, Loader2, CheckCircle2 
} from "lucide-react";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // 💡 Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

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
    <main className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
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

      <div className="relative z-10 w-full flex-1 container mx-auto px-6 pt-32 pb-20 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 text-[#A09080]"
          >
            <Sparkles size={18} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Connect with Magic</span>
            <Sparkles size={18} className="animate-pulse" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif italic text-[#2C2926]"
          >
            Say Hello to <span className="text-[#D09478]">Boo.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-light italic max-w-lg mx-auto"
          >
            Whether you have a question about our collections or just want to share some love, we&apos;re here for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* --- LEFT: CONTACT INFO --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            {[
              { icon: Phone, label: "Call Us", val: "+95 9 789 456 123", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Mail, label: "Email Us", val: "hello@boogift.com", color: "text-rose-500", bg: "bg-rose-50" },
              { icon: MapPin, label: "Visit Studio", val: "No. 123, Pyay Road, Yangon", color: "text-emerald-500", bg: "bg-emerald-50" }
            ].map((item, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/60 shadow-sm flex items-center gap-6 group hover:scale-[1.02] transition-transform">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner", item.bg, item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#2C2926]/40 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-[#2C2926]">{item.val}</p>
                </div>
              </div>
            ))}

            {/* Social Links Box */}
            <div className="bg-[#2C2926] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <Heart className="absolute -bottom-6 -right-6 w-32 h-32 text-white opacity-[0.03] -rotate-12" />
               <h3 className="text-xl font-serif italic mb-6">Join our Universe</h3>
               <div className="flex gap-4">
                  <a href="https://www.facebook.com/sehun.c.zin" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-[#D09478] transition-all"><Facebook size={20} /></a>
                  <a href="https://www.instagram.com/moonlight24446?igsh=MTRkZThtbjNza3pzbw==" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-[#D09478] transition-all"><Instagram size={20} /></a>
                  <a href="https://www.instagram.com/moonlight24446?igsh=MTRkZThtbjNza3pzbw==" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-[#D09478] transition-all"><MessageCircle size={20} /></a>
               </div>
            </div>
          </motion.div>

          {/* --- RIGHT: CONTACT FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-white/60 shadow-xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6 relative z-10"
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2C2926]/40 ml-2">Name</label>
                        <input type="text" required placeholder="Your Name" className="w-full p-4 bg-white/60 rounded-2xl outline-none border border-transparent focus:border-[#D09478]/50 transition-all text-sm font-semibold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#2C2926]/40 ml-2">Email Address</label>
                        <input type="email" required placeholder="hello@world.com" className="w-full p-4 bg-white/60 rounded-2xl outline-none border border-transparent focus:border-[#D09478]/50 transition-all text-sm font-semibold" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#2C2926]/40 ml-2">Subject</label>
                      <select className="w-full p-4 bg-white/60 rounded-2xl outline-none border border-transparent focus:border-[#D09478]/50 transition-all text-sm font-semibold appearance-none cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Order Support</option>
                        <option>Custom Request</option>
                        <option>Collaborations</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#2C2926]/40 ml-2">Your Story</label>
                      <textarea required rows={4} placeholder="Write your message here..." className="w-full p-5 bg-white/60 rounded-[2rem] outline-none border border-transparent focus:border-[#D09478]/50 transition-all text-sm font-semibold resize-none" />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#2C2926] text-white py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#A09080] transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Send Message</>}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-serif italic text-[#2C2926]">Magic Received!</h3>
                      <p className="text-sm text-gray-500 font-light">Thank you for reaching out. <br /> Our studio will get back to you shortly.</p>
                    </div>
                    <button onClick={() => setIsSuccess(false)} className="text-[10px] font-black uppercase tracking-widest text-[#A09080] hover:text-[#2C2926] underline underline-offset-8">Send Another Message</button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Animated Sticker Decoration */}
              <motion.img 
                src="/images/bubu1.png" 
                className="absolute -bottom-4 -right-4 w-24 opacity-10 pointer-events-none grayscale"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}