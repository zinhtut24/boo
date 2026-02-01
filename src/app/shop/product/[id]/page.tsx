"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { 
  Heart, ShoppingBag, Truck, Star, Plus, Minus, 
  ChevronLeft, ChevronRight, ChevronRightSquare, RefreshCw,
  CheckCircle2, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import Product3D from "@/components/canvas/product3D";
import Footer from "@/components/layout/footer";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore"; 
import { useAuthStore } from "@/store/useAuthStore"; 
import { cn } from "@/lib/utils";

// --- Products Data ---
const ALL_PRODUCTS = [
  // --- Flower Bouquet ---
  { 
    id: "fb-1", name: "Classic Red Rose", price: 32500, category: "Flower Bouquet", status: "New Arrivals", img: "/images/F/R/RR5/1.png",
    // 💡 Flower အတွက် Color Shades များကို ဒီမှာ သတ်မှတ်ထားသည်
    flowerColors: [
      { name: "Ruby Red", hex: "#B91C1C" },
      { name: "Soft Pink", hex: "#F472B6" },
      { name: "Bright Yellow", hex: "#FACC15" }
    ],
    gallery: [
      "/images/F/R/RR5/1.png",
       "/images/F/R/RY5/1.png",
       "/images/F/R/RP5/1.png",
    ]
  },
  { 
    id: "fb-2", name: "White Lily Bloom", price: 32500, category: "Flower Bouquet", status: "Pre-Order", img: "/images/F/L/LW5/1.png",
    flowerColors: [{ name: "Pure White", hex: "#F8FAFC" }, { name: "Deep Maroon", hex: "#c746ad" }, { name: "White Pink Mix", hex: "#d71442" }],
    gallery: ["/images/F/L/LW5/1.png","/images/F/L/LP5/1.png","/images/F/L/LR5/1.png",]
  },
  { 
    id: "fb-3", name: "Lotus Elegance", price: 32500, category: "Flower Bouquet", status: "New Arrivals", img: "/images/F/Lo/lp5/1.png",
    flowerColors: [{ name: "Lotus Pink", hex: "#FBCFE8" }, { name: "Sacred White", hex: "#FFFFFF" }, { name: "Sacred Purple", hex: "#e95dc3" }],
    gallery: ["/images/F/Lo/lp5/1.png",
      "/images/F/Lo/lw5/1.png",
      "/images/F/Lo/pl5/1.png"

    ]
  },
  
// --- Plush Toys Category ---
{ 
  id: "pt-1", 
  name: "Bu Bu", 
  price: 20000, 
  category: "Plush Toys", 
  status: "New Arrivals", 
  img: "/images/Plush/Bu Bu/1.png",
  gallery: [
    "/images/Plush/Bu Bu/1.png",
    "/images/Plush/Bu Bu/2.png",
    "/images/Plush/Bu Bu/3.png",
    "/images/Plush/Bu Bu/4.png",
  ]
},
{ 
  id: "pt-2", 
  name: "Du Du", 
  price: 18000, 
  category: "Plush Toys", 
  status: "New Arrivals", 
  img: "/images/Plush/Du Du/1.png",
  gallery: [
    "/images/Plush/Du Du/1.png",
    "/images/Plush/Du Du/2.png",
    "/images/Plush/Du Du/3.png",
    "/images/Plush/Du Du/4.png",
    "/images/Plush/Du Du/5.png",
    "/images/Plush/Du Du/6.png",
    "/images/Plush/Du Du/7.png"
  ]
},
{ 
  id: "pt-3", 
  name: "Capibara", 
  price: 15000, 
  category: "Plush Toys", 
  status: "New Arrivals", 
  img: "/images/Plush/Capibara/1.png",
  gallery: [
    "/images/Plush/Capibara/1.png",
    "/images/Plush/Capibara/2.png",
    "/images/Plush/Capibara/3.png",
    "/images/Plush/Capibara/4.png",
    "/images/Plush/Capibara/5.png"
  ]
},
{ 
  id: "pt-4", 
  name: "Kuromi", 
  price: 12000, 
  category: "Plush Toys", 
  status: "New Arrivals", 
  img: "/images/Plush/Hello Kitty/1.png",
  gallery: [
    "/images/Plush/Hello Kitty/1.png",
    "/images/Plush/Hello Kitty/2.png",
    "/images/Plush/Hello Kitty/3.png",
    "/images/Plush/Hello Kitty/4.png",
    "/images/Plush/Hello Kitty/5.png",
  ]
},
{ 
  id: "pt-5", 
  name: "Rabbit Bunny", 
  price: 20000, 
  category: "Plush Toys", 
  status: "New Arrivals", 
  img: "/images/Plush/Rabbit Bunny/1.png",
  gallery: [
    "/images/Plush/Rabbit Bunny/1.png",
    "/images/Plush/Rabbit Bunny/2.png",
    "/images/Plush/Rabbit Bunny/3.png",
    "/images/Plush/Rabbit Bunny/4.png",
    "/images/Plush/Rabbit Bunny/5.png"
  ]
},
{ 
  id: "pt-6", 
  name: "Teddy Bears", 
  price: 20000, 
  category: "Plush Toys", 
  status: "New Arrivals", 
  img: "/images/Plush/Teddy Bears/1.png",
  gallery: [
    "/images/Plush/Teddy Bears/1.png",
    "/images/Plush/Teddy Bears/3.png",
    "/images/Plush/Teddy Bears/4.png",
    "/images/Plush/Teddy Bears/5.png",
    "/images/Plush/Teddy Bears/6.png",
    "/images/Plush/Teddy Bears/7.png"
  ]
},
{ 
  id: "pt-7", 
  name: "White Rabbit", 
  price: 25000, 
  category: "Plush Toys", 
  status: "New Arrivals", 
  img: "/images/Plush/White rabbit/1.png",
  gallery: [
    "/images/Plush/White rabbit/1.png",
    "/images/Plush/White rabbit/2.png",
    "/images/Plush/White rabbit/3.png"
  ]
},




// --- Blind Box Category ---

{ 
  id: "bb-1", 
  name: "Nommi V1", 
  price: 45000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/nomiv1/nomiv1.png",
  gallery: [
    "/images/Blindbox/nomiv1/nomiv1.png",
    "/images/Blindbox/nomiv1/nomiv1_1.png",
    "/images/Blindbox/nomiv1/nomiv1_2.png",
    "/images/Blindbox/nomiv1/nomiv1_3.png",
    "/images/Blindbox/nomiv1/nomiv1_4.png",
    "/images/Blindbox/nomiv1/nomiv1_5.png",
    "/images/Blindbox/nomiv1/nomiv1_6.png"
  ]
},
{ 
  id: "bb-2", 
  name: "Nommi V6", 
  price: 60000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/nomiv6/nomi_v6.png",
  gallery: [
    "/images/Blindbox/nomiv6/nomi_v6.png",
    "/images/Blindbox/nomiv6/nomiv6_1.png",
    "/images/Blindbox/nomiv6/nomiv6_2.png",
    "/images/Blindbox/nomiv6/nomiv6_3.png",
    "/images/Blindbox/nomiv6/nomiv6_4.png",
    "/images/Blindbox/nomiv6/nomiv6_5.png",
    "/images/Blindbox/nomiv6/nomiv6_6.png",
    "/images/Blindbox/nomiv6/1.png"
  ]
},
{ 
  id: "bb-3", 
  name: "Nommi V7", 
  price: 63000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/nomi7/nomi_v7.png",
  gallery: [
    "/images/Blindbox/nomi7/nomi_v7.png",
    "/images/Blindbox/nomi7/1.png",
    "/images/Blindbox/nomi7/2.png",
    "/images/Blindbox/nomi7/3.png",
    "/images/Blindbox/nomi7/4.png",
    "/images/Blindbox/nomi7/5.png",
    "/images/Blindbox/nomi7/6.png",
    "/images/Blindbox/nomi7/7.png"
  ]
},
{ 
  id: "bb-4", 
  name: "Nommi V8", 
  price: 47000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/nomiv9/Nomi_v8.png",
  gallery: [
    "/images/Blindbox/nomiv9/Nomi_v8.png",
    "/images/Blindbox/nomiv9/Nomiv9_1.jpg",
    "/images/Blindbox/nomiv9/Nomiv9_2.jpg",
    "/images/Blindbox/nomiv9/Nomiv9_3.jpg",
    "/images/Blindbox/nomiv9/Nomiv9_4.jpg",
    "/images/Blindbox/nomiv9/Nomiv9_5.jpg",
    "/images/Blindbox/nomiv9/Nomiv9_6.jpg",
    "/images/Blindbox/nomiv9/Nomiv9_7.jpg",
    "/images/Blindbox/nomiv9/Nomiv9_8.jpg",
  
  ]
},
{ 
  id: "bb-5", 
  name: "Skullpanda", 
  price: 85000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/skullpanda2/skullpanda2.png",
  gallery: [
    "/images/Blindbox/skullpanda2/skullpanda2.png",
    "/images/Blindbox/skullpanda2/1.png",
    "/images/Blindbox/skullpanda2/2.png",
    "/images/Blindbox/skullpanda2/3.png",
    "/images/Blindbox/skullpanda2/4.png",
    "/images/Blindbox/skullpanda2/5.png",
    "/images/Blindbox/skullpanda2/6.png",
    "/images/Blindbox/skullpanda2/7.png"
    
  ]
},
{ 
  id: "bb-6", 
  name: "Crybaby", 
  price: 75000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/crybaby/crybaby1.png",
  gallery: [
    "/images/Blindbox/crybaby/crybaby1.png",
    "/images/Blindbox/crybaby/crybaby.png"

  ]
},
{ 
  id: "bb-7", 
  name: "Lapupu", 
  price: 125000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/lapupu1/lapupu1.png",
  gallery: [
    "/images/Blindbox/lapupu1/lapupu1.png",
    "/images/Blindbox/lapupu1/lapupu2.png",
  ]
},



// --- Bags Category ---
{ 
    id: "bg-1", 
    name: "Charles & Keith", 
    price: 219900, 
    category: "Bag", 
    status: "New Arrivals", 
    img: "/images/Img/Bags/CK.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/CK.png",
        model: "/images/Img/Bags/CKK1.png" },
      { original: "/images/Img/Bags/CK2.png", 
        model: "/images/Img/Bags/CKK.png" }, // ဥပမာ - နောက်ထပ်အတွဲများ
    ]
  },
  { 
    id: "bg-2", 
    name: "Coach Luxury", 
    price: 480000, 
    category: "Bag", 
    status: "New Arrivals", 
    img: "/images/Img/Bags/COach.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/COach.png", 
        model: "/images/Img/Bags/coachh.png" },
      { original: "/images/Img/Bags/Coach 1.png", 
        model: "/images/Img/Bags/coachhh1.png" },
      { original: "/images/Img/Bags/Coach 2.png", 
        model: "/images/Img/Bags/coachhh2.png" },
    ]
  },
  { 
    id: "bg-3", 
    name: "Dior Saddle", 
    price: 16000000, 
    category: "Bag", 
    status: "Pre-order", 
    img: "/images/Img/Bags/Dior 1.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/Dior 1.png", 
        model: "/images/Img/Bags/diorr.png" },
        { original: "/images/Img/Bags/Dior.png", 
        model: "/images/Img/Bags/diorrrr.png" },
        { original: "/images/Img/Bags/Dior 2.png", 
        model: "/images/Img/Bags/dior22r.png" },
        { original: "/images/Img/Bags/Dior 3.png", 
        model: "/images/Img/Bags/dior33.png" },
    ]
  },
  { 
    id: "bg-4", 
    name: "Gucci", 
    price: 5000000, 
    category: "Bag", 
    status: "Pre-order", 
    img: "/images/Img/Bags/Gucci.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/Gucci.png", 
        model: "/images/Img/Bags/gucciii.png" },
        { original: "/images/Img/Bags/Gucci.png", 
        model: "/images/Img/Bags/gucciii.png" }
    ]
  },
  { 
    id: "bg-5", 
    name: "Louis Vuitton", 
    price: 30000000, 
    category: "Bag", 
    status: "Pre-order", 
    img: "/images/Img/Bags/Louis Vuitton 1.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/Louis Vuitton 1.png", 
        model: "/images/Img/Bags/lv1.png" },
        { original: "/images/Img/Bags/Louis Vuitton 2.png", 
        model: "/images/Img/Bags/lv2.png" },
        { original: "/images/Img/Bags/Louis Vuitton.png", 
        model: "/images/Img/Bags/lv1.png" },
    ]
  },
  { 
    id: "bg-6", 
    name: "Mossdoom", 
    price: 65000, 
    category: "Bag", 
    status: "New Arrivals", 
    img: "/images/Img/Bags/Mossdoom 1.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/Mossdoom 1.png",
         model: "/images/Img/Bags/m1.png" },
         { original: "/images/Img/Bags/Mossdoom 2.png",
         model: "/images/Img/Bags/m2.png" },
         { original: "/images/Img/Bags/Mossdoom 3.png",
         model: "/images/Img/Bags/m3.png" },
    ]
  },
  { 
    id: "bg-7", 
    name: "Prada", 
    price: 10000000, 
    category: "Bag", 
    status: "Pre-order", 
    img: "/images/Img/Bags/PRADA 1.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/PRADA 1.png", 
        model: "/images/Img/Bags/parada1.png" },
        { original: "/images/Img/Bags/PRADA 2.png", 
        model: "/images/Img/Bags/parada3.png" },
        { original: "/images/Img/Bags/PRADA.png", 
        model: "/images/Img/Bags/parada.png" }
    ]
  },
  { 
    id: "bg-8", 
    name: "Vintage Handbag Retro Satchel", 
    price: 100000, 
    category: "Bag", 
    status: "New Arrivals", 
    img: "/images/Img/Bags/Vintage Handbag Retro Satchel.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/Vintage Handbag Retro Satchel.png", 
        model: "/images/Img/Bags/pd2.png" },
        { original: "/images/Img/Bags/Vintage Shoulder Bags PU Length.png", 
        model: "/images/Img/Bags/pd4.png" },
        { original: "/images/Img/Bags/Stand Oil Chubby Bad Wine.png", 
        model: "/images/Img/Bags/soc.png" },
    ]
  },
  { 
    id: "bg-9", 
    name: "YSL", 
    price: 11000000, 
    category: "Bag", 
    status: "Pre-order", 
    img: "/images/Img/Bags/YSL.png", 
    galleryPairs: [
      { original: "/images/Img/Bags/YSL.png", 
        model: "/images/Img/Bags/ysll.png" },
      { original: "/images/Img/Bags/YSL 1.png", 
        model: "/images/Img/Bags/ysl11.png" },
        { original: "/images/Img/Bags/YSL 2.png", 
        model: "/images/Img/Bags/ysl22.png" },
    ]
  },

