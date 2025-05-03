import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Import the Header component

const hospitals = {
  "Apollo Gleneagles": {
    image: "public/apollo.jpg",
    packages: [
      {
        type: "Platinum",
        price: "₹2,50,000",
        details: "Executive suite, chief surgeon, concierge medical care.",
        extraDetails: [
          "Luxury stay, spa recovery, health concierge, personalized staff.",
          "Pre-Op Checkups Included",
          "Free Follow-Up for 15 Days",
          "Meals Included",
          "Priority Admission Service"
        ],
        features: [],
      },
      {
        type: "Gold",
        price: "₹1,50,000",
        details: "Superior suite, experienced surgeons, post-op care.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 10 Days",
          "Meals Included"
        ],
        features: [],
      },
      {
        type: "Silver",
        price: "₹1,00,000",
        details: "Standard suite, senior surgeons, recovery care.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 7 Days"
        ],
        features: [],
      },
    ]
  },
  "Ruby General Hospital": {
    image: "public/ruby.jpg",
    packages: [
      {
        type: "Platinum",
        price: "₹2,75,000",
        details: "Executive suite, chief surgeon, 24/7 support.",
        extraDetails: [
          "Luxury suite, priority recovery, personalized care",
          "Pre-Op Checkups Included",
          "Free Follow-Up for 14 Days",
          "Meals Included"
        ],
        features: [],
      },
      {
        type: "Gold",
        price: "₹1,75,000",
        details: "Superior suite, post-op care, highly experienced surgeons.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 10 Days",
          "Meals Included"
        ],
        features: [],
      },
      {
        type: "Silver",
        price: "₹1,25,000",
        details: "Standard suite, experienced surgeons, care package.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 7 Days"
        ],
        features: [],
      },
    ]
  },
  "Fortis Hospital": {
    image: "public/fortis.jpg",
    packages: [
      {
        type: "Platinum",
        price: "₹3,00,000",
        details: "Top-tier surgeons, executive suite, premium recovery.",
        extraDetails: [
          "Luxury recovery, personal medical care, 24/7 support",
          "Pre-Op Checkups Included",
          "Free Follow-Up for 15 Days"
        ],
        features: [],
      },
      {
        type: "Gold",
        price: "₹1,80,000",
        details: "Highly experienced surgeons, top-tier medical support.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 10 Days",
          "Meals Included"
        ],
        features: [],
      },
      {
        type: "Silver",
        price: "₹1,20,000",
        details: "Experienced surgeons, well-equipped rooms, recovery care.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 7 Days"
        ],
        features: [],
      },
    ]
  },
  "AMRI Hospital": {
    image: "public/amri.jpg",
    packages: [
      {
        type: "Platinum",
        price: "₹2,80,000",
        details: "Top surgeons, 24/7 medical staff, luxury suite.",
        extraDetails: [
          "Personalized post-op care, spa recovery, priority services",
          "Pre-Op Checkups Included",
          "Free Follow-Up for 15 Days"
        ],
        features: [],
      },
      {
        type: "Gold",
        price: "₹1,60,000",
        details: "Highly skilled surgeons, post-op recovery, excellent care.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 10 Days",
          "Meals Included"
        ],
        features: [],
      },
      {
        type: "Silver",
        price: "₹1,10,000",
        details: "Senior surgeons, efficient recovery care, standard suite.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 7 Days"
        ],
        features: [],
      },
    ]
  },
  "Desun Hospital": {
    image: "/images/desun.jpg",
    packages: [
      {
        type: "Platinum",
        price: "₹3,20,000",
        details: "Executive suite, experienced surgeons, full recovery package.",
        extraDetails: [
          "Post-op recovery, luxury suite, 24/7 medical support",
          "Pre-Op Checkups Included",
          "Free Follow-Up for 20 Days"
        ],
        features: [],
      },
      {
        type: "Gold",
        price: "₹1,90,000",
        details: "Experienced surgeons, top care, post-op monitoring.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 10 Days",
          "Meals Included"
        ],
        features: [],
      },
      {
        type: "Silver",
        price: "₹1,30,000",
        details: "Standard recovery suite, skilled surgeons.",
        extraDetails: [
          "Pre-Op Checkups Included",
          "Free Follow-Up for 7 Days"
        ],
        features: [],
      },
    ]
  },
};

