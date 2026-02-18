import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Style.css'
import ThreeDImageCarousel from "./ThreeDImageCarousel";
import img1 from "./assets/Best-Size-For-ecommerce-Product-Images.png"
import img2 from "./assets/8851296e-8824-4504-a34b-a19b61511472-cover.png"
import img3 from "./assets/a870c365-a15f-45af-84e2-4dc31c85f8b7-cover.png"
import img4 from "./assets/122469-original-1200.jpg"
import img5 from "./assets/9c1246f6b5510b0b6d582356bc2e5ae3.png"
import Navbar from './Navbar.jsx'
import InsaneFluidCursor from "./InsaneFluidCursor.jsx";

function Home() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState("")

  const slides = [
    { id: 1, src: img1 },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
    { id: 4, src: img4 },
    { id: 5, src: img5 }
  ]

  const normalizeProduct = (p, source) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    image: p.thumbnail || p.image,
    rating: source === "fake" ? p.rating?.rate : p.rating,
    stock: p.stock ?? "N/A",
    brand: p.brand ?? "N/A",
    category: p.category,
    source
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const dummyRes = await axios.get("https://dummyjson.com/products")
        const fakeRes = await axios.get("https://fakestoreapi.com/products")
        const dummyProducts = dummyRes.data.products.map(p => normalizeProduct(p, "dummy"))
        const fakeProducts = fakeRes.data.map(p => normalizeProduct(p, "fake"))
        const allProducts = [...dummyProducts, ...fakeProducts]
        setData(allProducts)
        setFilteredData(allProducts)
      } catch (err) {
        console.log(err)
      }
    }
    fetchProducts()
  }, [])


  const handleSearch = (text) => {
    setSearchText(text)
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredData(filtered)
  }

//   // ✅ Get padding based on screen size + search state
//  const getPaddingTop = () => {
//   const w = window.innerWidth
  
//   // 📱 MOBILE — screens smaller than 768px
//   if (w <= 767) return searchText ? "150px" : "30px"
  
//   // 📲 TABLET — screens between 768px and 1024px
//   if (w <= 1023) return searchText ? "140px" : "40px"

//   // 🖥️ DESKTOP — screens larger than 1024px
//   return searchText ? "70px" : "30px"
// }

  return (
   <div
  className={`page-container hover-target ${searchText ? "search-active" : ""}`}
>

      <InsaneFluidCursor />
      <Navbar onSearch={handleSearch} />
      <br />

      {searchText.trim() === "" && (
        <ThreeDImageCarousel slides={slides} autoplay />
      )}

      <div className={`product-grid ${searchText ? "search-mode" : ""}`}>
        {filteredData.length === 0 ? (
          <p className="no-products">No Products Found</p>
        ) : (
          filteredData.map(item => (
            <div className="product-card" key={`${item.source}-${item.id}`}>
              <Link to={`/product/${item.source}/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => e.target.src = "/no-image.png"}
                />
                <p><b>{item.title}</b></p>
                <p>Price: ${item.price}</p>
                <p className="product-card-description">{item.description}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home