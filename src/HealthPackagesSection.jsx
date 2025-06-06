import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HealthPackagesSection = () => {
  const packages = [
    {
      name: "Prostate Screening Package",
      image: "/package_1.png",
      link: "/prostate-package"
    },
    {
      name: "Renal Package",
      image: "/package_2.png",
      link: "/renal-package"
    },
    {
      name: "She Package under 40 years",
      image: "/package_3.png",
      link: "/she-package"
    },
    {
      name: "Gastro Package",
      image: "/package_4.png",
      link: "/gastro-package"
    },
    // Add more packages if needed
  ];

  // Chunk packages in groups of 4 for each slide
  const chunkedPackages = [];
  for (let i = 0; i < packages.length; i += 4) {
    chunkedPackages.push(packages.slice(i, i + 4));
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, chunkedPackages.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="relative text-3xl md:text-5xl text-unit_forth text-center my-4 mb-12 headline">
            Health Packages
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-2"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {chunkedPackages.map((group, slideIndex) => (
                <div key={slideIndex} className="flex-shrink-0 flex w-full">
                  {group.map((pkg, index) => (
                    <div key={index} className="px-2" style={{ width: '25%' }}>
                      <div className="rounded-lg shadow-md overflow-hidden mb-6 flex flex-col bg-white">
                        <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                        <div className="p-4 bg-[#f2f2f2] flex flex-col justify-between flex-grow">
                          <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">{pkg.name}</h3>
                          <Link
                            to={pkg.link}
                            className="text-red-600 hover:text-red-700 font-medium inline-flex items-center justify-center mt-auto"
                          >
                            Know More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 focus:outline-none z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 focus:outline-none z-10 ${currentSlide >= chunkedPackages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            onClick={nextSlide}
            disabled={currentSlide >= chunkedPackages.length - 1}
            aria-label="Next Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-8">
          <Link to="/health-packages" className="inline-block bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-900">
            See All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HealthPackagesSection;
