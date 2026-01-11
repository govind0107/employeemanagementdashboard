import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Print Styles
const printStyles = `
  @page {
    size: A4;
    margin: 1cm;
  }
  
  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    body {
      margin: 0;
      padding: 0;
    }
    
    .print-header {
      display: block !important;
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #334155;
      padding-bottom: 15px;
    }
    
    .print-header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 900;
      color: #0f172a;
    }
    
    .print-header p {
      margin: 5px 0 0 0;
      font-size: 12px;
      color: #64748b;
    }
  }
`;

// Custom Dropdown Component
const CustomDropdown = ({ label, icon, options, value, onChange, color = "indigo", placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colorSchemes = {
    indigo: "bg-indigo-50 border-indigo-200 hover:border-indigo-400 focus:ring-indigo-200 text-indigo-600 bg-indigo-100 text-indigo-700",
    blue: "bg-blue-50 border-blue-200 hover:border-blue-400 focus:ring-blue-200 text-blue-600 bg-blue-100 text-blue-700",
    green: "bg-green-50 border-green-200 hover:border-green-400 focus:ring-green-200 text-green-600 bg-green-100 text-green-700",
  };

  const selectedOption = options.find(opt => opt.value === value);
  const colors = colorSchemes[color];

  return (
    <div ref={dropdownRef} className="relative w-full">
      {label && (
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full max-w-xs flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium whitespace-nowrap overflow-hidden ${
          isOpen
            ? `border-${color}-500 ring-2 ring-${color}-200 bg-white`
            : "border-slate-200 bg-slate-50 hover:border-" + color + "-400"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-xl flex-shrink-0">{selectedOption ? selectedOption.icon : icon}</span>
          <span className="text-slate-700 truncate text-sm">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className={`${options.length > 5 ? 'max-h-64 overflow-y-auto' : ''}`}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors flex items-center gap-3 border-b border-slate-100 last:border-b-0 ${
                  value === option.value ? colors : "text-slate-700"
                }`}
              >
                <span className="text-lg">{option.icon}</span>
                <span className={`font-medium ${value === option.value ? "font-bold" : ""}`}>
                  {option.label}
                </span>
                {value === option.value && (
                  <svg className="w-5 h-5 ml-auto text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGender, setFilterGender] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    empId: "",
    fullName: "",
    gender: "Male",
    dob: "",
    state: "",
    status: "Active",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, image: reader.result });
    if (file) reader.readAsDataURL(file);
  };

  const saveEmployee = (e) => {
    e.preventDefault();

    // REQUIREMENT: Check all required fields
    if (!formData.empId || !formData.fullName || !formData.dob || !formData.state) {
      showToast("Please fill in all required fields!");
      return;
    }

    // REQUIREMENT: Check for unique Employee ID
    const isDuplicate = employees.some(
      (emp) => emp.empId === formData.empId && emp.id !== editingId
    );
    if (isDuplicate) {
      showToast(`Employee ID ${formData.empId} already exists!`);
      return;
    }

    if (editingId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...formData, id: editingId } : emp
        )
      );
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee record? This action cannot be undone."
    );
    if (confirmDelete) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      empId: "",
      fullName: "",
      gender: "Male",
      dob: "",
      state: "",
      status: "Active",
      image: "",
    });
    setEditingId(null);
  };

  const filteredData = employees.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterGender === "All" || emp.gender === filterGender) &&
      (filterStatus === "All" || emp.status === filterStatus)
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] pb-20 relative">
      {/* Print Styles */}
      <style>{printStyles}</style>
      
      {/* REQUIREMENT: Unique ID Toast */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-[100] bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl font-bold animate-bounce">
          {toast.message}
        </div>
      )}

      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 no-print">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-2xl">
                <svg
                  className="w-10 h-10"
                  fill="white"
                  viewBox="0 0 32 32"
                >
                  <circle cx="6.5" cy="6" r="2.8"/>
                  <path d="M 4 10.5 L 4 15.5 Q 4 16.8 5.2 16.8 L 7.8 16.8 Q 9 16.8 9 15.5 L 9 10.5 Z" fill="white"/>
                  
                  <circle cx="16" cy="4" r="3.5"/>
                  <path d="M 12 10.5 L 12 19 Q 12 20.5 13.5 20.5 L 18.5 20.5 Q 20 20.5 20 19 L 20 10.5 Z" fill="white"/>
                  
                  <circle cx="25.5" cy="6" r="2.8"/>
                  <path d="M 23 10.5 L 23 15.5 Q 23 16.8 24.2 16.8 L 26.8 16.8 Q 28 16.8 28 15.5 L 28 10.5 Z" fill="white"/>
                  
                  <rect x="3.5" y="21" width="25" height="1.5" rx="0.75" fill="white" opacity="0.95"/>
                </svg>
              </div>
              <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Employee Management Dashboard
              </h1>
            <p className="text-slate-500 mt-1 text-sm font-medium">
              Manage your workforce data effectively
            </p>
            </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-red-600 font-bold border-2 border-slate-100 hover:border-red-100 hover:bg-red-50 rounded-xl transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 no-print">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
              Total Employees
            </p>
            <p className="text-4xl font-black text-slate-900">
              {employees.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-emerald-500 text-xs font-black uppercase tracking-widest">
              Active
            </p>
            <p className="text-4xl font-black text-slate-900">
              {employees.filter((e) => e.status === "Active").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-rose-500 text-xs font-black uppercase tracking-widest">
              Inactive
            </p>
            <p className="text-4xl font-black text-slate-900">
              {employees.filter((e) => e.status === "Inactive").length}
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 no-print items-stretch md:items-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-1 pl-4 pr-4 py-2.5 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* REQUIREMENT: Gender Filter */}
          <div className="w-56">
            <CustomDropdown
              icon="👥"
              options={[
                { value: "All", label: "All Genders", icon: "👥" },
                { value: "Male", label: "Male", icon: "♂️" },
                { value: "Female", label: "Female", icon: "♀️" },
                { value: "Other", label: "Other", icon: "👤" },
              ]}
              value={filterGender}
              onChange={setFilterGender}
              color="indigo"
            />
          </div>
          {/* REQUIREMENT: Status Filter */}
          <div className="w-56">
            <CustomDropdown
              icon="✅"
              options={[
                { value: "All", label: "All Status", icon: "📊" },
                { value: "Active", label: "Active", icon: "✅" },
                { value: "Inactive", label: "Inactive", icon: "⏸️" },
              ]}
              value={filterStatus}
              onChange={setFilterStatus}
              color="green"
            />
          </div>
          {/* REQUIREMENT: Add Employee */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg font-bold whitespace-nowrap"
          >
            + Add Employee
          </button>
          <button
            onClick={() => window.print()}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 font-bold whitespace-nowrap"
          >
            Print List
          </button>
        </div>

        {/* Print Header - Only visible on print */}
        <div className="print-header hidden">
          <h1>Employee List</h1>
          <p>Generated on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Table with all Columns */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-5 text-xs font-black uppercase text-slate-400 max-w-[100px]">
                  Emp ID
                </th>
                <th className="p-5 text-xs font-black uppercase text-slate-400">
                  Profile
                </th>
                <th className="p-5 text-xs font-black uppercase text-slate-400 max-w-[150px]">
                  Full Name
                </th>
                <th className="p-5 text-xs font-black uppercase text-slate-400">
                  Gender
                </th>
                <th className="p-5 text-xs font-black uppercase text-slate-400">
                  DOB
                </th>
                <th className="p-5 text-xs font-black uppercase text-slate-400">
                  State
                </th>
                <th className="p-5 text-xs font-black uppercase text-slate-400">
                  Status
                </th>
                <th className="p-5 text-xs font-black uppercase text-slate-400 no-print text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-5 font-bold text-slate-500 max-w-[100px] break-words">{emp.empId}</td>
                  <td className="p-5">
                    {emp.image ? (
                      <img
                        src={emp.image}
                        className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm object-cover"
                        alt="avatar"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 border-2 border-white shadow-sm">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="p-5 font-bold text-slate-900 max-w-[150px] break-words">
                    {emp.fullName}
                  </td>
                  <td className="p-5 text-slate-600">{emp.gender}</td>
                  <td className="p-5 text-slate-600">{emp.dob}</td>
                  <td className="p-5 text-slate-600">{emp.state}</td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        emp.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-5 space-x-4 no-print text-center">
                    <button
                      onClick={() => {
                        setFormData(emp);
                        setEditingId(emp.id);
                        setIsModalOpen(true);
                      }}
                      className="text-indigo-600 font-bold text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      className="text-rose-400 font-bold text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal with Image Preview and All Fields */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-lg p-8 animate-in zoom-in duration-200">
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              {editingId ? "Edit Employee" : "Add New Employee"}
            </h2>
            <form onSubmit={saveEmployee} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Employee ID"
                  className="w-full bg-slate-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  value={formData.empId}
                  onChange={(e) =>
                    setFormData({ ...formData, empId: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-slate-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* REQUIREMENT: Gender Dropdown */}
                <CustomDropdown
                  label="Gender"
                  icon="♂️"
                  options={[
                    { value: "Male", label: "Male", icon: "♂️" },
                    { value: "Female", label: "Female", icon: "♀️" },
                    { value: "Other", label: "Other", icon: "👤" },
                  ]}
                  value={formData.gender}
                  onChange={(val) => setFormData({ ...formData, gender: val })}
                  color="indigo"
                />
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">DOB</label>
                  <input
                    type="date"
                    max={today}
                    className="w-full bg-slate-50 rounded-2xl p-4 outline-none border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium text-slate-700 cursor-pointer"
                    required
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* REQUIREMENT: Indian State List */}
                <CustomDropdown
                  label="State"
                  icon="📍"
                  options={[
                    ...INDIAN_STATES.map(state => ({ value: state, label: state, icon: "📍" }))
                  ]}
                  value={formData.state}
                  onChange={(val) => setFormData({ ...formData, state: val })}
                  color="blue"
                  placeholder="Select a state"
                />
                <CustomDropdown
                  label="Status"
                  icon="✅"
                  options={[
                    { value: "Active", label: "Active", icon: "✅" },
                    { value: "Inactive", label: "Inactive", icon: "⏸️" },
                  ]}
                  value={formData.status}
                  onChange={(val) => setFormData({ ...formData, status: val })}
                  color="green"
                />
              </div>

              {/* Image Preview logic with fallback icon */}
              <div className="flex items-center gap-4 py-2 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border-2 border-indigo-200 flex items-center justify-center">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                  ) : (
                    <svg
                      className="w-8 h-8 text-indigo-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">
                    Profile Photo
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all"
                >
                  Cancel Entry
                </button>
                <button
                  type="submit"
                  className="px-10 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all"
                >
                  {editingId ? "Update Record" : "Save Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
