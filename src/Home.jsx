import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Style.css'
import Carousel from './Carousel'
import Login from './Login.jsx'
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
const [images, setImages] = useState([])
const [images2, setImages2] = useState([])

const slides = [
  { id: 1, src: img1 },
  { id: 2, src: img2 },
  { id: 3, src: img3 },
  { id: 4, src: img4 },
  { id: 5, src: img5 }
];
useEffect(() => {

//shopping
// ecommerce
// product
// fashion
// store
// clothes
// lifestyle product

  axios.get(
  `https://pixabay.com/api/?key=54610413-461a954816927f90e97ae4aad&q=lifestyle_product&image_type=photo&orientation=horizontal&per_page=12`
)
.then(res => {
  const urls = res.data.hits.map(img => img.webformatURL)
  setImages(urls)
})


//   axios.get(
//   `https://pixabay.com/api/?key=54610413-461a954816927f90e97ae4aad&q=store&image_type=photo&orientation=horizontal&per_page=12`
// )
// .then(res => {
//   const urls2 = res.data.hits.map(img => img.webformatURL)
//   setImages2(urls2)
// })
}
)


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
{/* {images.length > 0 && <Carousel images={images} />} */}
{/* {images2.length > 0 && <Carousel images={images2} />} */}


      <div className="product-grid">
  {data.map(item => (
    <div className="product-card" key={item.id}>
      <img src={item.thumbnail} alt={item.title} />
      <p><b>{item.title}</b></p>
      <p>Price: ${item.price}</p>
      <p>{item.description}</p>
      <p>Category: {item.category}</p>
      <p>Rating: {item.rating}</p>
    </div>
  ))}
</div>

    </div>
  )
}

export default Home
