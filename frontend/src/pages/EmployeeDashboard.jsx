import React from 'react'
import Sidebar from '../components/employeeDashboard/Sidebar.jsx';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';

const EmployeeDashboard = () => {
  return (
    <div className="flex">
      
          <Sidebar />
    
      
          <div className="ml-64 w-full">
        
             <Navbar />
    
        
              <main className="pt-16 p-6 bg-gray-900 min-h-screen">
                   <Outlet />
              </main>
          </div>
        </div>
  )
}

export default EmployeeDashboard