// --- Lipstick with 5 Colors & Swap Logic ---
  { 
    id: "ls-2", 
    name: "Judydoll Lipgloss", 
    price: 31000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/judydoll_lipgloss/02/02.png",
    colors: [
      { name: "Ruby Red", hex: "#D74540", productImg: "/images/lipstick/judydoll_lipgloss/02/02.png", lipImg: "/images/lipstick/judydoll_lipgloss/02/lip02.jpg" },
      { name: "Soft Pink", hex: "#BA5633", productImg: "/images/lipstick/judydoll_lipgloss/06/06.png", lipImg: "/images/lipstick/judydoll_lipgloss/06/lip06.jpg" },
      { name: "Maple Orange", hex: "#8E1825", productImg: "/images/lipstick/judydoll_lipgloss/07/07.png", lipImg: "/images/lipstick/judydoll_lipgloss/07/lip07.jpg" },
      { name: "Nude Peach", hex: "#B81F25", productImg: "/images/lipstick/judydoll_lipgloss/09/09.png", lipImg: "/images/lipstick/judydoll_lipgloss/09/lip09.jpg" },
      { name: "Berry Wine", hex: "#A32E37", productImg: "/images/lipstick/judydoll_lipgloss/010/010.png", lipImg: "/images/lipstick/judydoll_lipgloss/010/lip010.jpg" },
    ]
  },

  { 
    id: "ls-1", 
    name: "Romand Juicy Lasting Tint", 
    price: 24000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/romandjuicyseries/lip1/gold.png",
    colors: [
      { name: "Jujube", hex: "#B84C40", productImg: "/images/lipstick/romandjuicyseries/lip1/gold.png", lipImg: "/images/lipstick/romandjuicyseries/lip1/lip1.png" },
      { name: "Apple Brown", hex: "#810004", productImg: "/images/lipstick/romandjuicyseries/lip2/brown.png", lipImg: "/images/lipstick/romandjuicyseries/lip2/lip2.png" },
      { name: "Litchi Coral", hex: "#EC5249", productImg: "/images/lipstick/romandjuicyseries/lip3/orange.png", lipImg: "/images/lipstick/romandjuicyseries/lip3/lip3-.png" },
      { name: "Nudy Peanut", hex: "#CD6870", productImg: "/images/lipstick/romandjuicyseries/lip4/pink.png", lipImg: "/images/lipstick/romandjuicyseries/lip4/lip4.png" },
      { name: "Pink Pumpkin", hex: "#D87093", productImg: "/images/lipstick/romandjuicyseries/lip5/pinkpurple.png", lipImg: "/images/lipstick/romandjuicyseries/lip5/lip5.png" },
      { name: "Pink Pumpkin", hex: "#C00049", productImg: "/images/lipstick/romandjuicyseries/lip6/pinkred.png", lipImg: "/images/lipstick/romandjuicyseries/lip6/lip6.png" }
    ]
},

