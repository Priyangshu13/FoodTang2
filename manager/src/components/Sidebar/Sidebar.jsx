// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  // Don't show sidebar on the home page
  if (location.pathname === '/login') {
    return null
  }
  if (location.pathname === '/signup') {
    return null
  }

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/dashboard' className="sidebar-option">
            <img src={assets.dashboard_icon} alt="Add icon" />
            <p>Dashboard</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.menu} alt="List icon" />
            <p>Menu Availability</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order} alt="Order icon" />
            <p>Live Orders List</p>
        </NavLink>
        <NavLink to='/inventory' className="sidebar-option">
            <img src={assets.inventory} alt="Order icon" />
            <p>Inventory</p>
        </NavLink>
        <NavLink to='/reservation' className="sidebar-option">
            <img src={assets.reservation} alt="Order icon" />
            <p>Reservation Status</p>
        </NavLink>
        <NavLink to='./staffcontroll' className="sidebar-option">
            <img src={assets.staffcontrol} alt="Order icon" />
            <p>Staff Controll</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
