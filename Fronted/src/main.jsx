import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Frame from './Frame.jsx'
import Home from './Pages/Home.jsx'
import MobileApp from './components/Mobile_Home.jsx'
import { Provider } from "react-redux";
import { store } from "./app/store";
import ShoppingCart from './Pages/Cart.jsx'
import SearchResults from './components/SearchResults.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Frame />} >
          <Route index element={<Home />} />
          <Route path='cart' element={<ShoppingCart />} />
          <Route path='search' element={<SearchResults />} />

        </Route>
        <Route path="mobile" element={<MobileApp />} />
      </Routes>
    </Router>
    </Provider>
  </StrictMode>
)
