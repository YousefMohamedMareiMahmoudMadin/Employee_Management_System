import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FaPlus, FaCalendarMinus } from 'react-icons/fa';
import axios from 'axios';

const List = () => {
  const { user } = useAuth();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/vacancy/${user?._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) setVacancies(response.data.vacancies);
      } catch (error) {
        console.error("Failed to sync structural leaves ledger.");
      } finally { setLoading(false); }
    };
    if (user?._id) fetchVacancies();
  }, [user]);

  if (loading) return <div className="text-center p-12 text-slate-500 font-semibold animate-pulse">Synchronizing Vacancy Ledger Logs...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Vacancies</h1><p className="text-sm text-slate-500 mt-1">Monitor status auditing of requested absolute leave payloads.</p></div>
        <Link to="/employee-dashboard/vacancies/add" className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all"><FaPlus className="text-xs" /> <span>Request Vacancy</span></Link>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {vacancies.length === 0 ? (
          <div className="p-12 text-center text-slate-400"><FaCalendarMinus className="text-4xl mx-auto mb-2 text-slate-200" /><p className="font-semibold">No vacancies deployed yet.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr><th className="py-3.5 px-4">S No</th><th className="py-3.5 px-4">Vacancy Type</th><th className="py-3.5 px-4">Start Date</th><th className="py-3.5 px-4">End Date</th><th className="py-3.5 px-4">Reason</th><th className="py-3.5 px-4">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {vacancies.map((item, index) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium">{index + 1}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{item.vacancyType}</td>
                    <td className="py-3.5 px-4 text-slate-500">{new Date(item.startDate).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 text-slate-500">{new Date(item.endDate).toLocaleDateString()}</td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">{item.reason}</td>
                    <td className="py-3.5 px-4"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : item.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;