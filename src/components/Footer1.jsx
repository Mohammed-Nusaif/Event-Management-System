import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Logo from "../assets/logo (3).png";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import '../CSS/footer.css'



function Footer1() {
  return (
   <>
    <footer id="footer">
      <Container>
        <section className="subscribe">
          <h2>Subscribe Newsletters & get Latest News</h2>
          <input className="sub" type="email" name="subscribe"  placeholder="enter your email address" id="" />
          <Button className="btn"> Subscribe</Button>

        </section>
        <section className="footer">
          <div className="social">
            <span className="img1">
              <img src={Logo} alt="" />
            </span>
            <p>your mind should be stronger <br /> than your feelings.fly!</p>
            <div className="medias">
              <span className="in fb"><FaFacebookF /></span>
              <span className="in twitter"><FaTwitter/></span>
              <span className="in yt"><FaYoutube /></span>
              <span className="in insta"><FaInstagram /></span>
            </div>
          </div>
          <div className="information">
            <ul>
                <li><b>information</b></li>
                <li>Home</li>
                <li>Explore</li>
                <li>Flight Status</li>
                <li>Travel</li>
                <li>Check-in</li>
                <li>Manage your booking</li>
            </ul>
          </div>
          <div className="Quick-guide">
            <ul>
                <li><b>Quick-guide</b></li>
                <li>FAQ</li>
                <li>How to</li>
                <li>Features</li>
                <li>Baggage</li>
                <li>Route map</li>
                <li>Our Communites</li>
            </ul>
          </div>
          <div className="info">
            <ul>
                <li><b>information</b></li>
                <li>Chauffuer</li>
                <li>Our Partners</li>
                <li>Destination</li>
                <li>Careers</li>
                <li>Transportation</li>
                <li>Programme Rules</li>
            </ul>
          </div>
        </section>
      </Container>
      <div className="signature">
        <p>Courtesy Design | Developed by <a href="">NSF</a></p>
      </div>
    </footer>
   
   </>
  )
}

export default Footer1