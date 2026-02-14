import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Style.css'

import { useNavigate } from 'react-router-dom'
import ThreeDImageCarousel from "./ThreeDImageCarousel";
import img1 from "./assets/Best-Size-For-ecommerce-Product-Images.png"
import img2 from "./assets/8851296e-8824-4504-a34b-a19b61511472-cover.png"
import img3 from "./assets/a870c365-a15f-45af-84e2-4dc31c85f8b7-cover.png"
import img4 from "./assets/122469-original-1200.jpg"
import img5 from "./assets/9c1246f6b5510b0b6d582356bc2e5ae3.png"

function Home() {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const slides = [
    { id: 1, src: img1 },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
    { id: 4, src: img4 },
    { id: 5, src: img5 }
  ];

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => setData(res.data.products))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <nav className="nav-header">
        <h1>Home</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/contact')}>Cart</button>
          <button onClick={() => navigate('/about')}>Profile</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      <ThreeDImageCarousel slides={slides} autoplay />

      <div className="product-grid">
        {data.map(item => (
          <div className="product-card" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img src={item.thumbnail} alt={item.title} />
              <p><b>{item.title}</b></p>
              <p>Price: ${item.price}</p>
              <p className="product-description">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
