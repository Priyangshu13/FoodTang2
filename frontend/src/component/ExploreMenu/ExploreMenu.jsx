import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
  const navigate = useNavigate();

  const handleExploreAllClick = () => {
    navigate('/full-menu'); // <-- Redirect to full menu page
  };

  return (
    <div className='explore-menu' id='explore-menu'>
      <button className='explore-menu-heading-button' onClick={handleExploreAllClick}>
        <h1>Explore our menu <span className="arrow">→</span></h1>
      </button>

      <p className="explore-menu-text">Nice to see you, Have a good day</p>

      <hr />
    </div>
  );
};

export default ExploreMenu;
