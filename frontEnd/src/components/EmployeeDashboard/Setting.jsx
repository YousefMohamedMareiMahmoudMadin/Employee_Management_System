import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire('Warning', 'Confirm password does not match.', 'warning');
      return;
    }
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/setting/change-password', {
        userId: user._id, oldPassword: formData.oldPassword, newPassword: formData.newPassword
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Credentials changed. Please re-login.', timer: 2000, showConfirmButton: false });
        sessionStorage.clear();
        navigate('/login');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Security transmission aborted.', 'error');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-6 border-b border-slate-100 pb-4 text-center">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"><FaLock className="text-lg" /></div>
          <h3 className="text-xl font-bold text-slate-800">Security For Password</h3>
          <p className="text-xs text-slate-500 mt-1">Alter account password.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Old Password</label><input type="password" name="oldPassword" onChange={handleChange} placeholder="******" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" required /></div>
          <div><label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">New Password</label><input type="password" name="newPassword" onChange={handleChange} placeholder="******" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" required /></div>
          <div><label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Confirm New Password</label><input type="password" name="confirmPassword" onChange={handleChange} placeholder="******" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" required /></div>
          <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md text-sm transition-all mt-2">Deploy New Security Key</button>
        </form>
      </div>
    </div>
  );
};

export default Setting;