import React from 'react';
import './AdminSidebar.css';
import { assets } from '../../assets/assets';
import { NavLink, useLocation} from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  if (['/login'].includes(location.pathname)) {
    return null;
  }

  return (
    <div className='AdminSidebar'>
      <div className="AdminSidebar-options">
       <NavLink to='/dashboard' className="AdminSidebar-option">
          <img src={assets.Dashbroad_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to= '/create' className="AdminSidebar-option">
          <img src={assets.manager_icon} alt="" />
          <p>Create Manager Acc</p>
        </NavLink>
        <NavLink to='/add' className="AdminSidebar-option">
          <img src={assets.add_icon} alt="Add icon" />
          <p>Add items</p>
        </NavLink>
        <NavLink to='/list' className="AdminSidebar-option">
          <img src={assets.list_icon} alt="List icon" />
          <p>List items</p>
        </NavLink>
        <NavLink to='/booking' className="AdminSidebar-option">
          <img src={assets.review} alt="" />
          <p>Booking</p>
        </NavLink>
        <NavLink to='/addinventory' className="AdminSidebar-option">
          <img src={assets.inventory} alt=" " />
          <p>Add Inventory</p>
        </NavLink>
        <NavLink to='/paymentupdation' className="AdminSidebar-option">
          <img src={assets.inventory} alt=" " />
          <p>Payment Updation</p>
        </NavLink>
        <NavLink to='/orderanalysis' className="AdminSidebar-option">
          <img src={assets.order_analysis} alt=" " />
          <p>Orders Analysis</p>
        </NavLink>
        <NavLink to='/itemanalysis' className="AdminSidebar-option">
          <img src={assets.food_analysis} alt="" />
          <p>Item Analysis</p>
        </NavLink> 
        <NavLink to='/review' className="AdminSidebar-option">
          <img src={assets.review} alt="" />
          <p>Customer Review</p>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
