"use client";

import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard, Wallet, MapPin, Gift, CheckCircle2, Upload, Download, Calendar, Sparkles, X, Heart } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/layout/footer"; 
import html2canvas from "html2canvas";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); 
  const [selectedPayment, setSelectedPayment] = useState("kpay");
  const [city, setCity] = useState("");
  const [deliFee, setDeliFee] = useState(0);
  const voucherRef = useRef<HTMLDivElement>(null);

  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState(""); 
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const qrImages: Record<string, string> = {
    kpay: "/images/kbz-qr.jpg",   
    wave: "/images/wave-qr.jpg",  
  };

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => { 
    setMounted(true); 
    if (city === "Yangon") setDeliFee(2500);
    else if (city === "Mandalay") setDeliFee(4000);
    else if (city !== "" && city !== "") setDeliFee(5000);
    else setDeliFee(0);
  }, [city]);

  // 💡 --- BLING BLING HEARTS BACKGROUND LOGIC ---
  const BlingHearts = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
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

  const downloadVoucher = async () => {
    if (voucherRef.current) {
      const canvas = await html2canvas(voucherRef.current, { backgroundColor: null, scale: 2 });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `BOO-Voucher-${orderId}.png`;
      link.click();
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Numbers only";
    }
    if (!city) newErrors.city = "Select city";
    if (!address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (!validateForm()) return;
    const generatedId = "BOO-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(generatedId);
    setCheckoutStep(3); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main 
      className="flex flex-col w-full min-h-screen relative overflow-x-hidden selection:bg-[#D09478] selection:text-white"
      style={{
        background: "linear-gradient(-45deg, #cb967d, #f8a2e3, #f8ffbd, #e5c5b1)",
          backgroundSize: "400% 400%",
          animation: "bgFlow 10s ease infinite",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `@keyframes bgFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }` }} />

      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "2px",
              height: "2px",
              boxShadow: "0 0 8px white",
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <BlingHearts />

      <motion.img src="/images/bubu1.png" className="fixed top-24 left-[2%] w-24 md:w-32 opacity-20 pointer-events-none z-0 hidden lg:block" animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.img src="/images/bubududu1.png" className="fixed bottom-10 right-[2%] w-32 md:w-40 opacity-20 pointer-events-none z-0 hidden lg:block" animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity }} />

      <div className="relative z-10 w-full flex flex-col min-h-screen font-sans">
        <main className="flex-grow pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            
            {checkoutStep < 3 && cart.length > 0 && (
              <div className="flex flex-col items-center mb-10 text-center">
                <h1 className="text-4xl font-serif text-[#2C2926]">Your Magic Bag</h1>
                {checkoutStep === 2 ? (
                   <button onClick={() => setCheckoutStep(1)} className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#A09080] hover:text-[#2C2926] transition-colors group">
                     <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Review
                   </button>
                ) : (
                  <Link href="/shop/collection" className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#A09080] hover:text-[#2C2926] transition-colors group">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Add surprises
                  </Link>
                )}
              </div>
            )}

            {checkoutStep === 3 ? (
              <div className="max-w-xl mx-auto text-center py-10 animate-in zoom-in duration-700">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-3xl font-serif text-[#2C2926] mb-2 italic">Order Confirmed!</h2>
                
                <div ref={voucherRef} className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white relative mb-6 text-left p-0">
                  <div className="bg-[#2C2926] p-8 text-white relative text-center">
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full" />
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 rounded-full" />
                      <img src="/images/bubu1.png" className="absolute top-2 left-4 w-12 h-12 rotate-[-15deg] drop-shadow-lg" alt="" />
                      <h3 className="text-xl font-serif italic">Boo Gift Voucher</h3>
                      <img src="/images/bubududu1.png" className="absolute bottom-4 right-4 w-16 h-16 opacity-80" alt="" />
                      <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] mt-2">ID: {orderId}</p>
                  </div>
                  <div className="p-8 space-y-4 relative">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>Recipient</span><span className="text-[#2C2926]">{fullName}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>Est. Arrival</span><span className="text-[#2C2926]">{city === "Yangon" ? "2-3 Days" : "5-7 Days"}</span>
                    </div>
                    <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
                      <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Amount</p>
                          <p className="text-xl font-serif text-[#2C2926]">{Math.floor(totalPrice() + deliFee).toLocaleString()} MMK</p>
                      </div>
                      <div className="bg-green-50 text-green-600 text-[8px] font-bold px-3 py-1 rounded-full uppercase">Verified</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button onClick={downloadVoucher} className="flex items-center justify-center gap-2 bg-[#A09080] text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#2C2926] transition-all">
                    <Download className="w-4 h-4" /> Save Voucher Image
                  </button>
                  <Link href="/" onClick={() => clearCart()} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#2C2926]">Skip & Back Home</Link>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                 <div className="relative mb-8">
                    <div className="w-32 h-32 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-inner">
                      <Gift className="w-10 h-10 text-gray-200" />
                    </div>
                 </div>
                 <h2 className="text-2xl font-serif text-[#2C2926] mb-4">Your bag is empty</h2>
                 <Link href="/shop/collection" className="bg-[#2C2926] text-white px-10 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#A09080] transition-all">Explore Collection</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  {checkoutStep === 1 ? (
                    <div className="space-y-4">
                      <h2 className="text-lg font-serif text-[#2C2926] px-4 italic">Bag Items</h2>
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-6 bg-white/40 backdrop-blur-md p-5 rounded-[2rem] border border-white/60 shadow-sm hover:shadow-md transition-all group">
                          <div className="w-24 h-24 bg-white/60 rounded-[1.5rem] overflow-hidden shrink-0 border border-white/20">
                            <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-[13px] font-bold text-[#2C2926] uppercase">{item.name}</p>
                            <p className="text-[11px] text-[#A09080] font-bold">{Math.floor(item.price).toLocaleString()} MMK</p>
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center bg-white/60 rounded-full p-1 border border-white/40">
                                <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white"><Minus className="w-3 h-3 text-gray-400" /></button>
                                <span className="text-[11px] font-bold w-7 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white"><Plus className="w-3 h-3 text-gray-400" /></button>
                              </div>
                              <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-rose-500 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-sm space-y-5">
                        <h2 className="text-xl font-serif italic">Contact information</h2>
                        <div className="relative group">
                          <label className="absolute left-4 top-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-all group-focus-within:text-[#A09080]">Email</label>
                          <input type="email" value={email} placeholder="your@email.com" onChange={(e) => setEmail(e.target.value)} className={cn("w-full pt-8 pb-3 px-4 bg-white/60 rounded-2xl outline-none border transition-all text-sm text-[#2C2926]", errors.email ? "border-rose-400" : "border-white/40 focus:border-[#A09080]/50")} />
                        </div>
                      </div>

                      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-sm space-y-6">
                        <h2 className="text-xl font-serif flex items-center gap-3 italic"><MapPin className="w-5 h-5 text-[#A09080]" /> Delivery Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[9px] uppercase font-bold tracking-widest text-gray-400">
                          <div className="space-y-2">
                             <label className="ml-2">Recipient Name</label>
                             <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={cn("w-full p-3.5 bg-white/60 rounded-xl outline-none border transition-all text-sm text-[#2C2926] normal-case", errors.fullName ? "border-rose-400" : "border-white/40 focus:border-[#A09080]/50")} />
                          </div>
                          <div className="space-y-2">
                             <label className="ml-2">Phone</label>
                             <input type="text" placeholder="09xxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} className={cn("w-full p-3.5 bg-white/60 rounded-xl outline-none border transition-all text-sm text-[#2C2926]", errors.phone ? "border-rose-400" : "border-white/40 focus:border-[#A09080]/50")} />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="ml-2">Select City</label>
                            <select onChange={(e) => setCity(e.target.value)} value={city} className={cn("w-full p-3.5 bg-white/60 rounded-xl outline-none appearance-none text-sm text-[#2C2926] border transition-all", errors.city ? "border-rose-400" : "border-white/40 focus:border-[#A09080]/50")}>
                              <option value="">Select City...</option>
                              <option value="Yangon">Yangon</option>
                              <option value="Mandalay">Mandalay</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="ml-2">Detailed Address</label>
                            <textarea placeholder="Exact Address Details..." value={address} onChange={(e) => setAddress(e.target.value)} className={cn("w-full p-4 bg-white/60 rounded-xl outline-none h-20 text-sm text-[#2C2926] normal-case border transition-all", errors.address ? "border-rose-400" : "border-white/40 focus:border-[#A09080]/50")}></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/60 shadow-sm space-y-6">
                        <h2 className="text-xl font-serif italic">Payment method</h2>
                        
                        <div className="flex flex-nowrap bg-white/60 p-1.5 rounded-2xl border border-white/40 w-full overflow-x-hidden shadow-inner">
                          {["kpay", "wave", "card"].map((id) => (
                            <button 
                              key={id} 
                              onClick={() => setSelectedPayment(id)} 
                              className={cn(
                                "flex-1 py-3 rounded-xl transition-all whitespace-nowrap px-1",
                                "text-[7.5px] min-[380px]:text-[9px] min-[450px]:text-[11px] font-bold uppercase tracking-tighter sm:tracking-widest",
                                selectedPayment === id ? "bg-[#2C2926] text-white shadow-md scale-[1.02]" : "text-gray-400 hover:text-[#2C2926]"
                              )}
                            >
                              {id === "card" ? "Card Pay" : id === "wave" ? "WavePay" : "KBZ Pay"}
                            </button>
                          ))}
                        </div>

                        <div className="pt-2">
                          {selectedPayment === "card" ? (
                            <div className="space-y-4 animate-in fade-in duration-500">
                               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Card information</label>
                               <div className="border border-white/60 rounded-xl overflow-hidden bg-white/60 shadow-sm">
                                  <div className="flex items-center px-4 py-4 border-b border-white/40">
                                    <input type="text" placeholder="1234 1234 1234 1234" className="flex-1 bg-transparent outline-none text-sm text-[#2C2926]" />
                                    <div className="flex gap-2 opacity-70 shrink-0"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5" alt="Visa" /><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4.5" alt="Master" /></div>
                                  </div>
                                  <div className="flex bg-white/20">
                                    <div className="w-1/2 relative border-r border-white/40 flex items-center px-4 py-3.5"><Calendar className="w-4 h-4 text-[#A09080] shrink-0 mr-3" /><input type="text" placeholder="MM / YY" className="w-full bg-transparent outline-none text-sm text-[#2C2926] uppercase font-bold placeholder:text-gray-300" /></div>
                                    <div className="w-1/2 flex items-center px-4 py-3.5"><input type="text" placeholder="CVC" className="w-full bg-transparent outline-none text-sm text-[#2C2926] placeholder:text-gray-300" /><CreditCard className="w-4 h-4 text-[#A09080] shrink-0 ml-2" /></div>
                                  </div>
                               </div>
                               <div className="space-y-1"><label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cardholder name</label><input type="text" placeholder="Full name on card" className="w-full p-4 bg-white/60 border border-white/40 rounded-xl outline-none text-sm text-[#2C2926] placeholder:text-gray-300" /></div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center space-y-5 py-2 animate-in fade-in duration-500">
                              <div className="bg-white p-3 rounded-2xl border-2 border-dashed border-[#A09080]/20">
                                <img src={qrImages[selectedPayment]} className="w-36 h-36 object-contain" alt="Payment QR" />
                              </div>
                              
                              {previewImage ? (
                                <div className="relative w-full max-w-xs aspect-video rounded-2xl overflow-hidden border border-white/60 shadow-lg group">
                                  <img src={previewImage} className="w-full h-full object-cover" alt="Payment Preview" />
                                  <button onClick={() => setPreviewImage(null)} className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors">
                                    <X className="w-3 h-3" />
                                  </button>
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <span className="text-[8px] font-bold text-white uppercase tracking-widest">Tap X to re-upload</span>
                                  </div>
                                </div>
                              ) : (
                                <label className="w-full max-w-xs flex flex-col items-center justify-center p-5 bg-white/40 border border-dashed border-white/60 rounded-[1.5rem] cursor-pointer hover:bg-white/60 transition-all shadow-sm">
                                  <Upload className="w-5 h-5 text-gray-300 mb-2" />
                                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest text-center font-sans">Upload Payment Screenshot</span>
                                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                </label>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-[#A09080]/90 backdrop-blur-xl rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group sticky top-32 border border-white/20">
                    <img src="/images/bubududu1.png" className="absolute -top-4 -right-4 w-20 h-20 opacity-20" alt="" />
                    <h3 className="text-xl font-serif mb-8 flex items-center gap-3 italic">Magic Totals <Gift className="w-4 h-4 text-white" /></h3>
                    <div className="space-y-5 mb-10 text-[10px] uppercase tracking-[0.2em] text-white/90 font-bold">
                      <div className="flex justify-between"><span>Value</span><span className="text-white text-base">{Math.floor(totalPrice()).toLocaleString()} MMK</span></div>
                      <div className="flex justify-between"><span>Deli Fee</span><span className="text-white text-base">{city && deliFee > 0 ? `${deliFee.toLocaleString()} MMK` : "Pending..."}</span></div>
                      <div className="flex justify-between border-b border-white/20 pb-5"><span>Boo Love</span><span className="text-white font-bold">Included</span></div>
                      <div className="pt-4 flex justify-between items-end">
                        <div className="space-y-1"><p className="text-white/70 text-[8px] uppercase tracking-widest font-bold">Grand Total</p><h4 className="text-3xl font-serif text-white tracking-tight italic">{Math.floor(totalPrice() + (city ? deliFee : 0)).toLocaleString()}</h4></div>
                        <p className="text-white/60 italic mb-1 lowercase font-bold text-xs tracking-tighter">MMK</p>
                      </div>
                    </div>
                    {checkoutStep === 1 ? (
                      <button onClick={() => setCheckoutStep(2)} className="w-full bg-[#2C2926] py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:bg-white hover:text-[#2C2926] transition-all shadow-xl active:scale-95">Go to Checkout</button>
                    ) : (
                      <button onClick={handleConfirmOrder} className="w-full bg-white text-[#A09080] py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl hover:bg-[#2C2926] hover:text-white transition-all active:scale-95 font-sans">Confirm Surprise</button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </main>
  );
}