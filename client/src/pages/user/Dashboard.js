import React from 'react';
import Layout from '../../components/Layout/LayoutNF';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import "./Dashboard.css";
import LayoutNF from '../../components/Layout/LayoutNF';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <LayoutNF title={"Dashboard"}>
      <div className='divDashboard container-fluid m-3 p-3'>
        <div className='divd2 row'>
          <div className='divUserMenu col-md-3'>
            <UserMenu />
          </div>
          <div className='divd4 col-md-9'>
            <div className='divd5-card w-75 p-3'>

              <h4 className='divdash7'>Personal informations</h4>
              <div className='divDash5-card-content'>
                <span className='labelclass'>Full Name :</span>
                <span className='infoclass'>{auth?.user?.firstname} {auth?.user?.lastname}</span>

                <span className='labelclass'>Email :</span>
                <span className='infoclass'>{auth?.user?.email}</span>

                <span className='labelclass'>Phone :</span>
                <span className='infoclass'>{auth?.user?.phone}</span>

                <span className='labelclass'>Address :</span>
                <span className='infoclass'>{auth?.user?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutNF>
  );
};

export default Dashboard;