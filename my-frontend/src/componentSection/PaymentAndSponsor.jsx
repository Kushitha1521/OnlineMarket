import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MultiCardSlider = ({ items, title, itemsPerSlide = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex >= items.length - itemsPerSlide ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length, itemsPerSlide]);

  const visibleItems = items.concat(items.slice(0, itemsPerSlide));

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">{title}</h2>
      
      <div className="overflow-hidden">
        <motion.div 
          className="flex"
          animate={{ x: `-${currentIndex * (100 / itemsPerSlide)}%` }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          style={{ width: `${(items.length + itemsPerSlide) * (100 / itemsPerSlide)}%` }}
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={index}
              className="px-2"
              whileHover={{ scale: 1.05 }}
              style={{ width: `${100 / itemsPerSlide}%` }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 py-[100px]">
                {item}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {[...Array(Math.ceil(items.length / itemsPerSlide))].map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / itemsPerSlide) === index 
                ? 'bg-white ring-2 ring-indigo-600' 
                : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index * itemsPerSlide)}
          />
        ))}
      </div>
    </div>
  );
};

const PaymentSection = () => {
  const paymentMethods = [
    { symbol: "💳", title: "Credit Cards", description: "Visa, Mastercard, American Express" },
    { symbol: "👛", title: "Digital Wallets", description: "PayPal, Apple Pay, Google Pay" },
    { symbol: "🏦", title: "Bank Transfer", description: "Direct bank transfers and wire payments" },
    { symbol: "🎁", title: "Gift Cards", description: "Redeem gift cards and store credit" },
    { symbol: "💵", title: "Cash Payment", description: "Pay with cash on delivery" },
    { symbol: "📱", title: "Mobile Payment", description: "Mobile wallets and payment apps" }
  ];

  const paymentSlides = paymentMethods.map(method => (
    <div className="flex flex-col items-center text-center">
      <motion.div className="mb-4 text-5xl" whileHover={{ rotate: 10 }}>{method.symbol}</motion.div>
      <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
      <p className="text-gray-200">{method.description}</p>
    </div>
  ));

  return (
    <section className="py-20 bg-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <MultiCardSlider items={paymentSlides} title="Payment Methods" />
      </div>
    </section>
  );
};

const SponsorsSection = () => {
  const sponsors = [
    { name: "TechCorp", tier: "Platinum", logo: "/api/placeholder/120/60", description: "Leading technology solutions provider" },
    { name: "InnovateNow", tier: "Gold", logo: "/api/placeholder/120/60", description: "Innovation and research partner" },
    { name: "GlobalTech", tier: "Gold", logo: "/api/placeholder/120/60", description: "Global technology services" },
    { name: "FutureLabs", tier: "Silver", logo: "/api/placeholder/120/60", description: "Future-focused research and development" },
    { name: "NextGen", tier: "Gold", logo: "/api/placeholder/120/60", description: "Next generation technologies" },
    { name: "DigiCorp", tier: "Silver", logo: "/api/placeholder/120/60", description: "Digital transformation solutions" }
  ];

  const sponsorSlides = sponsors.map(sponsor => (
    <div className="text-center">
      <motion.img 
        src={sponsor.logo} 
        alt={`${sponsor.name} logo`} 
        className="mx-auto mb-4"
        whileHover={{ scale: 1.1 }}
      />
      <h3 className="text-xl font-semibold mb-2">{sponsor.name}</h3>
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
          sponsor.tier === "Platinum" ? "bg-gray-300 text-gray-900" :
          sponsor.tier === "Gold" ? "bg-yellow-300 text-yellow-900" :
          "bg-gray-200 text-gray-800"
        }`}>
        {sponsor.tier}
      </span>
      <p className="text-gray-300 text-sm mt-2">{sponsor.description}</p>
    </div>
  ));

  return (
    <section className="py-20  text-white">
      <div className="max-w-7xl mx-auto px-6">
        <MultiCardSlider items={sponsorSlides} title="Our Sponsors" />
      </div>
    </section>
  );
};

const PaymentAndSponsors = () => {
  return (
    <div>
      <PaymentSection />
      <SponsorsSection />
    </div>
  );
};

export default PaymentAndSponsors;
