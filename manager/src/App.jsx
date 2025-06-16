/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login/Login'
import Inventory from './pages/Inventory/Inventory'
import StaffControl from './pages/Staffcontroll/StaffControl'
import Reservation from './pages/Reservation/Reservation'
import Booking from './pages/Booking/Booking'

const App = () => {
  const url = "http://localhost:4000"
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowLogin(false)
  }

  return (
    <div>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<Login url={url} />} />
          <Route path="/dashboard" element={<Dashboard url={url} />} />
          <Route path="/booking" element={<Booking url={url} />} />
          <Route path="/inventory" element={<Inventory url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/staffcontrol" element={<StaffControl url={url} />} />
          <Route path="/reservation" element={<Reservation url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
