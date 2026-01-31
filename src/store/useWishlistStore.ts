import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Product = {
  id: string;
  name: string;
  price: string;
  img: string;
};

interface WishlistState {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const isExist = currentWishlist.find((item) => item.id === product.id);

        if (isExist) {
          set({ wishlist: currentWishlist.filter((item) => item.id !== product.id) });
        } else {
          set({ wishlist: [...currentWishlist, product] });
        }
      },
      isInWishlist: (id) => get().wishlist.some((item) => item.id === id),
    }),
    { name: 'wishlist-storage' } // Browser ကို ပိတ်လိုက်ရင်တောင် Wishlist မပျောက်အောင် သိမ်းပေးထားမယ်
  )
);