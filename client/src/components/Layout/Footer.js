import React from 'react';
import './Footer.css';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Footer Top */}
      <div className="footer-top">
        <p>
          Welcome to SmartFix - Your one-stop solution for phone repairs, sales of smartphones, tablets, computers, and accessories. 
          Our mission is to provide quality products and services that ensure your devices are always up and running.
        </p>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        {/* About Column */}
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Who We Are</a></li>
            <li><a href="#">Sell Your Device</a></li>
            <li><a href="#">SmartFix for Businesses</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-column">
          <h4>Customer Support</h4>
          <ul>
            <li><a href="http://localhost:3000/ia">Become a Vendor</a></li>
            <li><a href="/dashboard/user/orders">Order Status</a></li>
            <li><a href="#">Payment Options</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Help & FAQ</a></li>
          </ul>
        </div>

        {/* Legal Info */}
        <div className="footer-column">
          <h4>Legal Information</h4>
          <ul>
            <li><a href="/terms-of-service">Terms of Use</a></li>
            <li><a href="">Privacy Policy</a></li>
            <li><a href="/privacy-policy">Cookies Policy</a></li>
            <li><a href="#">Warranty Terms</a></li>
            <li><a href="#">Legal Notices</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-contact-info">
          <p><FaMapMarkerAlt /> 123 SmartFix Street, Toulouse, France</p>
          <p><FaPhone /> +33 258 564 521</p>
          <p><FaEnvelope /> support@smartfix.com</p>
        </div>
        <p>© 2024 SmartFix</p>
      </div>
    </footer>
  );
};

export default Footer;
