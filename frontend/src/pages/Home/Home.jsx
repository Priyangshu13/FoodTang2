import React, { useState } from 'react';
import './Home.css';
import Header from '../../component/Header/Header';
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay';
import AppDownload from '../../component/AppDownload/AppDownload';



const Home = () => {
  // Define state for category and setCategory function to update it
  const [category, setCategory] = useState("ALL");

  return (
    <div>
      <Header />
      {/* Pass category state and setCategory function as props to ExploreMenu component */}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>

  );
};

export default Home;
