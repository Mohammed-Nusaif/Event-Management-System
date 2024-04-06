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
      <Form onSubmit={createItem} className="custom-form">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
          className="input-field"
            type="date"
            placeholder="Booked Date"
            name="booked_date"
            value={input.booked_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

         <Form.Select
          aria-label="Default select example"
          className="input-field"
          name="Name"
          value={input.venue}
          onChange={handleChange}
          required
        >
          <option>Select the Event</option>
          <option value="Marriage Function">Marriage Function</option>
          <option value="College Function">College Function</option>
          <option value="Office Function">Office Function </option>
          <option value="Festivals">Festivals </option>
          <option value="Funerals">Funerals </option>
          <option value="Political Function">Political Function</option>
        </Form.Select>

        <Form.Group className="mb-3">
          <Form.Control
          className="input-field"
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
          className="input-field"
            type="date"
            placeholder="Event Date"
            name="event_date"
            value={input.event_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" className= "create_btn">
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
