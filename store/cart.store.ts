import {
  deleteCartItem as deleteCartAPI,
  getCartItems,
  postCart,
} from "@/api/CartRouter";
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

  deleteCartItem: (params: { id: string; menuId?: string }) => Promise<void>;

  updateItemQuantityLocally: (id: string, newQuantity: number) => void;
  removeItemLocally: (id: string) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set, get) => ({
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
      await postCart({ menuId, quantity, customizations });

      const existingItem = get().items.find((item) => item.menu?.id === menuId);

      if (existingItem) {
        // Update quantity if already exists
        set((state) => ({
          items: state.items.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }));
      } else {
        // Fallback to refetch cart if needed
        await get().fetchCart();
      }
    } catch (err) {
      console.error("Failed to add item to cart", err);
    }
  },

  deleteCartItem: async ({ id, menuId }) => {
    try {
      await deleteCartAPI(id, menuId);

      const item = get().items.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        }));
      } else {
        // Remove if quantity <= 1
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      }
    } catch (error) {
      console.error("Failed to delete cart item", error);
    }
  },

  updateItemQuantityLocally: (id: string, newQuantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    }));
  },

  removeItemLocally: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
