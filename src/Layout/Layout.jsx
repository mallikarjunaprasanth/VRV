import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../components/Dashboard';
import UserManagement from '../components/UserManagement';
import RoleManagement from '../components/RoleManagement';
import Login from '../components/Login';
import Navbar from '../components/Navbar';

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
