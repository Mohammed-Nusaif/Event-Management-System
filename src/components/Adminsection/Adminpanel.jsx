// AdminPanel.js
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import UserManagement from "./UserManagement";
import ContentManagement from "./ContentManagement";
import Analytics from "./Analytics";
import { AdminLoggedInContext } from "../../AdminApp";

function Adminpanel() {
  const [isLoggedIn] = useContext(AdminLoggedInContext);

  // Redirect to admin login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <Routes>
        <Route path="adminlogin" element={<AdminLogin />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="analytics" element={<Analytics />} />
        {/* Other admin routes */}
      </Routes>
    </div>
  );
}

export default Adminpanel;
