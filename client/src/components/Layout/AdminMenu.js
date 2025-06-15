import React from 'react';
import { NavLink } from 'react-router-dom';
import "./AdminMenu.css";

const AdminMenu = () => {
  return (
    <> 
      <div className='adminmenu text-center'>
        <div className="adminmenu1 list-group">
          <h4>Admin panel</h4>

          <NavLink 
            to="/dashboard/admin/create-category" 
            className="adminmenu2 list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>

          <NavLink 
            to="/dashboard/admin/categories" 
            className="adminmenu4 list-group-item list-group-item-action"
          >
            Categories
          </NavLink>

          <NavLink 
            to="/dashboard/admin/create-product" 
            className="adminmenu3 list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>

          <NavLink 
            to="/dashboard/admin/products" 
            className="adminmenu4 list-group-item list-group-item-action"
          >
            Products
          </NavLink>

          <NavLink 
            to="/dashboard/admin/orders" 
            className="adminmenu5 list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
