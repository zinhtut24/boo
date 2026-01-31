// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind classes တွေကို dynamic ဖြစ်အောင် ပေါင်းပေးတဲ့ function ပါ။
 * class တွေ ထပ်နေရင် (ဥပမာ- px-2 နဲ့ px-4 ထပ်နေရင်) နောက်ဆုံးကဟာကို အလိုအလျောက် ယူပေးပါတယ်။
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

