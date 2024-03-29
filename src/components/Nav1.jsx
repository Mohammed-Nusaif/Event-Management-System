import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/logo (3).png";
import { Button } from "react-bootstrap";
import "../CSS/nav1.css";
import { Link } from "react-router-dom";
import { LoggedInContext, Myemail, Myname, Mypassword, Myusername } from "../App";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import axios from "axios";

function Nav1() {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [username, setUsername] = useContext(Myusername);

 
  //setting up profile
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const fetchUserName = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getname', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const { name } = response.data;
          console.log(name);
          setUsername(name);
        } catch (error) {
          console.error('Error fetching user name:', error);
        }
      };
      fetchUserName();
    }
  }, [setUsername]); // Fetch user name every time the location changes
console.log(username);

  return (
    <>
      <section id="nav">
        <div className="Logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="middle">
          <ul>
            <li>
              <a href="" className="Home">
                Home
              </a>
            </li>
            <li>
              <a href="" className="About">
                About
              </a>
            </li>
            <li>
              <a href="" className="Explore">
                Explore
              </a>
            </li>
            {isLoggedIn ? (
          <li>
            {/* If user is logged in, show user icon and username */}
            <FaUserCircle className="user-icon"/>
            <Link to="/profile" >hi,{username}</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/loginto">Login</Link>
            </li>
            <li>
              <Link to="/signinto">Signup</Link>
            </li>
          </>
        )}
          </ul>
        </div>
        <div className="right">
          <Link to="/Bookplans">
            <Button variant="primary">Book your Plans</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Nav1;
