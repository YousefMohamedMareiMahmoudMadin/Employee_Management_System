import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/EmployeeDashboard/Sidebar'; 
import Navbar from '../components/dashboard/Navbar'; 

const EmployeeDashboard = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
  
      <Sidebar />

      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
     
        <Navbar />

        
        <main className="flex-1 bg-slate-50/50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;