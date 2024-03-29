import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const navigate = useNavigate();
    const [datas, setdatas] = useState("")
    const { id} = useParams();


    const toedit = datas[id] || {};
    const initialInput = {
       booked_date: toedit?.booked_date || "",
       Name: toedit?.Name || "",
       venue: toedit?.venue || "",
       event_date : toedit?.event_date || "",
    };

    const [input, setInput] = useState(initialInput);

    async function UpdateItem(event,_id) {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/updatecrud/${id}`,input);
    
            setdatas(prevData => {
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
        <Form onSubmit={UpdateItem}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control
                        type="date"
                        placeholder="Booked_date"
                        name="booked_date"
                        value={input.booked_date}
                        onChange={handleUpdate}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Event_name"
                        name="Name"
                        value={input.Name}
                        onChange={handleUpdate}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="venue"
                        name="venue"
                        value={input.venue}
                        onChange={handleUpdate}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Control
                        type="date"
                        placeholder="Event_date"
                        name="event_date"
                        value={input.event_date}
                        onChange={handleUpdate}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Item
                </Button>
            </Form>
    </div>
  )
}

export default Update