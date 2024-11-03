import React, { useState } from 'react';
import { useProductStore } from '../store/productStore';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';
import { Plus } from 'lucide-react';

export default function Products() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {isAddingProduct && (
        <ProductForm onClose={() => setIsAddingProduct(false)} />
      )}

      <ProductList />
    </div>
  );
}