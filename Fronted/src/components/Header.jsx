import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const { items, total } = useSelector((state) => state.cart);


  const navigate = useNavigate();

  // ✅ Handle Search (Image or Text)
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res;

      // --- 🖼️ Image Search ---
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        res = await fetch("http://127.0.0.1:8000/api/search/", {
          method: "POST",
          body: formData,
        });
      }

      // --- 🔤 Text Search ---
      else if (searchText.trim()) {
        res = await fetch("http://127.0.0.1:8000/api/search/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: searchText }),
        });
        

      } else {
        alert("Please enter a product name or upload an image!");
        setLoading(false);
        return;
      }

      // ✅ Parse response
      const data = await res.json();
      setLoading(false);
 
     
      navigate("/search", { state: { results: data } });
      
        // ✅ Navigate to Search Results page
      
    } catch (error) {
      console.error("Search error:", error);
      setLoading(false);
    }
  };

  // ✅ Input Handlers
  const handleInputChange = (e) => setSearchText(e.target.value);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  return (
    <>
      <header className="hidden md:flex sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-lg shadow-lg items-center justify-between px-4 py-3 border-b border-violet-900">
        {/* Left Section */}
        <a className="flex items-center gap-6" href="/">
          <div className="relative h-[60px]">
            <img
              src="https://midwestitstore.com.np/wp-content/uploads/2024/09/logo-1.png"
              alt="Logo"
              className="h-full"
            />
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#121212] live-indicator"></div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition">
            <i className="fas fa-map-marker-alt text-xl text-purple-400"></i>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-300">Deliver to</span>
              <span className="font-semibold">Nepal</span>
            </div>
          </div>
        </a>

        {/* Center Section */}
        <div className="hidden md:flex w-full max-w-2xl mx-4 relative">
          <form className="w-full flex" onSubmit={handleSearch}>
            {/* Drag-and-Drop File Upload */}
            <div
              className={`flex items-center justify-center px-4 py-2 border border-purple-900/50 rounded-l-md cursor-pointer transition ${
                isDragOver ? "bg-purple-800/30 border-purple-400" : "bg-[#151530]"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <i className="fas fa-image text-white mr-2"></i>
              {selectedFile ? selectedFile.name : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Text Input */}
            <input
              type="text"
              placeholder="Search cool gadgets..."
              value={searchText}
              onChange={handleInputChange}
              className="w-full px-4 py-2 md:py-3 bg-[#151530] text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all border-t border-b border-purple-900/50"
            />

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 px-5 py-2 text-white rounded-r-md disabled:opacity-50"
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-search"></i>
              )}
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-sm text-white">
          {/* Account */}
          <div className="relative group">
            <div className="hover:text-purple-400 transition">
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-300">Hello, Guest</span>
                <span className="font-semibold">
                  Account & Lists <i className="fas fa-caret-down ml-1"></i>
                </span>
              </div>
            </div>
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a2e] border border-purple-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <ul className="py-2 text-sm text-gray-200">
                <li>
                  <a href="/account" className="block px-4 py-2 hover:bg-purple-700/40">
                    Your Account
                  </a>
                </li>
                <li>
                  <a href="/login" className="block px-4 py-2 hover:bg-purple-700/40">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Orders */}
          <a href="/orders" className="hover:text-purple-400 transition">
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-300">Returns</span>
              <span className="font-semibold">& Orders</span>
            </div>
          </a>

          {/* Cart */}
          <a href="/cart" className="relative hover:text-purple-400 transition">
            <i className="fas fa-shopping-cart text-2xl"></i>
            <span className="absolute -top-2 -right-3 bg-red-600 text-xs px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
