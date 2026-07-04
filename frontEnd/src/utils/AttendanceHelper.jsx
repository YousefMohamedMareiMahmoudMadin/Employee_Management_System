import React from 'react';

export const columns = [
  { name: 'S No', selector: row => row.sno, width: '70px', center: true },
  { name: 'Emp ID', selector: row => row.employeeId, sortable: true, center: true },
  { name: 'Name', selector: row => row.name, sortable: true, center: true },
  { name: 'Department', selector: row => row.department, sortable: true, center: true },
  { name: 'Status Action', cell: row => row.Action, width: '380px', center: true }
];

export const AttendanceButtons = ({ employeeId, currentStatus, onStatusChange }) => {
  const getBtnClass = (btnType, activeColor) => {
    const isSelected = currentStatus === btnType;
    return `px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
      isSelected 
        ? `${activeColor} text-white shadow-sm font-black scale-105` 
        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
    }`;
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => onStatusChange(employeeId, 'Present')} className={getBtnClass('Present', 'bg-emerald-600 border-emerald-600')}>Present</button>
      <button onClick={() => onStatusChange(employeeId, 'Absent')} className={getBtnClass('Absent', 'bg-rose-500 border-rose-500')}>Absent</button>
      <button onClick={() => onStatusChange(employeeId, 'Sick')} className={getBtnClass('Sick', 'bg-amber-500 border-amber-500')}>Sick</button>
      <button onClick={() => onStatusChange(employeeId, 'Vacancy')} className={getBtnClass('Vacancy', 'bg-indigo-600 border-indigo-600')}>Vacancy</button>
    </div>
  );
};