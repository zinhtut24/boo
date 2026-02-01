"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Heart, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/footer";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  // ✅ Hydration Error ကာကွယ်ရန် useEffect ကိုသုံးပါသည်
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!email || !password) {
      setErrors({ form: "Please provide your magic credentials" });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    login({ name: email.split('@')[0], email });
    router.push("/"); 
  };

  // 💡 --- BLING BLING HEARTS BACKGROUND ---
  const BlingHearts = () => {
    // Browser မရောက်မချင်း (Server-side မှာ) ဘာမှမပြစေရန်
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
              opacity: [0.2, 0.8, 0.2],
              rotate: [0, 20, -20, 0],
              filter: ["blur(0px)", "blur(1px)", "blur(0px)"] 
            }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity }}
          >
            <Heart fill={i % 2 === 0 ? "#FFB6C1" : "#FFFFFF"} className="text-white/20" size={Math.random() * 15 + 10} />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
      <div className="fixed inset-0 z-[-1]" style={{ background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
          backgroundSize: "400% 400%",
          animation: "bgFlow 10s ease infinite", }} />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes bgFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }` }} />
      
      <div className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 relative">
        <BlingHearts />

        {/* 🧸 LEFT SIDE: Bubu (Click to Register) */}
        <motion.div 
          className="absolute left-[8%] top-[35%] z-20 hidden xl:flex flex-col items-center group cursor-pointer"
          onClick={() => router.push("/auth/register")}
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
           <div className="bg-[#2C2926] text-white text-[9px] font-bold px-3 py-1.5 rounded-full mb-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
             Tap to Register! 🎀
           </div>
          <img src="/images/bubu1.png" className="w-36 drop-shadow-2xl" alt="Bubu" />
        </motion.div>

        {/* 🧸 RIGHT SIDE: Dudu (Direction Guide) */}
        <motion.div 
          className="absolute right-[8%] top-[35%] z-20 hidden xl:flex flex-col items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl mb-4 relative border border-pink-100 max-w-[180px]">
            <p className="text-[10px] font-bold text-[#2C2926] leading-relaxed">
              Hello! Have you joined us? If not, <span className="text-rose-500">click Bubu</span> on the left to Register! ✨
            </p>
            <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white rotate-45 border-r border-b border-pink-100" />
          </div>
          <img src="/images/dudu1.png" className="w-36 drop-shadow-2xl opacity-90" alt="Dudu" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full z-10"
        >
          <div className="bg-white/60 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/80 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] space-y-10 relative overflow-hidden">
            
            {/* 🏃‍♂️ Bubu Dudu Running Inside */}
            <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none opacity-30">
                <motion.div 
                  animate={{ x: ["-20%", "120%"] }} 
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <img src="/images/budurun.gif" className="h-10" alt="running" />
                </motion.div>
            </div>

            <div className="text-center space-y-3 relative z-10">
              <motion.div 
                 initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                 className="w-16 h-16 bg-[#2C2926] rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-2xl rotate-3"
              >
                 <Lock className="text-[#D09478] w-8 h-8" />
              </motion.div>
              <h1 className="text-4xl font-serif italic text-[#2C2926] font-bold">Welcome Back</h1>
              <p className="text-[11px] text-[#2C2926] font-bold uppercase tracking-[0.4em] opacity-70">The Studio Awaits You</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
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
              </div>

              <div className="space-y-1">
                <div className="relative group border-b-2 border-gray-300 focus-within:border-[#A09080] transition-all">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2926]" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
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
              </div>

              {errors.form && (
                <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest text-center">{errors.form}</p>
              )}

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-[#2C2926] text-white py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#A09080] active:scale-[0.98] disabled:bg-gray-400 transition-all flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Enter the Studio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </form>

            <div className="text-center relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2C2926]/60">
                Don't have an account? 
                <Link href="/auth/register" className="text-[#2C2926] font-black hover:text-[#A09080] ml-2 underline underline-offset-4 decoration-2">Join Us</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}