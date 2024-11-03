import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  Trees,
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  LogOut,
} from 'lucide-react';

export default function Layout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Trees className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Sistema Madeireira</span>
            </div>

            <div className="flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-green-900 text-white'
                      : 'text-green-100 hover:bg-green-700'
                  }`
                }
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Painel
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-green-900 text-white'
                      : 'text-green-100 hover:bg-green-700'
                  }`
                }
              >
                <Package className="h-4 w-4 mr-2" />
                Produtos
              </NavLink>

              <NavLink
                to="/sales"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-green-900 text-white'
                      : 'text-green-100 hover:bg-green-700'
                  }`
                }
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Vendas
              </NavLink>

              <NavLink
                to="/cash-register"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-green-900 text-white'
                      : 'text-green-100 hover:bg-green-700'
                  }`
                }
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Caixa
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-green-100 hover:bg-green-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}