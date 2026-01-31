"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minus } from "lucide-react";

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export default function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Mingalaba! I'm Boo AI. How can I help you find the perfect gift today? ✨" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are Boo AI, a helpful and aesthetic luxury gift assistant for 'Boo Gift Accessories' in Yangon. You sell flowers, plushies (Bubu & Dudu), blind boxes, and have a 3D studio. Answer politely and concisely in English or Burmese. Keep responses brief."
            },
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const botText = data.choices[0].message.content;
      setMessages((prev) => [...prev, { role: "assistant", text: botText }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, I'm having a little connection issue. Can you try again?" }]);
    } finally {
      setIsLoading(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            // 💡 Background ကို Glassmorphism + Animated Gradient ပြောင်းလဲထားပါသည်
            className="mb-6 w-[350px] sm:w-[380px] h-[550px] max-h-[70vh] rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden flex flex-col relative"
            style={{
              background: "linear-gradient(-45deg, #cb967d, #f5c9ea, #edf7c1, #e5c5b1)",
              backgroundSize: "400% 400%",
              animation: "bgFlow 10s ease infinite",
            }}
          >
            {/* Header - Transparent overlay */}
            <div className="shrink-0 p-6 bg-[#2C2926]/90 backdrop-blur-md text-white flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/images/bubu1.png" className="w-10 h-10 rounded-full bg-white p-1" alt="Bubu" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2C2926] rounded-full" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight text-white">Boo Assistant</h4>
                  <p className="text-[9px] text-white/60 uppercase tracking-widest italic">Powered by Groq AI</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Body - Glass Effect */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/30 backdrop-blur-xl scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-[1.8rem] text-sm leading-relaxed ${
                    msg.role === "user" ? "bg-[#2C2926] text-white rounded-tr-none shadow-md" : "bg-white/80 backdrop-blur-sm text-[#2C2926] rounded-tl-none border border-white/40 shadow-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-center gap-3 text-[#2C2926]/50">
                  <img src="/images/dudu1.png" className="w-8 h-8 animate-bounce opacity-70" alt="Thinking" />
                  <span className="text-[10px] uppercase tracking-widest animate-pulse font-bold">Typing...</span>
                </div>
              )}
            </div>

            {/* Input Area - Glass overlay */}
            <div className="shrink-0 p-6 bg-white/40 backdrop-blur-2xl border-t border-white/20 flex items-center gap-3 z-10">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/60 backdrop-blur-sm border border-white/20 outline-none py-3 px-6 rounded-full text-sm placeholder:text-gray-400 text-[#2C2926]"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading} 
                className="bg-[#2C2926] p-3.5 rounded-full text-white hover:bg-[#A09080] disabled:opacity-50 transition-all flex items-center justify-center shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#2C2926] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-2 border-white relative group"
      >
        {isOpen ? <Minus className="text-white" /> : <img src="/images/bubu1.png" className="w-10 h-10 group-hover:scale-110 transition-transform" alt="Chat Icon" />}
      </motion.button>
    </div>
  );
}