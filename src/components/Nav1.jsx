import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/logo (3).png";
import { Button } from "react-bootstrap";
import "../CSS/nav1.css";
import { Link } from "react-router-dom";
import {
  LoggedInContext,
  Myemail,
  Myname,
  Mypassword,
  Myusername,
} from "../App";
import {  FaUserCircle } from "react-icons/fa";
import axios from "axios";

function Nav1() {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
  const [username, setUsername] = useContext(Myusername);
  const [showprofile, setshowprofile] = useState(false);

  //setting up profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      const fetchUserName = async () => {
        try {
          const response = await axios.get("http://localhost:5000/getname", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { Name } = response.data;
          console.log(Name);
          setUsername(Name);
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      };
      fetchUserName();
    }
  }, [setUsername]); // Fetch user name every time the location changes
  console.log(username);
  //logout
  const handlelogout = () => {
    setUsername("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setshowprofile(false)
  };
  //user-profile
  const handleprofile = () => {
    setshowprofile(!showprofile);
  };
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
            <li>
              <Link to="/Bookplans">
                <a href="" className="Explore">
                  Bookings
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="right">
          {isLoggedIn ? (
            <>
              <div className="profile">
                <li>
                  <FaUserCircle className="user-icon" onClick={handleprofile} />
                </li>
              </div>
            </>
          ) : (
            <>
              <Link to="/loginto">
                <Button variant="primary">Login</Button>
              </Link>
            </>
          )}
        </div>
        {showprofile && (
          <div className="logout">
            <div className="icon-bg"></div>
            <FaUserCircle className="user-icon" />
            <h6>{username}</h6>
            <button className="btn" onClick={handlelogout}>
              logout
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Nav1;

