import { create } from 'zustand';
import { Product } from '../types';
import { persist } from 'zustand/middleware';

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Ноутбук Apple MacBook Pro",
    price: 1299.99,
    description: "Мощный ноутбук с процессором M1 Pro, 16 ГБ памяти и 512 ГБ SSD",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    liked: false
  },
  {
    id: 2,
    title: "Смартфон iPhone 13 Pro",
    price: 999.99,
    description: "Флагманский смартфон с тройной камерой и OLED дисплеем",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500",
    liked: false
  },
  {
    id: 3,
    title: "Наушники Sony WH-1000XM4",
    price: 349.99,
    description: "Беспроводные наушники с шумоподавлением и HD звуком",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    liked: false
  },
  {
    id: 4,
    title: "Умные часы Apple Watch Series 7",
    price: 399.99,
    description: "Смарт-часы с большим дисплеем и функцией ЭКГ",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    liked: false
  },
  {
    id: 5,
    title: "Планшет iPad Pro",
    price: 799.99,
    description: "12.9-дюймовый планшет с процессором M1 и дисплеем Liquid Retina XDR",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    liked: false
  }
];

type Store = {
  products: Product[];
  loading: boolean;
  filter: 'all' | 'liked';
  fetchProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: Omit<Product, 'id' | 'liked'>) => void;
  setFilter: (filter: 'all' | 'liked') => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      filter: 'all',

      fetchProducts: async () => {
        if (get().products.length > 0) return;
        
        set({ loading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          set({ products: mockProducts, loading: false });
        } catch (error) {
          console.error('Error loading products:', error);
          set({ loading: false });
        }
      },

      toggleLike: (id) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, liked: !product.liked } : product
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      addProduct: (productData) => {
        set((state) => {
          const newId = Math.max(0, ...state.products.map((p) => p.id)) + 1;
          const newProduct = {
            ...productData,
            id: newId,
            liked: false,
          };
          return {
            products: [...state.products, newProduct], 
          };
        });
      },

      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'products-storage',
      partialize: (state) => ({ products: state.products }), // Only persist products
    }
  )
);
