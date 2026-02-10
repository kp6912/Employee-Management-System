import React from 'react'
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';


const AdminDashboard = () => {
    
   
  return (
    <div className="flex">
  
      <AdminSidebar />

  
      <div className="ml-64 w-full">
    
         <Navbar />

    
          <main className="pt-16 p-6 bg-gray-900 min-h-screen">
               <Outlet />
          </main>
      </div>
    </div>

  )
}

export default AdminDashboard