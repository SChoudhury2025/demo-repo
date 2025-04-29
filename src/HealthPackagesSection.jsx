import React from 'react';
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
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="relative text-3xl md:text-5xl text-unit_forth text-center my-4 mb-12 headline">
            Health Packages
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
              <div className="p-4 bg-[#f2f2f2]">
                <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">{pkg.name}</h3>
                <Link to={pkg.link} className="text-red-600 hover:text-red-700 font-medium inline-flex items-center justify-center">
                  Know More →
                </Link>
              </div>
            </div>
          ))}
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
