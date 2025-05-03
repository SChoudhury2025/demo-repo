import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDoctorModal = ({ isOpen, onClose, editingDoctor }) => {
  const [doctorName, setDoctorName] = useState('');
  const [degree, setDegree] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [consultant, setConsultant] = useState(false);
  const [deptId, setDeptId] = useState('');
  const [hospiId, setHospiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingDoctor) {
      setDoctorName(editingDoctor.name || '');
      setDegree(editingDoctor.degree || '');
      setExperience(editingDoctor.experience || '');
      setAbout(editingDoctor.about || '');
      setConsultant(editingDoctor.consultant || false);
      setDeptId(editingDoctor.deptId || '');
      setHospiId(editingDoctor.hospiId || '');
    } else {
      setDoctorName('');
      setDegree('');
      setExperience('');
      setAbout('');
      setConsultant(false);
      setDeptId('');
      setHospiId('');
    }
  }, [editingDoctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorName.trim()) {
      alert("Doctor name is required.");
      return;
    }

    if (!deptId || isNaN(deptId)) {
      alert("Please enter a valid Department.");
      return;
    }

    if (!hospiId || isNaN(hospiId)) {
      alert("Please enter a valid Hospital.");
      return;
    }

    const payload = {
      id: editingDoctor?.id || null,
      name: doctorName,
      degree,
      experience,
      about,
      consultant,
      department: {
        id : Number(id),
        name: name
      },
      hospiId: Number(hospiId),
    };

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        editingDoctor
          ? 'http://localhost:8080/doctor/edit-doctor'
          : 'http://localhost:8080/doctor/add-doctor',
        payload
      );

      console.log('API Response:', res);

      if (res.status === 200) {
        alert(editingDoctor ? "Doctor updated successfully!" : "Doctor saved successfully!");
        onClose();
      } else {
        alert(`Unexpected error occurred. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert("Failed to save doctor.");
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
            {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[500px] overflow-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About
            </label>
            <textarea
              rows="3"
              className="w-full border rounded-md px-3 py-2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="consultant"
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
              checked={consultant}
              onChange={(e) => setConsultant(e.target.checked)}
            />
            <label htmlFor="consultant" className="ml-2 text-sm text-gray-700">Consultant</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department<span className="text-red-500">*</span>
            </label>
            <input id='id'
              type="number"
              className="w-full border rounded-md px-3 py-2"
              value={name}
              onChange={(e) => setDeptId(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hospital<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="w-full border rounded-md px-3 py-2"
              value={hospiId}
              onChange={(e) => setHospiId(e.target.value)}
              required
            />
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

export default AdminDoctorModal;
