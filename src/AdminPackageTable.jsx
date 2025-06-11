// AdminPackageTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from 'lucide-react';
import AdminPackageModal from './AdminPackageModal';

const AdminPackageTable = () => {
 const [packages, setPackages] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');
 const [loading, setLoading] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [editingPackage, setEditingPackage] = useState(null);

 const fetchPackages = async () => {
 try {
 setLoading(true);
 const res = await axios.get('http://localhost:8080/package/get-all-packages');
 setPackages(res.data);
 } catch (err) {
 console.error('Failed to fetch packages:', err);
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
  fetchPackages();
 }, []);

 const openModal = () => {
  setEditingPackage(null);
  setIsModalOpen(true);
 };

 const closeModal = () => {
  setIsModalOpen(false);
  setEditingPackage(null);
  fetchPackages();
 };

 const handleEdit = async (id) => {
  try {
  const res = await axios.get(`http://localhost:8080/package/get-package/${id}`);
   const data = res.data;

  setEditingPackage({
 id: data.id,
 name: data.name,
 price: data.price,
 roomType: data.roomtype,
 foodType: data.foodtype,
 nurseFacility: data.nursefacility,
 pickDrop: data.pickdrop,
 postCare: data.postcare,
 physiotherapy: data.physiotherapy,
 departmentId: data.department?.id,
 hospitalId: data.hospital?.id,
 roomTypeList: data.roomTypeList || [],
 foodTypeList: data.foodTypeList || []
 });

 setIsModalOpen(true);
 } catch (err) {
 console.error('Failed to fetch package for editing:', err);
 alert('Error loading package data.');
 }
 };

 const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this package?')) return;
 try {
 await axios.get(`http://localhost:8080/package/delete-package/${id}`);
 alert('Package deleted successfully!');
 setPackages(packages.filter(pkg => pkg.id !== id));
 } catch (err) {
 console.error('Delete failed:', err.response?.data || err.message);
 alert('Failed to delete package.');
 }
 };

 const filteredPackages = packages.filter(pkg =>
 pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <div className="flex-1 p-8">
 <div className="flex justify-between items-center mb-4">
 <h1 className="text-3xl font-semibold">OT Packages</h1>
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
 placeholder="Search packages..."
 className="w-full p-2 border rounded"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 />
 </div>

 <div className="overflow-x-auto">
 <div className="max-h-[500px] overflow-y-auto border rounded-lg">
 <table className="min-w-full bg-white table-fixed text-center">
 <thead className="bg-gray-100 sticky top-0 z-10">
 <tr>
 <th className="p-2 border-b">ID</th>
 <th className="p-2 border-b">Name</th>
 <th className="p-2 border-b">Price</th>
 <th className="p-2 border-b">Room Type</th>
 <th className="p-2 border-b">Food Type</th>
 <th className="p-2 border-b">Nurse Facility</th>
 <th className="p-2 border-b">Pick Drop</th>
 <th className="p-2 border-b">Post Care</th>
 <th className="p-2 border-b">Physiotherapy</th>
 <th className="p-2 border-b">Department</th>
 <th className="p-2 border-b">Hospital</th>
 <th className="p-2 border-b">Actions</th>
 </tr>
 </thead>
 <tbody>
 {loading ? (
 <tr>
 <td colSpan="12" className="p-4 text-center">Loading...</td>
 </tr>
 ) : filteredPackages.length > 0 ? (
 filteredPackages.map(pkg => (
 <tr key={pkg.id}>
 <td className="p-2 border-b">{pkg.id}</td>
 <td className="p-2 border-b">{pkg.name}</td>
 <td className="p-2 border-b">₹{pkg.price}</td>
 <td className="p-2 border-b">{pkg.roomtype}</td>
 <td className="p-2 border-b">{pkg.foodtype}</td>
 <td className="p-2 border-b">{pkg.nursefacility ? 'Yes' : 'No'}</td>
 <td className="p-2 border-b">{pkg.pickdrop ? 'Yes' : 'No'}</td>
 <td className="p-2 border-b">{pkg.postcare ? 'Yes' : 'No'}</td>
 <td className="p-2 border-b">{pkg.physiotherapy ? 'Yes' : 'No'}</td>
 <td className="p-2 border-b">{pkg.department?.name || '-'}</td>
 <td className="p-2 border-b">{pkg.hospital?.name || '-'}</td>
 <td className="p-2 border-b">
 <div className="flex justify-center gap-2">
 <button
 onClick={() => handleEdit(pkg.id)}
 className="text-blue-600 hover:bg-blue-50 rounded p-1"
 >
 <Edit2 size={16} />
 </button>
 <button
 onClick={() => handleDelete(pkg.id)}
 className="text-red-600 hover:bg-red-50 rounded p-1"
 >
 <Trash2 size={16} />
 </button>
 </div>
 </td>
 </tr>
 ))
 ) : (
 <tr><td colSpan="12" className="p-4 text-center">No packages found</td></tr>
 )}
 </tbody>
 </table>
 </div>
 </div>

 <AdminPackageModal
 isOpen={isModalOpen}
 onClose={closeModal}
 packageData={editingPackage}
 />
 </div>
 );
};

export default AdminPackageTable;
