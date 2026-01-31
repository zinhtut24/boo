"use client";

import Link from "next/link";
import { 
  Facebook, Instagram, Mail, 
  Phone, Sparkles, Heart 
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const FACEBOOK_URL = "https://www.facebook.com/yourfacebookpage"; 
  const INSTAGRAM_URL = "https://www.instagram.com/yourinstagramprofile";
  const FB_MESSENGER_URL = "https://m.me/yourfacebookusername"; 
  const WHATSAPP_URL = "https://wa.me/959789456123";

  const footerLinks = {
    shop: [
      { name: "Collection", href: "/shop/collection" },
      { name: "Flowers", href: "/shop/collection?category=Flower Bouquet" },
      { name: "Plushies", href: "/shop/collection?category=Plush Toys" },
    ],
    experience: [
      { name: "Studio", href: "/studio" },
      { name: "Gift Finder", href: "/gift-finder" },
      { name: "Vision", href: "/vision" },
    ],
    support: [
      { name: "Delivery Info", href: FB_MESSENGER_URL }, 
      { name: "Track Order", href: "/track-order" },
      { name: "Contact Us", href: FB_MESSENGER_URL },
    ]
  };

  return (
    <footer className="bg-[#FFF5EE] text-[#4A4540] pt-12 pb-6 border-t border-[#F5E6DA] relative overflow-hidden">
      
      {/* 🐾 Bubu & Dudu Stickers */}
      <motion.img 
        src="/images/bubu1.png" 
        animate={{ y: [0, -8, 0], rotate: [-12, -15, -12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-2 bottom-8 w-24 h-24 opacity-20 pointer-events-none" 
        alt="Bubu" 
      />
      <motion.img 
        src="/images/dudu1.png" 
        animate={{ y: [0, 8, 0], rotate: [12, 15, 12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 top-6 w-24 h-24 opacity-20 pointer-events-none" 
        alt="Dudu" 
      />

      <div className="container mx-auto px-8 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
               <h2 className="text-3xl font-serif italic tracking-tighter text-[#2C2926]">Boo Gift.</h2>
               <Sparkles className="w-4 h-4 text-[#FF85B3] animate-pulse" />
            </div>
            <p className="text-xs text-[#7D746D] font-medium leading-relaxed max-w-xs italic">
              "Bringing little moments of magic to your doorstep with love and care."
            </p>
            
            <div className="flex items-center gap-3 pt-1">
              <a 
                href={FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-[#E3F2FD] text-[#1877F2] flex items-center justify-center hover:scale-110 transition-all shadow-sm border border-white"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#E4405F] flex items-center justify-center hover:scale-110 transition-all shadow-sm border border-white"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-[#A09080] border-b border-[#F5E6DA] pb-1 w-fit">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-[13px] font-medium text-[#7D746D] hover:text-[#FF85B3] transition-colors flex items-center gap-1.5 group"
                      >
                        <Heart className="w-0 group-hover:w-2.5 h-2.5 text-[#FF85B3] transition-all opacity-0 group-hover:opacity-100" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-4 bg-[#FFEDF3] p-6 rounded-[2.5rem] border-2 border-white shadow-lg shadow-pink-200/10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#FF85B3] flex items-center gap-2">
              Get in Touch <Sparkles className="w-3 h-3 fill-[#FF85B3]" />
            </h4>
            <div className="space-y-3 text-[13px]">
               <a href={WHATSAPP_URL} target="_blank" className="flex items-center gap-3 text-[#5D5550] hover:text-[#FF85B3] transition-all font-bold group">
                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
                    <Phone className="w-3.5 h-3.5 text-[#FF85B3]" />
                 </div>
                 Chat with Us
               </a>
               {/* 💡 EMAIL FIX: target="_self" ကိုသုံးပြီး Mail App တိုက်ရိုက်ပွင့်စေရန် လုပ်ထားပါသည် */}
               <a 
                 href="mailto:hello@boogift.com" 
                 className="flex items-center gap-3 text-[#5D5550] hover:text-[#FF85B3] transition-all font-bold group"
               >
                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
                    <Mail className="w-3.5 h-3.5 text-[#FF85B3]" />
                 </div>
                 hello@boogift.com
               </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#F5E6DA] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 bg-white/50 px-4 py-1.5 rounded-full border border-white">
            <motion.img 
              src="/images/bubu1.png" 
              className="w-6 h-6" 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              alt="Mini Bubu" 
            />
            <p className="text-[10px] tracking-wider text-[#A09080] font-bold uppercase">
              © {currentYear} BOO GIFT STUDIO
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] text-[#A09080] hover:text-[#FF85B3] uppercase font-black tracking-widest transition-colors">Privacy</Link>
            <Link href="#" className="text-[10px] text-[#A09080] hover:text-[#FF85B3] uppercase font-black tracking-widest transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}