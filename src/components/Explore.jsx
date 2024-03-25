import React from "react";
import { Button, Card } from "react-bootstrap";
import "../CSS/Explore.css";
import data from "./Eventsdata";

function Explore() {
  return (
    <>
    <div className="heading">
         <h1> Explore The Events We Offer </h1>
    </div>

      <div className="card-container">
        {data.map((card, index) => (
          <Card key={index}>
            <Card.Img variant="top" src={card.image} />
            <Card.Body>
              <Card.Title>{card.name}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Explore;
