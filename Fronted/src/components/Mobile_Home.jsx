import React, { useState, useRef } from "react";
import {
  FaBell,
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaCog,
  FaStar,
  FaComments,
  FaChevronRight,
  FaChevronLeft,
  FaPlus,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset
} from "react-icons/fa";

const categories = [
  { name: "Smartphones", img: "https://cdn-icons-png.flaticon.com/512/679/679720.png", items: 124 },
  { name: "Laptops", img: "https://cdn-icons-png.flaticon.com/512/2920/2920287.png", items: 89 },
  { name: "Televisions", img: "https://cdn-icons-png.flaticon.com/512/3659/3659893.png", items: 67 },
  { name: "Audio", img: "https://cdn-icons-png.flaticon.com/512/189/189665.png", items: 156 },
  { name: "Gaming", img: "https://cdn-icons-png.flaticon.com/512/760/760195.png", items: 92 },
  { name: "Cameras", img: "https://cdn-icons-png.flaticon.com/512/685/685655.png", items: 78 },
  { name: "Tablets", img: "https://cdn-icons-png.flaticon.com/512/3035/3035854.png", items: 54 },
  { name: "Wearables", img: "https://cdn-icons-png.flaticon.com/512/2583/2583271.png", items: 112 },
];

const products = [
  {
    id: 1,
    name: "Oraimo Powerbank 20000mAh",
    price: 40.85,
    oldPrice: 60.82,
    rating: 4.5,
    reviews: 124,
    discount: 33,
    img: "https://cdn-icons-png.flaticon.com/512/10004/10004149.png",
    features: ["Fast Charging", "Dual Output", "LED Display"]
  },
  {
    id: 2,
    name: "Apple Watch Series 8",
    price: 27.85,
    oldPrice: 40.82,
    rating: 5,
    reviews: 89,
    discount: 30,
    img: "https://cdn-icons-png.flaticon.com/512/1065/1065124.png",
    features: ["Health Tracking", "Water Resistant", "GPS"]
  },
  {
    id: 3,
    name: "Sony Wireless Headset",
    price: 15.5,
    oldPrice: 25.99,
    rating: 4,
    reviews: 203,
    discount: 40,
    img: "https://cdn-icons-png.flaticon.com/512/111/111693.png",
    features: ["Noise Cancel", "30h Battery", "Bluetooth 5.2"]
  },
];

const features = [
  { icon: FaShippingFast, text: "Free Shipping", subtext: "Orders over $50" },
  { icon: FaShieldAlt, text: "2-Year Warranty", subtext: "Quality assured" },
  { icon: FaHeadset, text: "24/7 Support", subtext: "Always here to help" },
];

const MobileApp = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [cartItems, setCartItems] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const categoriesRef = useRef(null);

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      categoriesRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (productName) => {
    setCartItems(prev => prev + 1);
    // In a real app, you would add to cart state management
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen pb-24 font-sans">
      {/* Top Bar - Completely redesigned to match image */}
      <div className="px-6 py-4  backdrop-blur-sm bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">HP</span>
            </div>
            <div>
              <p className="text-sm text-gray-300">Hello, Hari Prasad</p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-yellow-400">⭐</span>
                <span className="text-xs text-gray-400">Premium Member</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaBell className="text-gray-400 text-xl" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="relative">
              <FaShoppingCart className="text-gray-400 text-xl" />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">{cartItems}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar - Integrated in nav as shown in image */}
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands and categories"
            className="w-full bg-gray-700 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Features Banner */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Premium Tech Collection</h2>
              <p className="text-blue-200 text-sm mb-4">Curated selection of high-performance devices</p>
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                Explore Collection <FaChevronRight className="text-xs" />
              </button>
            </div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </div>


      {/* Categories - Scrollable */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <p className="text-gray-400 text-sm mt-1">Browse by product type</p>
          </div>
          <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300 transition-colors">
            View All <FaChevronRight className="text-xs" />
          </button>
        </div>
        
        <div className="relative">
          {/* Scroll Buttons */}
          <button 
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm rounded-full p-2 border border-gray-600 hover:border-blue-500 transition-colors hidden md:block"
          >
            <FaChevronLeft className="text-gray-400 text-sm" />
          </button>
          
          <button 
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 backdrop-blur-sm rounded-full p-2 border border-gray-600 hover:border-blue-500 transition-colors hidden md:block"
          >
            <FaChevronRight className="text-gray-400 text-sm" />
          </button>

          {/* Scrollable Categories */}
          <div 
            ref={categoriesRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-28 bg-gray-800/50 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 border backdrop-blur-sm hover:border-blue-500/50 ${
                  activeCategory === index ? "border-blue-500 bg-blue-500/10" : "border-gray-700"
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-8 h-8 object-contain filter brightness-0 invert"
                  />
                </div>
                <p className="text-sm font-medium text-white mb-1 truncate">{category.name}</p>
                <p className="text-xs text-gray-400">{category.items} items</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Featured Products</h3>
            <p className="text-gray-400 text-sm mt-1">Customer favorites</p>
          </div>
          <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300 transition-colors">
            See All <FaChevronRight className="text-xs" />
          </button>
        </div>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-200 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center p-2">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    -{product.discount}%
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white text-sm leading-tight">{product.name}</h4>
                    <button 
                      onClick={() => addToCart(product.name)}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar
                          key={idx}
                          className={`text-xs ${
                            idx < Math.floor(product.rating) 
                              ? "fill-current" 
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-white">${product.price}</p>
                      <p className="text-gray-500 text-sm line-through">${product.oldPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Features:</p>
                      <p className="text-xs text-blue-400">{product.features[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Button */}
      <button className="fixed bottom-28 right-6 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors duration-200 hover:shadow-xl backdrop-blur-sm border border-blue-500/30">
        <FaComments className="text-lg" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 flex justify-around py-4">
        {[
          { icon: FaSearch, label: "Discover", active: true },
          { icon: FaShoppingCart, label: "Cart" },
          { icon: FaUser, label: "Profile" },
          { icon: FaCog, label: "Settings" },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center transition-colors duration-200 cursor-pointer ${
              item.active ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <item.icon className="text-lg mb-1" />
            <p className="text-xs font-medium">{item.label}</p>
            {item.active && (
              <div className="w-1 h-1 bg-blue-400 rounded-full mt-1"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileApp;