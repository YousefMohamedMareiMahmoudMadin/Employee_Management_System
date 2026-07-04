import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaFolderOpen } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';

const DepartmentList = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [filteredDepts, setFilteredDepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/departments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setDepartments(response.data.departments);
        setFilteredDepts(response.data.departments);
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Fetch Failed', text: 'Could not fetch departments from the server.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    const results = departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepts(results);
  }, [searchTerm, departments]);

  const CustomNoData = () => (
    <div className="flex flex-col items-center justify-center p-12 text-slate-400 bg-white w-full">
      <FaFolderOpen className="text-4xl mb-3 text-slate-300" />
      <p className="text-base font-semibold">No departments found</p>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Departments</h1>
        </div>
        <div>
          <Link 
            to="/admin-dashboard/add-department" 
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all duration-200"
          >
            <FaPlus className="text-xs" />
            <span>Add Department</span>
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
            placeholder="Search department name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm text-slate-800 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredDepts.map((dept, index) => ({
            ...dept,
            sno: index + 1,
            Action: (
              <DepartmentButtons 
                _id={dept._id} 
                navigate={navigate} 
                onDeleteSuccess={fetchDepartments} 
              />
            )
          }))}
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

export default DepartmentList;