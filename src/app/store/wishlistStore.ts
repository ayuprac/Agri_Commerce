import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  totalItems: number;
  addItem: (item: WishlistItem) => void;
  removeItem: (itemId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,

      addItem: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.id === item.id);
        
        if (!exists) {
          const newItems = [...items, item];
          set({ 
            items: newItems,
            totalItems: newItems.length 
          });
        }
      },

      removeItem: (itemId) => {
        const newItems = get().items.filter((i) => i.id !== itemId);
        set({ 
          items: newItems,
          totalItems: newItems.length 
        });
      },

      isInWishlist: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      clearWishlist: () => {
        set({ items: [], totalItems: 0 });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);