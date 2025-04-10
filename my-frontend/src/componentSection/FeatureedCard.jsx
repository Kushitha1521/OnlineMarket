import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FeaturedCards = () => {
  const mainCards = [
    {
      title: "Summer Special Sale",
      description: "Get up to 50% off on summer collection",
      image: "https://www.hamricks.com/wp-content/uploads/2021/09/shoes-header.jpg"
    },
    {
      title: "New Arrivals",
      description: "Check out our latest collection",
      image: "https://fatemiresources.com/wp-content/uploads/2022/08/Designer-27-1.jpeg"
    },
    {
      title: "Special Offer",
      description: "Buy 2 Get 1 Free on selected items",
      image: "https://cdn.mos.cms.futurecdn.net/4hU7T5fQYWbnU5vxHZnAZE.jpg"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % mainCards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const smallCards = [
    { title: "Flash Sale", description: "24 Hours Only", bgColor: "bg-red-500", discount: "70% OFF" },
    { title: "New Season", description: "Spring Collection", bgColor: "bg-green-500", discount: "New" },
    { title: "Clearance", description: "Last Chance", bgColor: "bg-purple-500", discount: "50% OFF" },
    { title: "Member Exclusive", description: "Special Prices", bgColor: "bg-blue-500", discount: "Members" }
  ];

  return (
    <div className="max-w-8xl mx-auto px-0 py-0 space-y-12">
      <div className="relative h-[620px] w-full overflow-hidden shadow-xl">
        <AnimatePresence>
          {mainCards.map((card, index) => (
            index === activeSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img src={card.image} alt={card.title} className="w-full h-full object-cover rounded-lg " />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/50 p-8 text-center">
                  <motion.h2 className="text-6xl font-bold mb-4" animate={{ scale: 1.1 }} transition={{ yoyo: Infinity, duration: 1.5 }}>{card.title}</motion.h2>
                  <p className="text-3xl mb-6">{card.description}</p>
                  <motion.button whileHover={{ scale: 1.1 }} className="text-xl bg-white text-gray-900 px-9 py-5 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                    Shop Now
                  </motion.button>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mainCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === activeSlide ? 'bg-white w-4' : 'bg-white/50'}`}
            ></button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-8">
        {smallCards.map((card, index) => (
          <motion.div
            key={index}
            className={`${card.bgColor} rounded-xl p-6 text-white shadow-lg cursor-pointer`}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <motion.span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4" whileHover={{ scale: 1.1 }}>
                  {card.discount}
                </motion.span>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/90">{card.description}</p>
              </div>
              <motion.button whileHover={{ scale: 1.1 }} className="mt-4 text-white border border-white/50 px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-200">
                View Deals
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-8 mt-8">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/ProductsUp" className="flex justify-center items-center w-64 h-16 text-xl font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full shadow-lg transition-all">
            Buy Products
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/seller" className="flex justify-center items-center w-64 h-16 text-xl font-bold uppercase tracking-wide bg-blue-700 text-white rounded-full shadow-lg transition-all">
            Sell Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedCards;
