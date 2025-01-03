import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaPlus, FaBars } from 'react-icons/fa';
import { useState } from 'react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                ProductApp
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <FaHome className="w-4 h-4" />
                Главная
              </span>
            </Link>

            <Link
              to="/products"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/products')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <FaShoppingBag className="w-4 h-4" />
                Все продукты
              </span>
            </Link>

            <Link
              to="/create-product"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/create-product')
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <FaPlus className="w-4 h-4" />
                Добавить продукт
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-2 space-y-1">
          <Link
            to="/"
            className={`block px-4 py-2 rounded-lg font-medium transition-all ${
              isActive('/')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              <FaHome className="w-4 h-4" />
              Главная
            </span>
          </Link>

          <Link
            to="/products"
            className={`block px-4 py-2 rounded-lg font-medium transition-all ${
              isActive('/products')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              <FaShoppingBag className="w-4 h-4" />
              Все продукты
            </span>
          </Link>

          <Link
            to="/create-product"
            className={`block px-4 py-2 rounded-lg font-medium transition-all ${
              isActive('/create-product')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              <FaPlus className="w-4 h-4" />
              Добавить продукт
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
