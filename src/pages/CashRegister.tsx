import React, { useState } from 'react';
import { useCashRegisterStore } from '../store/cashRegisterStore';
import { format } from 'date-fns';
import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Lock,
} from 'lucide-react';

export default function CashRegister() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const register = useCashRegisterStore((state) => state.register);
  const openRegister = useCashRegisterStore((state) => state.openRegister);
  const closeRegister = useCashRegisterStore((state) => state.closeRegister);
  const addTransaction = useCashRegisterStore((state) => state.addTransaction);

  const handleOpenRegister = (e: React.FormEvent) => {
    e.preventDefault();
    openRegister(Number(amount));
    setAmount('');
  };

  const handleAddTransaction = (type: 'sale' | 'expense' | 'adjustment') => {
    if (!amount || !description) return;
    
    addTransaction({
      type,
      amount: Number(amount),
      description,
    });

    setAmount('');
    setDescription('');
  };

  if (!register) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Open Cash Register</h1>
        <form onSubmit={handleOpenRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Opening Balance ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Open Register
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Cash Register</h1>
        <button
          onClick={closeRegister}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Lock className="h-4 w-4 mr-2" />
          Close Register
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Current Balance
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    ${register.currentBalance.toFixed(2)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add Transaction</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleAddTransaction('sale')}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowUpCircle className="h-4 w-4 mr-2" />
              Add Sale
            </button>
            <button
              onClick={() => handleAddTransaction('expense')}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <ArrowDownCircle className="h-4 w-4 mr-2" />
              Add Expense
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Transaction History
          </h3>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {register.transactions.map((transaction) => (
                <li key={transaction.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {transaction.type === 'sale' ? (
                        <ArrowUpCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <ArrowDownCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(transaction.date), 'PPp')}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.type === 'sale'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}