"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, User, Mail, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation Logic
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (password.length < 6) newErrors.password = "Minimum 6 characters required";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      // အကောင့်ဆောက်ခြင်းကို Simulate လုပ်ခြင်း
      setTimeout(() => {
        // Store ထဲတွင် သိမ်းဆည်းပြီး Login ဝင်လိုက်ခြင်း
        login({ name, email });
        setIsLoading(false);
        router.push("/"); // Home သို့ ပြန်ပို့မည်
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-6 pt-20 font-sans tracking-tight text-[#2C2926]">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Area */}
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-3xl font-serif italic font-light">Create Account</h1>
          <p className="text-[10px] text-[#A09080] font-bold uppercase tracking-[0.3em]">
            Join the Bubu & Dudu universe
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-8">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className={cn(
                    "w-full py-4 pl-8 bg-transparent border-b outline-none text-sm transition-all duration-500",
                    errors.name ? "border-rose-400" : "border-gray-100 focus:border-[#2C2926]"
                  )}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if(errors.name) setErrors({...errors, name: ""});
                  }}
                />
              </div>
              {errors.name && <p className="text-[9px] text-rose-500 font-bold uppercase pl-8">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className={cn(
                    "w-full py-4 pl-8 bg-transparent border-b outline-none text-sm transition-all duration-500",
                    errors.email ? "border-rose-400" : "border-gray-100 focus:border-[#2C2926]"
                  )}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if(errors.email) setErrors({...errors, email: ""});
                  }}
                />
              </div>
              {errors.email && <p className="text-[9px] text-rose-500 font-bold uppercase pl-8">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="password" 
                  placeholder="Create Password" 
                  className={cn(
                    "w-full py-4 pl-8 bg-transparent border-b outline-none text-sm transition-all duration-500",
                    errors.password ? "border-rose-400" : "border-gray-100 focus:border-[#2C2926]"
                  )}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if(errors.password) setErrors({...errors, password: ""});
                  }}
                />
              </div>
              {errors.password && <p className="text-[9px] text-rose-500 font-bold uppercase pl-8">{errors.password}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#2C2926] text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#A09080] transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {isLoading ? "Creating Universe..." : "Start Your Journey"}
            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-16 text-center border-t border-gray-50 pt-8">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Already a member?
            <Link href="/auth/login" className="text-[#2C2926] hover:underline underline-offset-8 ml-3 transition-all">
              Login Instead
            </Link>
          </p>
        </div>

        {/* Secure Badge */}
        <div className="mt-12 flex items-center justify-center gap-3 opacity-20 grayscale">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[8px] font-bold uppercase tracking-[0.4em]">100% Secure Registration</span>
        </div>
      </div>
    </div>
  );
}