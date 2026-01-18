import React from "react";
import { Link } from "react-router-dom";
import DepartmentButtons from "../../utiles/DepartmentHelper.jsx";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns } from "../../utiles/DepartmentHelper.jsx";
import { useEffect } from "react";
import { useState } from "react";

const DepartmentList = () => {
    const [departments,setDepartments] = useState([]); 
    const [depLoading , setDepLoading] = useState(false)
     const onDepDelete = async (id) =>{
        const data = departments.filter(dep => dep._id !== id );
        setDepartments(data);
    }
    useEffect (()=>{
        const fetchDepartments = async () =>{
            setDepLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/department",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if(response.data.success){
                    let sno = 1;
                    const data = await response.data.departments.map((dep)=>(
                        {
                            _id :dep._id,
                            sno : sno++,
                            dep_name : dep.dep_name,
                            action :(<DepartmentButtons _id={dep._id} onDepDelete = {onDepDelete}/>)

                        }

                    ))
                    setDepartments(data);
                }


                
            } catch (error) {
                if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
            
                
            }
            finally {setDepLoading(false);
            }
        }
        fetchDepartments();
    },[]);

   


  return (
    <> {depLoading ? <div>Loading...</div>:
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">
          Manage Departments
        </h3>
        <p className="text-gray-400 text-sm">
          View, search, and manage all departments
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by department name"
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Add Department Button */}
        <Link
          to="/admin-dashboard/add-department"
          className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          + Add New Department
        </Link>
      </div>

      {/* Table Placeholder */}
      <div className="bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-gray-400 text-center">
          Department list will appear here
        </p>
      </div>
      {/* Department Table */}
<div className="bg-gray-800 rounded-xl shadow-md p-4">
  <DataTable
    columns={columns}
    data={departments}
    pagination
    responsive
    highlightOnHover
    progressPending={depLoading}
    customStyles={{
      table: {
        style: {
          backgroundColor: "transparent",
        },
      },
      headRow: {
        style: {
          backgroundColor: "#1f2937", // gray-800
          borderBottom: "1px solid #374151",
        },
      },
      headCells: {
        style: {
          color: "#e5e7eb",
          fontSize: "13px",
          fontWeight: "600",
          textTransform: "uppercase",
        },
      },
      rows: {
        style: {
          backgroundColor: "#1f2937",
          color: "#d1d5db",
          borderBottom: "1px solid #374151",
          minHeight: "48px",
        },
        highlightOnHoverStyle: {
          backgroundColor: "#374151",
          color: "#ffffff",
          cursor: "pointer",
        },
      },
      pagination: {
        style: {
          backgroundColor: "#1f2937",
          color: "#9ca3af",
          borderTop: "1px solid #374151",
        },
      },
      noData: {
        style: {
          color: "#9ca3af",
          padding: "24px",
        },
      },
    }}
  />
</div>

    </div>
    }</>
  );
};

export default DepartmentList;
