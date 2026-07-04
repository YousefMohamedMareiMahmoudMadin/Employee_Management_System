import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import { useAuth } from '../context/authContext'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuth()
  
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard