import React, { useState } from 'react';
import './Home.css';
import Header from '../../component/Header/Header';
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu';
import AppDownload from '../../component/AppDownload/AppDownload';
import Booktable from '../../component/Booktable/Booktable';




const Home = () => {
  // Define state for category and setCategory function to update it
  const [category, setCategory] = useState("ALL");

  return (
    <div>
      <Header />
      <Booktable />
      <ExploreMenu category={category} setCategory={setCategory} />
      <AppDownload/>
    </div>

  );
};

export default Home;
