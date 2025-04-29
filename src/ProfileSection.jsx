import React, { useState, useEffect } from 'react';

const ProfileSection = () => {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem('profilePic');
    if (storedImage) {
      setProfilePic(storedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem('profilePic', reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 relative">
      <div className="w-32 h-32 rounded-full overflow-hidden relative border-4 border-red-700 shadow-md bg-white">
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-red-600 text-5xl bg-gray-200">
            <i className="bi bi-person-circle"></i>
          </div>
        )}

        {/* ✅ Upload Button on the Circle */}
        <label
          htmlFor="profileUpload"
          className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-red-700 transition-colors cursor-pointer"
          title="Upload profile picture"
        >
          {/* SVG Icon (Upload Icon) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-upload text-white"
          >
            <path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-4 4m4-4l4 4" />
          </svg>
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <h2 className="text-lg font-semibold mt-6">Neil Choudhury</h2>
      <p className="text-sm text-gray-200">Hospital Administrator</p>
    </div>
  );
};

export default ProfileSection;
