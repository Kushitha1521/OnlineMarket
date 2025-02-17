import { useState, useEffect } from 'react';

const FeaturedCards = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate the main card
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % mainCards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const mainCards = [
    {
      title: "Summer Special Sale",
      description: "Get up to 50% off on summer collection",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-600",
      image: "/api/placeholder/800/400"
    },
    {
      title: "New Arrivals",
      description: "Check out our latest collection",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600",
      image: "/image.jpg"
    },
    {
      title: "Special Offer",
      description: "Buy 2 Get 1 Free on selected items",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
      image: "/api/placeholder/800/400"
    }
  ];

  const smallCards = [
    {
      title: "Flash Sale",
      description: "24 Hours Only",
      bgColor: "bg-red-500",
      discount: "70% OFF"
    },
    {
      title: "New Season",
      description: "Spring Collection",
      bgColor: "bg-green-500",
      discount: "New"
    },
    {
      title: "Clearance",
      description: "Last Chance",
      bgColor: "bg-purple-500",
      discount: "50% OFF"
    },
    {
      title: "Member Exclusive",
      description: "Special Prices",
      bgColor: "bg-blue-500",
      discount: "Members"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Main Featured Card - Full Width */}
      <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
        {mainCards.map((card, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 ${card.bgColor} opacity-90`}></div>
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
              <h2 className="text-4xl font-bold mb-4">{card.title}</h2>
              <p className="text-xl mb-6">{card.description}</p>
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full w-fit hover:bg-gray-100 transition-colors duration-200">
                Shop Now
              </button>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mainCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === activeSlide ? 'bg-white w-4' : 'bg-white/50'
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Small Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {smallCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-xl p-6 text-white hover:shadow-lg transition-shadow duration-200 cursor-pointer`}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                  {card.discount}
                </span>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/90">{card.description}</p>
              </div>
              <button className="mt-4 text-white border border-white/50 px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-200">
                View Deals
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCards;