import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]); // Dynamic cart items from API
  const [user, setUser] = useState(null); // To store user info

  useEffect(() => {
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser.email);
    if (storedUser) {
      setUser(storedUser);

      // Fetch cart items from the backend if user exists
      // Check if storedUser and storedUser._id are defined
if (storedUser && storedUser.email) {
  axios.get(`http://localhost:5555/api/cart/${storedUser}`)
  
    .then(response => {
      
      setCartItems(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
    })
    .catch(error => {
      console.error('Error fetching cart:', error);
      setCartItems([]); // Fallback to empty array on error
    });
} else {
  console.error('User ID is not defined');
  setCartItems([]); // Fallback to empty array if storedUser._id is not available
}

    }
  }, []);

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.0825; // 8.25% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <span className="text-indigo-600 mr-3 text-2xl">🛒</span>
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <div className="mx-auto text-gray-300 mb-4 text-6xl">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition duration-200 flex items-center mx-auto">
              <span className="mr-2">←</span>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="font-semibold text-xl text-gray-800">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 mr-4 mb-4 sm:mb-0">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 text-lg">{item.name}</h3>
                            <p className="text-gray-500 text-sm mt-1">Color: {item.color}</p>
                            {!item.inStock && <p className="text-red-500 text-sm mt-1">Out of stock</p>}
                          </div>
                          <div className="text-gray-900 font-medium mt-2 sm:mt-0">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <span className="mr-1">🗑️</span>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <button className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <span className="mr-1">←</span>
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="font-semibold text-xl text-gray-800 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between font-semibold text-lg text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-indigo-600 text-white mt-6 py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-200 flex items-center justify-center">
                  <span>Proceed to Checkout</span>
                  <span className="ml-2">→</span>
                </button>
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Need help? <a href="#" className="text-indigo-600 hover:text-indigo-800">Contact Support</a></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
