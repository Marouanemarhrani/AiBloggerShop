import React from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <LayoutNF title={"Admin Dashboard"}>
      <div className='adm container-fluid m-3 p-3'>
        <div className='adm1 row'>
          <div className='adm2 col-md-3'>
            <AdminMenu />
          </div>
          <div className='adm3 col-md-9'>
            <div className='adm4-card w-75 p-3'>
              <h4 className='adm-h4'>Admin Information</h4>
              <div className='adm5-card-content'>
                <span className='adm-labelclass'>Full Name :</span>
                <span className='adm-infoclass'>{auth?.user?.firstname} {auth?.user?.lastname}</span>

                <span className='adm-labelclass'>Email :</span>
                <span className='adm-infoclass'>{auth?.user?.email}</span>

                <span className='adm-labelclass'>Phone :</span>
                <span className='adm-infoclass'>{auth?.user?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutNF>
  );
};

export default AdminDashboard;
