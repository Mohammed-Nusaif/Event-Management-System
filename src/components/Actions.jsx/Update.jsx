import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../CSS/Update.css";
import '../../CSS/Update.css'

function Update() {
  const navigate = useNavigate();
  const [datas, setdatas] = useState("");
  const { id } = useParams();

  const toedit = datas[id] || {};
  const initialInput = {
    booked_date: toedit?.booked_date || "",
    Name: toedit?.Name || "",
    venue: toedit?.venue || "",
    event_date: toedit?.event_date || "",
  };

  const [input, setInput] = useState(initialInput);

  async function UpdateItem(event, _id) {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/updatecrud/${id}`,
        input
      );

      setdatas((prevData) => {
        const newData = [...prevData];
        newData[id] = { ...input };
        return newData;
      });
      navigate("/Bookplans");
    } catch (error) {
      console.error("not updated:", error);
    }
  }

  function handleUpdate(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }
  return (
    <div>
      <Form onSubmit={UpdateItem} className="custom-form">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            className="input-field"
            type="date"
            placeholder="Booked date"
            name="booked_date"
            value={input.booked_date}
            onChange={handleUpdate}
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          className="input-field"
          name="Name"
          value={input.Name}
          onChange={handleUpdate}
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
            placeholder="Venue"
            name="venue"
            value={input.venue}
            onChange={handleUpdate}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            className="input-field"
            type="date"
            placeholder="Event date"
            name="event_date"
            value={input.event_date}
            onChange={handleUpdate}
          />
        </Form.Group>
        <Button className="submit-button" variant="primary" type="submit">
          Update Item
        </Button>
      </Form>
    </div>
  );
}

export default Update;
