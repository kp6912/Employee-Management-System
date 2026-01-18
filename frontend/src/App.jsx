import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";

import PrivateRoutes from "./utiles/privateRoutes.jsx";
import RoleBaseRoutes from "./utiles/RoleBaseRoutes.jsx";

import AdminSummary from "./components/dashboard/AdminSummary.jsx";
import DepartmentList from "./components/department/DepartmentList.jsx";
import AddDepartment from "./components/department/AddDepartment.jsx";
import EditDep from "./components/department/EditDep.jsx";
import List from "./components/employee/List.jsx";
import Add from "./components/employee/Add.jsx";
import View from "./components/employee/View.jsx";
import Edit from "./components/employee/Edit.jsx";
import AddSalary from "./components/Salary/Add.jsx";
import ViewSalary from "./components/Salary/View.jsx";
import Summary from "./components/employeeDashboard/Summary.jsx";
import LeaveList from "./components/leave/List.jsx";
import AddLeave from "./components/leave/Add.jsx"
import Setting from "./components/employeeDashboard/Setting.jsx";
import Table from "./components/leave/Table.jsx"
import Detail from "./components/leave/Detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole="admin">
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDep />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employee" element={<Add />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="salary/add" element={<AddSalary />} />
          <Route path="employees/salary/:id" element={<ViewSalary />} />
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Detail />} />
          <Route path="/admin-dashboard/employees/leaves/:id" element={<LeaveList />} />
          <Route path="/admin-dashboard/setting" element={<Setting />} />
        </Route>

        {/* EMPLOYEE ROUTES */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole="employee">
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* 👇 DEFAULT EMPLOYEE PAGE */}
          <Route index element={<Summary />} />

          {/* 👇 EMPLOYEE PROFILE */}
          <Route path="profile/:id" element={<View />} />
          <Route path="leaves" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="setting" element={<Setting />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
