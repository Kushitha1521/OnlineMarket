import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

// Define base URL as a constant
const API_BASE_URL = 'http://localhost:5555';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Safely parse JSON with fallback
  const safelyParseJSON = (jsonString, fallback = null) => {
    try {
      return jsonString ? JSON.parse(jsonString) : fallback;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return fallback;
    }
  };

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = safelyParseJSON(localStorage.getItem('user'), null);

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  // Fetch cart items when user changes
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchCartItemCount();
    }
  }, [isLoggedIn, user]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setShowLoginForm(false);
        setShowSignUpForm(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Function to fetch cart item count from backend
  const fetchCartItemCount = async () => {
    if (!user || !user.id) return;
    
    try {
      const response = await axios.get(`${API_BASE_URL}/cart/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Calculate total quantity of items in the cart
      const totalQuantity = response.data.reduce((acc, item) => acc + item.quantity, 0);
      setCartItems(totalQuantity);
    } catch (err) {
      console.error('Error fetching cart item count', err);
      // Optionally handle token expiration here
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Store user with id and email for further use
        const userData = { email: loginEmail, id: response.data.userId };
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setUser(userData);
        setShowLoginForm(false);
        setLoginEmail('');
        setLoginPassword('');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setCartItems(0);
  };

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email: signupEmail,
        password: signupPassword,
      });
      
      if (response.data.message === 'User registered successfully!') {
        alert('User registered successfully');
        setShowSignUpForm(false);
        setShowLoginForm(true); // Show login form after successful registration
        setSignupEmail('');
        setSignupPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cart navigation
  const handleCart = () => {
    if (!isLoggedIn) {
      setShowLoginForm(true);
      return;
    }
    
    // Navigate to cart page
    navigate("/cart");
  };

  // Handle showing login form
  const openLoginForm = () => {
    setShowLoginForm(true);
  };

  // Handle showing signup form
  const openSignUpForm = () => {
    setShowSignUpForm(true);
  };

  // Handle closing login form
  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  // Handle closing signup form
  const closeSignUpForm = () => {
    setShowSignUpForm(false);
  };

  // Separate function to add an item to cart
  const addToCart = async (productId) => {
    if (!isLoggedIn || !user || !user.id) {
      setShowLoginForm(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const quantity = 1;
      await axios.post(
        `${API_BASE_URL}/cart/add`,
        { productId, userId: user.id, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Fetch the updated cart count after adding the item
      fetchCartItemCount();
    } catch (err) {
      console.error('Error adding item to cart', err);
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <a href="/" className="text-xl font-bold text-gray-800">Logo</a>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="/services" className="text-gray-600 hover:text-gray-900">Services</a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {/* Cart Button with Icon */}
          <button 
            onClick={handleCart} 
            className="relative bg-yellow-600 text-white px-3 py-1 rounded ml-2 flex items-center"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Cart
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartItems}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <span className="text-gray-600">Hello, {user?.email}</span>
              <button 
                className="bg-red-600 text-white px-3 py-1 rounded ml-2" 
                onClick={handleLogout}
                disabled={isLoading}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button 
                onClick={openLoginForm} 
                className="bg-blue-600 text-white px-3 py-1 rounded ml-2"
                disabled={isLoading}
              >
                Login
              </button>
              <button 
                onClick={openSignUpForm} 
                className="bg-green-600 text-white px-3 py-1 rounded ml-2"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-500 hover:text-gray-800">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Login Form Modal */}
      {showLoginForm && !isLoggedIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className="border px-2 py-2 w-full mb-4 border-gray-300"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border px-2 py-2 w-full mb-4 border-gray-300"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            {/* Exit Button */}
            <button
              onClick={closeLoginForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Sign-Up Form Modal */}
      {showSignUpForm && !isLoggedIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl relative">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <input
                type="email"
                placeholder="Email"
                className="border px-2 py-2 w-full mb-4 border-gray-300"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border px-2 py-2 w-full mb-4 border-gray-300"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Sign Up'}
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            {/* Exit Button */}
            <button
              onClick={closeSignUpForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              X
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;