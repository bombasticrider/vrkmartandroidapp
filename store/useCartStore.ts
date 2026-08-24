import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  productName: string;
  packSize: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, packSize: string) => void;
  updateQuantity: (productId: string, packSize: string, quantity: number) => void;
  clearCart: () => void;
  // Computed (these can be derived on the fly in components or kept as getters)
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.packSize === item.packSize
          );
          
          if (existingItemIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems };
          }
          
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (productId, packSize) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.packSize === packSize)
          )
        }));
      },
      
      updateQuantity: (productId, packSize, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, packSize);
          return;
        }
        
        set((state) => ({
          items: state.items.map((i) => 
            i.productId === productId && i.packSize === packSize
              ? { ...i, quantity }
              : i
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      
      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 500 || subtotal === 0 ? 0 : 40;
      },
      
      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'vrkmart-cart-storage',
    }
  )
);
