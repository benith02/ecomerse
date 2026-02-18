import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Style.css'
import StatusButton from './StatusButton'
import BuynowBtn from './BuynowBtn'
import Navbar from './Navbar'
import InsaneFluidCursor from './InsaneFluidCursor'
import { CartContext } from './CartContext'   // ✅ ADD THIS

function Product() {

  const { id, source } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ Get Add To Cart function
  const { addToCart } = useContext(CartContext)

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
    category: p.category
  })

  // ✅ Add To Cart Click Handler
  const handleAddToCart = () => {
    addToCart(product)
    alert("Added to Cart ✅")
  }

  useEffect(() => {

    setLoading(true)

    let url = ""

    if (source === "dummy") {
      url = `https://dummyjson.com/products/${id}`
    } else if (source === "fake") {
      url = `https://fakestoreapi.com/products/${id}`
    } else {
      setLoading(false)
      return
    }

    axios.get(url)
      .then(res => {
        const normalized = normalizeProduct(res.data, source)
        setProduct(normalized)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

  }, [id, source])

  if (loading) return <h2>Loading...</h2>
  if (!product) return <h2>No product found</h2>

  return (
    <div className='product-page'>

      <InsaneFluidCursor />
      <Navbar />

      <div style={{ marginTop: "100px", marginLeft: "100px" }}>

        <img
          src={product.image}
          alt={product.title}
          width="300"
          className='product-left'
        />

        <div className='product-box'>

          <h2>{product.title}</h2>

          <p><b>Description:</b> {product.description}</p>
          <p><b>Price:</b> ${product.price}</p>
          <p><b>Rating:</b> {product.rating}</p>
          <p><b>Stock:</b> {product.stock}</p>
          <p><b>Brand:</b> {product.brand}</p>
          <p><b>Category:</b> {product.category}</p>

          <div className='btn-box'>
            <BuynowBtn />

            {/* ✅ Add To Cart Connected */}
            <div onClick={handleAddToCart}>
              <StatusButton />
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Product
