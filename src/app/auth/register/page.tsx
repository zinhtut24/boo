"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, User, Mail, Lock, Heart, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import Footer from "@/components/layout/footer";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

 
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Tell us your magical name";
    if (!email.trim()) newErrors.email = "Email is required for the journey";
    if (password.length < 6) newErrors.password = "Minimum 6 characters for safety";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      login({ name, email });
      setIsLoading(false);
      router.push("/"); 
    }
  };

  // 💡 --- BLING BLING HEARTS BACKGROUND ---
  const BlingHearts = () => {
    if (!mounted) return null;

    return (
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
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1]" style={{ 
           background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
          backgroundSize: "400% 400%",
          animation: "bgFlow 10s ease infinite", }} />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes bgFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }` }} />
      
      <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 relative">
        <BlingHearts />

        {/* 🧸 LEFT SIDE: Dudu (Login Link) */}
        <motion.div 
          className="absolute left-[8%] top-[35%] z-20 hidden xl:flex flex-col items-center group cursor-pointer"
          onClick={() => router.push("/auth/login")}
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
           <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl mb-4 relative border border-blue-100 max-w-[180px]">
            <p className="text-[10px] font-bold text-[#2C2926] leading-relaxed">
              Already have an account? <span className="text-blue-500">Tap me</span> to Login! 🏠
            </p>
            <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white rotate-45 border-r border-b border-blue-100" />
          </div>
          <img src="/images/dudu1.png" className="w-36 drop-shadow-2xl opacity-90" alt="Dudu" />
        </motion.div>

        {/* 🧸 RIGHT SIDE: Bubu (Welcome Message) */}
        <motion.div 
          className="absolute right-[8%] top-[35%] z-20 hidden xl:flex flex-col items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
           <div className="bg-[#2C2926] text-white text-[9px] font-bold px-4 py-2 rounded-full mb-3 shadow-lg flex items-center gap-2">
              <Sparkles size={12} className="text-yellow-400" /> Welcome to the family!
           </div>
          <img src="/images/bubu1.png" className="w-36 drop-shadow-2xl" alt="Bubu" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full z-10"
        >
          {/* Glass Card */}
          <div className="bg-white/60 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/80 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] space-y-10 relative overflow-hidden">
            
            <div className="text-center space-y-3 relative z-10">
              <h1 className="text-4xl font-serif italic text-[#2C2926] font-bold">Create Universe</h1>
              <p className="text-[11px] text-[#2C2926] font-bold uppercase tracking-[0.4em] opacity-70">Start your magical journey</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6 relative z-10">
              {/* Name Field */}
              <div className="space-y-1">
                <div className="relative group border-b-2 border-gray-300 focus-within:border-[#A09080] transition-all">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2926]" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full py-4 pl-8 bg-transparent outline-none text-sm font-semibold text-[#2C2926] placeholder:text-gray-500" 
                  />
                </div>
                {errors.name && <p className="text-[9px] text-rose-600 font-bold uppercase mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <div className="relative group border-b-2 border-gray-300 focus-within:border-[#A09080] transition-all">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2926]" />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full py-4 pl-8 bg-transparent outline-none text-sm font-semibold text-[#2C2926] placeholder:text-gray-500" 
                  />
                </div>
                {errors.email && <p className="text-[9px] text-rose-600 font-bold uppercase mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="relative group border-b-2 border-gray-300 focus-within:border-[#A09080] transition-all">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2926]" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full py-4 pl-8 pr-10 bg-transparent outline-none text-sm font-semibold text-[#2C2926] placeholder:text-gray-500" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#2C2926] opacity-60 hover:opacity-100"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-[9px] text-rose-600 font-bold uppercase mt-1">{errors.password}</p>}
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-[#2C2926] text-white py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#A09080] active:scale-[0.98] disabled:bg-gray-400 transition-all flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Start Your Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/60">
                Already a member? 
                <Link href="/auth/login" className="text-[#2C2926] font-black hover:text-[#A09080] ml-2 underline underline-offset-4 decoration-2">Login Now</Link>
              </p>
            </div>

            {/* 🏃‍♂️ Bubu Dudu Running Inside */}
            <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none opacity-30">
                <motion.div 
                  animate={{ x: ["120%", "-20%"] }} 
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <img src="/images/budurun.gif" className="h-10 scale-x-[-1]" alt="running" />
                </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}