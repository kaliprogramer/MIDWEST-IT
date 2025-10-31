import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Frame from './Frame.jsx'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import MobileApp from './components/Mobile_Home.jsx'
import { ZoomContext } from './Store/Main.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Frame />} >
          <Route index element={<Home />} />
        </Route>
        <Route path="mobile" element={<MobileApp />} />
      </Routes>
    </Router>
  </StrictMode>
)
