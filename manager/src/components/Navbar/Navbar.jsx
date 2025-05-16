/* eslint-disable no-unused-vars */
import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (['/', '/login', '/signup'].includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');
  const userName = localStorage.getItem('name');

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <div className="navbar-right">
        {isLoggedIn && (
          <>
            <span className="user-name">Hi, {userName}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        {/* <img className='profile' src={assets.profile_image} alt="Profile" /> */}
      </div>
    </div>
  );
}

export default Navbar;