{ 
    id: "ls-3", 
    name: "Timephoria Lip Velvet", 
    price: 45000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/timephoria/01/01.png",
    colors: [
      { name: "Rose Whisper", hex: "#A32524", productImg: "/images/lipstick/timephoria/01/01.png", lipImg: "/images/lipstick/timephoria/01/lip01.jpg" },
      { name: "Sunset Glow", hex: "#D8677F", productImg: "/images/lipstick/timephoria/001/001.png", lipImg: "/images/lipstick/timephoria/001/lip001.jpg" },
      { name: "Deep Mocha", hex: "#E14B98", productImg: "/images/lipstick/timephoria/13/13.png", lipImg: "/images/lipstick/timephoria/13/lip13.jpg" },
      { name: "Vintage Wine", hex: "#A1001E", productImg: "/images/lipstick/timephoria/09/09.png", lipImg: "/images/lipstick/timephoria/09/09lip.jpg" },
      { name: "Vintage Wine", hex: "#CC0010", productImg: "/images/lipstick/timephoria/17/17.png", lipImg: "/images/lipstick/timephoria/17/lip17.jpg" }
    ]
},

{ 
    id: "ls-4", 
    name: "Bbia Glow Tint", 
    price: 29000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/bbia_glow_tint/1/1.png",
    colors: [
      { name: "Chai Bottle", hex: "#A70421", productImg: "/images/lipstick/bbia_glow_tint/1/1.png", lipImg: "/images/lipstick/bbia_glow_tint/1/11.png" },
      { name: "Vintage Bottle", hex: "#B0254B", productImg: "/images/lipstick/bbia_glow_tint/2/2.png", lipImg: "/images/lipstick/bbia_glow_tint/2/22.png" },
      { name: "Mauve Bottle", hex: "#DD928E", productImg: "/images/lipstick/bbia_glow_tint/3/3.png", lipImg: "/images/lipstick/bbia_glow_tint/3/33.png" },
      { name: "Cinnamon Bottle", hex: "#E593AD", productImg: "/images/lipstick/bbia_glow_tint/4/4.png", lipImg: "/images/lipstick/bbia_glow_tint/4/44.png" },
      { name: "Vinous Bottle", hex: "#A63C33", productImg: "/images/lipstick/bbia_glow_tint/5/5.png", lipImg: "/images/lipstick/bbia_glow_tint/5/55.png" },
      { name: "Vinous Bottle", hex: "#8F2A23", productImg: "/images/lipstick/bbia_glow_tint/5/5.png", lipImg: "/images/lipstick/bbia_glow_tint/6/66.png" }
    ]
},

