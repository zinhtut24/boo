"use client";

import { useState, useEffect } from "react";
import { 
  Menu, X, Heart, ShoppingBag, User, Home, 
  Box, Star, Gift, Eye, Search 
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist } = useWishlistStore();
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Menu ပွင့်နေချိန်မှာ Scroll ပိတ်ထားရန်
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Page လုံးဝပြောင်းသွားတာနဲ့ အကုန်ပိတ်မယ်
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Collection", href: "/shop/collection", icon: <Star className="w-5 h-5 text-yellow-500" /> },
    { name: "Studio", href: "/studio", icon: <Box className="w-5 h-5 text-cyan-500" /> },
    { name: "Gift Finder", href: "/gift-finder", icon: <Gift className="w-5 h-5 text-rose-400" /> },
    { name: "Our Vision", href: "/vision", icon: <Eye className="w-5 h-5" /> },
  ];

  const forceCloseAndNavigate = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <div className="xl:hidden flex items-center gap-4">
      <button className="p-2 text-gray-600">
        <Search className="w-6 h-6" />
      </button>

      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-[#2C2926]"
      >
        <Menu className="w-7 h-7" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* ✅ ၁။ Backdrop (အမည်းရောင် နောက်ခံ) - ဤနေရာကို နှိပ်လျှင် Menu ပိတ်မည် */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} // ဤနေရာက အပြင်ဘက်ကို နှိပ်ရင် ပိတ်ပေးတာပါ
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] cursor-pointer"
            />

            {/* ၂။ Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // ✅ Sidebar ထဲက နေရာလွတ်ကို နှိပ်ရင်တော့ မပိတ်အောင် တားထားခြင်း
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[210] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img src="/images/logo.png" alt="Logo" className="h-10 object-contain" />
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-gray-100">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => forceCloseAndNavigate(item.href)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl text-base font-semibold transition-all",
                      pathname === item.href 
                        ? "bg-[#A09080] text-white shadow-lg" 
                        : "text-gray-600 hover:bg-gray-50 active:bg-gray-100"
                    )}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Bottom Quick Actions */}
              <div className="p-6 bg-gray-50 grid grid-cols-3 gap-4 border-t border-gray-100 text-center">
                <button 
                  onClick={() => forceCloseAndNavigate("/wishlist")}
                  className="flex flex-col items-center gap-1 relative"
                >
                  <Heart className={cn("w-6 h-6", wishlist.length > 0 && "fill-rose-400 text-rose-400")} />
                  <span className="text-[10px] font-bold text-gray-500">Wishlist</span>
                </button>

                <button 
                  onClick={() => forceCloseAndNavigate("/cart")}
                  className="flex flex-col items-center gap-1 relative"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span className="text-[10px] font-bold text-gray-500">Cart</span>
                </button>

                <button 
                  onClick={() => forceCloseAndNavigate("/auth/login")}
                  className="flex flex-col items-center gap-1"
                >
                  <User className="w-6 h-6 text-gray-600" />
                  <span className="text-[10px] font-bold text-gray-500">Account</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}