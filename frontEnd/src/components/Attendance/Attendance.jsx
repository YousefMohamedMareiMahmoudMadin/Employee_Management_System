import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FaSearch, FaFileInvoice } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { columns, AttendanceButtons } from '../../utils/AttendanceHelper';

const Attendance = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const targetDate = "2026-07-04"; 
  const displayDateStr = "Saturday, July 4, 2026";

  const fetchTodayAttendance = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/attendance?date=${targetDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setRecords(response.data.attendance);
        setFilteredRecords(response.data.attendance);
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to synchronize attendance ledger.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  useEffect(() => {
    const results = records.filter(rec =>
      rec.employeeId?.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.employeeId?.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(results);
  }, [searchTerm, records]);

  const handleStatusUpdate = async (employeeId, status) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/attendance/update/${employeeId}`, 
        { status, date: targetDate }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        fetchTodayAttendance(); 
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to submit status payload.', 'error');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Daily Attendance Sheet</h1>
          <p className="text-sm text-slate-500 mt-1">Mark sheets for today: <span className="font-bold text-slate-700 underline">{displayDateStr}</span></p>
        </div>
        <button onClick={() => navigate('/admin-dashboard/attendance-report')} className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm">
          <FaFileInvoice className="text-xs" /> <span>View Full Logs</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400"><FaSearch className="text-sm" /></span>
          <input type="text" placeholder="Search by ID or Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredRecords.map((rec, index) => ({
            sno: index + 1,
            employeeId: rec.employeeId?.employeeId || 'N/A',
            name: rec.employeeId?.userId?.name || 'N/A',
            department: rec.employeeId?.department?.name || 'N/A',
            Action: <AttendanceButtons employeeId={rec.employeeId?._id} currentStatus={rec.status} onStatusChange={handleStatusUpdate} />
          }))}
          pagination
          progressPending={loading}
          customStyles={{
            table: { style: { backgroundColor: '#ffffff' } },
            headRow: { style: { backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' } },
            headCells: { style: { fontSize: '13px', fontWeight: '700', color: '#334155' } },
            rows: { style: { fontSize: '13px', color: '#475569', paddingVertical: '10px' } },
          }}
        />
      </div>
    </div>
  );
};

export default Attendance;