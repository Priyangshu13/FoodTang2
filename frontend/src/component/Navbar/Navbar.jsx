import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className='navbar'>
      
      <Link to='/'> <img src={assets.logo} alt="Logo" className='logo' /> </Link>
      <ul className='navbar-menu'>
        <li>
          <Link 
            to='/' 
            onClick={() => setMenu("Home")} 
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a 
            href='#explore-menu' 
            onClick={() => setMenu("Menu")} 
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a 
            href='#app-download' 
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
          
          <Link to='/cart'> <img src={assets.basket_icon} alt="Basket Icon" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={() => setShowLogin(true)}>SIGN IN</button>
        : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
        
      </div>
    </div>
  );
};

export default Navbar;
