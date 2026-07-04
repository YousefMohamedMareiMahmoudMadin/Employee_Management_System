import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', designation: '', department: '', salary: '', maritalStatus: '', image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const [deptResponse, empResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/departments', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`http://localhost:5000/api/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (deptResponse.data.success) setDepartments(deptResponse.data.departments);
        if (empResponse.data.success) {
          const emp = empResponse.data.employee;
          setFormData({
            name: emp.userId?.name || '',
            designation: emp.designation || '',
            department: emp.department?._id || '',
            salary: emp.salary || '',
            maritalStatus: emp.maritalStatus || '',
            image: null
          });
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch required data pipelines.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/employees/${id}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Employee profile modified securely.', timer: 1500, showConfirmButton: false });
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Modification transmission crashed.', 'error');
    }
  };

  if (loading) {
    return <div className="text-center p-12 text-slate-500 font-semibold animate-pulse"></div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-800">Edit Employee</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-800" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Designation</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-800" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Department Node</label>
              <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-800" required>
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept._id} value={dept._id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Base Salary ($)</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-800" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Marital Status</label>
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-slate-800" required>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Update Avatar Photo (Optional)</label>
            <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-50">
            <button type="button" onClick={() => navigate('/admin-dashboard/employees')} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all text-sm">Save Profiles</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;