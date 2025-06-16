import React, { useState, useEffect, useContext } from 'react';
import Navbar from './component/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './component/Footer/Footer';
import LoginPopup from './component/LoginPopup/LoginPopup';
import CheckoutPayment from './pages/CheckoutPayment/CheckoutPayment';
import FullMenuPage from './pages/FullMenuPage/FullMenuPage';
import BookingForm from './pages/BookingForm/BookingFrom';
import MyOrders from './pages/MyOrders/MyOrders';
import { StoreContext } from './context/StoreContext';  // Import your context

const App = () => {
  const { token, setToken } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // On first load, check for token
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [setToken]);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/confirm-payment' element={<CheckoutPayment />} />
          <Route path='/full-menu' element={<FullMenuPage />} />
          <Route path='/bookingform' element={<BookingForm />} />
          <Route path='/my-orders' element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
