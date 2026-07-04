import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaCogs, 
  FaClipboardList, 
  FaFileInvoice 
} from 'react-icons/fa';

const AdminSidebar = () => {
  const linkStyle = ({ isActive }) => 
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-semibold' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between border-r border-gray-800 fixed left-0 top-0">
      <div>
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <FaBuilding className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide text-white">Admin Portal</h3>
              <p className="text-xs text-gray-500 font-medium">Management System</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          <NavLink to="/admin-dashboard" className={linkStyle} end>
            <FaTachometerAlt className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="departments" className={linkStyle}>
            <FaBuilding className="text-lg" />
            <span>Department</span>
          </NavLink>

          <NavLink to="employees" className={linkStyle}>
            <FaUsers className="text-lg" />
            <span>Employee</span>
          </NavLink>

         

          <NavLink to="vacancies" className={linkStyle}>
            <FaCalendarAlt className="text-lg" />
            <span>Vacancies</span>
          </NavLink>
          
          <NavLink to="attendance" className={linkStyle}>
            <FaClipboardList className="text-lg" />
            <span>Attendance</span>
          </NavLink>

          <NavLink to="attendance-report" className={linkStyle}>
            <FaFileInvoice className="text-lg" />
            <span>Attendance Report</span>
          </NavLink>
          
          <NavLink to="salary" className={linkStyle}>
            <FaMoneyBillWave className="text-lg" />
            <span>Salary</span>
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <NavLink to="settings" className={linkStyle}>
          <FaCogs className="text-lg group-hover:rotate-45 transition-transform duration-300" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;