{ 
    id: "ls-5", 
    name: "MAC", 
    price: 75000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/mac_lipmatte/1/1.png",
    colors: [
      { name: "Ruby Woo", hex: "#E10017", productImg: "/images/lipstick/mac_lipmatte/1/1.png", lipImg: "/images/lipstick/mac_lipmatte/1/11.png" },
      { name: "Russian Red", hex: "#E52F7F", productImg: "/images/lipstick/mac_lipmatte/2/2.png", lipImg: "/images/lipstick/mac_lipmatte/2/22.png" },
      { name: "Chili", hex: "#F65A66", productImg: "/images/lipstick/mac_lipmatte/3/3.png", lipImg: "/images/lipstick/mac_lipmatte/3/33.png" },
      { name: "Diva", hex: "#ED9A88", productImg: "/images/lipstick/mac_lipmatte/4/4.png", lipImg: "/images/lipstick/mac_lipmatte/4/44.png" },
      { name: "Chili", hex: "#F84155", productImg: "/images/lipstick/mac_lipmatte/3/3.png", lipImg: "/images/lipstick/mac_lipmatte/5/55.png" },
      { name: "Diva", hex: "#EAAD9F", productImg: "/images/lipstick/mac_lipmatte/4/4.png", lipImg: "/images/lipstick/mac_lipmatte/6/66.png" }
    ]
},

