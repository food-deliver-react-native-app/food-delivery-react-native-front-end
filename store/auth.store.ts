import { getCurrentUser } from "@/lib/auth";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
  isAuthentificated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthentificated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  fetchAuthentificatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthentificated: false,
  user: null,
  isLoading: true,

  setIsAuthentificated: (value) => set({ isAuthentificated: value }),
  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),

  fetchAuthentificatedUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      if (user) {
        set({ isAuthentificated: true, user: user as User });
      } else {
        set({ isAuthentificated: false, user: null });
      }
    } catch (error) {
      console.log("fetch user error", error);
      set({ isAuthentificated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
