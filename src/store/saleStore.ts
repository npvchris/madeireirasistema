import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Sale, SaleItem } from '../types';

interface SaleState {
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  getSaleById: (id: string) => Sale | undefined;
}

export const useSaleStore = create<SaleState>()(
  persist(
    (set, get) => ({
      sales: [],
      addSale: (sale) =>
        set((state) => ({
          sales: [
            ...state.sales,
            {
              ...sale,
              id: crypto.randomUUID(),
              date: new Date().toISOString(),
            },
          ],
        })),
      getSaleById: (id) => get().sales.find((s) => s.id === id),
    }),
    {
      name: 'sale-storage',
    }
  )
);