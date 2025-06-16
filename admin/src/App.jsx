import React, { useState } from 'react';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import CreateManagerAcc from './pages/CraeteManagerAcc/CreateManagerAcc';
import Dashboard from './pages/Dashbroad/Dashbroad';
import OrderAnalysis from './pages/OderAnalysis/OrderAnalysis';
import ItemAnalysis from './pages/ItemAnalysis/ItemAnalysis';
import CustomerReview from './pages/CustomerReview/CustomerReview';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AddInventory from './pages/AddInventory/AddInventory';
import Booking from './pages/Booking/Booking';
import PaymentUpdate from './pages/PaymentUpdate/PaymentUpdate';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
  };

  return (
    <div>
      <AdminNavbar />
      <div className='app-content'>
        <AdminSidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateManagerAcc/>} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/orderanalysis" element={<OrderAnalysis />} />
          <Route path="/addinventory" element={<AddInventory />} />
          <Route path="/itemanalysis" element={<ItemAnalysis />} />
          <Route path="/review" element={<CustomerReview />} />
          <Route path="/paymentupdation" element={<PaymentUpdate />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
