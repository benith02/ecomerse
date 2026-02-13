import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Product from './Product'

import Home from './Home'
// import About from './About'
// import Contact from './Contact'
import Login from './Login'
// import Register from './Register'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Product />} />
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  )
}

export default Routing
