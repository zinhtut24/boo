"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, CheckCircle2, RotateCcw, Heart } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/footer";

// --- Types & Interfaces ---
interface QuizOption {
  label: string;
  value: string;
  desc?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

// --- 💡 Recommendation Logic with Product IDs ---
const RECOMMENDATION_LOGIC: Record<string, any> = {
  elegant: {
    productId: "fb-2", 
    title: "The Ivory Grace",
    description: "A timeless arrangement of white lilies and artisanal flowers for a sophisticated soul.",
    image: "/images/Flowers/Lilie/download (1).png",
    price: "55,000 MMK",
    match: 98
  },
  cute: {
    productId: "pt-1", 
    title: "The Whimsical Bubu",
    description: "Soft textures and playful colors. This set features our signature plushies and sweet treats.",
    image: "/images/Plush/Bu Bu/1.png",
    price: "35,000 MMK",
    match: 95
  },
  blind: {
    productId: "bb-1", 
    title: "The Midnight Sparkle",
    description: "Luxury meets glamor. A curated box featuring high-shine accessories and premium items.",
    image: "/images/Blindbox/nomiv1/nomiv1.png",
    price: "85,000 MMK",
    match: 99
  },
  minimalist: {
    productId: "fb-3", 
    title: "The Modern Essence",
    description: "Clean lines and understated luxury. Simple, meaningful, and perfectly proportioned.",
    image: "/images/Flowers/Lotus Flower/download1.png",
    price: "45,000 MMK",
    match: 92
  }
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: "recipient",
    question: "Who is this gift for?",
    options: [
      { label: "My Significant Other", value: "partner" },
      { label: "A Dear Friend", value: "friend" },
      { label: "A Family Member", value: "family" },
      { label: "Treating Myself", value: "self" }
    ]
  },
  {
    id: "vibe",
    question: "What is their aesthetic vibe?",
    options: [
      { label: "Classic & Elegant", value: "elegant", desc: "Timeless beauty & soft tones" },
      { label: "Cute & Playful", value: "cute", desc: "Whimsical colors & soft textures" },
      { label: "Minimalist & Modern", value: "minimalist", desc: "Clean lines & simple luxury" },
      { label: "Bold & Blind", value: "blind", desc: "High-glam & signature sparkle" }
    ]
  }
];

export default function GiftFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOptionSelect = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  // 💡 --- BLING BLING HEARTS BACKGROUND ---
  const BlingHearts = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
    <main 
      className="flex flex-col w-full min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
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

      <div className="relative z-10 w-full text-[#2C2926]">
        <div className="container mx-auto px-6 pt-40 pb-32 max-w-5xl">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-16"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A09080]">
                      Phase 0{currentStep + 1}
                    </span>
                    <div className="flex-1 h-[2px] bg-white/20 overflow-hidden rounded-full">
                      <motion.div 
                        className="h-full bg-[#A09080]" 
                        initial={{ width: 0 }} 
                        animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }} 
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-serif text-[#2C2926] leading-tight tracking-tighter italic drop-shadow-sm">
                    {QUESTIONS[currentStep].question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {QUESTIONS[currentStep].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(QUESTIONS[currentStep].id, option.value)}
                      className="group p-10 text-left bg-white/40 backdrop-blur-md border border-white/60 rounded-[2.5rem] hover:border-[#A09080] hover:shadow-2xl transition-all duration-500 relative overflow-hidden active:scale-[0.98]"
                    >
                      <div className="flex flex-col gap-2 relative z-10">
                        <span className="text-xl font-serif text-[#2C2926] group-hover:text-[#A09080] transition-colors duration-300">
                          {option.label}
                        </span>
                        {option.desc && (
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed mt-1">
                            {option.desc}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <DynamicResult answers={answers} onRestart={restartQuiz} />
            )}
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </main>
  );
}

// --- Result Component ---
function DynamicResult({ answers, onRestart }: { answers: any, onRestart: () => void }) {
  const result = RECOMMENDATION_LOGIC[answers.vibe] || RECOMMENDATION_LOGIC.elegant;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="space-y-16 text-center"
    >
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/60 backdrop-blur-md rounded-full text-[#A09080] border border-white/40 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Analysis Complete</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-serif text-[#2C2926] tracking-tighter italic drop-shadow-sm">Your Perfect Match.</h2>
      </div>

      <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-xl rounded-[4rem] border border-white/60 shadow-2xl overflow-hidden grid md:grid-cols-2 group">
        <div className="bg-white/20 p-10 flex items-center justify-center relative overflow-hidden text-[#2C2926]">
          <div className="absolute top-8 left-8 z-20 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-bold text-[#A09080] border border-white/40 flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> {result.match}% Match
          </div>
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            src={result.image} 
            className="w-full h-full min-h-[400px] rounded-[2.5rem] object-cover shadow-2xl transition-transform duration-1000 group-hover:scale-105" 
            alt={result.title} 
          />
        </div>
        
        <div className="p-12 md:p-16 text-left flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A09080]">
              The {answers.vibe} Choice for your {answers.recipient}
            </h4>
            <h3 className="text-5xl font-serif text-[#2C2926] leading-tight italic">{result.title}</h3>
            <div className="w-12 h-[2px] bg-[#A09080]/40" />
          </div>
          
          <p className="text-base text-gray-600 font-light leading-relaxed italic border-l-2 border-[#A09080]/20 pl-6">
            &quot;{result.description}&quot;
          </p>
          
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-serif text-[#2C2926]">{result.price}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">In Stock</span>
          </div>
          
          <div className="pt-6">
            <Link 
              href={`/shop/product/${result.productId}`}
              className="group w-full bg-[#2C2926] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#A09080] transition-all duration-500 flex items-center justify-center gap-4 shadow-xl active:scale-[0.98]"
            >
              View Product Details 
              <ShoppingBag className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onRestart}
        className="flex items-center gap-2 mx-auto text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#2C2926] transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
      </button>
    </motion.div>
  );
}