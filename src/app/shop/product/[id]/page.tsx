"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, ShoppingBag, Truck, Star, Plus, Minus, 
  ChevronLeft, ChevronRight, ChevronRightSquare, RefreshCw,
  CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import Product3D from "@/components/canvas/product3D";
import Footer from "@/components/layout/footer";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore"; 
import { cn } from "@/lib/utils";

const ALL_PRODUCTS = [
  { 
    id: "fb-1", 
    name: "Classic Red Rose", 
    price: 45000, 
    category: "Flower Bouquet", 
    status: "New Arrivals", 
    img: "/images/Flowers/Rose/download (6).png",
    gallery: [
      "/images/Flowers/Rose/download (6).png", 
      "/images/Flowers/Rose/download (1).png", 
      "/images/Flowers/Rose/download (2).png", 
      "/images/Flowers/Rose/download (3).png",
      "/images/Flowers/Rose/download (4).png",
       
      
    ]
  },
  { 
    id: "fb-2", 
    name: "White Lily Bloom", 
    price: 45000, 
    category: "Flower Bouquet", 
    status: "Pre-Order", 
    img: "/images/Flowers/Lilie/download (1).png",
    gallery: [
      "/images/Flowers/Lilie/download (1).png", 
      "/images/Flowers/Lilie/download (7).png", 
      "/images/Flowers/Lilie/download.png", 
    ]
  },

  { 
    id: "fb-3", 
    name: "Lotus Elegance", 
    price: 45000, 
    category: "Flower Bouquet", 
    status: "New Arrivals", 
    img: "/images/Flowers/Lotus Flower/download1.png",
    gallery: [
      "/images/Flowers/Lotus Flower/download1.png", 
      "/images/Flowers/Lotus Flower/download (2).png",
      "/images/Flowers/Lotus Flower/download (1).png",
      "/images/Flowers/Lotus Flower/download1.png",
    ]
  },

  { 
    id: "fb-4", 
    name: "Mixed Bouquet", 
    price: 45000, 
    category: "Flower Bouquet", 
    status: "New Arrivals", 
    img: "/images/Img/Flower Bouquet/download (1).png",
    gallery: [
      "/images/Flowers/Lotus Flower/download (1).png", 
      "/images/Flowers/Lotus Flower/download (2).png",
      "/images/Flowers/Lotus Flower/download (3).png",
      "/images/Flowers/Lotus Flower/download (4).png",
      "/images/Flowers/Lotus Flower/download (4).png",
    ]
  },

// --- Plush Toys Category ---
{ 
  id: "pt-1", 
  name: "Bu Bu", 
  price: 35000, 
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
  price: 35000, 
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
  price: 35000, 
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
  name: "Hello Kitty", 
  price: 35000, 
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
  price: 35000, 
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
  price: 35000, 
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
  price: 35000, 
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
  price: 85000, 
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
  price: 85000, 
  category: "Blind Box", 
  status: "Pre-order", 
  img: "/images/Blindbox/nomiv6/nomi_v6.png",
  gallery: [
    "/images/Blindbox/nomiv6/nomi_v6.png",
    "/images/Blindbox/nomiv6/nomiv6_1.jpg",
    "/images/Blindbox/nomiv6/nomiv6_2.png",
    "/images/Blindbox/nomiv6/nomiv6_3.jpg",
    "/images/Blindbox/nomiv6/nomiv6_4.png",
    "/images/Blindbox/nomiv6/nomiv6_5.png",
    "/images/Blindbox/nomiv6/nomiv6_6.png",
    "/images/Blindbox/nomiv6/1.png"
  ]
},
{ 
  id: "bb-3", 
  name: "Nommi V7", 
  price: 85000, 
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
  name: "Nommi V9", 
  price: 85000, 
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
  name: "Skullpanda2", 
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
  price: 85000, 
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
  price: 85000, 
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
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/CK.png",
  gallery: [
    "/images/Img/Bags/CK.png",
    "/images/Img/Bags/CK2.png"
  ]
},
{ 
  id: "bg-2", 
  name: "Coach", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/COach.png",
  gallery: [
    "/images/Img/Bags/COach.png",
    "/images/Img/Bags/Coach 1.png",
    "/images/Img/Bags/Coach 2.png"

  ]
},
{ 
  id: "bg-3", 
  name: "Dior", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/Dior 1.png",
  gallery: [
    "/images/Img/Bags/Dior 1.png",
    "/images/Img/Bags/Dior.png",
    "/images/Img/Bags/Dior 2.png",
    "/images/Img/Bags/Dior 3.png"
  ]
},
{ 
  id: "bg-4", 
  name: "Gucci", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/Gucci.png",
  gallery: [
    "/images/Img/Bags/Gucci.png",
    "/images/Img/Bags/Gucci 1.png"
  ]
},
{ 
  id: "bg-5", 
  name: "Louis Vuitton", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/Louis Vuitton 1.png",
  gallery: [
    "/images/Img/Bags/Louis Vuitton 1.png",
    "/images/Img/Bags/Louis Vuitton.png",
    "/images/Img/Bags/Louis Vuitton 2.png"
  ]
},
{ 
  id: "bg-6", 
  name: "Mossdoom", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/Mossdoom 1.png",
  gallery: [
    "/images/Img/Bags/Mossdoom 1.png",
    "/images/Img/Bags/Mossdoom 2.png",
    "/images/Img/Bags/Mossdoom 3.png"
  ]
},
{ 
  id: "bg-7", 
  name: "Prada", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/PRADA 1.png",
  gallery: [
    "/images/Img/Bags/PRADA 1.png",
    "/images/Img/Bags/PRADA 2.png",
    "/images/Img/Bags/PRADA.png",
  ]
},
{ 
  id: "bg-8", 
  name: "Vintage Handbag Retro Satchel", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/Vintage Handbag Retro Satchel.png",
  gallery: [
    "/images/Img/Bags/Vintage Handbag Retro Satchel.png",
    "/images/Img/Bags/Vintage Shoulder Bags PU Length.png"
  ]
},
{ 
  id: "bg-9", 
  name: "YSL", 
  price: 125000, 
  category: "Bag", 
  status: "New Arrivals", 
  img: "/images/Img/Bags/YSL.png",
  gallery: [
    "/images/Img/Bags/YSL.png",
    "/images/Img/Bags/YSL 1.png",
     "/images/Img/Bags/YSL 2.png",
  ]
},

// --- Lipstick with 5 Colors & Swap Logic ---
  { 
    id: "ls-2", 
    name: "Judydoll Lipgloss", 
    price: 25000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/judydoll_lipgloss/02/02.png",
    colors: [
      { name: "Ruby Red", hex: "#A60000", productImg: "/images/lipstick/judydoll_lipgloss/02/02.png", lipImg: "/images/lipstick/judydoll_lipgloss/02/lip02.jpg" },
      { name: "Soft Pink", hex: "#E88AB5", productImg: "/images/lipstick/judydoll_lipgloss/06/06.png", lipImg: "/images/lipstick/judydoll_lipgloss/06/lip06.jpg" },
      { name: "Maple Orange", hex: "#C04B24", productImg: "/images/lipstick/judydoll_lipgloss/07/07.png", lipImg: "/images/lipstick/judydoll_lipgloss/07/lip07.jpg" },
      { name: "Nude Peach", hex: "#D9A191", productImg: "/images/lipstick/judydoll_lipgloss/09/09.png", lipImg: "/images/lipstick/judydoll_lipgloss/09/lip09.jpg" },
      { name: "Berry Wine", hex: "#6B001A", productImg: "/images/lipstick/judydoll_lipgloss/010/010.png", lipImg: "/images/lipstick/judydoll_lipgloss/010/lip010.jpg" },
    ]
  },

  { 
    id: "ls-1", 
    name: "Romand Juicy Lasting Tint", 
    price: 25000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/romandjuicyseries/lip1/gold.png",
    colors: [
      { name: "Jujube", hex: "#A4403D", productImg: "/images/lipstick/romandjuicyseries/lip1/gold.png", lipImg: "/images/lipstick/romandjuicyseries/lip1/lip1.png" },
      { name: "Apple Brown", hex: "#A0522D", productImg: "/images/lipstick/romandjuicyseries/lip2/brown.png", lipImg: "/images/lipstick/romandjuicyseries/lip2/lip2.png" },
      { name: "Litchi Coral", hex: "#E97451", productImg: "/images/lipstick/romandjuicyseries/lip3/orange.png", lipImg: "/images/lipstick/romandjuicyseries/lip3/lip3-.png" },
      { name: "Nudy Peanut", hex: "#D38C77", productImg: "/images/lipstick/romandjuicyseries/lip4/pink.png", lipImg: "/images/lipstick/romandjuicyseries/lip4/lip4.png" },
      { name: "Pink Pumpkin", hex: "#D87093", productImg: "/images/lipstick/romandjuicyseries/lip5/pinkpurple.png", lipImg: "/images/lipstick/romandjuicyseries/lip5/lip5.png" },
      { name: "Pink Pumpkin", hex: "#D87093", productImg: "/images/lipstick/romandjuicyseries/lip6/pinkred.png", lipImg: "/images/lipstick/romandjuicyseries/lip6/lip6.png" }
    ]
},

{ 
    id: "ls-3", 
    name: "Timephoria Lip Velvet", 
    price: 25000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/timephoria/01/01.png",
    colors: [
      { name: "Rose Whisper", hex: "#E07A5F", productImg: "/images/lipstick/timephoria/01/01.png", lipImg: "/images/lipstick/timephoria/01/lip01.jpg" },
      { name: "Sunset Glow", hex: "#FF4500", productImg: "/images/lipstick/timephoria/001/001.png", lipImg: "/images/lipstick/timephoria/001/lip001.jpg" },
      { name: "Deep Mocha", hex: "#5D4037", productImg: "/images/lipstick/timephoria/13/13.png", lipImg: "/images/lipstick/timephoria/13/lip13.jpg" },
      { name: "Vintage Wine", hex: "#800020", productImg: "/images/lipstick/timephoria/09/09.png", lipImg: "/images/lipstick/timephoria/09/09lip.jpg" },
      { name: "Vintage Wine", hex: "#800020", productImg: "/images/lipstick/timephoria/17/17.png", lipImg: "/images/lipstick/timephoria/17/lip17.jpg" }
    ]
},

{ 
    id: "ls-4", 
    name: "Bbia Glow Tint", 
    price: 25000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/bbia_glow_tint/1/1.png",
    colors: [
      { name: "Chai Bottle", hex: "#D28C7A", productImg: "/images/lipstick/bbia_glow_tint/1/1.png", lipImg: "/images/lipstick/bbia_glow_tint/1/11.png" },
      { name: "Vintage Bottle", hex: "#B35B4D", productImg: "/images/lipstick/bbia_glow_tint/2/2.png", lipImg: "/images/lipstick/bbia_glow_tint/2/22.png" },
      { name: "Mauve Bottle", hex: "#A57D8B", productImg: "/images/lipstick/bbia_glow_tint/3/3.png", lipImg: "/images/lipstick/bbia_glow_tint/3/33.png" },
      { name: "Cinnamon Bottle", hex: "#8E443D", productImg: "/images/lipstick/bbia_glow_tint/4/4.png", lipImg: "/images/lipstick/bbia_glow_tint/4/44.png" },
      { name: "Vinous Bottle", hex: "#6D2B35", productImg: "/images/lipstick/bbia_glow_tint/5/5.png", lipImg: "/images/lipstick/bbia_glow_tint/5/55.png" },
      { name: "Vinous Bottle", hex: "#6D2B35", productImg: "/images/lipstick/bbia_glow_tint/5/5.png", lipImg: "/images/lipstick/bbia_glow_tint/6/66.png" }
    ]
},

{ 
    id: "ls-5", 
    name: "Velvet Matte Red", 
    price: 25000, 
    category: "Lipstick", 
    status: "New Arrivals", 
    img: "/images/lipstick/mac_lipmatte/1/1.png",
    colors: [
      { name: "Ruby Woo", hex: "#BC2132", productImg: "/images/lipstick/mac_lipmatte/1/1.png", lipImg: "/images/lipstick/mac_lipmatte/1/11.png" },
      { name: "Russian Red", hex: "#8E0013", productImg: "/images/lipstick/mac_lipmatte/2/2.png", lipImg: "/images/lipstick/mac_lipmatte/2/22.png" },
      { name: "Chili", hex: "#9E3224", productImg: "/images/lipstick/mac_lipmatte/3/3.png", lipImg: "/images/lipstick/mac_lipmatte/3/33.png" },
      { name: "Diva", hex: "#5D1924", productImg: "/images/lipstick/mac_lipmatte/4/4.png", lipImg: "/images/lipstick/mac_lipmatte/4/44.png" },
      { name: "Chili", hex: "#9E3224", productImg: "/images/lipstick/mac_lipmatte/3/3.png", lipImg: "/images/lipstick/mac_lipmatte/5/55.png" },
      { name: "Diva", hex: "#5D1924", productImg: "/images/lipstick/mac_lipmatte/4/4.png", lipImg: "/images/lipstick/mac_lipmatte/6/66.png" }
    ]
},

// --- Chocolate ---
{ 
    id: "ch-1", 
    name: "Cake Chocolate", 
    price: 15000, 
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
    price: 15000, 
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
    price: 15000, 
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
    price: 15000, 
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
    price: 15000, 
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
  // ... ကျန်တဲ့ products များ (Collection Page နဲ့ အတူတူ ထားပေးပါ)
];


export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isSwapped, setIsSwapped] = useState(false); 
  const [isWriting, setIsWriting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showToast, setShowToast] = useState(false); 
  const [reviews, setReviews] = useState([
    { id: 1, user: "Zin Htet", date: "28 Jan 2026", rating: 5, comment: "Exceptional quality. The color is exactly like the lip preview!" },
  ]);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const product = useMemo(() => ALL_PRODUCTS.find((p) => p.id === id), [id]);
  const isLipstick = product?.category === "Lipstick" && product.colors;
  
  const currentMainImage = isLipstick 
    ? (isSwapped ? product.colors[activeIndex].lipImg : product.colors[activeIndex].productImg)
    : (product?.gallery?.[activeIndex] || product?.img);

  const currentSideImage = isLipstick 
    ? (isSwapped ? product.colors[activeIndex].productImg : product.colors[activeIndex].lipImg || product.colors[activeIndex].lipImg)
    : null;

  const isSaved = useMemo(() => wishlist.some(item => item.id === product?.id), [wishlist, product]);

  if (!product) return <div className="pt-20 text-center uppercase tracking-widest text-xs text-gray-400">Product not found</div>;

  const handleAddToCartWithToast = () => {
    if (product) {
      addToCart({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        img: currentMainImage || product.img, 
        quantity: quantity 
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const reviewObj = {
      id: Date.now(),
      user: "Guest User",
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      rating: newRating,
      comment: newComment
    };
    setReviews([reviewObj, ...reviews]);
    setNewComment("");
    setIsWriting(false);
  };

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
      `}} />

      {/* --- ✨ BLING LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(60)].map((_, i) => {
          const rand = Math.random();
          let color = rand > 0.6 ? "#F5ABE4" : rand > 0.3 ? "#2C2926" : "#FFFFFF";
          return (
            <motion.div
              key={`bling-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: "2px",
                height: "2px",
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
              animate={{
                y: [0, Math.random() * -100, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{ duration: Math.random() * 8 + 5, repeat: Infinity }}
            />
          );
        })}
      </div>

      <div className="relative z-10 w-full text-[#2C2926] antialiased font-sans">
        
        {/* SUCCESS TOAST */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, x: 50, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="fixed top-24 right-6 z-[100] bg-[#2C2926] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10"
            >
              <div className="w-10 h-10 rounded-full bg-[#A09080] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A09080]">Magic Bag</p>
                <p className="text-xs font-medium">Added Successfully!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-6 pt-24 pb-12 max-w-[1100px]">
          
          <nav className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
            <Link href="/" className="hover:text-[#A09080]">Home</Link>
            <ChevronRightSquare className="w-3 h-3 opacity-30" />
            <Link href="/shop/collection" className="hover:text-[#A09080]">Collection</Link>
            <ChevronRightSquare className="w-3 h-3 opacity-30" />
            <span className="text-[#2C2926]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5 lg:sticky lg:top-24">
              
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white/40 backdrop-blur-md border border-white/60 shadow-xl group">
                <Product3D imageUrl={currentMainImage} />
                
                {isLipstick && currentSideImage && (
                  <div className="absolute top-1/2 left-6 -translate-y-1/2 z-30 flex flex-col items-center gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsSwapped(!isSwapped)}
                      className="relative w-24 h-24 rounded-full border-4 border-white/90 shadow-2xl overflow-hidden backdrop-blur-md group/side bg-white/20"
                    >
                      <img src={currentSideImage} className="w-full h-full object-cover" alt="Toggle" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/side:opacity-100 transition-opacity flex items-center justify-center">
                         <RefreshCw className="text-white w-6 h-6" />
                      </div>
                    </motion.button>
                    <span className="text-[7px] font-bold uppercase tracking-widest text-[#A09080] bg-white/60 px-2 py-1 rounded-full shadow-sm">
                      {isSwapped ? "View Tube" : "View Lip"}
                    </span>
                  </div>
                )}

                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="w-fit bg-[#2C2926] text-white px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] shadow-md">
                    {product.status}
                  </span>
                </div>
              </div>

              <div className="px-1">
                {isLipstick ? (
                  <div className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/60 shadow-sm space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <span style={{ fontSize: '10px' }} className="font-bold uppercase tracking-[0.3em] text-[#A09080]">Choose Shade</span>
                      <span className="text-[10px] font-medium text-gray-400 italic">{product.colors[activeIndex].name}</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {product.colors.map((color: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => { setActiveIndex(index); setIsSwapped(false); }}
                          className={cn(
                            "w-12 h-12 rounded-full border-4 transition-all duration-500 shrink-0",
                            activeIndex === index ? "border-white ring-2 ring-[#A09080] scale-110 shadow-lg" : "border-transparent opacity-70"
                          )}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-3">
                    {(product.gallery || [product.img]).map((imgUrl: string, index: number) => (
                      <button key={index} onClick={() => setActiveIndex(index)} className={cn("aspect-square rounded-2xl overflow-hidden border-2 transition-all p-0.5 bg-white/40 shadow-sm", activeIndex === index ? "border-[#A09080] scale-105" : "border-transparent opacity-60")}>
                        <img src={imgUrl} className="w-full h-full object-cover rounded-xl" alt="Variant" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 py-2">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif text-[#2C2926] italic">
                  Premium <br /> {product.category}
                </h1>
                <p className="text-2xl font-light text-[#A09080]">
                  {(product.price * quantity).toLocaleString()} MMK
                </p>
              </div>

              <div className="space-y-5 pt-2">
                <div className="flex items-center justify-between bg-white/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/60">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500 ml-6">Quantity</span>
                  <div className="flex items-center gap-6 mr-1 bg-white/60 rounded-full px-6 py-2.5 shadow-inner">
                    <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="hover:text-[#A09080]"><Minus className="w-4 h-4" /></button>
                    <span className="font-serif text-lg w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="hover:text-[#A09080]"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handleAddToCartWithToast} 
                    className="flex-1 bg-[#2C2926] text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#A09080] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (product) {
                        toggleWishlist({ id: product.id, name: product.name, price: `${product.price.toLocaleString()} MMK`, img: product.img });
                      }
                    }} 
                    className={cn("p-4 border border-white/60 rounded-full transition-all group bg-white/40 shadow-sm", isSaved ? "text-rose-500 border-rose-100" : "hover:text-rose-400")}
                  >
                    <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
                  </button>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white/30 backdrop-blur-md rounded-[1.5rem] border border-white/40 shadow-sm">
                  <div className="p-2.5 bg-white/60 text-[#A09080] rounded-full"><Truck className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#2C2926]">Bespoke Delivery</h4>
                    <p className="text-[10px] text-gray-500 mt-1 font-light italic">Carefully delivered across Yangon.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-24 pt-16 border-t border-white/20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-serif italic text-[#2C2926]">Bespoke Reviews</h2>
              <button onClick={() => setIsWriting(!isWriting)} className="text-[10px] font-bold uppercase tracking-widest border-b border-[#2C2926] pb-1 hover:text-[#A09080] transition-all">
                {isWriting ? "Cancel" : "Share Experience"}
              </button>
            </div>

            <AnimatePresence>
              {isWriting && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-12 bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-lg">
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Rating</span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button" onClick={() => setNewRating(star)}>
                            <Star className={cn("w-5 h-5 transition-all", star <= newRating ? "text-amber-400 fill-current" : "text-gray-300")} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Your Story</span>
                      <textarea required value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Tell us about the magic..." className="w-full bg-white/50 rounded-2xl p-4 text-sm outline-none border border-white/60 focus:border-[#A09080] min-h-[100px]" />
                    </div>
                    <button type="submit" className="bg-[#2C2926] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#A09080] shadow-md">Post Review</button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white/30 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/40 shadow-sm space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-3 h-3", i < rev.rating ? "fill-current" : "text-gray-200")} />)}
                  </div>
                  <p className="text-sm text-gray-600 font-light leading-relaxed italic">"{rev.comment}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-8 h-8 rounded-full bg-[#A09080]/10 flex items-center justify-center text-[10px] font-bold text-[#A09080]">{rev.user.charAt(0)}</div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{rev.user} — {rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
}