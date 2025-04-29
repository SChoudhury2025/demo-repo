import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddServiceModal from './AddServiceModal';
import { Edit2, Trash2 } from 'lucide-react';

const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/service/get-all-services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchServices();
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/service/get-services/${id}`);
      setEditingService(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch service by ID:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (confirmDelete) {
      try {
        await axios.get(`http://localhost:8080/service/delete-services/${id}`);
        alert('Service deleted successfully!');
        fetchServices();
      } catch (error) {
        console.error('Delete failed:', error.response?.data || error.message);
        alert('Failed to delete service.');
      }
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Services</h1>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center"
          onClick={openModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search services..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Description</th>
              <th className="p-2 border-b">Prime Option</th>
              <th className="p-2 border-b">Status</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr key={service.id} className="text-center">
                  <td className="p-2 border-b">{service.id}</td>
                  <td className="p-2 border-b">{service.name}</td>
                  <td className="p-2 border-b">{service.description}</td>
                  <td className="p-2 border-b">{service.prime ? 'Premium' : 'Basic'}</td>
                  <td className="p-2 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-2 border-b">
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => handleEdit(service.id)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">No services found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddServiceModal isOpen={isModalOpen} onClose={closeModal} editingService={editingService} />
    </div>
  );
};

export default ServicesPage;
