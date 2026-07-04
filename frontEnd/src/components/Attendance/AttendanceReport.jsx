import React, { useState, useEffect } from 'react';
import { FaSearch, FaFolderOpen, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [dateFilter, setDateFilter] = useState('');
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReport = async (reset = false) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const currentSkip = reset ? 0 : skip;
      let url = `http://localhost:5000/api/attendance/report?limit=${limit}&skip=${currentSkip}`;
      if (dateFilter) url += `&date=${dateFilter}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        if (reset || currentSkip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport(prev => {
            const merged = { ...prev };
            Object.keys(response.data.groupData).forEach(date => {
              if (merged[date]) {
                merged[date] = [...merged[date], ...response.data.groupData[date]];
              } else {
                merged[date] = response.data.groupData[date];
              }
            });
            return merged;
          });
        }
      }
    } catch (error) {
      console.error("Failed to load attendance statement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(true);
  }, [dateFilter]);

  useEffect(() => {
    if (skip > 0) fetchReport(false);
  }, [skip]);

  const handleLoadMore = () => {
    setSkip(prev => prev + limit);
  };

  const getStatusBadge = (status) => {
    if (status === 'Present') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Absent') return 'bg-rose-50 text-rose-700 border-rose-200';
    if (status === 'Sick') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (status === 'Vacancy') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    return 'bg-slate-50 text-slate-500 border-slate-200';
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Attendance Logs Report</h1>
        <p className="text-sm text-slate-500 mt-1">Review and filter historical employee attendance records sheets.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center space-x-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Filter by Date</label>
          <input type="date" value={dateFilter} onChange={(e) => { setDateFilter(e.target.value); setSkip(0); }} className="px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm text-slate-700 focus:border-blue-500" />
        </div>
      </div>

      {loading && Object.keys(report).length === 0 ? (
        <div className="text-center p-12 text-slate-500 animate-pulse">Syncing logs...</div>
      ) : Object.keys(report).length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <FaFolderOpen className="text-4xl mx-auto mb-2 text-slate-200" />
          <p className="font-semibold text-slate-500">No logs matching this parameters query.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(report).map(dateKey => (
            <div key={dateKey} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-900 px-6 py-3.5 text-white font-bold text-sm tracking-wide flex items-center justify-between">
                <span>Date Sheet: {dateKey}</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-lg border border-slate-700 font-medium">Logs: {report[dateKey].length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">S No</th>
                      <th className="py-3 px-4">Emp ID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {report[dateKey].map((record, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{idx + 1}</td>
                        <td className="py-3 px-4 font-semibold text-slate-600">{record.employeeId}</td>
                        <td className="py-3 px-4">{record.name}</td>
                        <td className="py-3 px-4 text-slate-500">{record.department}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getStatusBadge(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="flex justify-center pt-2">
            <button onClick={handleLoadMore} className="inline-flex items-center space-x-2 border border-slate-200 hover:bg-slate-50 px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all text-slate-700">
              <FaArrowDown className="text-xs" /> <span>Load More Logs</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReport;