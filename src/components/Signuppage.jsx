import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../CSS/signup.css'
import { Myname } from "../App";

function Signuppage() {
    const [name, setname] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const land = useNavigate();
    const handlesignup = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          name,
          Password,
          Email,
        });
        console.log(response.data);
        if (response.data.message) {
          alert("User already exists, please login");
          land("/loginto");
        } else {
          land("/loginto");
        }
      } catch (error) {
        console.error("Error signing up:", error);
      }
    };
  return (
    <div>
      <section id="main1">
        <div className="form1">
          <div className="head">
            <h1>signup</h1>
          </div>

          <Form className="form2">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={Email}
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>
            <div className="form1-bottom">
              <button
                variant="primary"
                type="submit"
                onClick={handlesignup}
                className="form2-btn"
              >
                Signup
              </button>
            </div>
            <div className="but2">
              <p>already have an account</p>
              <Link to="/loginto"> login</Link>
            </div>
          </Form>
        </div>
      </section>
    </div>
  );
}

export default Signuppage;
