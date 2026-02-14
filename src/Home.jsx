  import React, { useState, useEffect } from 'react'
  import axios from 'axios'
  import { Link } from 'react-router-dom'
  import './Style.css'
  import PrimarySearchAppBar from './PrimarySearchAppBar.jsx'
  import ThreeDImageCarousel from "./ThreeDImageCarousel";
  import img1 from "./assets/Best-Size-For-ecommerce-Product-Images.png"
  import img2 from "./assets/8851296e-8824-4504-a34b-a19b61511472-cover.png"
  import img3 from "./assets/a870c365-a15f-45af-84e2-4dc31c85f8b7-cover.png"
  import img4 from "./assets/122469-original-1200.jpg"
  import img5 from "./assets/9c1246f6b5510b0b6d582356bc2e5ae3.png"
  import DynamicNavigation from './DynamicNavigation.jsx'
  import SearchBar from './SearchBar.jsx'
  function Home() {
    const [data, setData] = useState([])

    const slides = [
      { id: 1, src: img1 },
      { id: 2, src: img2 },
      { id: 3, src: img3 },
      { id: 4, src: img4 },
      { id: 5, src: img5 }
    ]

    // Normalize product from both APIs
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

          const dummyProducts = dummyRes.data.products.map(p =>
            normalizeProduct(p, "dummy")
          )

          const fakeProducts = fakeRes.data.map(p =>
            normalizeProduct(p, "fake")
          )

          setData([...dummyProducts, ...fakeProducts])
        } catch (err) {
          console.log(err)
        }
      }

      fetchProducts()
    }, [])

    return (
      <div>
        {/* <PrimarySearchAppBar /> */}
        <div className='Navbar'>
<h2>Home</h2>
<SearchBar />
        <DynamicNavigation 
    links={[
      { id: "home", label: "Home", href: "#" },
      { id: "products", label: "Products", href: "#products" },
      { id: "contact", label: "Contact", href: "#contact" },
      { id: "about", label: "About", href: "#about" },
    ]}
    showLabelsOnMobile={true}
    />
    </div>

        <br /><br />

        <ThreeDImageCarousel slides={slides} autoplay />

        <div className="product-grid">
          {data.map(item => (
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

                <p className="product-description">
                  {item.description}
                </p>

              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }

  export default Home
