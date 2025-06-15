import React from 'react';
import Layout from '../components/Layout/Layout';
import './About.css';

const About = () => {
  return (
    <Layout title={'About'}>
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our website! We are dedicated to providing the best services and products to our customers. Our team is passionate about excellence and committed to delivering outstanding value.
        </p>
        <p>
          Our mission is to create a user-friendly platform that meets the needs of our diverse clientele. We believe in innovation, integrity, and customer satisfaction.
        </p>
        <p>
          Thank you for visiting our page. We look forward to serving you and exceeding your expectations.
        </p>
      </div>
    </Layout>
  );
};

export default About;
