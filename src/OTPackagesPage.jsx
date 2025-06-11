import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function OTPackagesPage() {
  const location = useLocation();
  const department = location.state?.department;

  const [hospitalList, setHospitalList] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [selectedHospitalName, setSelectedHospitalName] = useState("");
  const [packageList, setPackageList] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [detailedPackages, setDetailedPackages] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (department?.id) {
      axios
        .get(`http://localhost:8080/department/get-hospital-by-department/${department.id}`)
        .then((res) => setHospitalList(res.data || []))
        .catch((err) => console.error("Failed to fetch hospitals:", err));
    }
  }, [department]);

  useEffect(() => {
    if (selectedHospitalId && department?.id) {
      axios
        .get(`http://localhost:8080/package/get-package-by-hospital-and-department/${department.id}/${selectedHospitalId}`)
        .then((res) => setPackageList(res.data || []))
        .catch((err) => console.error("Failed to fetch packages:", err));
    }
  }, [selectedHospitalId, department]);

  const handlePackageSelection = async (pkg) => {
    const exists = selectedPackages.find((p) => p.id === pkg.id);

    if (exists) {
      setSelectedPackages((prev) => prev.filter((p) => p.id !== pkg.id));
      setDetailedPackages((prev) => prev.filter((p) => p.id !== pkg.id));
    } else {
      try {
        const res = await axios.get(`http://localhost:8080/package/get-package/${pkg.id}`);
        setSelectedPackages((prev) => [...prev, pkg]);
        setDetailedPackages((prev) => [...prev, res.data]);
      } catch (err) {
        console.error("Failed to fetch package details:", err);
      }
    }
  };

  const sortedPackages = [...detailedPackages].sort((a, b) => {
    const priceA = a.price;
    const priceB = b.price;
    if (sortOrder === "asc") return priceA - priceB;
    if (sortOrder === "desc") return priceB - priceA;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden mt-0">
        <div className="w-72 bg-red-600 text-white flex flex-col p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 mt-12">Select a Hospital</h2>
          <select
            className="w-full p-3 rounded-lg text-black bg-white border border-gray-300"
            onChange={(e) => {
              const selectedId = e.target.value;
              const selectedName = hospitalList.find((h) => h.id.toString() === selectedId)?.name || "";
              setSelectedHospitalId(selectedId);
              setSelectedHospitalName(selectedName);
              setSelectedPackages([]);
              setDetailedPackages([]);
              setActiveModal(null);
            }}
            value={selectedHospitalId}
          >
            <option value="">Choose...</option>
            {hospitalList.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
            ))}
          </select>

          {selectedHospitalId && packageList.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-8 mb-4">Select Packages</h3>
              <div className="space-y-3">
                {packageList.map((pkg) => (
                  <label key={pkg.id} className="flex items-center gap-3 bg-white text-black p-3 rounded-xl shadow-lg cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-red-700"
                      checked={selectedPackages.some((p) => p.id === pkg.id)}
                      onChange={() => handlePackageSelection(pkg)}
                    />
                    <div>
                      <p className="text-lg font-semibold">{pkg.name}</p>
                      <p className="text-gray-700">₹{pkg.price.toLocaleString("en-IN")}</p>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex-1 p-8 bg-white rounded-2xl shadow-2xl overflow-y-auto relative">
          {!selectedHospitalId ? (
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="text-3xl font-bold text-gray-700 mb-4">Welcome to HealCraft</h1>
              <p className="text-gray-600 text-lg">Please select a hospital from the sidebar to proceed.</p>
            </div>
          ) : sortedPackages.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-center">
              <h1 className="text-3xl font-bold text-gray-700 mb-4">
                Select Package(s) for <span className="text-red-700">{selectedHospitalName}</span>
              </h1>
              <p className="text-lg text-gray-600">Your selected package(s) will appear here.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-gray-700">Selected Packages</h2>
                <button className="bg-red-700 text-white px-4 py-2 rounded-md" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  Sort by Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-300">
                    <img
                      src={`/images/${selectedHospitalName.toLowerCase().replace(/ /g, "-")}.jpg`}
                      alt={pkg.hospital?.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-red-700">{pkg.hospital?.name}</h3>
                      <p className="text-lg font-semibold mb-1">
                        {pkg.name} - <span className="text-green-600">₹{pkg.price.toLocaleString("en-IN")}</span>
                      </p>
                      <p className="text-gray-700">Room Type: {pkg.roomtype}</p>
                      <p className="text-gray-700 mb-2">Food Type: {pkg.foodtype}</p>
                      <button onClick={() => setActiveModal(pkg.id)} className="text-blue-600 underline text-sm">See More</button>
                      <div className="mt-4 flex gap-2">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full hover:bg-green-600">BOOK OT</button>
                        <button onClick={() => handlePackageSelection(pkg)} className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600">Remove</button>
                      </div>
                    </div>

                    {activeModal === pkg.id && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white w-full max-w-xl rounded-xl shadow-xl overflow-hidden relative">
                          <button onClick={() => setActiveModal(null)} className="absolute top-2 right-2 text-2xl text-red-600 font-bold z-10">×</button>
                          <img
                            src={`/images/${selectedHospitalName.toLowerCase().replace(/ /g, "-")}.jpg`}
                            alt={pkg.hospital?.name}
                            className="w-full h-56 object-cover"
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-red-700 mb-2">{pkg.hospital?.name}</h3>
                            <p className="text-lg font-semibold mb-2">{pkg.name} - <span className="text-green-600">₹{pkg.price.toLocaleString("en-IN")}</span></p>
                            <p><strong>Room Type:</strong> {pkg.roomtype}</p>
                            <p><strong>Food Type:</strong> {pkg.foodtype}</p>
                            <p><strong>Nurse Facility:</strong> {pkg.nurseFacility ? "Yes" : "No"}</p>
                            <p><strong>Pick & Drop:</strong> {pkg.pickDrop ? "Yes" : "No"}</p>
                            <p><strong>Post Care:</strong> {pkg.postCare ? "Yes" : "No"}</p>
                            <p><strong>Physiotherapy:</strong> {pkg.physiotherapy ? "Yes" : "No"}</p>
                            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">BOOK OT</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OTPackagesPage;
