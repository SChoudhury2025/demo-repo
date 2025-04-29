// components/AdminDashboard.jsx
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ServicesPage from './ServicesPage';
import AdminDepartmentTable from './AdminDepartmentTable';
import AdminDoctorTable from './AdminDoctorTable';
import ProfileSection from './ProfileSection';

// Placeholder components
const HospitalsPage = () => <div className="p-8">Hospitals Page</div>;
const UsersPage = () => <div className="p-8">Users Page</div>;
const PackagesPage = () => <div className="p-8">Health Packages Page</div>;

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Toggle Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-red-600 text-white flex flex-col ${isSidebarOpen ? '' : 'hidden lg:flex'}`}>
        <div className="p-4 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white text-2xl focus:outline-none"
          >
            ✕
          </button>
        </div>

        <ProfileSection />

        {/* Sidebar Links */}
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-2">
              <Link to="services" className="block hover:bg-red-700 p-2 rounded">
                <i className="bi bi-heart-pulse mr-2"></i> Services
              </Link>
            </li>
            <li className="mb-2">
              <Link to="departments" className="block hover:bg-red-700 p-2 rounded">
                <i className="bi bi-building mr-2"></i> Departments
              </Link>
            </li>
            <li className="mb-2">
              <Link to="hospitals" className="block hover:bg-red-700 p-2 rounded">
                <i className="bi bi-hospital mr-2"></i> Hospitals
              </Link>
            </li>
            <li className="mb-2">
              <Link to="doctors" className="block hover:bg-red-700 p-2 rounded">
                <i className="bi bi-person-badge mr-2"></i> Doctors
              </Link>
            </li>
            <li className="mb-2">
              <Link to="users" className="block hover:bg-red-700 p-2 rounded">
                <i className="bi bi-people mr-2"></i> Users
              </Link>
            </li>
            <li className="mb-2">
              <Link to="packages" className="block hover:bg-red-700 p-2 rounded">
                <i className="bi bi-box-seam mr-2"></i> Health Packages
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom Icons */}
        <div className="p-4 flex justify-between items-center">
          <Link to="#" className="hover:bg-red-700 p-2 rounded">
            <i className="bi bi-bell"></i>
          </Link>
          <Link to="#" className="hover:bg-red-700 p-2 rounded">
            <i className="bi bi-gear"></i>
          </Link>
          <Link to="#" className="hover:bg-red-700 p-2 rounded">
            <i className="bi bi-box-arrow-left"></i>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-8 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to Otify Admin Panel</h1>
                <p className="text-gray-700">Select a section from the sidebar.</p>
              </div>
            }
          />
          <Route path="services" element={<ServicesPage />} />
          <Route path="departments" element={<AdminDepartmentTable />} />
          <Route path="doctors" element={<AdminDoctorTable />} />
          <Route path="hospitals" element={<HospitalsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="packages" element={<PackagesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
