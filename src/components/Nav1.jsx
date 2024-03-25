import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/logo (3).png";
import { Button } from "react-bootstrap";
import "../CSS/nav1.css";
import { Link } from "react-router-dom";
import { LoggedInContext, Myemail, Myname, Myusername } from "../App";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

function Nav1() {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [Email, setEmail] = useContext(Myemail);
  const [username, setUsername] = useContext(Myusername);

  console.log(Email);

  useEffect(() => {
    // Retrieve username from local storage when component mounts
    setUsername(localStorage.getItem("username") || "");
  }, []);
  
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
