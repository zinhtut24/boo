import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
};

interface CartState {
  cart: CartItem[];
  // product တစ်ခုလုံး (quantity အပါအဝင်) ကို လက်ခံရန် ပြင်ဆင်ထားသည်
  addToCart: (product: CartItem) => void; 
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          // ပစ္စည်းရှိပြီးသားဆိုလျှင် လက်ရှိရှိနေသော quantity ထဲသို့ အသစ်ထည့်သော quantity ကို ပေါင်းမည်
          set({
            cart: currentCart.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + product.quantity } 
                : item
            ),
          });
        } else {
          // ပစ္စည်းအသစ်ဆိုလျှင် တစ်ခါတည်း ထည့်မည်
          set({ cart: [...currentCart, product] });
        }
      },

      removeFromCart: (id) => 
        set({ cart: get().cart.filter((item) => item.id !== id) }),

      updateQuantity: (id, delta) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id 
              ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      totalPrice: () => 
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    { 
      name: 'cart-storage' 
    }
  )
);