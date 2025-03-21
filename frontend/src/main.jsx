import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM from 'react-dom'

import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App/>
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
