import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CashRegister, Transaction } from '../types';

interface CashRegisterState {
  register: CashRegister | null;
  openRegister: (openingBalance: number) => void;
  closeRegister: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export const useCashRegisterStore = create<CashRegisterState>()(
  persist(
    (set) => ({
      register: null,
      openRegister: (openingBalance) =>
        set({
          register: {
            id: crypto.randomUUID(),
            openingBalance,
            currentBalance: openingBalance,
            transactions: [],
            openedAt: new Date().toISOString(),
          },
        }),
      closeRegister: () =>
        set((state) => ({
          register: state.register
            ? {
                ...state.register,
                closedAt: new Date().toISOString(),
              }
            : null,
        })),
      addTransaction: (transaction) =>
        set((state) => {
          if (!state.register) return state;

          const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
          };

          const currentBalance =
            state.register.currentBalance +
            (transaction.type === 'expense' ? -transaction.amount : transaction.amount);

          return {
            register: {
              ...state.register,
              currentBalance,
              transactions: [...state.register.transactions, newTransaction],
            },
          };
        }),
    }),
    {
      name: 'cash-register-storage',
    }
  )
);