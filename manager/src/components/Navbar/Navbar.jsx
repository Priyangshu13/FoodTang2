// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {

  // Don't show navbar on the home page
  if (location.pathname === '/login') {
    return null
  }
  if (location.pathname === '/') {
    return null
  }
  if (location.pathname === '/signup') {
    return null
  }

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar;