import React from "react";
import { motion } from "framer-motion";

const CategorySection = () => {
  const categories = [
    { name: "Electronics", icon: "📱", itemCount: 1200, color: "bg-blue-50 text-blue-600" },
    { name: "Fashion", icon: "👗", itemCount: 850, color: "bg-pink-50 text-pink-600" },
    { name: "Home & Living", icon: "🏡", itemCount: 650, color: "bg-green-50 text-green-600" },
    { name: "Sports", icon: "⚽", itemCount: 420, color: "bg-orange-50 text-orange-600" },
    { name: "Books", icon: "📚", itemCount: 320, color: "bg-purple-50 text-purple-600" },
    { name: "Beauty", icon: "💄", itemCount: 580, color: "bg-red-50 text-red-600" },
    { name: "Toys", icon: "🧸", itemCount: 240, color: "bg-yellow-50 text-yellow-600" },
    { name: "Automotive", icon: "🚗", itemCount: 190, color: "bg-indigo-50 text-indigo-600" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <p className="text-gray-600">Browse our wide selection of products by category</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            className="group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`${category.color} rounded-xl p-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:translate-y-[-5px] group-hover:ring-2 group-hover:ring-opacity-50`}
            >
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-3 text-4xl">{category.icon}</div>
                <h3 className="font-semibold mb-1 text-lg">{category.name}</h3>
                <p className="text-sm opacity-75">{category.itemCount} Items</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
