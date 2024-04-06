import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Myeventcrud } from "../App";
import "../CSS/Eventplans.css";
import Logo from "../assets/logo (3).png";
import { FaEdit, FaUserCircle, FaUsers } from "react-icons/fa";
import { IoHome, IoInformationCircleOutline } from "react-icons/io5";
import { MdContactPhone, MdDashboard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosAddCircle, IoIosLogOut, IoMdSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function DeleteModal({ show, handleClose, onDelete , id }) {
  const handleConfirmDelete = () => {
    onDelete(id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Eventplans() {
  const [eventdata, seteventData] = useContext(Myeventcrud);
  const [showModal, setShowModal] = useState(false);

// Function to handle delete confirmation
const handleDelete = async(id) => {
  console.log("Deleting item with ID:", id);
  setShowModal(false); // Close the modal
  try {
    // Perform deletion action
    await axios
      .delete(`http://localhost:5000/deletecrud/${id}`)
      .then((response) => {
        console.log("Item deleted successfully:", id);
        // Remove the item from the state
        seteventData(eventdata.filter((item) => item._id !== id));
      });
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
console.log(eventdata);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/viewevent");
        if (isMounted) {
          seteventData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [seteventData]);

  return (
    <section id="dashboard">
      {/* side-menubar */}
      <div className="side_nav">
        <div className="header">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="profile">
            <FaUserCircle className="user-icon" />
          </div>
        </div>
        <div className="middle_nav">
          <Link to="/" className="link">
            <li className="nav_list">
              <IoHome className="icons" />
              Home
            </li>
          </Link>
          <li className="nav_list">
            <IoInformationCircleOutline className="icons" />
            About
          </li>
          <li className="nav_list">
            <MdSpaceDashboard className="icons" />
            Dashboard
          </li>
          <li className="nav_list">
            <FaUsers className="icons" />
            Services
          </li>
          <li className="nav_list">
            <MdContactPhone className="icons" />
            Contact
          </li>
        </div>
        <div className="footer_nav">
          <li>
            <IoIosLogOut className="icons" />
            Logout
          </li>
          <li>
            <IoMdSettings className="icons" />
            Settings
          </li>
        </div>
      </div>

      {/* table */}
      <div className="tab">
        <Table id="event_tab">
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
                <td>{_id + 1}</td>
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
                <td>
                  <Link to={`/update/${display._id}`}>
                    <FaEdit className="tab_icon edit" />
                  </Link>

                  <MdDelete
                    className="tab_icon delete"
                    onClick={() => {
                      setShowModal(display._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to={"/create"} className="create_link">
          <IoIosAddCircle className="tab_icon create" />
        </Link>
      </div>
      <DeleteModal
       show={showModal !== false}
       handleClose={handleCloseModal}
       onDelete={handleDelete}
       id={showModal}
      />
    </section>
  );
}

export default Eventplans;
