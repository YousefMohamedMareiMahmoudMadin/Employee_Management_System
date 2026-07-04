import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!department.name.trim()) {
            Swal.fire({ icon: 'warning', title: 'Required Field', text: 'Department Name is required!' });
            return;
        }

        try {
            const token = sessionStorage.getItem('token'); 
            const response = await axios.post('http://localhost:5000/api/departments/add', department, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Created!',
                    text: 'Department added successfully.',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || "Failed to add department";
            Swal.fire({ icon: 'error', title: 'Error', text: errMsg });
        }
    };

  return (
    <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800">Add New Department</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Department Name</label>
                    <input 
                        type='text'
                        name='name'
                        value={department.name}
                        onChange={handleChange} 
                        placeholder='Like Human Resources'
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Department Description</label>
                    <textarea 
                        name='description'
                        value={department.description}
                        onChange={handleChange} 
                        placeholder='Enter department description.'
                        rows="4"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none transition-all duration-200 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                    ></textarea>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-2">
                    <button 
                        type='button' 
                        onClick={() => navigate('/admin-dashboard/departments')}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        type='submit'
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md shadow-blue-100 hover:shadow-lg transition-all text-sm"
                    >
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddDepartment;