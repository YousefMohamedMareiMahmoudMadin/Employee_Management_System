import React, { useState, useEffect } from 'react';
import { FaBuilding, FaUsers, FaCalendarAlt, FaMoneyBillWave, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

const AdminOverview = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setSummary(response.data);
          setError(false);
        }
      } catch (err) {
        console.error("Failed to load dashboard data.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const cardStyle = "bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-500 font-semibold animate-pulse text-sm">Loading system summary.</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-sm font-medium">
          Failed to connect to the server. Please ensure the backend service is running correctly.
        </div>
      </div>
    );
  }

  const checkNoData = 
    summary.totalEmployees === 0 && 
    summary.totalDepartments === 0 && 
    summary.totalSalary === 0;

  if (checkNoData) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Dashboard</h1>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-12 text-center shadow-sm">
          <div className="bg-slate-50 p-4 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <FaBuilding className="text-xl" />
          </div>
          <h3 className="text-base font-bold text-slate-700">No Records Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            The database is currently empty. Add departments and register employee accounts to see metrics here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Summary</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cardStyle}>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Employees</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{summary.totalEmployees}</h3>
          </div>
          <div className="bg-blue-50 text-blue-600 p-4 rounded-xl"><FaUsers className="text-xl" /></div>
        </div>

        <div className={cardStyle}>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Departments</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{summary.totalDepartments}</h3>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl"><FaBuilding className="text-xl" /></div>
        </div>

        <div className={cardStyle}>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Payroll</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">${summary.totalSalary.toLocaleString()}</h3>
          </div>
          <div className="bg-amber-50 text-amber-600 p-4 rounded-xl"><FaMoneyBillWave className="text-xl" /></div>
        </div>
      </div>

    
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-700">Vacancy Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={cardStyle}>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Staff Applied</p>
              <h4 className="text-xl font-bold text-slate-800 mt-0.5">{summary.vacancySummary?.appliedCount}</h4>
            </div>
            <div className="bg-slate-50 text-slate-500 p-3 rounded-xl"><FaCalendarAlt className="text-base" /></div>
          </div>
          
          <div className={cardStyle}>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Requests</p>
              <h4 className="text-xl font-bold text-slate-800 mt-0.5">{summary.vacancySummary?.pending}</h4>
            </div>
            <div className="bg-amber-50 text-amber-600 p-3 rounded-xl"><FaHourglassHalf className="text-base" /></div>
          </div>

          <div className={cardStyle}>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved Requests</p>
              <h4 className="text-xl font-bold text-slate-800 mt-0.5">{summary.vacancySummary?.approved}</h4>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl"><FaCheckCircle className="text-base" /></div>
          </div>

          <div className={cardStyle}>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rejected Requests</p>
              <h4 className="text-xl font-bold text-slate-800 mt-0.5">{summary.vacancySummary?.rejected}</h4>
            </div>
            <div className="bg-rose-50 text-rose-700 p-3 rounded-xl"><FaTimesCircle className="text-base" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;