import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For a Better Experience, Download the <br /> FoodTang App</p>
        <div className="app-download-platform">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img src={assets.play_store} alt="Download on Google Play" />
            </a>
            <a href="https://apps.apple.com/" target="_blank" rel="noopener noreferrer">
                <img src={assets.app_store} alt="Download on the App Store" />
            </a>
        </div>
    </div>
  );
}

export default AppDownload;