function OTPackagesPage() {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const navigate = useNavigate();

  const handlePackageSelection = (pkg) => {
    setSelectedPackages((prev) => {
      const exists = prev.some(
        (item) => item.type === pkg.type && item.hospital === selectedHospital
      );
      return exists
        ? prev.filter(
            (item) => !(item.type === pkg.type && item.hospital === selectedHospital)
          )
        : [...prev, { ...pkg, hospital: selectedHospital, image: hospitals[selectedHospital].image }];
    });
  };

  const sortByPrice = () => {
    const sorted = [...selectedPackages].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
      return sortAsc ? priceA - priceB : priceB - priceA;
    });
    setSortAsc(!sortAsc);
    setSelectedPackages(sorted);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header stays fixed at top */}
      <Header />

      <div className="flex flex-1 overflow-hidden mt-0">
        {/* Left Panel */}
        <div className="w-64 bg-red-600 text-white flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-6 mt-12">Select a Hospital</h2>
          <select
            className="w-full p-3 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
            onChange={(e) => setSelectedHospital(e.target.value)}
          >
            <option value="">Choose...</option>
            {Object.keys(hospitals).map((hospital) => (
              <option key={hospital} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>

          {selectedHospital && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Select Packages</h3>
              {hospitals[selectedHospital].packages.map((pkg) => (
                <div
                  key={pkg.type}
                  className="mt-4 flex items-center gap-3 p-4 rounded-xl shadow-lg border bg-white text-black border-gray-200"
                >
                  <input
                    type="checkbox"
                    className="w-6 h-6 accent-red-800"
                    onChange={() => handlePackageSelection(pkg)}
                    checked={selectedPackages.some(item => item.type === pkg.type && item.hospital === selectedHospital)}
                  />
                  <span className="text-lg font-medium">
                    {pkg.type} ({pkg.price})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-6 bg-white rounded-2xl shadow-2xl overflow-y-auto relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-700">Selected Packages</h2>
            {selectedPackages.length > 1 && (
              <button
                onClick={sortByPrice}
                className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Sort by Price
              </button>
            )}
          </div>

          {selectedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-6 shadow-lg transition-all bg-gray-100 border-gray-300 text-black"
                >
                  <img
                    src={pkg.image}
                    alt={pkg.hospital}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-red-800">{pkg.hospital}</h3>
                  <p className="text-lg font-semibold">
                    {pkg.type} - <span className="text-green-600">{pkg.price}</span>
                  </p>
                  <ul className="mt-2 space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {feature.icon} {feature.text}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2">{pkg.details.substring(0, 50)}...</p>
                  <p
                    onClick={() => setExpandedCard(index)}
                    className="mt-2 text-blue-600 hover:underline cursor-pointer"
                  >
                    See More
                  </p>

                  <button
                    onClick={() => navigate("/book-ot")}
                    className="mt-2 w-full bg-green-500 text-white px-4 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
                  >
                    BOOK OT
                  </button>

                  <button
                    className="mt-2 w-full bg-red-500 text-white px-2 py-2 rounded-lg shadow-lg hover:bg-red-700 transition"
                    onClick={() => setSelectedPackages(prev => prev.filter((_, i) => i !== index))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-lg font-medium text-gray-500">No package selected</p>
          )}

          {/* Modal View for Expanded Card */}
          {expandedCard !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 transition duration-300 ease-in-out">
              <div className="w-full max-w-2xl p-6 rounded-2xl relative shadow-2xl bg-white text-black">
                <button
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  onClick={() => setExpandedCard(null)}
                >
                  Close
                </button>
                <img
                  src={selectedPackages[expandedCard].image}
                  alt={selectedPackages[expandedCard].hospital}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-red-800">{selectedPackages[expandedCard].hospital}</h3>
                <p className="text-xl font-semibold mb-2">
                  {selectedPackages[expandedCard].type} - <span className="text-green-600">{selectedPackages[expandedCard].price}</span>
                </p>
                <ul className="space-y-2">
                  {selectedPackages[expandedCard].features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {feature.icon} {feature.text}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-lg">
                  {Array.isArray(selectedPackages[expandedCard].extraDetails)
                    ? selectedPackages[expandedCard].extraDetails.join(" | ")
                    : selectedPackages[expandedCard].extraDetails}
                </p>
                <button
                  onClick={() => navigate("/book-ot")}
                  className="mt-6 w-full bg-green-500 text-white px-4 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition"
                >
                  BOOK OT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OTPackagesPage;
