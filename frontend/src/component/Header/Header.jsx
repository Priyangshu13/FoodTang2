import React from 'react'
import './Header.css'

const Header = () => {
    
  return (
    <div className='header'>
      <div className="header-contain">
        <h2>Feast Faster, Dine Smarter</h2>
        <p>Welcome to our one-stop destination for all your dining needs! Whether you're craving a gourmet feast or a quick bite, our food ordering and restaurant seat booking website has you covered.</p>
        <button className="table"> <a href='#booktable'>Book Table</a></button>

      </div>
    </div>
  )
}

export default Header
