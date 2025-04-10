import React, { useState } from "react";
import { motion } from "framer-motion";
import BackButtonProduct from "../componentsTemp/BackButtonProduct";

const smallCards = Array.from({ length: 40 }, (_, index) => ({
  title: `Product ${index + 1}`,
  description: "Special Offer",
  bgColor: "bg-gray-400",
  discount: `${Math.floor(Math.random() * 70) + 10}% OFF`,
  image: "image.jpg",
  productId: `product_${index + 1}`,
}));

const ProductsUp = ({ setCartItems }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(smallCards.length / itemsPerPage);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const paginatedCards = smallCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginForm(true);
      return;
    }

    const userId = JSON.parse(localStorage.getItem('user')); // Get user ID from localStorage
    
    try {
      const response = await fetch("http://localhost:5555/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, userId, quantity }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Product added to cart");
        // Check if setCartItems is a function to update count
        if (typeof setCartItems === 'function') {
          // Fetch updated cart count from server instead of incrementing locally
          try {
            const cartResponse = await fetch("http://localhost:5555/cart", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            if (cartResponse.ok) {
              const cartData = await cartResponse.json();
              // Assuming the API returns the total number of items or we can calculate it
              const totalItems = cartData.items ? cartData.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
              setCartItems(totalItems);
            }
          } catch (error) {
            console.error("Error fetching cart:", error);
            // Fallback to incrementing locally if fetch fails
            setCartItems(prevCount => prevCount + quantity);
          }
        }
      } else {
        alert(`Error: ${data.message || "Failed to add to cart"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error adding product to cart");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5555/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.userId));
        setShowLoginForm(false);
        alert("Login successful");
      } else {
        alert(`Error: ${data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error during login");
    }
  };

  return (
    <div className="p-4">
      <BackButtonProduct />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8 p-4"
      >
        {paginatedCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.3 }}
            className={`${card.bgColor} rounded-xl p-4 text-white shadow-md cursor-pointer overflow-hidden h-64 flex flex-col justify-between`}
          >
            <motion.img
              src={card.image}
              alt={card.title}
              className="w-full h-24 object-cover rounded-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-2">
                  {card.discount}
                </span>
                <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                <p className="text-white/90 text-sm">{card.description}</p>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
                onClick={() => addToCart(card.productId, 1)} // Assuming 1 quantity
                className="mt-2 text-white border border-white/50 px-3 py-1 rounded-full text-sm transition-colors duration-200"
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Login Form */}
      {showLoginForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              className="w-full bg-blue-600 text-white p-2 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="w-full text-center mt-4 text-blue-600"
              onClick={() => setShowLoginForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsUp;