import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from 'lucide-react';

const AdminPackageTable = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.get(`http://localhost:8080/package/delete-package/${id}`);
        alert('Package deleted!');
        setPackages(packages.filter(pkg => pkg.id !== id));
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete package.');
      }
    }
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">OT Packages</h1>
        {/* Add New Package button can be placed here */}
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
                <th className="p-2 border-b whitespace-nowrap">Room Type</th>
                <th className="p-2 border-b whitespace-nowrap">Food Type</th>
                <th className="p-2 border-b whitespace-nowrap">Nurse Facility</th>
                <th className="p-2 border-b whitespace-nowrap">Pick Drop</th>
                <th className="p-2 border-b whitespace-nowrap">Post Care</th>
                <th className="p-2 border-b">Physiotherapy</th>
                <th className="p-2 border-b">Department</th>
                <th className="p-2 border-b">Hospital</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="12" className="p-4">Loading...</td></tr>
              ) : filteredPackages.length > 0 ? (
                filteredPackages.map(pkg => (
                  <tr key={pkg.id}>
                    <td className="p-2 border-b">{pkg.id}</td>
                    <td className="p-2 border-b">{pkg.name}</td>
                    <td className="p-2 border-b">₹{pkg.price}</td>
                    <td className="p-2 border-b">{pkg.roomType}</td>
                    <td className="p-2 border-b">{pkg.foodType}</td>
                    <td className="p-2 border-b">{pkg.nurseFacility ? 'Yes' : 'No'}</td>
                    <td className="p-2 border-b">{pkg.pickDrop ? 'Yes' : 'No'}</td>
                    <td className="p-2 border-b">{pkg.postCare ? 'Yes' : 'No'}</td>
                    <td className="p-2 border-b">{pkg.physiotherapy ? 'Yes' : 'No'}</td>
                    <td className="p-2 border-b">{pkg.department?.name || '-'}</td>
                    <td className="p-2 border-b">{pkg.hospital?.name || '-'}</td>
                    <td className="p-2 border-b">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:bg-blue-50 rounded p-1">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(pkg.id)} className="text-red-600 hover:bg-red-50 rounded p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="12" className="p-4">No packages found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPackageTable;
