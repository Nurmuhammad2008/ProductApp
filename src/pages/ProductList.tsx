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
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="border-4 border-indigo-200 border-t-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
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
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-4xl text-gray-900">
              Все продукты
            </h1>
            <button
              onClick={() => navigate('/create-product')}
              className="flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg text-white transition-all duration-300"
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
            className="border-gray-200 hover:border-gray-300 focus:border-indigo-300 bg-white shadow-sm px-6 py-4 pl-14 border rounded-xl focus:ring-4 focus:ring-indigo-100 w-full transition-all duration-200"
          />
          <FaSearch className="top-1/2 left-5 absolute w-5 h-5 text-gray-400 -translate-y-1/2" />
        </div>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          <div className="border-gray-100 bg-white shadow-sm py-16 border rounded-2xl text-center animate-fade-in">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 font-semibold text-2xl text-gray-800">
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
