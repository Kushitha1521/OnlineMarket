import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MarketingSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const marketingItems = [
    { id: 1, title: "Premium Quality", description: "Our products are crafted with the finest materials for lasting performance.", icon: "🏆" },
    { id: 2, title: "Customer Satisfaction", description: "Join thousands of happy customers who love our products.", icon: "😊" },
    { id: 3, title: "Fast Delivery", description: "We ship worldwide with express delivery options available.", icon: "🚚" },
    { id: 4, title: "24/7 Support", description: "Our dedicated team is always ready to assist you.", icon: "💬" },
    { id: 5, title: "Money-Back Guarantee", description: "Not satisfied? Get a full refund within 30 days, no questions asked.", icon: "💰" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % marketingItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + marketingItems.length) % marketingItems.length);
  };

  return (
    <div className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 py-[130px] px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-10 animate-pulse">Why Choose Us</h2>
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0 p-3 text-white bg-white/30 hover:bg-white/50 rounded-full" onClick={handlePrev}>
            ◀
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="p-10 py-[80px] bg-white rounded-xl shadow-lg w-3/4 mx-auto flex flex-col items-center"
            >
              <div className="text-5xl mb-4">{marketingItems[activeIndex].icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{marketingItems[activeIndex].title}</h3>
              <p className="text-gray-600 text-lg">{marketingItems[activeIndex].description}</p>
            </motion.div>
          </AnimatePresence>
          <button className="absolute right-0 p-3 text-white bg-white/30 hover:bg-white/50 rounded-full" onClick={handleNext}>
            ▶
          </button>
        </div>
        <div className="flex justify-center mt-6">
          {marketingItems.map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 mx-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-white scale-125 shadow-lg' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingSlider;