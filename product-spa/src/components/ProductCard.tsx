import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProductCard = ({ product, onLike, onDelete }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-56 object-contain p-4 bg-gray-50 transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 
              ${product.liked 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-pink-500 hover:text-white'}`}
          >
            {product.liked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            className="p-2 rounded-full bg-white/80 text-gray-600 backdrop-blur-md 
                     hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 line-clamp-1 flex-1">
              {product.title}
            </h3>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
              ${product.price}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="w-full py-2.5 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium
                   hover:bg-gray-100 transition-all duration-300"
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};
