import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot from 'react-dom/client'

import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if using TypeScript

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