// --- Chocolate ---
{ 
    id: "ch-1", 
    name: "Cake Chocolate", 
    price: 25000, 
    category: "Chocolate", 
    status: "New Arrivals", 
    img: "/images/chocolate/Cake Chocolate/1.png",
    gallery: [
      "/images/chocolate/Cake Chocolate/1.png",
      "/images/chocolate/Cake Chocolate/2.png",
      "/images/chocolate/Cake Chocolate/3.png",
      "/images/chocolate/Cake Chocolate/4.png",
      "/images/chocolate/Cake Chocolate/5.png"
    ]
  },
  { 
    id: "ch-2", 
    name: "Dubai Chocolate", 
    price: 35000, 
    category: "Chocolate", 
    status: "Pre-order", 
    img: "/images/chocolate/Dubai Chocolate/2.png",
    gallery: [
      "/images/chocolate/Dubai Chocolate/1.png",
      "/images/chocolate/Dubai Chocolate/2.png",
      "/images/chocolate/Dubai Chocolate/3.png",
      "/images/chocolate/Dubai Chocolate/4.png",
      "/images/chocolate/Dubai Chocolate/5.png",
      "/images/chocolate/Dubai Chocolate/6.png"
    ]
  },
  { 
    id: "ch-3", 
    name: "Marshmallows Chocolate", 
    price: 45000, 
    category: "Chocolate", 
    status: "New Arrivals", 
    img: "/images/chocolate/Marshmallows Chocolate/1.png",
    gallery: [
      "/images/chocolate/Marshmallows Chocolate/1.png",
      "/images/chocolate/Marshmallows Chocolate/2.png",
      "/images/chocolate/Marshmallows Chocolate/3.png",
      "/images/chocolate/Marshmallows Chocolate/4.png",
    ]
  },
  { 
    id: "ch-4", 
    name: "Strawberry Fruit Chocolate", 
    price: 55000, 
    category: "Chocolate", 
    status: "New Arrivals", 
    img: "/images/chocolate/Strawberry Fruit Chocolate/3.png",
    gallery: [
      "/images/chocolate/Strawberry Fruit Chocolate/3.png",
      "/images/chocolate/Strawberry Fruit Chocolate/1.png",
      "/images/chocolate/Strawberry Fruit Chocolate/2.png",
      "/images/chocolate/Strawberry Fruit Chocolate/4.png",
      "/images/chocolate/Strawberry Fruit Chocolate/5.png"
    ]
  },
  { 
    id: "ch-5", 
    name: "Valentine Chocolate", 
    price: 20000, 
    category: "Chocolate", 
    status: "New Arrivals", 
    img: "/images/chocolate/Valitine Chocolate/1.png",
    gallery: [
      "/images/chocolate/Valitine Chocolate/1.png",
      "/images/chocolate/Valitine Chocolate/2.png",
      "/images/chocolate/Valitine Chocolate/3.png",
      "/images/chocolate/Valitine Chocolate/4.png"
    ]
  },

  
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isSwapped, setIsSwapped] = useState(false); 
  const [isWriting, setIsWriting] = useState(false);
  const [showToast, setShowToast] = useState(false); 
  const [reviews] = useState([
    { id: 1, user: "Zin Htut", date: "28 Jan 2026", rating: 5, comment: "Exceptional quality. The visual swap is very helpful!" },
  ]);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); 

  const product = useMemo(() => ALL_PRODUCTS.find((p) => p.id === id), [id]);
  const isLipstick = product?.category === "Lipstick" && product.colors;
  const isBag = product?.category === "Bag" && product.galleryPairs;
  const isFlower = product?.category === "Flower Bouquet"; 
  
  const totalGalleryItems = useMemo(() => {
    if (isBag) return product.galleryPairs.length;
    return product?.gallery?.length || 1;
  }, [isBag, product]);

  const currentMainImage = useMemo(() => {
    if (isLipstick) return isSwapped ? product.colors[activeIndex].lipImg : product.colors[activeIndex].productImg;
    if (isBag) {
      const currentPair = product.galleryPairs[activeIndex] || product.galleryPairs[0];
      return isSwapped ? currentPair.model : currentPair.original;
    }
    return product?.gallery?.[activeIndex] || product?.img;
  }, [isLipstick, isBag, isSwapped, product, activeIndex]);

  const currentSideImage = useMemo(() => {
    if (isLipstick) return isSwapped ? product.colors[activeIndex].productImg : product.colors[activeIndex].lipImg;
    if (isBag) {
      const currentPair = product.galleryPairs[activeIndex] || product.galleryPairs[0];
      return isSwapped ? currentPair.original : currentPair.model;
    }
    return null;
  }, [isLipstick, isBag, isSwapped, product, activeIndex]);

  const isSaved = useMemo(() => wishlist.some(item => item.id === product?.id), [wishlist, product]);

  if (!product) return <div className="pt-20 text-center text-gray-400">Product not found</div>;

  const handleAddToCartWithToast = () => {
    if (!isLoggedIn) {
      alert("Join our community first! Please Register to continue. ✨");
      router.push("/auth/register"); 
      return;
    }

    if (product) {
      addToCart({ id: product.id, name: product.name, price: product.price, img: currentMainImage || product.img, quantity: quantity });
      setShowToast(true); setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleNext = () => { setActiveIndex((prev) => (prev + 1) % totalGalleryItems); setIsSwapped(false); };
  const handlePrev = () => { setActiveIndex((prev) => (prev - 1 + totalGalleryItems) % totalGalleryItems); setIsSwapped(false); };

  return (
    <main className="flex flex-col w-full min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 z-[-1] w-full h-full" style={{ background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)", backgroundSize: "400% 400%", animation: "bgFlow 10s ease infinite" }} />

      <div className="relative z-10 w-full text-[#2C2926] antialiased">
        <AnimatePresence>{showToast && (<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="fixed top-24 right-6 z-[100] bg-[#2C2926] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20"><CheckCircle2 className="w-5 h-5 text-[#D09478]" /><div><p className="text-[10px] font-bold uppercase tracking-widest text-[#D09478]">Success</p><p className="text-xs font-semibold">Added to Bag</p></div></motion.div>)}</AnimatePresence>

        <div className="container mx-auto px-6 pt-24 pb-12 max-w-[1100px]">
          {/* 💡 Breadcrumb - SEMIBOLD & VISIBLE (Balanced) */}
          <nav className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] mb-8">
            <Link href="/" className="text-[#2C2926]/40 hover:text-[#2C2926] transition-colors">Home</Link>
            <ChevronRightSquare className="w-3.5 h-3.5 text-[#2C2926]/20" />
            <Link href="/shop/collection" className="text-[#2C2926]/40 hover:text-[#2C2926] transition-colors">Collection</Link>
            <ChevronRightSquare className="w-3.5 h-3.5 text-[#2C2926]/20" />
            <span className="text-[#2C2926] opacity-70 underline underline-offset-4 decoration-[#D09478]/30">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5 lg:sticky lg:top-24">
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white/40 backdrop-blur-md border border-white/60 shadow-xl">
                <Product3D imageUrl={currentMainImage} />
                {totalGalleryItems > 1 && (
                  <>
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/40 text-[#2C2926] hover:bg-white shadow-lg active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
                    <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/40 text-[#2C2926] hover:bg-white shadow-lg active:scale-90"><ChevronRight className="w-6 h-6" /></button>
                  </>
                )}
                {(isLipstick || isBag) && currentSideImage && (
                  <div className="absolute bottom-6 left-6 z-30">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsSwapped(!isSwapped)} className="relative w-20 h-20 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white/20 backdrop-blur-md group/side">
                      <img src={currentSideImage} className="w-full h-full object-cover" alt="Toggle" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/side:opacity-100 transition-opacity flex items-center justify-center"><RefreshCw className="text-white w-5 h-5" /></div>
                    </motion.button>
                  </div>
                )}
                <div className="absolute top-6 left-6"><span className="bg-[#2C2926] text-white px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-md">{product.status}</span></div>
              </div>

              <div className="px-1">
                {isFlower ? (
                   <div className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-sm space-y-4">
                     <div className="flex justify-between items-center px-1"><span className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/40">Available Shades</span><span className="text-[11px] font-semibold text-[#2C2926]/60 italic">{product.flowerColors?.[activeIndex]?.name}</span></div>
                     <div className="flex gap-4">{product.flowerColors?.map((color: any, index: number) => (<button key={index} onClick={() => setActiveIndex(index)} className={cn("w-12 h-12 rounded-full border-4 transition-all shrink-0", activeIndex === index ? "border-white ring-2 ring-[#2C2926]/20 scale-110 shadow-lg" : "border-transparent opacity-70")} style={{ backgroundColor: color.hex }} />))}</div>
                   </div>
                ) : isLipstick ? (
                  <div className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-sm space-y-4">
                    <div className="flex justify-between items-center px-1"><span className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/40">Choose Shade</span><span className="text-[11px] font-semibold text-[#2C2926]/60 italic">{product.colors[activeIndex].name}</span></div>
                    <div className="flex gap-4 overflow-x-auto pb-2">{product.colors.map((color: any, index: number) => (<button key={index} onClick={() => { setActiveIndex(index); setIsSwapped(false); }} className={cn("w-12 h-12 rounded-full border-4 transition-all shrink-0", activeIndex === index ? "border-white ring-2 ring-[#2C2926]/20 scale-110 shadow-lg" : "border-transparent opacity-70")} style={{ backgroundColor: color.hex }} />))}</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-3">
                    {(isBag ? product.galleryPairs : (product.gallery || [product.img])).map((item: any, index: number) => (
                      <button key={index} onClick={() => { setActiveIndex(index); setIsSwapped(false); }} className={cn("aspect-square rounded-2xl overflow-hidden border-2 transition-all p-0.5 bg-white/40 shadow-sm", activeIndex === index ? "border-[#2C2926]/20 scale-105" : "border-transparent opacity-60")}><img src={isBag ? item.original : item} className="w-full h-full object-cover rounded-xl" alt="Variant" /></button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 py-2">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif text-[#2C2926] italic font-medium">Premium <br /> {product.name}</h1>
                <p className="text-2xl font-semibold text-[#2C2926]/80">{(product.price * quantity).toLocaleString()} MMK</p>
              </div>
              <div className="space-y-5 pt-2">
                {!isFlower && (
                  <div className="flex items-center justify-between bg-white/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/60 shadow-sm"><span className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/30 ml-6">Quantity</span><div className="flex items-center gap-6 mr-1 bg-white rounded-full px-6 py-2.5 shadow-sm"><button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="hover:text-[#D09478] text-[#2C2926]/60"><Minus className="w-4 h-4" /></button><span className="text-lg font-medium w-4 text-center">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="hover:text-[#D09478] text-[#2C2926]/60"><Plus className="w-4 h-4" /></button></div></div>
                )}
                <div className="flex gap-3">
                  <button onClick={handleAddToCartWithToast} className="flex-1 bg-[#2C2926] text-white py-4.5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#D09478] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                    {isFlower ? <Sparkles className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    {isFlower ? "Customize in Studio" : "Add to Shopping Bag"}
                  </button>
                  <button onClick={() => toggleWishlist({ id: product.id, name: product.name, price: `${product.price.toLocaleString()} MMK`, img: product.img })} className={cn("p-4.5 border border-white/60 rounded-full transition-all bg-white/40 shadow-sm", isSaved ? "text-rose-500 border-rose-100" : "text-[#2C2926]/60 hover:text-rose-400")}><Heart className={cn("w-6 h-6", isSaved && "fill-current")} /></button>
                </div>
                <div className="flex items-center gap-4 p-5 bg-white/40 backdrop-blur-md rounded-[1.5rem] border border-white/60 shadow-sm"><div className="p-3 bg-white/60 text-[#2C2926]/60 rounded-full shadow-sm"><Truck className="w-5 h-5" /></div><div><h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/70">Bespoke Delivery</h4><p className="text-[11px] text-[#2C2926]/40 mt-1 font-medium italic">Carefully delivered across Yangon.</p></div></div>
              </div>
            </div>
          </div>

          <section className="mt-24 pt-16 border-t-2 border-white/20">
             <div className="flex items-center justify-between mb-12"><h2 className="text-3xl font-serif italic text-[#2C2926] opacity-80">Bespoke Reviews</h2><button className="text-[11px] font-bold uppercase border-b-2 border-[#2C2926]/20 pb-1 hover:text-[#D09478] transition-colors text-[#2C2926]/60">Share Experience</button></div>
             <div className="grid md:grid-cols-2 gap-8">{reviews.map((rev) => (<div key={rev.id} className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-xl space-y-4"><div className="flex gap-1 text-amber-500/60">{[...Array(5)].map((_, i) => <Star key={i} className={cn("w-3.5 h-3.5", i < rev.rating ? "fill-current" : "text-gray-200")} />)}</div><p className="text-sm text-[#2C2926]/60 font-medium italic leading-relaxed">"{rev.comment}"</p><div className="flex items-center gap-3 pt-4 border-t border-white/20"><span className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/30">{rev.user} — {rev.date}</span></div></div>))}</div>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
}