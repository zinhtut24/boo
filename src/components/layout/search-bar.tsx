"use client";

import { useState, useRef } from "react";
import { Search, Camera, X, Image as ImageIcon, Video, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MOCK_PRODUCTS = [
  { id: "fb-1", name: "Classic Red Rose", price: 32500, category: "Flower Bouquet", status: "New Arrivals", img: "/images/Flowers/Rose/download (6).png" },
  { id: "fb-2", name: "White Lily Bloom", price: 32500, category: "Flower Bouquet", status: "Pre-order", img: "/images/Flowers/Lilie/download (1).png" },
  { id: "fb-3", name: "Lotus Elegance", price: 32500, category: "Flower Bouquet", status: "New Arrivals", img: "/images/Flowers/Lotus Flower/download1.png" },

  // --- Plush Toys ---
  { id: "pt-1", name: "Bu Bu", price: 20000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Bu Bu/1.png" },
  { id: "pt-2", name: "Du Du", price: 18000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Du Du/1.png" },
  { id: "pt-3", name: "Capibara", price: 15000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Capibara/1.png" },
  { id: "pt-4", name: "Hello Kitty", price: 12000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Hello Kitty/1.png" },
  { id: "pt-5", name: "Rabbit Bunny", price: 20000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Rabbit Bunny/1.png" },
  { id: "pt-6", name: "Teddy Bears", price: 20000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/Teddy Bears/1.png" },
  { id: "pt-7", name: "White Rabbit", price: 25000, category: "Plush Toys", status: "New Arrivals", img: "/images/Plush/White rabbit/1.png" },

  // --- Blind Box ---
  { id: "bb-1", name: "Nommi V1", price: 45000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv1/nomiv1.png" },
  { id: "bb-2", name: "Nommi V6", price: 60000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv6/nomi_v6.png" },
  { id: "bb-3", name: "Nommi V7", price: 63000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomi7/nomi_v7.png" },
  { id: "bb-4", name: "Nommi V8", price: 47000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/nomiv9/Nomi_v8.png" },
  { id: "bb-5", name: "Skullpanda", price: 85000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/skullpanda2/skullpanda2.png" },
  { id: "bb-6", name: "Crybaby", price: 75000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/crybaby/crybaby1.png" },
  { id: "bb-7", name: "Lapupu", price: 125000, category: "Blind Box", status: "Pre-order", img: "/images/Blindbox/lapupu1/lapupu1.png" },

  // --- Lipstick ---
  { id: "ls-2", name: "Judydool_Lipgloss", price: 31000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/judydoll_lipgloss/02/02.png" },
  { id: "ls-1", name: "Romand Juicy", price: 24000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/romandjuicyseries/lip1/gold.png" },
  { id: "ls-3", name: "Timephoria", price: 45000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/timephoria/01/01.png" },
  { id: "ls-4", name: "Bbia Glow Tint", price: 29000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/bbia_glow_tint/1/1.png" },
  { id: "ls-5", name: "Mac Lipmatte", price: 75000, category: "Lipstick", status: "New Arrivals", img: "/images/lipstick/mac_lipmatte/1/1.png" },

  // --- Bag ---
  { id: "bg-1", name: "Charles & Keith", price: 219900, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/CK.png" },
  { id: "bg-2", name: "Coach", price: 480000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/COach.png" },
  { id: "bg-3", name: "Dior", price: 16000000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Dior 1.png" },
  { id: "bg-4", name: "Gucci", price: 5000000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Gucci.png" },
  { id: "bg-5", name: "Louis Vuitton", price: 30000000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Louis Vuitton 1.png" },
  { id: "bg-6", name: "Mossdoom", price: 65000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Mossdoom 1.png" },
  { id: "bg-7", name: "Prada", price: 10000000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/PRADA 1.png" },
  { id: "bg-8", name: "Vintage Handbag Retro Satchel", price: 100000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/Vintage Handbag Retro Satchel.png" },
  { id: "bg-9", name: "YSL", price: 11000000, category: "Bag", status: "New Arrivals", img: "/images/Img/Bags/YSL.png" },

  // --- Chocolate ---
  { id: "ch-1", name: "Cake Chocolate", price: 25000, category: "Chocolate", status: "New Arrivals", img: "/images/Img/Chocolate/download (1).png" },
  { id: "ch-2", name: "Dubai Chocolate", price: 35000, category: "Chocolate", status: "New Arrivals", img: "/images/Img/Chocolate/download (2).png" },
  { id: "ch-3", name: "Marshmallows Chocolate", price: 45000, category: "Chocolate", status: "New Arrivals", img: "/images/Img/Chocolate/download (3).png" },
  { id: "ch-4", name: "Strawberry Fruit Chocolate", price: 55000, category: "Chocolate", status: "New Arrivals", img: "/images/Img/Chocolate/download (6).png" },
  { id: "ch-5", name: "Valitine Chocolate", price: 20000, category: "Chocolate", status: "New Arrivals", img: "/images/Img/Chocolate/download (5).png" },
];

export default function NavSearch() {
  const [query, setQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showLiveCamera, setShowLiveCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredResults = MOCK_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  // --- Image Upload Search Logic ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uploadedFileName = file.name.toLowerCase();

    // ပုံရဲ့ နာမည်ကို Mock Data ထဲက img path နဲ့ တိုက်စစ်တာ
    const matchedProduct = MOCK_PRODUCTS.find(p => {
      const fileNameInData = p.img.split('/').pop()?.toLowerCase(); 
      return fileNameInData && uploadedFileName.includes(fileNameInData);
    });

    if (matchedProduct) {
      setQuery(matchedProduct.name);
    } else {
      alert("ရှာမတွေ့ပါဘူး။ သင့်ပုံနာမည်က Database ထဲကပုံနာမည်နဲ့ တူရပါမယ်။ (ဥပမာ: nomiv1.png)");
    }
    setShowOptions(false);
  };

  const startCamera = async () => {
    setShowLiveCamera(true);
    setShowOptions(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied");
      setShowLiveCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    setShowLiveCamera(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100/60 rounded-full px-4 py-2.5 gap-3 border border-gray-100 focus-within:border-[#D3C4B4] focus-within:bg-white transition-all w-full max-w-[320px] shadow-inner group">
        <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#A09080]" />
        
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for magic..." 
          className="bg-transparent outline-none text-sm w-full font-light"
        />

        <div className="h-4 w-[1px] bg-gray-300 mx-1" />
        
        <button 
          onClick={() => setShowOptions(!showOptions)}
          className="hover:scale-110 transition-transform active:scale-90"
        >
          <Camera className="w-4 h-4 text-[#A09080] hover:text-[#F5ABE4]" />
        </button>
      </div>

      {/* --- LENS OPTIONS MENU --- */}
      <AnimatePresence>
        {showOptions && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-14 bg-white rounded-2xl shadow-2xl border border-gray-50 overflow-hidden z-[150] w-48 p-2"
          >
            <button onClick={startCamera} className="w-full flex items-center gap-3 p-3 hover:bg-[#F9F7F5] rounded-xl text-[11px] font-bold text-[#2C2926] transition-colors">
              <Video className="w-4 h-4 text-[#A09080]" /> Live Camera
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-3 p-3 hover:bg-[#F9F7F5] rounded-xl text-[11px] font-bold text-[#2C2926] transition-colors">
              <ImageIcon className="w-4 h-4 text-[#A09080]" /> Upload Image
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SEARCH RESULTS --- */}
      <AnimatePresence>
        {query.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-14 left-0 w-full bg-white rounded-[2rem] shadow-2xl border border-gray-50 overflow-hidden z-[150] p-4"
          >
            <div className="space-y-1">
              {filteredResults.length > 0 ? filteredResults.map(product => (
                <Link 
                  key={product.id}
                  href={`/shop/product/${product.id}`}
                  onClick={() => setQuery("")}
                  className="flex items-center gap-4 p-3 hover:bg-[#F9F7F5] rounded-2xl transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden p-1 shrink-0">
                    <img src={product.img} className="w-full h-full object-contain" alt="" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#2C2926] group-hover:text-[#A09080]">{product.name}</h4>
                    <p className="text-[10px] text-gray-400">{product.category} • {product.price} Ks</p>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-200 group-hover:text-[#A09080] group-hover:translate-x-1 transition-all" />
                </Link>
              )) : (
                <p className="p-4 text-center text-[10px] text-gray-400 italic">No magic found for "{query}"</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIVE CAMERA MODAL --- */}
      <AnimatePresence>
        {showLiveCamera && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden">
               <div className="p-6 border-b flex justify-between items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest">Boo Lens Live</span>
                 <X className="w-5 h-5 cursor-pointer" onClick={stopCamera} />
               </div>
               <div className="aspect-square bg-black relative">
                 <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                 <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute inset-x-0 h-1 bg-[#F5ABE4] shadow-[0_0_15px_#F5ABE4]"
                  />
               </div>
               <div className="p-10 text-center">
                  <button 
                    onClick={() => { setQuery("Nommi V1"); stopCamera(); }}
                    className="w-full py-4 bg-[#2C2926] text-white rounded-full font-bold uppercase tracking-widest text-[10px]"
                  >
                    Capture & Identify
                  </button>
               </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}