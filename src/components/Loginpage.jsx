import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedInContext, Myemail, Mypassword, Myusername } from "../App";
import { Col, Form, InputGroup } from "react-bootstrap";
import '../CSS/loginpage.css'
import { jwtDecode } from "jwt-decode";


function Loginpage() {
  // const [Password, setPassword] = useState("");
  const [Password, setPassword] = useContext(Mypassword) 
  const [loginError, setLoginError] = useState("");
  const [Email, setEmail] = useContext(Myemail);
  const [, setIsLoggedIn] = useContext(LoggedInContext);
  const [username, setUsername] = useContext(Myusername); //
  const land = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        Password,
        Email,
      });
      const token = response.data.Token;
      localStorage.setItem("token", token);
      console.log(token);
      // Decode the token to get user information
      
      const decodedToken = jwtDecode(token); 
      console.log(decodedToken);
      setIsLoggedIn(true);


      land("/");
      alert("login successful");
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
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={Email}
                  placeholder="Enter your Username"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="form-group">
              <Form.Control
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-bottom">
              <button type="submit" onClick={handlelogin} className="login-btn">
                Login
              </button>
              {loginError && <p className="error-message">{loginError}</p>}
            </div>
          </form>
          <div className="signup-link">
            <p>Don't have an account?</p>
            <Link to="/signinto">Signup</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Loginpage;
