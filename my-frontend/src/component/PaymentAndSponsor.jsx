import React, { useState, useEffect } from 'react';

const MultiCardSlider = ({ items, title, itemsPerSlide = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex >= items.length - itemsPerSlide ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [items.length, itemsPerSlide]);

  const visibleItems = items.concat(items.slice(0, itemsPerSlide));

  return (
    <div className="relative w-full overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
            width: `${(items.length + itemsPerSlide) * (100 / itemsPerSlide)}%`
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="px-2"
              style={{ width: `${100 / itemsPerSlide}%` }}
            >
              <div className="bg-white rounded-lg shadow-sm p-6 h-full">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {[...Array(Math.ceil(items.length / itemsPerSlide))].map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              Math.floor(currentIndex / itemsPerSlide) === index 
                ? 'bg-blue-500' 
                : 'bg-gray-300'
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
    {
      symbol: "💳",
      title: "Credit Cards",
      description: "Visa, Mastercard, American Express"
    },
    {
      symbol: "👛",
      title: "Digital Wallets",
      description: "PayPal, Apple Pay, Google Pay"
    },
    {
      symbol: "🏦",
      title: "Bank Transfer",
      description: "Direct bank transfers and wire payments"
    },
    {
      symbol: "🎁",
      title: "Gift Cards",
      description: "Redeem gift cards and store credit"
    },
    {
      symbol: "💵",
      title: "Cash Payment",
      description: "Pay with cash on delivery"
    },
    {
      symbol: "📱",
      title: "Mobile Payment",
      description: "Mobile wallets and payment apps"
    }
  ];

  const paymentSlides = paymentMethods.map(method => (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-4xl">{method.symbol}</div>
      <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
      <p className="text-gray-600">{method.description}</p>
    </div>
  ));

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <MultiCardSlider items={paymentSlides} title="Payment Methods" />
      </div>
    </section>
  );
};

const SponsorsSection = () => {
  const sponsors = [
    {
      name: "TechCorp",
      tier: "Platinum",
      logo: "/api/placeholder/120/60",
      description: "Leading technology solutions provider"
    },
    {
      name: "InnovateNow",
      tier: "Gold",
      logo: "/api/placeholder/120/60",
      description: "Innovation and research partner"
    },
    {
      name: "GlobalTech",
      tier: "Gold",
      logo: "/api/placeholder/120/60",
      description: "Global technology services"
    },
    {
      name: "FutureLabs",
      tier: "Silver",
      logo: "/api/placeholder/120/60",
      description: "Future-focused research and development"
    },
    {
      name: "NextGen",
      tier: "Gold",
      logo: "/api/placeholder/120/60",
      description: "Next generation technologies"
    },
    {
      name: "DigiCorp",
      tier: "Silver",
      logo: "/api/placeholder/120/60",
      description: "Digital transformation solutions"
    }
  ];

  const sponsorSlides = sponsors.map(sponsor => (
    <div className="text-center">
      <img 
        src={sponsor.logo} 
        alt={`${sponsor.name} logo`} 
        className="mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{sponsor.name}</h3>
      <span 
        className={`
          inline-block px-3 py-1 rounded-full text-sm font-medium mb-2
          ${sponsor.tier === "Platinum" ? "bg-gray-200 text-gray-800" :
            sponsor.tier === "Gold" ? "bg-yellow-100 text-yellow-800" :
            "bg-gray-100 text-gray-700"}
        `}
      >
        {sponsor.tier}
      </span>
      <p className="text-gray-600 text-sm mt-2">{sponsor.description}</p>
    </div>
  ));

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
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

