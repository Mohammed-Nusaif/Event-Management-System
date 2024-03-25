import axios from "axios";
import React, { useContext, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { Form, useNavigate } from "react-router-dom";
import { AdminLoggedInContext, Myadminname } from "../../AdminApp";
import { RiAdminFill } from "react-icons/ri";
import '../../CSS/loginpage.css'
function AdminLogin() {
  const [adminPassword, setadminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [adminname, setAdminname] = useContext(Myadminname);
  const [isLoggedIn, setIsLoggedIn] = useContext(AdminLoggedInContext);
  const land = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/adminLogin", {
        adminPassword,
        adminname,
      });
      const token = response.data.Token;
      const adminname = response.data.adminname;
      setIsLoggedIn(true);
      land("/");
      alert("login successful")
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized: Invalid credentials");
        setLoginError("User not found"); 
      } else {
        console.error("Error logging in:", error);
      }
    }
  };
  return (
    <div>
      <section id="main1">
        <div className="form-container">
          <div className="form-header">
            <h1>Login</h1>
          </div>
          <form className="login-form">
            <div className="form-group">
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend"><RiAdminFill /></InputGroup.Text>
                <Form.Control
                  type="text"
                  value={adminname}
                  placeholder="Enter admin Username"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setAdminname(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="form-group">
              <Form.Control
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setadminPassword(e.target.value)}
              />
            </div>
            <div className="form-bottom">
              <button type="submit" onClick={handlelogin} className="login-btn">
                Login
              </button>
              {loginError && <p className="error-message">{loginError}</p>}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
