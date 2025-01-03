import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useStore();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto animate-fade-in">
            <div className="text-6xl mb-6 text-center">🔍</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center gradient-text">
              Продукт не найден
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              К сожалению, запрашиваемый продукт не существует или был удален
            </p>
            <div className="text-center">
              <button 
                onClick={() => navigate('/products')}
                className="btn-primary px-8 py-3"
              >
                Вернуться к списку
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/products')}
            className="btn-secondary inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            <span className="text-xl">←</span>
            <span>Назад к списку</span>
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in">
          <div className="lg:flex">
            <div className="lg:w-1/2 p-8">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="inline-block px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm mb-4">
                {product.category}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
                {product.title}
              </h1>
              
              <div className="flex items-baseline gap-2 mb-8">
                <p className="text-3xl font-bold text-indigo-600">
                  ${product.price}
                </p>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              
              <div className="border-t border-gray-100 pt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Описание
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
