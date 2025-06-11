import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPackageModal = ({ isOpen, onClose, packageData }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [roomType, setRoomType] = useState('');
  const [foodType, setFoodType] = useState('');
  const [nurseFacility, setNurseFacility] = useState(false);
  const [pickDrop, setPickDrop] = useState(false);
  const [postCare, setPostCare] = useState(false);
  const [physiotherapy, setPhysiotherapy] = useState(false);
  const [departmentId, setDepartmentId] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [roomTypeList, setRoomTypeList] = useState([]);
  const [foodTypeList, setFoodTypeList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:8080/department/get-active-department');
        setDepartments(res.data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      if (!departmentId) {
        setHospitals([]);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:8080/department/get-hospital-by-department/${departmentId}`);
        setHospitals(res.data || []);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };
    fetchHospitals();
  }, [departmentId]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get('http://localhost:8080/package/get-all-packages');
        const packages = res.data || [];
        if (packages.length > 0) {
          setFoodTypeList(packages[0].foodTypeList || []);
          setRoomTypeList(packages[0].roomTypeList || []);
        }
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };
    if (isOpen) fetchTypes();
  }, [isOpen]);

  useEffect(() => {
    if (packageData) {
      setName(packageData.name || '');
      setPrice(packageData.price || '');
      setRoomType(packageData.roomType || '');
      setFoodType(packageData.foodType || '');
      setNurseFacility(packageData.nurseFacility || false);
      setPickDrop(packageData.pickDrop || false);
      setPostCare(packageData.postCare || false); // ✅ Fixed field
      setPhysiotherapy(packageData.physiotherapy || false);
      setDepartmentId(packageData.departmentId || '');
      setHospitalId(packageData.hospitalId || '');
      setRoomTypeList(packageData.roomTypeList || []);
      setFoodTypeList(packageData.foodTypeList || []);
    } else {
      setName('');
      setPrice('');
      setRoomType('');
      setFoodType('');
      setNurseFacility(false);
      setPickDrop(false);
      setPostCare(false); // ✅ Reset value
      setPhysiotherapy(false);
      setDepartmentId('');
      setHospitalId('');
      setHospitals([]);
    }
  }, [packageData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !roomType || !foodType || !departmentId || !hospitalId) {
      alert('Please fill all required fields.');
      return;
    }

    const payload = {
      id: packageData?.id || null,
      name,
      price: parseFloat(price),
      roomType,
      foodType,
      nurseFacility,
      pickDrop,
      postCare, // ✅ Included in payload
      physiotherapy,
      departmentId: Number(departmentId),
      hospitalId: Number(hospitalId),
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post('http://localhost:8080/package/add-package', payload);
      if (res.status === 200) {
        alert(packageData ? 'Package updated successfully!' : 'Package added successfully!');

        // Reset form
        setName('');
        setPrice('');
        setRoomType('');
        setFoodType('');
        setNurseFacility(false);
        setPickDrop(false);
        setPostCare(false);
        setPhysiotherapy(false);
        setDepartmentId('');
        setHospitalId('');
        setHospitals([]);

        onClose();
      } else {
        alert('Unexpected response. Try again.');
      }
    } catch (error) {
      console.error('Failed to save package:', error);
      alert('Failed to save package.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {packageData ? 'Edit Package' : 'Add New Package'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[500px] overflow-auto">
          <div>
            <label className="block text-sm font-medium mb-1">Department *</label>
            <select
              value={departmentId}
              onChange={(e) => {
                setDepartmentId(e.target.value);
                setHospitalId('');
              }}
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hospital *</label>
            <select
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2"
              disabled={!departmentId}
            >
              <option value="">Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Package Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Room Type *</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Select Room Type</option>
              {roomTypeList.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Food Type *</label>
            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Select Food Type</option>
              {foodTypeList.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={nurseFacility} onChange={() => setNurseFacility(!nurseFacility)} />
              Nurse Facility
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={pickDrop} onChange={() => setPickDrop(!pickDrop)} />
              Pick Drop
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={postCare} onChange={() => setPostCare(!postCare)} />
              Post Care
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={physiotherapy} onChange={() => setPhysiotherapy(!physiotherapy)} />
              Physiotherapy
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 text-sm bg-white text-gray-700 border rounded hover:bg-gray-100"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPackageModal;
