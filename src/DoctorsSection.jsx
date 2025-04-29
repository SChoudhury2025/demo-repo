import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Doctors data with static image paths
  const doctors = [
    {
      name: "Dr. Rajesh Kumar",
      specialty: "Orthopedics & Joint Replacement",
      experience: "15+ Years Experience",
      image: "/doc_1.png"
    },
    {
      name: "Dr. Priya Sharma",
      specialty: "Cardiology",
      experience: "12+ Years Experience",
      image: "/doc_2.png"
    },
    {
      name: "Dr. Amit Patel",
      specialty: "Neurology",
      experience: "18+ Years Experience",
      image: "/doc_3.png"
    },
    {
      name: "Dr. Sunita Verma",
      specialty: "Gynecology",
      experience: "10+ Years Experience",
      image: "/doc_4.png"
    },
    {
      name: "Dr. Vikram Singh",
      specialty: "Pulmonology",
      experience: "14+ Years Experience",
      image: "/doc_5.png"
    },
    {
      name: "Dr. Neha Gupta",
      specialty: "ENT - Otolaryngology",
      experience: "9+ Years Experience",
      image: "/doc_6.png"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, doctors.length - 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="relative text-3xl md:text-5xl text-unit_forth text-center my-4 mb-12 headline">Our Clinical Experts</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Meet our team of experienced specialists dedicated to providing exceptional healthcare.
          </p>
        </div>

        <div className="relative">
          {/* Doctor Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
            >
              {doctors.map((doctor, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 transition-transform hover:transform h-full flex flex-col">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-72 object-cover object-center"
                    />
                    <div className="p-4 group hover:bg-red-600 transition-colors duration-300 flex-grow flex flex-col bg-[#eae6e5]">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-white">{doctor.name}</h3>
                        <p className="text-sm text-red-600 group-hover:text-white font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600 group-hover:text-white leading-relaxed mt-2">{doctor.experience}</p>
                      </div>
                      <div className="flex space-x-2 mt-auto">
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
                        <Link
                          to={`/appointment?doctor=${index}`}
                          className="flex-1 bg-red-600 group-hover:bg-white group-hover:text-red-600 text-white text-center py-1.5 rounded hover:bg-red-700 transition-colors text-xs"
                        >
                          <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Book Appointment
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
