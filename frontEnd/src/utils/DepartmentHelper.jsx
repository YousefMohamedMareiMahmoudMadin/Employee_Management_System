import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const columns = [
  {
    name: 'S No',
    selector: row => row.sno,
    width: '100px',
    sortable: true,
    center: true, 
    style: {
      justifyContent: 'center', 
    }
  },
  {
    name: 'Department Name',
    selector: row => row.name,
    sortable: true,
    center: true, 
    style: {
      justifyContent: 'center', 
    }
  },
  {
    name: 'Action',
    cell: row => row.Action,
    ignoreRowClick: true,
    allowOverflow: true,
    button: false,
    width: '200px',
    center: true, 
    style: {
      justifyContent: 'center', 
    }
  },
];

export const DepartmentButtons = ({ _id, navigate, onDeleteSuccess }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this department!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem('token');
          const response = await axios.delete(`http://localhost:5000/api/departments/${_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.success) {
            Swal.fire('Deleted!', 'Department has been deleted.', 'success');
            onDeleteSuccess();
          }
        } catch (error) {
          Swal.fire('Error!', error.response?.data?.error || 'Failed to delete', 'error');
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center space-x-2 w-full">
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200"
        onClick={() => navigate(`/admin-dashboard/edit-department/${_id}`)}
      >
        Edit
      </button>
      <button 
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};