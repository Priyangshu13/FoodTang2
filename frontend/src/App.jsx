import React, { useState } from 'react';
import Navbar from './component/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './component/Footer/Footer';
import LoginPopup from './component/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

import FullMenuPage from './pages/FullMenuPage/FullMenuPage';
import ExploreMenu from './component/ExploreMenu/ExploreMenu';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Render LoginPopup only when showLogin is true */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      
      <div className='app'>
        {/* Pass setShowLogin to Navbar */}
        <Navbar setShowLogin={setShowLogin} />
        
        <Routes>
          {/* Define routes */}
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path="/myorders" element={<MyOrders />} />

        <Route path="/full-menu" element={<FullMenuPage />} />
        <Route path="/" element={<ExploreMenu />} />
        </Routes>
      </div>
      
      {/* Footer should always be visible */}
      <Footer />
    </>
  );
};

export default App;
