"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore"; 
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart); 

  const handleMoveToBag = (product: any) => {
    const numericPrice = typeof product.price === 'string' 
      ? parseInt(product.price.replace(/[^0-9]/g, "")) 
      : product.price;

    addToCart({
      id: product.id,
      name: product.name,
      price: numericPrice,
      img: product.img,
      quantity: 1,
    });
  };

  // 💡 --- BLING BLING HEARTS BACKGROUND ---
  const BlingHearts = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
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

  return (
    <main 
      className="flex flex-col w-full min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f1f7b8, #e5c5b1)",
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

      <BlingHearts />

      <div className="relative z-10 w-full min-h-screen pt-32 pb-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
             <h1 className="text-3xl font-serif italic text-[#2C2926] flex items-center gap-4">
               My Saved Magic <Heart className="fill-rose-400 text-rose-400 border-none" />
             </h1>
             <Link href="/shop/collection">
               <Button variant="ghost" className="text-gray-500 hover:text-[#A09080] bg-white/20 backdrop-blur-sm rounded-full px-6 transition-all">
                 <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
               </Button>
             </Link>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/40 shadow-sm">
              <img src="/images/bubu1.png" className="w-32 h-32 opacity-20 mb-6 grayscale" alt="Empty" />
              <p className="text-[#2C2926]/60 italic text-lg font-medium">Your wishlist is lonely. Add some magic!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlist.map((product) => (
                <div key={product.id} className="group bg-white/60 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 relative">
                  <div className="aspect-[4/5] relative overflow-hidden bg-white/40 p-6">
                    <img src={product.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full text-rose-400 shadow-sm hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-8">
                    <h3 className="text-md font-bold text-[#2C2926] truncate mb-1 uppercase tracking-tight">{product.name}</h3>
                    <p className="text-[#A09080] font-bold text-sm mb-6">{product.price}</p>
                    
                    <Button 
                      onClick={() => handleMoveToBag(product)}
                      className="w-full bg-[#2C2926] hover:bg-[#A09080] text-white rounded-full py-6 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95"
                    >
                      Move to Bag <ShoppingBag className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}