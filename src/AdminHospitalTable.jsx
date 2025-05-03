import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHospitalModal from './AdminHospitalModal';
import { Edit2, Trash2 } from 'lucide-react';

const AdminHospitalTable = () => {
  const [hospitals, setHospitals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHospital, setEditingHospital] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/hospital/get-all-hospitals');
      setHospitals(res.data);
    } catch (err) {
      console.error('Failed to fetch hospitals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const openModal = () => {
    setEditingHospital(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHospital(null);
    fetchHospitals();
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/hospital/get-hospital/${id}`);
      setEditingHospital(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch hospital:', err);
      alert('Error fetching hospital data');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this hospital?');
    if (confirmDelete) {
      try {
        await axios.get(`http://localhost:8080/hospital/delete-hospital/${id}`);
        alert('Hospital deleted successfully!');
        setHospitals(hospitals.filter(h => h.id !== id));
      } catch (error) {
        console.error('Delete failed:', error.response?.data || error.message);
        alert('Failed to delete hospital.');
      }
    }
  };

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Hospitals</h1>
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
          placeholder="Search hospitals..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto border rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10 text-center">
              <tr>
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Address</th>
                <th className="p-2 border-b">Contact</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">URL</th>
                <th className="p-2 border-b">Departments</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="9" className="p-4 text-center">Loading...</td></tr>
              ) : filteredHospitals.length > 0 ? (
                filteredHospitals.map((h, index) => (
                  <tr key={h.id || index} className="text-center">
                    <td className="p-2 border-b">{h.id}</td>
                    <td className="p-2 border-b">{h.name}</td>
                    <td className="p-2 border-b">{h.description}</td>
                    <td className="p-2 border-b">{h.address}</td>
                    <td className="p-2 border-b">{h.contact}</td>
                    <td className="p-2 border-b">{h.email}</td>
                    <td className="p-2 border-b">{h.url}</td>
                    <td className="p-2 border-b">
                      {h.departments?.map(dep => dep.name).join(', ') || 'No Departments'}
                    </td>
                    <td className="p-2 border-b">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleEdit(h.id)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(h.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-4 text-center">No hospitals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminHospitalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingHospital={editingHospital}
      />
    </div>
  );
};

export default AdminHospitalTable;
