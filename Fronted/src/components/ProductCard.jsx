import React, { useState, useContext } from 'react';
import { ZoomContext } from '../Store/Main';

const ProductCard = ({ product }) => {
  const { setZoom, setZoomImage } = useContext(ZoomContext);
  const [isHovered, setIsHovered] = useState(false);

  // 🛒 Add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to cart:', product.name);
  };

  // 👁️ Quick view (zoom image)
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setZoomImage(product.image_url);
    setZoom(true);
  };

  return (
    <div
      className="bg-[#1a1a2e] rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 card-hover group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.is_new && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div
          className={`absolute top-2 right-2 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <button
            onClick={handleQuickView}
            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
          >
            <i className="fas fa-eye text-sm"></i>
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
          >
            <i className="fas fa-shopping-cart text-sm"></i>
          </button>
        </div>

        {/* Add to Cart Button (hover bottom) */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star ${
                  i < product.rating ? 'text-yellow-400' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs ml-2">({product.reviews_count})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.original_price > 0 && (
              <span className="text-gray-400 text-sm line-through">
                {product.original_price}
              </span>
            )}
            <span className="text-white font-bold text-lg">{product.price}</span>
          </div>

          {product.stock < 10 && product.stock > 0 && (
            <span className="text-orange-400 text-xs bg-orange-400/20 px-2 py-1 rounded">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Features */}
        {product.features?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.features.map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
