import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cart/');
      setCartItems(response.data.cart_items || []);
    } catch (error) {
      showMessage('Error loading cart items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    const item = cartItems.find(item => item.id === itemId);
    
    if (newQuantity < 1) {
      showMessage('Quantity cannot be less than 1.', 'error');
      return;
    }

    if (newQuantity > item.product.stock) {
      showMessage(`Only ${item.product.stock} units available in stock.`, 'error');
      return;
    }

    try {
      const response = await axios.post('/api/update-cart-item/', {
        item_id: itemId,
        quantity: newQuantity
      });

      if (response.data.success) {
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === itemId 
              ? { 
                  ...item, 
                  quantity: newQuantity,
                  total: item.product.price * newQuantity
                }
              : item
          )
        );
        showMessage(response.data.message, 'success');
      } else {
        showMessage(response.data.message, 'error');
      }
    } catch (error) {
      showMessage('Error updating cart', 'error');
    }
  };

  const removeItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this item from your cart?')) {
      return;
    }

    try {
      const response = await axios.post('/api/remove-from-cart/', {
        item_id: itemId
      });

      if (response.data.success) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        showMessage(response.data.message, 'success');
      } else {
        showMessage(response.data.message, 'error');
      }
    } catch (error) {
      showMessage('Error removing item', 'error');
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const updateButtonStates = (itemId, quantity, stock) => {
    // This functionality is now handled by disabling buttons in the JSX
    return {
      minusDisabled: quantity <= 1,
      plusDisabled: quantity >= stock
    };
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.total, 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400">Shopping Cart</h1>
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            <i className="fas fa-home"></i> Home
          </Link>
          <Link 
            to="/products" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <i className="fas fa-search"></i> Continue Shopping
          </Link>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="hologram-card p-6">
              <h2 className="text-xl font-bold text-blue-400 mb-6">Your Items</h2>
              
              <div className="space-y-4">
                {cartItems.map(item => {
                  const buttonStates = updateButtonStates(item.id, item.quantity, item.product.stock);
                  return (
                    <div 
                      key={item.id} 
                      className="cart-item border border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image_url || item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-grow">
                          <h3 className="font-semibold text-white mb-1">{item.product.name}</h3>
                          <p className="text-gray-400 text-sm mb-2">{item.product.short_description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-green-400 font-bold">NRS.{item.product.price}</span>
                            {item.product.brand && (
                              <span className="text-gray-500 text-sm">{item.product.brand}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleDecrement(item.id)}
                            disabled={buttonStates.minusDisabled}
                            className={`${
                              buttonStates.minusDisabled 
                                ? 'bg-gray-800 cursor-not-allowed' 
                                : 'bg-gray-700 hover:bg-gray-600'
                            } text-white w-8 h-8 rounded-full flex items-center justify-center`}
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="text-white font-semibold px-3">{item.quantity}</span>
                          <button 
                            onClick={() => handleIncrement(item.id)}
                            disabled={buttonStates.plusDisabled}
                            className={`${
                              buttonStates.plusDisabled 
                                ? 'bg-gray-800 cursor-not-allowed' 
                                : 'bg-gray-700 hover:bg-gray-600'
                            } text-white w-8 h-8 rounded-full flex items-center justify-center`}
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                        
                        {/* Item Total */}
                        <div className="text-right">
                          <div className="text-green-400 font-bold">
                            NRS.{item.total.toFixed(2)}
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 text-sm mt-1"
                          >
                            <i className="fas fa-trash"></i> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="hologram-card p-6 sticky top-4">
              <h2 className="text-xl font-bold text-blue-400 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>NRS.{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
                  <span>NRS.0.00</span>
                </div>
                <hr className="border-gray-700" />
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-400">NRS.{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/payment"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 mb-4 flex items-center justify-center gap-2"
              >
                <i className="fas fa-credit-card"></i> Proceed to Payment
              </Link>
              
              <div className="text-center text-sm text-gray-400">
                <i className="fas fa-shield-alt mr-2"></i>
                Secure checkout with SSL encryption
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart */
        <div className="text-center py-16">
          <div className="hologram-card p-12 max-w-md mx-auto">
            <i className="fas fa-shopping-cart text-gray-500 text-6xl mb-6"></i>
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              <i className="fas fa-search"></i> Start Shopping
            </Link>
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {message.text && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`${
            message.type === 'success' ? 'bg-green-600' :
            message.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
          } text-white p-4 rounded-lg mb-2`}>
            {message.text}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;