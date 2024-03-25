import React from "react";
import { Button, Container } from "react-bootstrap";
import "../CSS/spotlight.css";

function Spotlight() {
  return (
    <div>
      <section id="spotlight">
        <div className="top">
          <h1>
            Spotlight Your Creativity <br /> Curate Unforgettable Events{" "}
          </h1>
        </div>

        <div className="bottom">
          <Button className="btn"> Get Started</Button>
          <Button className="btn"> Explore Events</Button>
        </div>
      </section>
    </div>
  );
}

export default Spotlight;
