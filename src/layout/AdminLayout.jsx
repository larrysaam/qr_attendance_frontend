import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { UserList } from '../pages/userList';
import { Downloads } from '../pages/Downloads';
import AdminSidebar from './AdminSidebar'; // Import the AdminSidebar

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar /> {/* Use the AdminSidebar */}
      <div className="admin-content">
        {/* If AdminLayout defines its own routes, Outlet might not be needed here,
            but if App.js defines nested routes for /admin, then Outlet is correct.
            Given the current AdminLayout structure, Outlet is not strictly necessary
            unless you plan to have a default /admin page or more complex nesting.
            For now, keeping the direct <Routes> here is fine. */}
        <Routes>
          <Route path="" element={<UserList />} />
          <Route path="downloads" element={<Downloads />} />
          {/* You can add an index route for /admin if needed */}
          {/* <Route index element={<div>Admin Dashboard</div>} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;