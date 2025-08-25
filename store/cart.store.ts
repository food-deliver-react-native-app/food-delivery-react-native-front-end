import { getCartItems, postCart } from "@/api/CartRouter";
import { CartItemType } from "@/type";
import { create } from "zustand";

type CartState = {
  items: CartItemType[];
  isLoading: boolean;

  fetchCart: () => Promise<void>;
  addItem: (data: {
    menuId: string;
    quantity?: number;
    customizations?: string[];
  }) => Promise<void>;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set) => ({
  items: [],
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await getCartItems();
      set({ items: res });
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async ({ menuId, quantity = 1, customizations = [] }) => {
    try {
      const updatedCartItem = await postCart({
        menuId,
        quantity,
        customizations,
      });

      set((state) => {
        const filtered = state.items.filter((i) => i.id !== updatedCartItem.id);
        return { items: [...filtered, updatedCartItem] };
      });
    } catch (err) {
      console.error("Failed to add item to cart", err);
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
