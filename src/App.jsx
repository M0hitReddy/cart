// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'
import Cart from './components/Cart'
import CartProvider from './components/CartContext'
import Navbar from './components/Navbar'
import Products from './components/Products'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      {/* <div> */}
      {/* <React.Fragment className="relative"> */}
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Cart /> */}

          </Routes>
        </Router>
      </CartProvider>
      {/* </div> */}
      {/* </React.Fragment> */}
    </>
  )
}

export default App
