import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserTie, FaArrowLeft, FaEnvelope, FaIdCard, FaCalendarAlt, FaVenusMars, FaHeart, FaBriefcase, FaBuilding, FaWallet } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to retrieve employee identity payload.', 'error');
        navigate('/admin-dashboard/employees');
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeeDetails();
  }, [id, navigate]);

  if (loading) {
    return <div className="text-center p-12 text-slate-500 font-semibold animate-pulse">Decrypting Identity Nodes...</div>;
  }

  if (!employee) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/admin-dashboard/employees')}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-sm"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Employees</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="p-8 relative pt-16">
          <div className="absolute -top-16 left-8">
            {employee.image ? (
              <img 
                src={`http://localhost:5000/${employee.image}`} 
                alt={employee.userId?.name} 
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                onError={(e) => { e.target.src = ''; e.target.className = 'hidden'; }}
              />
            ) : (
              <div className="w-28 h-28 rounded-2xl bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-slate-400 text-4xl">
                <FaUserTie />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-800">{employee.userId?.name}</h2>
            <p className="text-sm font-semibold text-blue-600">{employee.designation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 mt-8 border-t border-slate-50">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Credentials</h4>
              <div className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaEnvelope className="text-slate-400 text-base" />
                <span className="font-medium">{employee.userId?.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaIdCard className="text-slate-400 text-base" />
                <span className="font-medium">ID: {employee.employeeId}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Corporate Deployment</h4>
              <div className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaBuilding className="text-slate-400 text-base" />
                <span className="font-medium">Dept: {employee.department?.name || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaWallet className="text-slate-400 text-base" />
                <span className="font-bold text-slate-800">${employee.salary?.toLocaleString()} / month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-center">
              <FaCalendarAlt className="text-slate-400 mx-auto mb-1 text-base" />
              <p className="text-xs text-slate-400 font-medium">Date of Birth</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{new Date(employee.dob).toLocaleDateString()}</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-center">
              <FaVenusMars className="text-slate-400 mx-auto mb-1 text-base" />
              <p className="text-xs text-slate-400 font-medium">Gender</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5 capitalize">{employee.gender}</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-center">
              <FaHeart className="text-slate-400 mx-auto mb-1 text-base" />
              <p className="text-xs text-slate-400 font-medium">Marital Status</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5 capitalize">{employee.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;