import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaUserTie } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';

const List = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmps, setFilteredEmps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        const mappedData = response.data.employees.map((emp, index) => ({
          _id: emp._id,
          sno: index + 1,
          image: emp.image ? (
  <img 
    src={`http://localhost:5000/${emp.image.replace(/\\/g, "/")}`} 
    alt={emp.userId?.name} 
    className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '';
      e.target.parentElement.innerHTML = '<div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="text-xl" height="1em" w="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480c-4.4 17.7-20.4 30-38.7 30h-16.7c-18.3 0-34.3-12.3-38.7-30l-47.8-191.4c-4.2-16.8 5.9-33.8 22.7-38.1l11.4-2.9c16.8-4.2 33.8 5.9 38.1 22.7L224 384l27.2-108.8c4.2-16.8 21.2-26.9 38.1-22.7l11.4 2.9c16.8 4.2 26.9 21.2 22.7 38.1z"></path></svg></div>';
    }}
  />
) : (
  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
    <FaUserTie className="text-xl" />
  </div>
),
          name: emp.userId?.name || 'N/A',
          dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : 'N/A',
          department: emp.department?.name || 'N/A',
          employeeId: emp.employeeId,
          Action: (
            <EmployeeButtons 
              _id={emp._id} 
              navigate={navigate} 
              onDeleteSuccess={fetchEmployees} 
            />
          ),
        }));
        setEmployees(mappedData);
        setFilteredEmps(mappedData);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Fetch Error', text: 'Could not synchronize employee records.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const results = employees.filter(emp =>
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmps(results);
  }, [searchTerm, employees]);

  const CustomNoData = () => (
    <div className="flex flex-col items-center justify-center p-12 text-slate-400 bg-white w-full">
      <FaUserTie className="text-4xl mb-3 text-slate-300 animate-pulse" />
      <p className="text-base font-semibold text-slate-700">No employees registered</p>
      <p className="text-xs text-slate-400 mt-1">Incorporate a new identity file inside the infrastructure node.</p>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manage Employees</h1>
          <p className="text-sm text-slate-500 mt-1">Audit, monitor, and filter operational staff identity payloads.</p>
        </div>
        <div>
          <Link 
            to="/admin-dashboard/add-employee" 
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm text-sm transition-all duration-200"
          >
            <FaPlus className="text-xs" />
            <span>Add New Employee</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <FaSearch className="text-sm" />
          </span>
          <input 
            type="text" 
            placeholder="Search by Employee ID or Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredEmps}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          progressPending={loading}
          noDataComponent={<CustomNoData />}
          customStyles={{
            table: { style: { backgroundColor: '#ffffff' } },
            headRow: { style: { backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' } },
            headCells: { style: { fontSize: '14px', fontWeight: '700', color: '#334155', justifyContent: 'center' } },
            rows: { style: { fontSize: '14px', color: '#475569', borderBottom: '1px solid #f1f5f9' } },
          }}
        />
      </div>
    </div>
  );
};

export default List;