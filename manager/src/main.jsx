// eslint-disable-next-line no-unused-vars
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import 'react-toastify/ReactToastify.css'

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
    <App />
  </BrowserRouter>
 
)
