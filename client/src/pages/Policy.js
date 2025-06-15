import React from 'react';
import Layout from '../components/Layout/Layout';
import './Policy.css'; 

const Policy = () => {
  return (
    <Layout title={'Policy'}>
      <div className="policy-container">
        <h1 className='policy-title'>Privacy Policy</h1>
        <section className="policy-section">
          <h2>Introduction</h2>
          <p>
            Welcome to our Privacy Policy. Your privacy is critically important to us. This policy outlines how we handle your personal data, including collection, usage, and protection.
          </p>
        </section>

        <section className="policy-section">
          <h2>Information We Collect</h2>
          <p>
            We collect various types of information in connection with your use of our services, including:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, etc.</li>
            <li><strong>Usage Data:</strong> Information on how you use our website and services.</li>
            <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze usage patterns.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and improve our services.</li>
            <li>Communicate with you and respond to inquiries.</li>
            <li>Analyze usage and enhance user experience.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Data Protection and Security</h2>
          <p>
            We take appropriate measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className="policy-section">
          <h2>Your Choices</h2>
          <p>
            You have the following choices regarding your data:
          </p>
          <ul>
            <li>Opt-out of receiving marketing communications.</li>
            <li>Access and update your personal information.</li>
            <li>Request deletion of your data under certain circumstances.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this policy periodically for any changes.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>Email: <a href="mailto:support@smartfix.com">support@smartfix.com</a></p>
        </section>
      </div>
    </Layout>
  );
};

export default Policy;
