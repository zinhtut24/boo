"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrors({ form: "Please fill all fields" });
      return;
    }
    login({ name: email.split('@')[0], email }); // Login logic
    router.push("/"); // Home ကိုပြန်ပို့မည်
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-serif italic mb-2">Welcome Back</h1>
          <p className="text-[10px] text-[#A09080] font-bold uppercase tracking-[0.3em]">Bubu is waiting for you</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-4">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-4 bg-transparent border-b border-gray-100 outline-none text-sm" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-4 bg-transparent border-b border-gray-100 outline-none text-sm" />
          </div>
          <button type="submit" className="w-full bg-[#2C2926] text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#A09080] transition-all flex items-center justify-center gap-3 group">
            Enter the Studio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        <div className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Don't have an account? <Link href="/auth/register" className="text-[#2C2926] hover:underline ml-2">Register</Link>
        </div>
      </div>
    </div>
  );
}