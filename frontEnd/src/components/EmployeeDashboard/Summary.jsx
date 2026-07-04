import React from 'react';
import { useAuth } from '../../context/authContext';
import { FaUser, FaBuilding, FaIdCard, FaWallet } from 'react-icons/fa';

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 rounded-2xl overflow-hidden shadow-md p-8 md:p-10 border border-slate-800">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Employee Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome , {user?.name || 'Employee'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <FaIdCard className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Status</p>
            <p className="text-base font-bold text-slate-800 mt-0.5">Active</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <FaBuilding className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department Assignment</p>
            <p className="text-base font-bold text-slate-800 mt-0.5">Assigned</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm flex items-center space-x-4 sm:col-span-2 lg:col-span-1">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <FaWallet className="text-lg" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payroll Status</p>
            <p className="text-base font-bold text-slate-800 mt-0.5">Up to Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;