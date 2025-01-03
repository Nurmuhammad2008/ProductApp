import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { FaSearch, FaHeart, FaPlus } from 'react-icons/fa';

export const ProductList = () => {
  const navigate = useNavigate();
  const { products, loading, filter, fetchProducts, toggleLike, deleteProduct, setFilter } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
      </div>
    );
  }

  const filteredProducts = products
    .filter(product => filter === 'liked' ? product.liked : true)
    .filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Все продукты
            </h1>
            <button
              onClick={() => navigate('/create')}
              className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 
                       transition-all duration-300 flex items-center justify-center"
            >
              <FaPlus className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setFilter(filter === 'liked' ? 'all' : 'liked')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all
              ${filter === 'liked' 
                ? 'bg-pink-500 text-white shadow-lg hover:bg-pink-600' 
                : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-200 hover:bg-pink-50'}`}
          >
            <FaHeart className={`w-5 h-5 ${filter === 'liked' ? 'text-white' : 'text-pink-500'}`} />
            <span className="font-medium">Избранное</span>
          </button>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Поиск продуктов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-14 bg-white rounded-xl shadow-sm
                     border border-gray-200 focus:border-indigo-300
                     focus:ring-4 focus:ring-indigo-100 
                     hover:border-gray-300 transition-all duration-200"
          />
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ 
                animationDelay: `${index * 0.05}s`,
                opacity: 0
              }}
            >
              <ProductCard
                product={product}
                onLike={toggleLike}
                onDelete={deleteProduct}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {searchQuery 
                ? 'Ничего не найдено' 
                : filter === 'liked' 
                  ? 'Нет избранных продуктов' 
                  : 'Список продуктов пуст'}
            </h3>
            <p className="text-gray-500">
              {searchQuery 
                ? 'Попробуйте изменить параметры поиска' 
                : filter === 'liked' 
                  ? 'Добавьте продукты в избранное, чтобы они появились здесь' 
                  : 'Продукты скоро появятся'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
