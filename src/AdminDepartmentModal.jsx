import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDepartmentModal = ({ isOpen, onClose, editingDepartment }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingDepartment) {
      setDepartmentName(editingDepartment.name || '');
      setDescription(editingDepartment.description || '');
      setStatus(editingDepartment.active || false);
    } else {
      setDepartmentName('');
      setDescription('');
      setStatus(true);
    }
  }, [editingDepartment]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentName) {
      alert("Department name is required.");
      return;
    }

    const payload = {
      id: editingDepartment?.id || null,
      name: departmentName,
      description,
      active: status,
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post('http://localhost:8080/department/add-department', payload);

      if (res.status === 200) {
        alert(editingDepartment ? 'Updated successfully!' : 'Department saved successfully!'); // Updated alert message
        onClose();
      } else {
        alert("Unexpected error occurred.");
        console.error(res);
      }
    } catch (error) {
      console.error("Error saving department:", error);
      alert("Failed to save department.");
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
            {editingDepartment ? 'Edit Department' : 'Add New Department'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="status"
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            <label htmlFor="status" className="ml-2 text-sm text-gray-700">Active</label>
          </div>
        </form>

        <div className="flex justify-end gap-2 px-6 py-4 border-t">
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
            form="department-form"
            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDepartmentModal;
