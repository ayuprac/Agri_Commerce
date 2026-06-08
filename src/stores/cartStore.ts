import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
  stock: number;
  unit: string;
  selected?: boolean;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSelectItem: (id: string) => void;
  selectAll: (selected: boolean) => void;
  clearCart: () => void;
  getSelectedItems: () => CartItem[];
  getSelectedTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(i => i.id === item.id);
        
        let newItems;
        if (existingItem) {
          newItems = currentItems.map(i =>
            i.id === item.id
              ? { ...i, quantity: Math.min(i.quantity + item.quantity, i.stock) }
              : i
          );
        } else {
          newItems = [...currentItems, { ...item, selected: true }];
        }
        
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        
        set({ items: newItems, totalItems, totalPrice });
      },
      
      removeItem: (id) => {
        const newItems = get().items.filter(i => i.id !== id);
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        
        set({ items: newItems, totalItems, totalPrice });
      },
      
      updateQuantity: (id, quantity) => {
        const newItems = get().items.map(i =>
          i.id === id ? { ...i, quantity: Math.min(Math.max(1, quantity), i.stock) } : i
        );
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        
        set({ items: newItems, totalItems, totalPrice });
      },
      
      toggleSelectItem: (id) => {
        const newItems = get().items.map(i =>
          i.id === id ? { ...i, selected: !i.selected } : i
        );
        set({ items: newItems });
      },
      
      selectAll: (selected) => {
        const newItems = get().items.map(i => ({ ...i, selected }));
        set({ items: newItems });
      },
      
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
      
      getSelectedItems: () => {
        return get().items.filter(i => i.selected);
      },
      
      getSelectedTotal: () => {
        return get().items
          .filter(i => i.selected)
          .reduce((sum, i) => sum + (i.price * i.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);