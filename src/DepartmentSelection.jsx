import { useEffect, useState } from "react";
import Header_2 from "./Header_2";
import axios from "axios";

const departmentIconMap = {
  Cardiology: "/depticons/cardio_icon.png",
  Neurology: "/depticons/neuro_icon.png",
  Gastroenterology: "/depticons/gastro_icon.png",
  Nephrology: "/depticons/nephro_icon.png",
  Urology: "/depticons/urology_icon.png",
  Dental: "/depticons/dental_icon.png",
  Neurosurgery: "/depticons/neurosurgery_icon.png",
  "Orthopedics & Joint Replacement": "/depticons/ortho_icon.png",
  Dermatology: "/depticons/derma_icon.png",
  Paediatrics: "/depticons/paediatrics_icon.png",
  Pulmonology: "/depticons/pulmo_icon.png",
  Ophthalmology: "/depticons/oph_icon.png",
  "Plastic & Cosmetic Surgery": "/depticons/plastic_icon.png",
  Psychiatry: "/depticons/psy_icon.png",
};

function toTitleCase(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function DepartmentSelection() {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/department/get-active-department")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Failed to fetch departments:", err));
  }, []);

  const handleDepartmentClick = (dept) => {
    console.log("Department selected:", dept);
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-200 flex flex-col">
      <Header_2 />

      <div className="px-10 py-6 flex-1">
        {/* Heading and Search Bar */}
        <div className="flex justify-between items-center mb-6 ml-[60px] mr-[40px]">
          <div className="text-start">
            <h1
              className="fs-4 mb-1"
              style={{
                color: "#6f7071",
                fontSize: "19.76px",
                fontWeight: "700",
                fontStyle: "normal",
              }}
            >
              Book Consult at{" "}
              <span className="hospital_name_span">The HealCraft</span>
            </h1>
            <p
              className="m-0 fs-6"
              style={{
                color: "#535353",
                fontSize: "15.2px",
                fontWeight: "400",
                fontStyle: "normal",
              }}
            >
              Consult with top doctors across specialities
            </p>
          </div>

          <div
            className="relative"
            style={{ width: "426.913px", height: "46.75px" }}
          >
            <img
              src="/icons/mhc-search-icon.074d19d94486a69e24c5.svg"
              alt="search"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search Specialities, Doctors"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                height: "46.75px",
                padding: "5.7px 8.36px 5.7px 36px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                color: "rgb(111, 112, 113)",
                fontSize: "15.2px",
                outline: "none",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Department Cards */}
        <div className="flex flex-wrap gap-10 overflow-hidden mt-6 ml-[60px]">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept, index) => {
              const rawName = dept.name || `Department ${index + 1}`;
              const name = toTitleCase(rawName);
              const iconSrc = departmentIconMap[name];

              return (
                <button
                  key={dept.id || index}
                  onClick={() => handleDepartmentClick(dept)}
                  className="bg-gray-100 w-[300px] h-[134px] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center justify-center text-center"
                >
                  {iconSrc ? (
                    <img
                      src={iconSrc}
                      alt={name}
                      className="w-12 h-12 mb-2 object-contain"
                    />
                  ) : (
                    <i className="bi bi-building text-3xl text-gray-600 mb-2"></i>
                  )}
                  <h3 className="text-lg font-medium text-gray-800">{name}</h3>
                </button>
              );
            })
          ) : (
            <p className="text-gray-600 ml-2">No departments found.</p>
          )}
        </div>
      </div>

      <style>{`
        .hospital_name_span {
          color: #e3556a;
          display: inline-block;
          padding: 2px 4px 1px;
          position: relative;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .form-control:focus {
          border-color: #e3556a;
          box-shadow: 0 0 5px #e3556a;
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default DepartmentSelection;
