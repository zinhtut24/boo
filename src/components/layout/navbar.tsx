"use client";

import { 
  Heart, ShoppingBag, User, Home, 
  Box, Star, Gift, Eye, Menu, X 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavSearch from "./search-bar"; 
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useState, useEffect } from "react"; // 💡 useEffect ထည့်သွင်းထားသည်
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { wishlist } = useWishlistStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // 💡 Hydration fix အတွက် mounted state

  // 💡 Browser ထဲရောက်မှ mounted ကို true ပေးခြင်းဖြင့် Server/Client mismatch ကို ကာကွယ်သည်
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="w-3.5 h-3.5" /> },
    { name: "Collection", href: "/shop/collection", icon: <Star className="w-3.5 h-3.5 text-yellow-500" /> },
    { name: "Studio", href: "/studio", icon: <Box className="w-3.5 h-3.5 text-cyan-500" /> },
    { name: "Gift Finder", href: "/gift-finder", icon: <Gift className="w-3.5 h-3.5 text-rose-400" /> },
    { name: "Our Vision", href: "/vision", icon: <Eye className="w-3.5 h-3.5" /> },
  ];

  // 💡 Browser ထဲမရောက်ခင်အထိ Navbar ကို မပြဘဲ စောင့်ခိုင်းခြင်း
  if (!mounted) {
    return <nav className="sticky top-0 z-[100] w-full bg-white h-16 md:h-20 border-b border-gray-100" />;
  }

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md border-b border-gray-100 h-16 md:h-20 flex items-center">
      <div className="container mx-auto flex items-center h-full justify-between max-w-[1600px] px-6 md:px-10">
        
        {/* --- LEFT: Logo Section --- */}
        <div className="flex items-center z-[110] shrink-0"> 
          <Link href="/" className="relative flex items-center">
            <div className="w-35 h-45 md:w-50 md:h-27 flex md:absolute md:-top-6 items-center justify-center transition-transform duration-500 hover:scale-105 drop-shadow-xl">
              <img 
                src="/images/logo.png" 
                alt="Boo Gift Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="hidden md:block md:w-80" />
          </Link>
        </div>

        {/* --- RIGHT: Desktop Menu & Action Icons --- */}
        <div className="flex items-center flex-1 justify-end gap-6 md:gap-10">
          
          {/* Desktop Navigation (Pill Menu) */}
          <div className="hidden xl:flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  pathname === item.href ? "bg-[#A09080] text-white shadow-md" : "text-gray-500 hover:bg-gray-200/50 text-[#2C2926]"
                )}
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block" suppressHydrationWarning>
            <NavSearch />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-7 text-gray-500">
            <Link href="/wishlist" className="relative p-1">
              <Heart className={cn("w-5 h-5 md:w-6 md:h-6 transition-all", wishlist.length > 0 && "fill-rose-400 text-rose-400 scale-110")} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center border-2 border-white font-bold">{wishlist.length}</span>
              )}
            </Link>
            
            <Link href="/cart" className="relative p-1">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:text-[#F5ABE4] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center border-2 border-white font-bold">{cartCount}</span>
              )}
            </Link>

            <Link href="/auth/login" className="hidden md:block"> 
                <User className="w-6 h-6 hover:text-[#A09080] transition-colors" />
            </Link>

            <button 
              className="xl:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-2xl xl:hidden z-[90] overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              <div className="w-full" suppressHydrationWarning>
                <NavSearch />
              </div>

              <div className="grid grid-cols-1 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl text-base font-semibold transition-all",
                      pathname === item.href ? "bg-[#A09080] text-white shadow-lg" : "text-gray-600 active:bg-gray-50"
                    )}
                  >
                    {item.icon} {item.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <Link href="/auth/login" className="flex items-center gap-2 text-gray-500 font-medium">
                  <User className="w-5 h-5" /> Account Settings
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}