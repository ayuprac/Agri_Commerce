import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product.types';

interface WishlistStore {
  items: Product[];
  
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const currentItems = get().items;
        if (!currentItems.find(i => i.id === item.id)) {
          set({ items: [...currentItems, item] });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      
      isInWishlist: (id) => {
        return get().items.some(i => i.id === id);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);