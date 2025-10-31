import React from "react";

const LeftSidebar = () => {
  return (
    <aside className="hidden md:block fixed top-20 left-0 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-[#121212]/90 backdrop-blur-lg p-4 border-r border-gray-800 z-40 scrollbar-thin scrollbar-thumb-blue-600 hover:scrollbar-thumb-blue-500">
      <div className="relative">
        <h2 className="text-lg font-bold mb-4 text-blue-400 flex items-center">
          <i className="fas fa-list mr-2"></i>Product Categories
        </h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mb-4"></div>
      </div>

      <nav className="space-y-2 text-sm text-gray-300">
        {[
          {
            title: "Laptops & Computers",
            icon: "fas fa-laptop",
            items: ["Gaming Laptops", "Ultrabooks", "Business Laptops", "Desktops", "Monitors"],
          },
          {
            title: "Smartphones & Tablets",
            icon: "fas fa-mobile-alt",
            items: ["iOS Phones", "Android Phones", "Tablets", "Smartwatches", "Accessories"],
          },
          {
            title: "TV & Home Theater",
            icon: "fas fa-tv",
            items: ["Smart TVs", "Soundbars", "Home Theater Systems", "Streaming Devices"],
          },
          {
            title: "Audio & Headphones",
            icon: "fas fa-headphones",
            items: ["Wireless Headphones", "Earbuds", "Speakers", "Gaming Headsets"],
          },
          {
            title: "Gaming",
            icon: "fas fa-gamepad",
            items: ["Consoles", "Games", "Accessories", "VR Headsets"],
          },
          {
            title: "Cameras & Drones",
            icon: "fas fa-camera",
            items: ["DSLR", "Mirrorless", "Action", "Drones"],
          },
        ].map((cat, i) => (
          <div key={i} className="dropdown">
            <a
              href="#"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-900/30 transition group"
            >
              <div className="flex items-center gap-2">
                <i className={`${cat.icon} w-5 text-center text-blue-400 group-hover:text-blue-300`}></i>
                <span className="group-hover:text-white">{cat.title}</span>
              </div>
              <i className="fas fa-chevron-down text-xs"></i>
            </a>
            <div className="dropdown-content ml-4 mt-0">
              {cat.items.map((item, j) => (
                <a key={j} href="#" className="block px-4 py-2 hover:bg-gray-700 rounded-md">
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}

        <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-900/30 transition group">
          <i className="fas fa-heart w-5 text-center text-blue-400 group-hover:text-blue-300"></i>
          <span className="group-hover:text-white">My Wishlist</span>
        </a>
        <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-900/30 transition group">
          <i className="fas fa-shopping-bag w-5 text-center text-blue-400 group-hover:text-blue-300"></i>
          <span className="group-hover:text-white">My Orders</span>
        </a>
      </nav>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-blue-400 flex items-center">
          <i className="fas fa-bolt mr-2"></i>Hot Deals
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Flash Sale", "Clearance", "Bundle Deals", "New Arrivals"].map((deal, i) => (
            <span
              key={i}
              className="text-xs bg-blue-900/40 px-2 py-1 rounded-full border border-blue-800"
            >
              {deal}
            </span>
          ))}
        </div>
      </div>


      <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
        <h3 className="font-bold text-blue-300 mb-2">Tihar Offers</h3>
        <p className="text-xs text-gray-400 mb-3">
          Free shipping, exclusive deals, and early access to sales
        </p>
        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:opacity-90 transition">
          Join Now
        </button>
      </div>

       <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
        <h3 className="font-bold text-blue-300 mb-2">Today Special Offer</h3>
        <p className="text-xs text-gray-400 mb-3">
         Exclusive deals, and early access to sales, free mistry gifts on orders above 5000
        </p>
        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:opacity-90 transition">
          Explore Now
        </button>
      </div>



      
    </aside>
  );
};

export default LeftSidebar;
