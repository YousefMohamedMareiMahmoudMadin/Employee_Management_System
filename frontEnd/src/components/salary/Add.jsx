import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Add = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [formData, setFormData] = useState({
    employeeId: '', basicSalary: '', allowances: '', deductions: '', payDate: ''
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
        Swal.fire('Error', 'Failed to load department architecture.', 'error');
      }
    };
    fetchDepartments();
  }, []);

 
  useEffect(() => {
    if (!selectedDept) {
      setEmployees([]);
      return;
    }
    const fetchDeptEmployees = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/employees`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          const filtered = response.data.employees.filter(emp => emp.department?._id === selectedDept);
          setEmployees(filtered);
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to synchronize department staff.', 'error');
      }
    };
    fetchDeptEmployees();
  }, [selectedDept]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/salary/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Disbursed!', text: 'Salary allocated successfully.', timer: 1500, showConfirmButton: false });
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.error || 'Payroll transaction aborted.', 'error');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-800">Add New Salary Payroll</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Filter Department</label>
              <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm bg-white text-slate-800" required>
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept._id} value={dept._id}>{dept.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Target Employee</label>
              <select name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm bg-white text-slate-800" required>
                <option value="">Select Employee</option>
                {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name} ({emp.employeeId})</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Basic Salary ($)</label>
              <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} placeholder="Basic Salary Base" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Allowances ($)</label>
              <input type="number" name="allowances" value={formData.allowances} onChange={handleChange} placeholder="Monthly Allowances" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Deductions ($)</label>
              <input type="number" name="deductions" value={formData.deductions} onChange={handleChange} placeholder="Tax / Deductions" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Pay Date</label>
              <input type="date" name="payDate" value={formData.payDate} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" required />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-50">
            <button type="button" onClick={() => navigate('/admin-dashboard/employees')} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 text-sm">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md text-sm">Add Salary</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;