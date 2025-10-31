import React, { useState, useEffect, useContext, useRef } from 'react';
import ProductCard from './ProductCard';
import { ZoomContext } from '../Store/Main';
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation(); // ✅ Use hook at the top
  const productsFromState = location.state?.results || []; // ✅ Extract once
  const [products, setProducts] = useState(productsFromState);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [zoomImage, setZoomImage] = useState('');
  const zoomRef = useRef(null);

  // ✅ Load products from state
  useEffect(() => {
    if (productsFromState.length > 0) {
      setProducts(productsFromState);
    }
    else {
      setProducts([]);
      let main = document.getElementById('main');
      if (main) {
        main.innerHTML = '<p class="text-center text-gray-500 mt-10 text-lg">No products found.</p>';
      }
    }
    setLoading(false);
  }, [productsFromState]);

  // ✅ ESC key to close zoom
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoom(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ✅ Filter categories
  const filters = [
    { key: 'all', label: 'All Products' },
    { key: '1', label: 'Laptops' },
    { key: '2', label: 'Smartphones' },
    { key: '3', label: 'Audio' },
    { key: '4', label: 'TV & Home' },
    { key: '5', label: 'Accessories' },
    { key: '6', label: 'Tablets' },
  ];

  // ✅ Filter logic
  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => String(p.category) === String(activeFilter));

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // ✅ Load more handler
  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);

  // ✅ Lazy load (infinite scroll)
  const lastProductRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((prev) => prev + 8);
      },
      { threshold: 1 }
    );
    if (lastProductRef.current) observer.observe(lastProductRef.current);
    return () => {
      if (lastProductRef.current) observer.unobserve(lastProductRef.current);
    };
  }, []);

  // ✅ Loading state
  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading products...</p>;
  }

  // ✅ No products found state
  if (products.length === 0) {
    return (
      <div className="w-full p-4">
        <p className="text-center text-gray-500 mt-10 text-lg">
          No products found.
        </p>
      </div>
    );
  }


  return (
    <ZoomContext.Provider value={{ zoom, setZoom, zoomImage, setZoomImage }}>
      {/* ✅ Zoom Overlay */}
      {zoom && (
        <div
          ref={zoomRef}
          
          className=" fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={(e) => e.target === zoomRef.current && setZoom(false)}
        >
          <div className="relative max-w-4xl w-full flex justify-center items-center">
            <img
              src={zoomImage}
              alt="Zoomed Product"
              className="max-h-[85vh] rounded-lg shadow-lg transform transition-all duration-500 scale-100 hover:scale-105"
            />
            <button
              onClick={() => setZoom(false)}
              className="absolute top-4 right-4 text-white text-3xl bg-gray-800/70 hover:bg-gray-700 rounded-full p-2 transition-all duration-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="w-full p-4  " id='main'>
        {/* ✅ Filter Buttons */}
        <div className="flex overflow-x-auto space-x-2 mb-6 pb-2 scrollbar-thin scrollbar-thumb-blue-600">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* ✅ Product Grid */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product, index) => {
              const isLast = index === visibleProducts.length - 1;
              return (
                <div ref={isLast ? lastProductRef : null} key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No products found in this category.
          </p>
        )}

        {/* ✅ Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </ZoomContext.Provider>
  );
};

export default SearchResults;