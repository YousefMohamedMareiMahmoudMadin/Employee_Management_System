import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditDepartments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/departments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setDepartment({
            name: response.data.department.name,
            description: response.data.department.description || ""
          });
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to retrieve department info.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchDepartmentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department.name.trim()) {
      Swal.fire('Warning', 'Department Name is required!', 'warning');
      return;
    }
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/departments/${id}`, department, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Department changes updated safely.', timer: 1500, showConfirmButton: false });
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Update process crashed', 'error');
    }
  };

  if (loading) {
    return <div className="text-center p-12 text-slate-500 font-semibold">Decrypting Node Payload...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">Edit Department Identity</h3>
          <p className="text-sm text-slate-500 mt-1">Alter naming schemes and metadata context safely.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Department Name</label>
            <input 
              type='text'
              name='name'
              value={department.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all duration-200 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Department Description</label>
            <textarea 
              name='description'
              value={department.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all duration-200 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
            ></textarea>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button 
              type='button' 
              onClick={() => navigate('/admin-dashboard/departments')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type='submit'
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartments;