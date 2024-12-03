import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../components/Dashboard';
import UserManagement from '../components/UserManagement/UserManagement';
import Login from '../components/Auth/Login';
import Navbar from '../components/Navbar';
import RoleManagement from '../components/Permission/RoleManagement';
import Settings from '../components/Settings/Settings';
import Reports from '../components/Reports/Reports';
import Products from '../components/Products/Products';

const ProtectedLayout = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <Navbar />
    <div className="mt-10">
    <Routes >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/roles" element={<RoleManagement />} />
      <Route path="/products" element={<Products />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/" element={<Navigate to="/dashboard"  />} />
    </Routes>
    </div>
   
    </>
  );
};

export const Layout = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  );
}
