// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white sticky top-0 z-50 shadow-md">
      {/* Top Info Bar */}
      <div className="bg-unit_primary hidden lg:block">
        <div className="container h-9 flex justify-end items-center text-white mx-auto">
          <ul className="flex text-sm h-full">
            <li className="border-r border-gray-300 pr-2 pl-2 flex items-center">
              <Link className="font-bold text-[#4e4e4e]" to="/">
                <i className="fas fa-home mr-1"></i> Home
              </Link>
            </li>
            <li className="border-r border-gray-300 pr-2 pl-2 flex items-center">
              <button className="font-bold text-[#4e4e4e]">
                <i className="fas fa-envelope-open mr-1"></i> Quick Enquiry
              </button>
            </li>
          </ul>
          <div className="text-base flex items-center">
            <div className="pr-2">
              <p className="text-[#4e4e4e] font-bold">
                <a href="tel:08062136595">Call Us: 08062136595</a>
              </p>
            </div>
            <div className="pr-2 bg-red-700 px-2 flex items-center text-white rounded-sm">
              <p className="flex items-center font-semibold">
                <img src="/ambulance.gif" alt="Ambulance" width="24" height="24" className="pr-1" />
                <a href="tel:08062136598">Emergency No: 08062136598</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full px-0">
          <div className="flex justify-between items-center py-3 relative w-full px-8">
            {/* Dual Logo Section - adjusted to match Header__2.jsx */}
            <div className="flex items-center space-x-2" style={{ minWidth: '300px' }}>
              <img
                src="/healcraft_8.png"
                alt="Healcraft Icon"
                className="h-12 object-contain"
              />
              <img
                src="/healcraft_9.png"
                alt="Healcraft Text Logo"
                className="h-12 object-contain"
              />
            </div>

            {/* Centered Nav Links */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 max-w-[900px] w-full justify-center">
              <a href="#" className="text-gray-700 hover:text-red-600">Services</a>
              <a href="#" className="text-gray-700 hover:text-red-600">Patients & Visitors</a>
              <a href="#" className="text-gray-700 hover:text-red-600">Paediatric Immunisation</a>
              <a href="#" className="text-gray-700 hover:text-red-600">International Patients</a>
              <a href="#" className="text-gray-700 hover:text-red-600">About Us</a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => navigate('/department-selection')}
              >
                Book Appointment
              </button>
              <Link to="/signup" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
