import React from 'react'
import './Header.css'

const Header = () => {
    
  return (
    <div className='header' id='header'>
        <div className='headerBg'>
        <div className="header-contain">
        <h2>Feast Faster <br />Dine Smarter</h2>
        <p>Welcome to our one-stop destination for all your dining needs! Whether you're craving a gourmet feast or a quick bite, our food ordering and restaurant seat booking website has you covered.</p>
          <button className="table"> <a href='./#explore-menu'>ORDER NOW</a></button>

        </div>
      </div>
    </div>
  )
}

export default Header