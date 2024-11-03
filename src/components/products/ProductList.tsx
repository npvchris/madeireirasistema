import React, { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import ProductForm from './ProductForm';
import { Pencil, Trash2 } from 'lucide-react';

export default function ProductList() {
  const products = useProductStore((state) => state.products);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id}>
            {editingProduct === product.id ? (
              <ProductForm
                product={product}
                onClose={() => setEditingProduct(null)}
              />
            ) : (
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-green-600 truncate">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {product.quantity} {product.unit}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      ${product.sellingPrice.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingProduct(product.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Pencil className="h-5 w-5 text-gray-500" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Category: {product.category}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Min Stock: {product.minStock} {product.unit}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}