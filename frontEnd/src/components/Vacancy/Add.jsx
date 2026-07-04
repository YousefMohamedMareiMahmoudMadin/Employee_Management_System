import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const Add = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({ vacancyType: '', startDate: '', endDate: '', reason: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      
      const payload = {
        userId: user._id,
        vacancyType: formData.vacancyType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      };

      const response = await axios.post('http://localhost:5000/api/vacancy/add', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Submitted!', text: 'Vacancy request logged successfully.', timer: 1500, showConfirmButton: false });
        navigate('/employee-dashboard/vacancies');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Failed to submit request.', 'error');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-800">Request New Vacancy</h3>
          <p className="text-sm text-slate-500 mt-1">Submit an absence request for management review.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Vacancy Type</label>
            <select name="vacancyType" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm bg-white text-slate-800" required>
              <option value="">Select Type</option>
              
              <option value="Sick vacancy">Sick Vacancy</option>
              <option value="Casual vacancy">Casual Vacancy</option>
              <option value="Annual vacancy">Annual Vacancy</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Start Date</label>
              <input type="date" name="startDate" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">End Date</label>
              <input type="date" name="endDate" onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Detailed Reason</label>
            <textarea name="reason" onChange={handleChange} placeholder="Provide details regarding your requested absence..." rows="4" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800 resize-none" required></textarea>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-50">
            <button type="button" onClick={() => navigate('/employee-dashboard/vacancies')} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 text-sm">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md text-sm">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;