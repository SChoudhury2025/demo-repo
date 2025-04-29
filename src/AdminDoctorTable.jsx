import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDoctorModal from './AdminDoctorModal';
import { Edit2, Trash2 } from 'lucide-react';

const AdminDoctorTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openModal = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
    fetchDoctors();
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/doctor/get-doctor/${id}`);
      setEditingDoctor(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch doctor:', err);
      alert('Error fetching doctor data');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
    if (confirmDelete) {
      try {
        await axios.get(`http://localhost:8080/doctor/delete-doctor/${id}`);
        alert('Doctor deleted successfully!');
        setDoctors(doctors.filter(doc => doc.id !== id));
      } catch (error) {
        console.error('Delete failed:', error.response?.data || error.message);
        alert('Failed to delete doctor.');
      }
    }
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Doctors</h1>
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
          placeholder="Search doctors..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto border rounded-lg">
          <table className="min-w-full bg-white table-fixed">
            <thead className="bg-gray-100 sticky top-0 z-10 text-center">
              <tr>
                <th className="p-2 border-b w-[80px]">ID</th>
                <th className="p-2 border-b w-[180px]">Name</th>
                <th className="p-2 border-b w-[150px]">Degree</th>
                <th className="p-2 border-b w-[160px]">Experience</th>
                <th className="p-2 border-b w-[200px]">About</th>
                <th className="p-2 border-b w-[140px]">Consultant</th>
                <th className="p-2 border-b w-[160px]">Department ID</th>
                <th className="p-2 border-b w-[160px]">Hospital ID</th>
                <th className="p-2 border-b w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="9" className="p-4 text-center">Loading...</td></tr>
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc, index) => (
                  <tr key={doc.id || index} className="text-center">
                    <td className="p-2 border-b">{doc.id}</td>
                    <td className="p-2 border-b">{doc.name}</td>
                    <td className="p-2 border-b">{doc.degree}</td>
                    <td className="p-2 border-b">{doc.experience}</td>
                    <td className="p-2 border-b">{doc.about}</td>
                    <td className="p-2 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${doc.consultant ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        {doc.consultant ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-2 border-b">{doc.deptId}</td>
                    <td className="p-2 border-b">{doc.hospiId}</td>
                    <td className="p-2 border-b">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => handleEdit(doc.id)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(doc.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-4 text-center">No doctors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminDoctorModal isOpen={isModalOpen} onClose={closeModal} editingDoctor={editingDoctor} />
    </div>
  );
};

export default AdminDoctorTable;
