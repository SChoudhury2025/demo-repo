import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Map doctor names to custom local image paths
  const doctorImages = {
   
    // Add more mappings as needed
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8080/doctor/get-all-doctors');
        setDoctors(res.data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, doctors.length - 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl text-unit_forth mb-6">Our Clinical Experts</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced specialists dedicated to providing exceptional healthcare.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-2"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {loading ? (
                <div className="w-full text-center py-8">Loading...</div>
              ) : doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <div key={index} className="flex-shrink-0 px-2" style={{ width: '300px' }}>
                    <div
                      className="rounded-lg shadow-lg overflow-hidden mb-6 flex flex-col items-center bg-white"
                      style={{ width: '100%', height: '505px' }}
                    >
                      <img
                        src={doctorImages[doctor.name] || doctor.image || '/doc_1.png'}
                        alt={doctor.name}
                        className="object-cover object-center"
                        style={{ width: '100%', height: '325px' }}
                      />
                      <div
                        className="p-4 group hover:bg-red-600 transition-colors duration-300 flex flex-col justify-between bg-[#eae6e5]"
                        style={{ width: '100%', height: '180px' }}
                      >
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-white">{doctor.name}</h3>
                          <p className="text-sm text-red-600 group-hover:text-white font-medium">
                            {doctor.department?.name || 'Department Not Available'}
                          </p>
                          <p className="text-sm text-gray-600 group-hover:text-white mt-2">{doctor.degree}</p>
                          <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mt-2">
                            Experience: {doctor.experience}
                          </p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <a
                            href="tel:+918062136595"
                            className="flex-1 bg-gray-200 group-hover:bg-white text-gray-800 text-center py-1.5 rounded hover:bg-gray-300 transition-colors text-xs"
                          >
                            <span className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              Call Us
                            </span>
                          </a>
                          <a
                            href={`#appointment/${doctor.id}`}
                            className="flex-1 bg-red-600 group-hover:bg-white group-hover:text-red-600 text-white text-center py-1.5 rounded hover:bg-red-700 transition-colors text-xs"
                          >
                            <span className="flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Book Appointment
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center py-8">No doctors found</div>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 focus:outline-none z-10 ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 focus:outline-none z-10 ${currentSlide >= doctors.length - 4 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            onClick={nextSlide}
            disabled={currentSlide >= doctors.length - 4}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
