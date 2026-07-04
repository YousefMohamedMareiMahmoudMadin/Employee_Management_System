import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/vacancy', { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.success) {
          const target = response.data.vacancies.find(v => v._id === id);
          setVacancy(target);
        }
      } catch (error) { Swal.fire('Error', 'Failed to retrieve payload details.', 'error'); }
      finally { setLoading(false); }
    };
    fetchDetail();
  }, [id]);

  const handleAction = async (status) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.patch(`http://localhost:5000/api/vacancy/update/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: `Request ${status}!`, text: `Vacancy node updated.`, timer: 1500, showConfirmButton: false });
        navigate('/admin-dashboard/vacancies');
      }
    } catch (error) { Swal.fire('Error', 'Action deployment aborted.', 'error'); }
  };

  if (loading) return <div className="text-center p-12 text-slate-500 font-semibold animate-pulse">Decrypting Node Details...</div>;
  if (!vacancy) return <div className="text-center p-12 text-rose-500">Payload not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate('/admin-dashboard/vacancies')} className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium text-sm"><FaArrowLeft className="text-xs" /> <span>Back to Requests</span></button>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div><h2 className="text-xl font-bold text-slate-800">{vacancy.employeeId?.userId?.name}</h2><p className="text-xs font-semibold text-blue-600 mt-0.5">{vacancy.employeeId?.department?.name} • ID: {vacancy.employeeId?.employeeId}</p></div>
          <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${vacancy.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : vacancy.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{vacancy.status}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Type</p><p className="text-sm font-bold text-slate-700 mt-1">{vacancy.vacancyType}</p></div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Start Date</p><p className="text-sm font-bold text-slate-700 mt-1">{new Date(vacancy.startDate).toLocaleDateString()}</p></div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center"><p className="text-xs text-slate-400 font-bold uppercase tracking-wider">To Date</p><p className="text-sm font-bold text-slate-700 mt-1">{new Date(vacancy.endDate).toLocaleDateString()}</p></div>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100"><h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Statement Reason</h4><p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{vacancy.reason}</p></div>
        {vacancy.status === 'Pending' && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
            <button onClick={() => handleAction('Rejected')} className="inline-flex items-center space-x-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl font-semibold text-sm shadow-sm transition-all"><FaTimes className="text-xs" /> <span>Reject</span></button>
            <button onClick={() => handleAction('Approved')} className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm"><FaCheck className="text-xs" /> <span>Approve</span></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;