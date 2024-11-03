import React, { useState } from 'react';
import { useProductStore } from '../store/productStore';
import { useSaleStore } from '../store/saleStore';
import { useAuthStore } from '../store/authStore';
import { ShoppingCart, Plus, Printer } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function Sales() {
  const [cart, setCart] = useState<Array<{ productId: string; quantity: number }>>([]);
  const [customerName, setCustomerName] = useState('');
  const products = useProductStore((state) => state.products);
  const addSale = useSaleStore((state) => state.addSale);
  const user = useAuthStore((state) => state.user);

  const handleAddToCart = (productId: string, quantity: number) => {
    setCart([...cart, { productId, quantity }]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.sellingPrice || 0) * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    const saleItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.sellingPrice,
        subtotal: product.sellingPrice * item.quantity,
      };
    });

    const sale = {
      items: saleItems,
      total: calculateTotal(),
      paymentMethod: 'cash',
      customerName,
      seller: user?.username || 'unknown',
    };

    addSale(sale);
    setCart([]);
    setCustomerName('');
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    // Add invoice generation logic here
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">New Sale</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Products</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${product.sellingPrice} per {product.unit}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(product.id, 1)}
                  className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow sm:rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Current Cart</h2>
          <div className="space-y-4">
            {cart.map((item, index) => {
              const product = products.find((p) => p.id === item.productId)!;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x ${product.sellingPrice}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.quantity * product.sellingPrice).toFixed(2)}
                  </p>
                </div>
              );
            })}

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-base font-medium text-gray-900">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Complete Sale
                </button>
                <button
                  onClick={generateInvoice}
                  disabled={cart.length === 0}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-100"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}