import React from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import './Pagenotfound.css';

const Pagenotfound = () => {
  return (
    <Layout title={'Page Not Found'}>
      <div id="page-not-found-container">
        <h1 id="page-not-found-heading">404</h1>
        <p id="page-not-found-message">Oops! The page you are looking for does not exist.</p>
        <NavLink to="/" id="page-not-found-link">
          Go Back Home
        </NavLink>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
