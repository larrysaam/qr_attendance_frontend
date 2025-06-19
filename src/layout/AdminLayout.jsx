import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { UserList } from '../pages/userList';
import { Downloads } from '../pages/Downloads';
import AdminSidebar from './AdminSidebar'; // Import the AdminSidebar
import ProtectedRoute from '../components/ProtectedRoute'; // Import ProtectedRoute
import AdminLogin from '../pages/AdminLogin'; // Import AdminLogin

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Conditionally render AdminSidebar if not on login page and logged in */}
      {/* This logic might need refinement based on exact UX desired */}
      {/* For simplicity, we can check if the current path is not the login page */}
      {/* A more robust way would be to check auth status too, but ProtectedRoute handles access */}
      {window.location.pathname !== '/admin/login' && <AdminSidebar />}
      <div className="admin-content">
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}> {/* Wrap protected routes */}
            <Route path="userlist" element={<UserList />} />
            <Route path="downloads" element={<Downloads />} />
            {/* Add an index route for /admin if needed, also protected */}
            {/* <Route index element={<div>Admin Dashboard</div>} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
};
export default AdminLayout;