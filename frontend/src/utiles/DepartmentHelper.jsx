import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns =[
    {
        name:"S.no.",
        selector : (row)=>row.sno
    },
    {
        name : "Department Name",
        selector : (row)=>row.dep_name

    },
    {
        name : "Action",
        selector : (row)=>row.action

    }

]
const DepartmentButtons = ({_id ,onDepDelete}) => {
  const navigate = useNavigate();
  const handleDelete = async (id)=>{
    const confirm = window.confirm("Do you want to Delete?");
    if(confirm){
      try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if(response.data.success){
                    onDepDelete(id);
                }


                
            } catch (error) {
                if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            } 
          }

  }}
  return (
    <div className="flex items-center gap-2">
      {/* Edit Button */}
      <button
        className="px-3 py-1 text-sm font-medium rounded-md 
                   bg-blue-600 text-white 
                   hover:bg-blue-700 transition"
                   onClick={()=> navigate(`/admin-dashboard/department/${_id}`)}
      >
        Edit
      </button>

      {/* Delete Button */}
      <button
        className="px-3 py-1 text-sm font-medium rounded-md 
                   bg-red-600 text-white 
                   hover:bg-red-700 transition"
                   onClick={()=>handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};

export default DepartmentButtons;
