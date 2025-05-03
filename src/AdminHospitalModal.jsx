import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHospitalModal = ({ isOpen, onClose, editingHospital }) => {
  const [hospitalName, setHospitalName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:8080/department/get-active-department');
        setDepartments(res.data || []);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchDepartments();

    if (editingHospital) {
      setHospitalName(editingHospital.name || '');
      setDescription(editingHospital.description || '');
      setAddress(editingHospital.address || '');
      setContact(editingHospital.contact || '');
      setEmail(editingHospital.email || '');
      setUrl(editingHospital.url || '');
      setSelectedDepartments(editingHospital.departments?.map(dep => dep.id) || []);
    } else {
      setHospitalName('');
      setDescription('');
      setAddress('');
      setContact('');
      setEmail('');
      setUrl('');
      setSelectedDepartments([]);
    }
  }, [editingHospital]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hospitalName.trim()) {
      alert("Hospital name is required.");
      return;
    }

    // Only check the contact validation if the contact field is being edited or a new contact is entered
    if (!editingHospital && (contact.length !== 10 || isNaN(contact))) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    if (selectedDepartments.length === 0) {
      alert("At least one department must be selected.");
      return;
    }

    const validDepartments = selectedDepartments.filter(id => id != null && id !== "");

    const payload = {
      id: editingHospital?.id || null,
      name: hospitalName,
      description,
      address,
      contact,
      email,
      url,
      departmentIds: validDepartments,
    };

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        'http://localhost:8080/hospital/add-hospital',
        payload
      );

      if (res.status === 200) {
        alert("Hospital saved successfully!");
        // Clear the form after successful submission
        setHospitalName('');
        setDescription('');
        setAddress('');
        setContact('');
        setEmail('');
        setUrl('');
        setSelectedDepartments([]);
        onClose();
      } else {
        alert(`Unexpected error occurred. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error saving hospital:", error);
      alert("Failed to save hospital.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingHospital ? 'Edit Hospital' : 'Add New Hospital'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[500px] overflow-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={contact}
              onChange={(e) => setContact(e.target.value.replace(/\D/, '').slice(0, 10))}
              required
              maxLength="10"
              pattern="\d{10}"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departments<span className="text-red-500">*</span>
            </label>
            <div className="space-y-1 max-h-40 overflow-y-auto border rounded-md p-2">
              {departments.map((dept) => (
                <div key={dept.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`dept-${dept.id}`}
                    checked={selectedDepartments.includes(dept.id)}
                    onChange={() => {
                      setSelectedDepartments((prev) =>
                        prev.includes(dept.id)
                          ? prev.filter((id) => id !== dept.id)
                          : [...prev, dept.id]
                      );
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`dept-${dept.id}`} className="text-sm text-gray-700">{dept.name}</label>
                </div>
              ))}
            </div>
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

export default AdminHospitalModal;
