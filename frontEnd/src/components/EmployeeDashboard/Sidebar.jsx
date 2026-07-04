import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FaTachometerAlt, FaUser, FaCalendarMinus, FaMoneyBillWave, FaCogs } from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useAuth();
  const linkStyle = ({ isActive }) => 
    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-semibold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <div className="w-64 h-screen bg-gray-950 text-white flex flex-col justify-between border-r border-gray-900 fixed left-0 top-0 z-50">
      <div>
        <div className="h-20 flex items-center px-6 border-b border-gray-900">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white"><FaUser className="text-lg" /></div>
            <div>
              <h3 className="text-base font-bold tracking-wide text-white">Employee</h3>
            </div>
          </div>
        </div>
        <nav className="mt-6 px-4 space-y-1.5">
          <NavLink to="/employee-dashboard" className={linkStyle} end><FaTachometerAlt className="text-lg" /> <span>Dashboard</span></NavLink>
          <NavLink to={`/employee-dashboard/profile/${user?._id}`} className={linkStyle}><FaUser className="text-lg" /> <span>My Profile</span></NavLink>
          <NavLink to="/employee-dashboard/vacancies" className={linkStyle}><FaCalendarMinus className="text-lg" /> <span>Vacancies</span></NavLink>
          <NavLink to={`/employee-dashboard/salary/${user?._id}`} className={linkStyle}><FaMoneyBillWave className="text-lg" /> <span>My Salary</span></NavLink>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-900">
        <NavLink to="/employee-dashboard/setting" className={linkStyle}><FaCogs className="text-lg group-hover:rotate-45 transition-transform duration-300" /> <span>Settings</span></NavLink>
      </div>
    </div>
  );
};

export default Sidebar;