import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Font အသစ်တွေ ထည့်ပါမယ်
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import AIBot from "@/components/layout/ai-bot";


// Font တွေကို သတ်မှတ်ခြင်း (Professional ဆန်ဖို့အတွက်)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Boo Gift Accessories | The Aesthetic Gifting Experience",
  description: "Curated luxury gift boxes for your loved ones in Yangon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      {/* suppressHydrationWarning ကို body မှာ ထည့်ပေးရပါမယ် */}
      <body suppressHydrationWarning={true} className="antialiased">
        <Navbar />
        {/* min-h-screen ပေးထားခြင်းဖြင့် Content နည်းလည်း Layout မပျက်ပါဘူး */}
        <main className="min-h-screen">
          {children}
        </main>
        <AIBot />
      </body>
    </html>
  );
}