import React from 'react';
import './AdminNavbar.css';
import { assets } from '../../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on login and signup pages
  if (['/login'].includes(location.pathname)) {
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
    <div className='AdminNavbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <div className="AdminNavbar-right">
        {isLoggedIn && (
          <>
            <span className="user-name">Hi, {userName}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
        <img
          className='profile'
          src={assets.profile_image}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
