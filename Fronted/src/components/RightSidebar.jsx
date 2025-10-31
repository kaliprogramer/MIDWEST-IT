import React, { useState, useEffect } from "react";

const RightSidebar = () => {
  const [Products, setProducts] = useState([]);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/top5/");
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        fetchProducts();
      }
    };

    fetchProducts();
  }, []);

  // Filter products with good reviews (rating >= 4) and take top 5
  const top5 = Products
    .filter((p) => p.rating >= 4) // adjust the rating threshold as needed
    .slice(0, 5);


  return (
    <aside className="hidden md:block fixed top-20 right-0 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-[#121212]/90 backdrop-blur-lg p-4 border-l border-gray-800 z-40 scrollbar-thin scrollbar-thumb-blue-600 hover:scrollbar-thumb-blue-500">
      <div className="relative">
        <h2 className="text-lg font-bold mb-4 text-blue-400 flex items-center">
          <i className="fas fa-filter mr-2"></i>Popular this week
        </h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mb-4"></div>
      </div>

      <div className="space-y-3">
        {top5.map((p, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 border-b pb-3 border-[#2563eb]"
          >
            <img
              src={p.image_url}
              alt={p.name}
              className="w-12 h-12 object-contain rounded"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white truncate">{p.name}</h3>
              {p.old && (
                <div className="text-xs text-gray-500 line-through">{p.old}</div>
              )}
              <div className="text-sm font-semibold text-blue-600">{p.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Location section */}
      <div className="relative">
        <h2 className="text-lg font-bold my-4 text-blue-400 flex items-center">
          <i className="fa-solid fa-location-dot mr-2"></i>Location
        </h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mb-4"></div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317.26248993273026!2d82.29613503864732!3d28.128994940629248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3997f5303ec4b50b%3A0xff9ce8ee15ccbdc8!2sMidWest%20IT%20Store!5e1!3m2!1sen!2snp!4v1759490887074!5m2!1sen!2snp"
        width="100%"
        height="300"
        className="rounded-lg"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>

      <p className="text-md font-bold text-blue-400 mt-2 w-full text-center">
        Customer Support
      </p>

      <div className="mt-4 p-2 bg-gray-900/70 rounded-2xl border border-gray-800 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
        <div className="flex space-x-4 text-xl justify-center items-center">
          <a href="#" className="text-gray-400 hover:text-blue-500">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-green-500">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-green-500">
            <i className="fa-solid fa-phone-volume"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-500">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
