import React, { useContext, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Myeventcrud } from "../App";
import '../CSS/Eventplans.css'

function Eventplans() {
  const [eventdata, seteventData] = useContext(Myeventcrud);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewevent');
        if (isMounted) {
          seteventData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [seteventData]); 

  return (
    <div>
      <Table className="event_tab"striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>serial no</th>
            <th>Booked_Date</th>
            <th>Event_Name</th>
            <th>venue</th>  
            <th>Event_Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {eventdata.map((display, _id) => (
            <tr key={_id}>
              <td>{_id+1}</td>
              <td>
                <h6>{display.booked_date}</h6>
              </td>      
              <td>
                <h6>{display.Name}</h6>
              </td>
              <td>
                <h6>{display.venue}</h6>
              </td>
              <td>
                <h6>{display.event_date}</h6>
              </td>
              <td >               
                  <Link to={`/update/${display._id}` }> 
                    <button   className="btn1" >
                      Update
                    </button>
                  </Link>
                  
                  <Link to={`/Deletepage/${display._id}` }>
                    <button  className="btn1">
                      Delete
                    </button>
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to={"/create"}>
        <button className="btn1"> Add item</button>
      </Link>
    </div>
  );
}

export default Eventplans;
