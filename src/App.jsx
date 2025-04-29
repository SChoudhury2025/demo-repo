import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AdminDoctorModal from './AdminDoctorModal'; // ✅ Import AdminDoctorModal
import Header from './Header';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <AddServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              <AdminDepartmentModal isOpen={isDepartmentModalOpen} onClose={() => setIsDepartmentModalOpen(false)} />
              <AdminDoctorModal isOpen={false} onClose={() => {}} /> {/* Placeholder usage */}

              <div className="mb-0">
                <HeroSlider />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto w-full px-4 mt-0 overflow-hidden">
                <div className="bg-red-700 text-white text-center p-8 rounded-none shadow hover:bg-red-800 transition">
                  <i className="bi bi-person-badge text-4xl mb-2"></i>
                  <h3 className="text-xl font-semibold mb-1">OT Comparison</h3>
                  <p className="text-sm">Discover the difference</p>
                </div>
                <div className="bg-gray-700 text-white text-center p-8 rounded-none shadow hover:bg-gray-800 transition">
                  <i className="bi bi-heart-pulse text-4xl mb-2"></i>
                  <h3 className="text-xl font-semibold mb-1">Health Check up Plans</h3>
                  <p className="text-sm">Affordable Health Packages</p>
                </div>
                <div className="bg-blue-700 text-white text-center p-8 rounded-none shadow hover:bg-blue-800 transition">
                  <i className="bi bi-calendar-check text-4xl mb-2"></i>
                  <h3 className="text-xl font-semibold mb-1">Book Appointment</h3>
                  <p className="text-sm">Schedule your visit</p>
                </div>
              </div>

              <AboutSection />

              <div className="core-specialities max-w-7xl mx-auto px-4">
                <h2 className="relative text-3xl md:text-5xl text-unit_forth text-center my-4 mb-12 headline">
                  Our Core Specialities
                </h2>
                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-10 overflow-hidden">
                  <div className="bg-gray-100 w-[300px] h-[134px] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center justify-center text-center">
                    <i className="bi bi-person-fill text-3xl text-red-600 mb-2"></i>
                    <h3 className="text-lg font-medium text-gray-800">Find a Doctor</h3>
                  </div>
                  <div className="bg-gray-100 w-[300px] h-[134px] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center justify-center text-center">
                    <i className="bi bi-shield-check text-3xl text-red-600 mb-2"></i>
                    <h3 className="text-lg font-medium text-gray-800">Know Your Insurance</h3>
                  </div>
                  <div className="bg-gray-100 w-[300px] h-[134px] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center justify-center text-center">
                    <i className="bi bi-chat-dots text-3xl text-red-600 mb-2"></i>
                    <h3 className="text-lg font-medium text-gray-800">Online Consultation</h3>
                  </div>
                  <div className="bg-gray-100 w-[300px] h-[134px] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center justify-center text-center">
                    <i className="bi bi-hospital text-3xl text-red-600 mb-2"></i>
                    <h3 className="text-lg font-medium text-gray-800">Hospitals</h3>
                  </div>
                </div>
              </div>

              <DoctorsSection />
              <HealthPackagesSection />
              <PatientTestimonials />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
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
