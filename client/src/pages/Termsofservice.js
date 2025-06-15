import React from 'react';
import Layout from '../components/Layout/Layout';
import './Termsofservice.css'; 

const Termsofservice = () => {
  return (
    <Layout title={'terms of service'}>
      <div className="terms-container">
        <h1 className='terms-title'>Terms of Service</h1>
        <section className="terms-section">
          <h2>Introduction</h2>
          <p>
            Welcome to our Terms of Service. By using our services, you agree to the following terms and conditions. Please read them carefully.
          </p>
        </section>

        <section className="terms-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with these terms, please do not use our services.
          </p>
        </section>

        <section className="terms-section">
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these terms at any time without prior notice. Your continued use of our services constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>Use of Services</h2>
          <p>
            You agree to use our services only for lawful purposes and in accordance with our policies. Any misuse or violation of these terms may result in suspension or termination of your access.
          </p>
        </section>

        <section className="terms-section">
          <h2>Intellectual Property</h2>
          <p>
            All content and materials on our website and services are the property of [Your Company] or its licensors and are protected by intellectual property laws. You may not use, copy, or distribute any content without our express permission.
          </p>
        </section>

        <section className="terms-section">
          <h2>Limitation of Liability</h2>
          <p>
            [Your Company] is not liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our liability is limited to the fullest extent permitted by law.
          </p>
        </section>

        <section className="terms-section">
          <h2>Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising under these terms will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
          </p>
        </section>

        <section className="terms-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p>Email: <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
        </section>
      </div>
    </Layout>
  );
};

export default Termsofservice;
