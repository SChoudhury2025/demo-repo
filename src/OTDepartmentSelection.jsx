import { useNavigate } from "react-router-dom";
import Header from './Header';
import {
  HeartPulse, Baby, Bone, Brain, Droplets,
  Sun, Syringe, Radiation, Smile, Utensils,
  Ear, ShieldCheck, Activity, HandMetal, Droplet, Scissors
} from "lucide-react";

const departments = [
  { name: "Cardiology", icon: <HeartPulse size={30} /> },
  { name: "Gynecology", icon: <Baby size={30} /> },
  { name: "Orthopaedics", icon: <Bone size={30} /> },
  { name: "Neurology", icon: <Brain size={30} /> },
  { name: "Urology", icon: <Droplets size={30} /> },
  { name: "Dermatology", icon: <Sun size={30} /> },
  { name: "Pediatrics", icon: <Syringe size={30} /> },
  { name: "Oncology", icon: <Radiation size={30} /> },
  { name: "Psychiatry", icon: <Smile size={30} /> },
  { name: "Gastroenterology", icon: <Utensils size={30} /> },
  { name: "ENT", icon: <Ear size={30} /> },
  { name: "Nephrology", icon: <ShieldCheck size={30} /> },
  { name: "Endocrinology", icon: <Activity size={30} /> },
  { name: "Rheumatology", icon: <HandMetal size={30} /> },
  { name: "Hematology", icon: <Droplet size={30} /> },
  { name: "General Surgery", icon: <Scissors size={30} /> },
];

function OTDepartmentSelection() {
  const navigate = useNavigate();

  const handleDepartmentClick = (dept) => {
    navigate("/ot-packages-page", { state: { department: dept } }); // ✅ Navigates with state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex flex-col">
      <Header />

      <div className="p-10 flex-1">
        <h1 className="text-4xl font-extrabold text-center text-black mb-12 drop-shadow-md">
          Select an OT Department
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
          {departments.map((dept) => (
            <button
              key={dept.name}
              onClick={() => handleDepartmentClick(dept.name)}
              className="w-60 h-28 bg-red-800 text-white rounded-2xl shadow-lg flex flex-col items-center justify-center text-lg font-medium gap-2 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-red-900"
            >
              {dept.icon}
              {dept.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OTDepartmentSelection;
