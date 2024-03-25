// AdminApp.js
import { createContext, useState } from "react";
import AdminLogin from "./components/Adminsection/AdminLogin";

export const AdminLoggedInContext = createContext();
export const Myadminname = createContext()
function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));
  const [adminname, setAdminname] = useState("")

  return (
    <AdminLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <Myadminname.Provider value={[adminname,setAdminname]}>
        <AdminLogin/>
      </Myadminname.Provider>
      <AdminLogin/>
    </AdminLoggedInContext.Provider>
  );
}

export default AdminApp;
