import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import DoctorsSection from './DoctorsSection';
import AboutSection from './AboutSection';
import HealthPackagesSection from './HealthPackagesSection';
import PatientTestimonials from './PatientTestimonials';
import HeroSlider from './HeroSlider';
import Signup from './Signup';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import AddServiceModal from './AddServiceModal';
import AdminDepartmentModal from './AdminDepartmentModal';
import AdminDoctorModal from './AdminDoctorModal';
import AdminHospitalModal from './AdminHospitalModal';
import Header from './Header';
import OTDepartmentSelection from './OTDepartmentSelection';
import DepartmentSelection from './DepartmentSelection';
import OTPackagesPage from './OTPackagesPage';
import axios from 'axios';


function HomePage({ setIsModalOpen, setIsDepartmentModalOpen }) {
  const navigate = useNavigate();
  const [nonPrimeServices, setNonPrimeServices] = useState([]);
  const [primeServices, setPrimeServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/service/get-all-services')
      .then(response => {
        const prime = response.data.filter(service => service.prime && service.active);
        const nonPrime = response.data.filter(service => !service.prime && service.active);
        setPrimeServices(prime);
        setNonPrimeServices(nonPrime);
      })
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const getIconClass = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("doctor")) return "bi bi-person-fill";
    if (lower.includes("insurance")) return "bi bi-shield-check";
    if (lower.includes("consult")) return "bi bi-chat-dots";
    if (lower.includes("hospital")) return "bi bi-hospital";
    if (lower.includes("test") || lower.includes("lab")) return "bi bi-clipboard-pulse";
    return "bi bi-star";
  };

  const getCustomIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("hospital")) return "/icons/hospital_icon.png";
    if (lower.includes("online consultation")) return "/icons/consult_icon.png";
    if (lower.includes("insurance")) return "/icons/insurance_icon.png";
    return null;
  };

  return (
    <>
      <Header />
      <AddServiceModal isOpen={false} onClose={() => setIsModalOpen(false)} />
      <AdminDepartmentModal isOpen={false} onClose={() => setIsDepartmentModalOpen(false)} />
      <AdminDoctorModal isOpen={false} onClose={() => {}} />
      <AdminHospitalModal isOpen={false} onClose={() => {}} />

      <div className="mb-0">
        <HeroSlider />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto w-full px-4 mt-0 overflow-hidden">
        {primeServices[0] && (
          <div
            className="bg-red-700 text-white text-center p-8 rounded-none shadow hover:bg-red-800 transition cursor-pointer"
            onClick={() => navigate('/ot-department-selection')}
          >
            <i className="bi bi-person-badge text-4xl mb-2"></i>
            <h3 className="text-xl font-semibold mb-1">{primeServices[0].name}</h3>
            <p className="text-sm">{primeServices[0].description}</p>
          </div>
        )}
        {primeServices[1] && (
          <div className="bg-gray-700 text-white text-center p-8 rounded-none shadow hover:bg-gray-800 transition">
            <i className="bi bi-heart-pulse text-4xl mb-2"></i>
            <h3 className="text-xl font-semibold mb-1">{primeServices[1].name}</h3>
            <p className="text-sm">{primeServices[1].description}</p>
          </div>
        )}
        {primeServices[2] && (
          <div className="bg-blue-700 text-white text-center p-8 rounded-none shadow hover:bg-blue-800 transition">
            <i className="bi bi-calendar-check text-4xl mb-2"></i>
            <h3 className="text-xl font-semibold mb-1">{primeServices[2].name}</h3>
            <p className="text-sm">{primeServices[2].description}</p>
          </div>
        )}
      </div>

      <AboutSection />

      <div className="core-specialities max-w-7xl mx-auto px-4">
        <h2 className="relative text-3xl md:text-5xl text-unit_forth text-center my-4 mb-12 headline">
          Our Core Specialities
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-10 overflow-hidden">
          {nonPrimeServices.map((service, index) => {
            const name = service.name || '';
            const lower = name.toLowerCase();
            const isFindDoctor = lower.includes("find a doctor");
            const iconClass = getIconClass(name);
            const customIcon = getCustomIcon(name);

            return (
              <div
                key={index}
                className="bg-gray-100 w-[300px] h-[134px] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center justify-center text-center"
              >
                {isFindDoctor ? (
                  <img
                    src="/icons/doctor_new_icon.png"
                    alt="Find a Doctor"
                    className="w-12 h-12 mb-2"
                  />
                ) : customIcon ? (
                  <img
                    src={customIcon}
                    alt={service.name}
                    className="w-12 h-12 mb-2"
                  />
                ) : (
                  <i className={`${iconClass} text-3xl text-red-600 mb-2`}></i>
                )}
                <h3 className="text-lg font-medium text-gray-800">{service.name}</h3>
              </div>
            );
          })}
        </div>
      </div>

      <DoctorsSection />
      <HealthPackagesSection />
      <PatientTestimonials />
    </>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage setIsModalOpen={setIsModalOpen} setIsDepartmentModalOpen={setIsDepartmentModalOpen} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route path="/ot-department-selection" element={<OTDepartmentSelection />} />
        <Route path="/department-selection" element={<DepartmentSelection />} />
        <Route path="/ot-packages-page" element={<OTPackagesPage />} />
      </Routes>

      <div className="fixed right-4 bottom-4 flex flex-col space-y-4">
        <a href="tel:08062136598" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 shadow-lg">
          <i className="bi bi-telephone-fill text-xl"></i>
        </a>
        <a href="https://wa.me/918062136598" className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 shadow-lg">
          <i className="bi bi-whatsapp text-xl"></i>
        </a>
      </div>
    </BrowserRouter>
  );
}

export default App;
