import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Online Market</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-32 object-cover rounded-t-md"
              />
            </div>
            <div className="p-3">
              <h2 className="text-sm font-medium truncate">{product.name}</h2>
              <p className="text-xs text-gray-600 mt-1">{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1.5 rounded-md transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h2 className="text-lg font-medium mb-3">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="text-sm flex justify-between items-center">
                <span className="truncate">{item.name}</span>
                <span className="text-gray-600 ml-2">{item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;