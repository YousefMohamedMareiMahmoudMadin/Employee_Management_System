import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminList = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchAllVacancies = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/vacancy', { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setVacancies(response.data.vacancies);
        setFilteredVacancies(response.data.vacancies);
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to pull vacancy nodes.', 'error');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAllVacancies(); }, []);

  useEffect(() => {
    if (filterStatus === 'All') setFilteredVacancies(vacancies);
    else setFilteredVacancies(vacancies.filter(v => v.status === filterStatus));
  }, [filterStatus, vacancies]);

  const columns = [
    { name: 'Emp ID', selector: row => row.employeeId?.employeeId || 'N/A', sortable: true, center: true },
    { name: 'Name', selector: row => row.employeeId?.userId?.name || 'N/A', sortable: true, center: true },
    { name: 'Department', selector: row => row.employeeId?.department?.name || 'N/A', sortable: true, center: true },
    { name: 'Type', selector: row => row.vacancyType, sortable: true, center: true },
    { name: 'Status', cell: row => <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${row.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : row.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{row.status}</span>, center: true },
    { name: 'Action', cell: row => <button onClick={() => navigate(`/admin-dashboard/vacancies/detail/${row._id}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-sm transition-all">View & Action</button>, center: true }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manage Vacancy Requests</h1><p className="text-sm text-slate-500 mt-1">Review structural staff absence payloads.</p></div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button key={status} onClick={() => setFilterStatus(status)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === status ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>{status}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable columns={columns} data={filteredVacancies} pagination progressPending={loading} customStyles={{ table: { style: { backgroundColor: '#ffffff' } }, headRow: { style: { backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' } }, headCells: { style: { fontSize: '13px', fontWeight: '700', color: '#334155' } }, rows: { style: { fontSize: '13px', color: '#475569', paddingVertical: '12px' } } }} />
      </div>
    </div>
  );
};

export default AdminList;