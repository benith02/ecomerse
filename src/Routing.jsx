import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Product from './Product'
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import DynamicNavigation from './DynamicNavigation'
import OrderPage from "./OrderPage";


function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/product/:source/:id" element={<Product />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/navbar" element={<Navbar />} />


      

     

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
d485dffd3e29b77a20f60fd98e7fac11138b1e4c
    </Routes>
  )
}

export default Routing
