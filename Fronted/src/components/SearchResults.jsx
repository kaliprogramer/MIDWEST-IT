import React, { useEffect, useState } from "react";

const SearchResults = ({ results }) => {
  // `results` should be an array of product objects from your API
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (results) setProducts(results);
  }, [results]);

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center mt-20 text-gray-400 text-lg">
        No products found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-[#1a1a2e] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.image_url || product.main_image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{product.category?.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-purple-400 font-bold text-lg">
                  ${product.price}
                </span>
                {product.discount > 0 && (
                  <span className="bg-red-600 text-xs px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
