import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaWallet, FaHistory } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const View = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) setHistory(response.data.history);
      } catch (error) {
        Swal.fire('Error', 'Failed to load historical payroll logging.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [id]);

  if (loading) {
    return <div className="text-center p-12 text-slate-500 font-semibold animate-pulse">Analyzing Payroll Ledger...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/admin-dashboard/employees')} className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium text-sm">
          <FaArrowLeft className="text-xs" />
          <span>Back to Employees</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600"><FaHistory className="text-lg" /></div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Salary History</h3>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FaWallet className="text-4xl mx-auto mb-2 text-slate-200" />
            <p className="font-semibold">No payouts found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4">S No</th>
                  <th className="py-3.5 px-4">Emp ID</th>
                  <th className="py-3.5 px-4">Basic Salary</th>
                  <th className="py-3.5 px-4">Allowances</th>
                  <th className="py-3.5 px-4">Deductions</th>
                  <th className="py-3.5 px-4">Net Salary</th>
                  <th className="py-3.5 px-4">Pay Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {history.map((record, index) => (
                  <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium">{index + 1}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">{record.employeeId?.employeeId}</td>
                    <td className="py-3.5 px-4">${record.basicSalary?.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-emerald-600">+${record.allowances?.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-rose-600">-${record.deductions?.toLocaleString()}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">${record.netSalary?.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-slate-500">{new Date(record.payDate).toLocaleDateString()}</td>
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

export default View;