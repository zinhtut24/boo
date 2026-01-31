"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore"; // 💡 Cart Store ကို import လုပ်ပါ
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart); // 💡 Add to Cart function ကို ယူပါ

  // 💡 Move to Bag လုပ်ဆောင်ချက်
  const handleMoveToBag = (product: any) => {
    // ၁။ Cart ထဲသို့ ထည့်ခြင်း
    // သင့် store ရဲ့ logic အပေါ်မူတည်ပြီး price ကို number ပြောင်းရန် လိုအပ်နိုင်ပါသည်
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

    // ၂။ Wishlist ထဲမှ ပြန်ဖျက်ခြင်း (Optional - အကယ်၍ Bag ထဲရောက်ပြီး Wishlist ထဲမှာ မထားချင်လျှင်)
    // toggleWishlist(product); 
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
           <h1 className="text-3xl font-serif italic text-[#2C2926] flex items-center gap-4">
             My Saved Magic <Heart className="fill-rose-400 text-rose-400 border-none" />
           </h1>
           <Link href="/shop/collection">
             <Button variant="ghost" className="text-gray-400 hover:text-[#A09080]">
               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
             </Button>
           </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center bg-white rounded-[3rem] shadow-sm border border-gray-50">
            <img src="/images/bubu1.png" className="w-32 h-32 opacity-20 mb-6 grayscale" alt="Empty" />
            <p className="text-gray-400 italic text-lg">Your wishlist is lonely. Add some magic!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div key={product.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 relative">
                <div className="aspect-[4/5] relative overflow-hidden bg-[#F9F7F5] p-6">
                  <img src={product.img} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full text-rose-400 shadow-sm hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-md font-bold text-[#2C2926] truncate mb-1">{product.name}</h3>
                  <p className="text-[#A09080] font-medium text-sm mb-6">{product.price}</p>
                  
                  {/* 💡 Button ကို onClick ချိတ်ဆက်လိုက်ပါပြီ */}
                  <Button 
                    onClick={() => handleMoveToBag(product)}
                    className="w-full bg-[#2C2926] hover:bg-[#A09080] text-white rounded-full py-6 text-[10px] font-bold uppercase tracking-widest transition-all"
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
  );
}