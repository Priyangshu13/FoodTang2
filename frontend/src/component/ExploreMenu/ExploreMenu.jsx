import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
  const navigate = useNavigate();

  const handleExploreAllClick = () => {
    navigate('/full-menu');
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1 className="explore-menu-heading">
        Explore Our <span className="highlight">Delicious Menu</span>
      </h1>

      <p className="explore-menu-text">
        Nice to see you! Have a good day. Discover your next favorite dish.
      </p>

      <button className="explore-menu-button" onClick={handleExploreAllClick}>
        Explore Full Menu <span className="arrow">→</span>
      </button>

      <hr className="explore-menu-divider" />
    </div>
  );
};

export default ExploreMenu;
