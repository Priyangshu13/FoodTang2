import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left"> 
                <div className="logo" id='logo'> 
                    <img src={assets.logo} alt="Company Logo" />
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, sunt.</p> <br />
                <div className="footer-social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.facebook_icon} alt="Facebook Icon" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.twitter_icon} alt="Twitter Icon" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} alt="LinkedIn Icon" />
                    </a>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>FoodTang</h2>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About Us</a></li> 
                    <li><a href="#delivery">Delivery</a></li>
                    <li><a href="#privacy-policy">Privacy Policy</a></li>
                </ul>
            </div>
            <div className="footer-content-right"> 
                <p>Get in touch with us through email or phone.</p>
                <ul>
                    <li>+91 9382620802</li>
                    <li><a href="mailto:Contact@FoodTang.com">Contact@FoodTang.com</a></li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 © FoodTang.com - All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
