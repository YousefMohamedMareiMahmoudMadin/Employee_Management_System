import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '', email: '', employeeId: '', dob: '',
    gender: '', maritalStatus: '', designation: '',
    department: '', salary: '', password: '', role: '', image: null
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/departments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) setDepartments(response.data.departments);
      } catch (error) {
        Swal.fire('Error', 'Failed to pull infrastructure departments.', 'error');
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/employees/add', data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Success', text: 'Employee profile registered successfully.', timer: 1500, showConfirmButton: false });
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Registration loop failed', 'error');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-800">Add New Employee</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" name="name" onChange={handleChange} placeholder="Insert Name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Corporate Email</label>
              <input type="email" name="email" onChange={handleChange} placeholder="Insert Email" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Employee ID</label>
              <input type="text" name="employeeId" onChange={handleChange} placeholder="Employee ID" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Date of Birth</label>
              <input type="date" name="dob" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Gender</label>
              <select name="gender" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Marital Status</label>
              <select name="maritalStatus" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white" required>
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Designation</label>
              <input type="text" name="designation" onChange={handleChange} placeholder="Designation" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Assigned Department</label>
              <select name="department" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white" required>
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Base Salary</label>
              <input type="number" name="salary" onChange={handleChange} placeholder="Salary" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Account Password</label>
              <input type="password" name="password" onChange={handleChange} placeholder="******" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Role</label>
              <select name="role" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white" required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Upload Profile Image</label>
              <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-50">
            <button type="button" onClick={() => navigate('/admin-dashboard/employees')} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all text-sm">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;