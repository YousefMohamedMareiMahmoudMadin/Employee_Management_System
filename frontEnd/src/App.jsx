import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login.jsx'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import ProtectedRoute from './utils/ProtectedRoute.jsx' 
import AdminOverview from './components/dashboard/AdminOverview.jsx'
import DepartmentList from './components/Department/DepartmentList.jsx'
import AddDepartment from './components/Department/AddDepartment.jsx'
import EditDepartments from './components/Department/EditDepartments.jsx'
import EmployeeList from './components/Employee/List.jsx'
import AddEmployee from './components/Employee/Add.jsx'
import ViewEmployee from './components/Employee/View.jsx'
import EditEmployee from './components/Employee/Edit.jsx'
import AddSalary from './components/Salary/Add.jsx'
import ViewSalary from './components/Salary/View.jsx'
import EmployeeSummary from './components/EmployeeDashboard/Summary.jsx'
import EmployeeSetting from './components/EmployeeDashboard/Setting.jsx'
import VacancyList from './components/Vacancy/List.jsx' 
import AddVacancy from './components/Vacancy/Add.jsx'   
import AdminVacancyList from './components/Vacancy/AdminList.jsx' 
import VacancyDetail from './components/Vacancy/Detail.jsx'       
import Attendance from './components/Attendance/Attendance.jsx'             
import AttendanceReport from './components/Attendance/AttendanceReport.jsx' 
import './App.css'

const DummyComponent = ({ title }) => <div className="p-6"><h1 className="text-xl font-bold">{title}</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        
        
        <Route 
          path='/admin-dashboard' 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<AdminOverview />} />
          <Route path='employees' element={<EmployeeList />} />
          <Route path='add-employee' element={<AddEmployee />} />
          <Route path='employees/view/:id' element={<ViewEmployee />} />
          <Route path='employees/edit/:id' element={<EditEmployee />} />
          <Route path='employees/salary/:id' element={<ViewSalary />} />
          <Route path='employees/vacancies/:id' element={<DummyComponent title="Employee Vacancies Node" />} />
          <Route path='departments' element={<DepartmentList />} />
          <Route path='add-department' element={<AddDepartment />} />
          <Route path='edit-department/:id' element={<EditDepartments />} />
          <Route path='vacancies' element={<AdminVacancyList />} />
          <Route path='vacancies/detail/:id' element={<VacancyDetail />} />
          
          
          <Route path='attendance' element={<Attendance />} />
          <Route path='attendance-report' element={<AttendanceReport />} />
          
          <Route path='salary' element={<AddSalary />} />
          <Route path='settings' element={<DummyComponent title="Settings Engine" />} />
        </Route>

        
        <Route 
          path='/employee-dashboard' 
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<EmployeeSummary />} /> 
          <Route path='profile/:id' element={<ViewEmployee />} /> 
          <Route path='salary/:id' element={<ViewSalary />} /> 
          <Route path='vacancies' element={<VacancyList />} />
          <Route path='vacancies/add' element={<AddVacancy />} />
          <Route path='setting' element={<EmployeeSetting />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;