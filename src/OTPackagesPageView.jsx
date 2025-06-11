import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OTPackagesPageView = () => {
  const { sid } = useParams(); // sid = package ID
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sid) {
      axios
        .get(`http://localhost:8080/package/get-package/${sid}`)
        .then((res) => {
          setPackageData(res.data);
        })
        .catch((err) => console.error("Failed to fetch package:", err))
        .finally(() => setLoading(false));
    }
  }, [sid]);

  if (loading) {
    return <div className="p-8 text-gray-600">Loading package details...</div>;
  }

  if (!packageData) {
    return <div className="p-8 text-red-600">Package not found.</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-red-700">{packageData.name}</h2>
      <p className="text-lg mb-2">
        <strong>Price:</strong>{" "}
        <span className="text-green-600">₹{packageData.price?.toLocaleString("en-IN")}</span>
      </p>
      <p className="mb-2">
        <strong>Room Type:</strong> {packageData.roomtype}
      </p>
      <p className="mb-2">
        <strong>Food Type:</strong> {packageData.foodtype}
      </p>
      <p className="mb-2">
        <strong>Nurse Facility:</strong> {packageData.nursefacility ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Pick & Drop:</strong> {packageData.pickdrop ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Post Care:</strong> {packageData.postcare ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Physiotherapy:</strong> {packageData.physiotherapy ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Department:</strong> {packageData.department?.name}
      </p>
      <p className="mb-2">
        <strong>Hospital:</strong> {packageData.hospital?.name}
      </p>
    </div>
  );
};

export default OTPackagesPageView;
