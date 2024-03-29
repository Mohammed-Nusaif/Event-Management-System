import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Myeventcrud } from "../../App";
import '../../CSS/Create.css'

function Create() {
    const navigate = useNavigate();
    const [eventdata, seteventData] = useContext(Myeventcrud);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
  
    const [input, setInput] = useState({
      Name: "",
      booked_date: "",
      venue: "",
      event_date:""
    });
  
    async function createItem(event) {
      event.preventDefault();
      
      try {
        const response = await axios.post('http://localhost:5000/createcrud', input);
        const newdata = response.data;
        seteventData([...eventdata, newdata]);
        console.log(seteventData);
        navigate(-1);
        setShowToast(true);
        setToastMessage("Item created successfully.");
      } catch (error) {
        console.error('Error creating item:', error);
        setShowToast(true);
        setToastMessage("Error creating item. Please try again.");
      }
    }
  
    function handleChange(event) {
      setInput({ ...input, [event.target.name]: event.target.value });
    }

    function handleCloseToast() {
      setShowToast(false);
    }
  
  return (
    <div>
      <Form onSubmit={createItem}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="date"
            placeholder="Booked Date"
            name="booked_date"
            value={input.booked_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Event Name"
            name="Name"
            value={input.Name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter venue"
            name="venue"
            value={input.venue}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="date"
            placeholder="Event Date"
            name="event_date"
            value={input.event_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add event
        </Button>
      </Form>
      
      <Toast show={showToast} onClose={handleCloseToast} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Create;
