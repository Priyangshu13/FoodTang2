import React, { useState } from 'react';
import { menu_list } from '../../assets/assets';
import './FullMenuPage.css';
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay'; // ✅ Make sure this path is correct

const FullMenuPage = () => {
  const [category, setCategory] = useState('ALL');

  const handleCategoryClick = (menuName) => {
    setCategory((prev) => (prev === menuName ? 'ALL' : menuName));
  };

  return (
    <div className="full-menu-page">
      <h1>Full Menu</h1>
      <p className="instruction-text">Click a category to view its dishes</p>

      {/* Category Buttons */}
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(item.menu_name)}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? 'active' : ''}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />

      {/* ✅ FoodDisplay shows food items matching selected category */}
      <FoodDisplay category={category} />
    </div>
  );
};

export default FullMenuPage;
