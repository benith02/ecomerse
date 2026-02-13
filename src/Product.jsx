import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Style.css'
import StatusButton from './StatusButton'
import { Link } from 'react-router-dom'
import BuynowBtn from './BuynowBtn'
function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <h2>Loading...</h2>
  if (!product) return <h2>No product found</h2>

  return (
    // 
    //   <h1>{product.title}</h1>
    //   <div c<div className='product-page'>lassName="product-details">
    //     <div className='product-container'>
    //     <div className='product-left'>
    //   <img src={product.thumbnail} alt={product.title} width="300" />
    //     </div>
    //   </div>
    //   <div className='product-details-box'>

    //   <p><b>Description:</b> {product.description}</p>
    //   <p><b>Price:</b> ${product.price}</p>
    //   <p><b>Rating:</b> {product.rating}</p>
    //   <p><b>Stock:</b> {product.stock}</p>
    //   <p><b>Brand:</b> {product.brand}</p>
    //   <p><b>Category:</b> {product.category}</p>
    //     <div className='product-right'>
     
    //   <button className='buy-btn'>Buy Now</button>
    //   <StatusButton className='cart-btn'/>
    //   </div>
    //   </div>
    //   </div>
    // </div>
    <div className='product-page'>
      {/* back btn */}
     <Link to="/"><button className='back-btn'> &lt; Home</button>
     {/* <div className='back-arrow'>
  <svg
    width="45"
    height="45"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
      fill="currentColor"
    />
  </svg>
</div> */}
</Link>
<img src={product.thumbnail} alt={product.title} width="300" className='product-left' />
<div className='product-box'>
  <h2>{product.title}</h2>
<p><b>Description:</b> {product.description}</p>
<p><b>Price:</b> ${product.price}</p>
<p><b>Rating:</b> {product.rating}</p>
<p><b>Stock:</b> {product.stock}</p>
<p><b>Brand:</b> {product.brand}</p>
<p><b>Category:</b> {product.category}</p>
<div className='btn-box'>

<BuynowBtn/>
<StatusButton   />
</div>
</div>
    </div>
  )
}

export default Product
