import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const{getTotalCartAmount,token,setToken} = useContext(StoreContext);


  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className='Navbarmain'>
    <div className='navbar'>
      <Link to=''><img src={assets.logo} alt="Logo" className='logo' /></Link>
      <ul className='navbar-menu'>
        <li>
            <Link to=''><a>Home</a></Link>
         </li>
        <li>
          <a 
            href='/#explore-menu' 
            onClick={() => setMenu("Menu")} 
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a 
            href='/#app-download' 
            onClick={() => setMenu("Mobile app")} 
            className={menu === "Mobile app" ? "active" : ""}
          >
            Mobile app
          </a>
        </li>
        <li>
          <a 
            href='#footer' 
            onClick={() => setMenu("Contact us")} 
            className={menu === "Contact us" ? "active" : ""}
          >
            Contact us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon"/></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={() => setShowLogin(true)}>Sign in</button>
        : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
           <ul className="nav-profile-dropdown">
  <li>
    <NavLink to="/my-orders" className="nav-profile-link">
      <img src={assets.bag_icon} alt="Orders Icon" />
      <p>Orders</p>
    </NavLink>
  </li>
  <hr />
  <li onClick={logout}>
    <img src={assets.logout_icon} alt="Logout Icon" />
    <p>Logout</p>
  </li>
</ul>


          </div>}
        
      </div>
    </div>
    </div>
  );
};

export default Navbar;