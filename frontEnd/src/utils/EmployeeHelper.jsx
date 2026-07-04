import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const columns = [
  {
    name: 'S No',
    selector: row => row.sno,
    width: '80px',
    sortable: true,
    center: true,
  },
  {
    name: 'Image',
    selector: row => row.image,
    width: '90px',
    center: true,
  },
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    center: true,
  },
  {
    name: 'DOB',
    selector: row => row.dob,
    sortable: true,
    center: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
    center: true,
  },
  {
    name: 'Action',
    cell: row => row.Action,
    ignoreRowClick: true,
    allowOverflow: true,
    button: false,
    width: '320px',
    center: true,
  },
];

export const EmployeeButtons = ({ _id, navigate, onDeleteSuccess }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will terminate the employee file from infrastructure!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#475569',
      confirmButtonText: 'Yes, delete file'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem('token');
          const response = await axios.delete(`http://localhost:5000/api/employees/${_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.success) {
            Swal.fire('Deleted!', 'Employee node purged successfully.', 'success');
            onDeleteSuccess();
          }
        } catch (error) {
          Swal.fire('Error!', error.response?.data?.error || 'Purge failed', 'error');
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center space-x-1.5 w-full">
      <button 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm"
        onClick={() => navigate(`/admin-dashboard/employees/view/${_id}`)}
      >
        View
      </button>
      <button 
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
      >
        Edit
      </button>
      <button 
        className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}
      >
        Salary
      </button>
      <button 
        className="bg-rose-500 hover:bg-rose-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm"
        onClick={() => navigate(`/admin-dashboard/employees/vacancies/${_id}`)}
      >
        Vacancies
      </button>
    </div>
  );
};