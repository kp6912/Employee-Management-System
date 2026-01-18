import axios from "axios";
import { useNavigate } from "react-router-dom";
export const columns =[
    {
        name:"Sno",
        selector : (row)=>row.sno,
        width:"50px"
    },
    {
        name:"Name",
        selector : (row)=>row.name,
        sortable :true,
        width:"150px"
    },
    {
        name : "Image",
        selector : (row)=>row.profileImage,
        width:"150px"

    },
    {
        name : "Department",
        selector : (row)=>row.dep_name,
        width : "130px"

    },
    {
        name : "DOB",
        selector : (row)=>row.dob,
        sortable:true,
        width : "150px"

    },
    {
        name : "Action",
        selector : (row)=>row.action

    },

]
export const fetchDepartments = async () =>{
let departments;
            
            try {
                const response = await axios.get("http://localhost:5000/api/department",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if(response.data.success){
                  departments = response.data.departments
                    
                }


                
            } catch (error) {
                if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
            
                
            }
            return departments;
            
        }
export const fetchEmployees = async (id) =>{
let employees;
            
            try {
                const response = await axios.get(`http://localhost:5000/api/employee/department/:${id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if(response.data.success){
                  employees = response.data.employees
                    
                }


                
            } catch (error) {
                if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
            
                
            }
            return employees;
            
        }        

const EmplyoeeButtons = ({_id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      {/* Edit Button */}
      <button
        className="px-3 py-1 text-sm font-medium rounded-md 
                   bg-blue-600 text-white 
                   hover:bg-blue-700 transition"
                   onClick={()=> navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>

      {/* Delete Button */}
      <button
        className="px-3 py-1 text-sm font-medium rounded-md 
                   bg-red-600 text-white 
                   hover:bg-red-700 transition"
                   onClick={()=> navigate(`/admin-dashboard/employees/edit/${_id}`)}
                   
      >
        Edit
      </button>
      <button
        className="px-3 py-1 text-sm font-medium rounded-md 
                   bg-red-600 text-white 
                   hover:bg-red-700 transition"
                   onClick={()=>navigate(`/admin-dashboard/employees/salary/${_id}`)}
                   
      >
        Salary
      </button>
      <button
        className="px-3 py-1 text-sm font-medium rounded-md 
                   bg-red-600 text-white 
                   hover:bg-red-700 transition"
                   onClick={()=>navigate(`/admin-dashboard/employees/leaves/${_id}`)}
                   
                   
      >
        Leave
      </button>
    </div>
  );
};

export default EmplyoeeButtons;

        
        