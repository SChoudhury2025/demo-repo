import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddServiceModal = ({ isOpen, onClose, editingService }) => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [prime, setPrime] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (editingService) {
      setServiceName(editingService.name || '');
      setDescription(editingService.description || '');
      setPrime(editingService.prime || false);
      setActive(editingService.active || false);
    } else {
      setServiceName('');
      setDescription('');
      setPrime(false);
      setActive(false);
    }
  }, [editingService]);

  const handleSave = async () => {
    if (!serviceName || !description) {
      alert('Please fill in all required fields.');
      return;
    }

    const serviceData = {
      id: editingService?.id || null,
      name: serviceName,
      description,
      active,
      prime,
    };

    try {
      const response = await axios.post('http://localhost:8080/service/add-service', serviceData);
      if (response.status === 200) {
        alert(editingService ? 'Updated successfully!' : 'Service saved successfully!'); // Updated alert message
        onClose();
      } else {
        alert('Failed to save service.');
      }
    } catch (error) {
      console.error('Error saving service:', error.response?.data || error.message);
      alert('Error occurred while saving the service.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto w-full max-w-xl bg-white rounded-md shadow-lg">
        <div className="flex justify-between items-center border-b px-7 py-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-7 py-4 space-y-5 text-left">
          <div>
            <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">
              Service Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="serviceName"
              className="w-full border rounded-md px-3 py-2"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full border rounded-md px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="prime"
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
              checked={prime}
              onChange={(e) => setPrime(e.target.checked)}
            />
            <label htmlFor="prime" className="ml-2 text-sm text-gray-900">Prime</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-900">Active</label>
          </div>
        </div>

        <div className="flex justify-end border-t px-7 py-4">
          <button className="px-4 py-2 text-sm bg-white text-gray-700 border rounded hover:bg-gray-100 mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
