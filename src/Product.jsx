import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './Style.css'
import StatusButton from './StatusButton'
import BuynowBtn from './BuynowBtn'
import Navbar from './Navbar'

function Product() {
  const { id, source } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

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
// const handleSearch = (text) => {
//   console.log("Search on product page:", text);
// };

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
      {/* Back button */}
      <Link to="/">
        <button className='back-btn'>&lt; Home</button>
      </Link>
      <div>
{/* <Navbar /> */}
      </div>
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
          <StatusButton />
        </div>
      </div>
    </div>
  )
}

export default Product
