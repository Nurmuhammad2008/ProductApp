import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ProductFormData } from '../types';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: 0,
    category: '',
    image: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct({
        ...formData,
        price: parseFloat(formData.price.toString())
      });
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="ml-64 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-8">
          Создать новый продукт
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название продукта
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Введите название продукта"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Опишите ваш продукт"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Введите категорию продукта"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
                             focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL изображения
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/products')}
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 
                       transition-all focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 
                       text-white hover:from-purple-700 hover:to-blue-600 transition-all 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 
                       disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Создание...
                </>
              ) : (
                'Создать продукт'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
