import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      // ==========================================
      // ADD
      // ==========================================

      addToWishlist: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.id === product.id
          );

          if (exists) {
            return state;
          }

          return {
            items: [
              ...state.items,
              product,
            ],
          };
        }),

      // ==========================================
      // REMOVE
      // ==========================================

      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== id
          ),
        })),

      // ==========================================
      // TOGGLE
      // ==========================================

      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.items.some(
            (item) => item.id === product.id
          );

          if (exists) {
            return {
              items: state.items.filter(
                (item) =>
                  item.id !== product.id
              ),
            };
          }

          return {
            items: [
              ...state.items,
              product,
            ],
          };
        }),

      // ==========================================
      // CHECK
      // ==========================================

      isInWishlist: (id) => {
        return get().items.some(
          (item) => item.id === id
        );
      },

      // ==========================================
      // CLEAR
      // ==========================================

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),

    {
      name: "chronova-wishlist",
    }
  )
);

export default useWishlistStore;