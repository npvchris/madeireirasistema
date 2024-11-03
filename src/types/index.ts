export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'seller';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  purchasePrice: number;
  sellingPrice: number;
  minStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  paymentMethod: string;
  customerName?: string;
  date: string;
  seller: string;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CashRegister {
  id: string;
  openingBalance: number;
  currentBalance: number;
  transactions: Transaction[];
  openedAt: string;
  closedAt?: string;
}

export interface Transaction {
  id: string;
  type: 'sale' | 'expense' | 'adjustment';
  amount: number;
  description: string;
  date: string;
}