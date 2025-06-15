import React from 'react';
import { NavLink } from 'react-router-dom';
import "./UserMenu.css";

const UserMenu = () => {
  return (
    <> 
      <div className='usrmenu text-center'>
        <div className="usrmenu1 list-group">
            <h4>Dashboard</h4>
                <NavLink 
                    to="/dashboard/user/profile" 
                    className="usrmenu2 list-group-item list-group-item-action"
                >
                    Profile
                </NavLink>
                <NavLink 
                    to="/dashboard/user/orders" 
                    className="usrmenu3 list-group-item list-group-item-action"
                >
                    Orders
                </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
