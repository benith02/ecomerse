import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Style.css'
import StatusButton from './StatusButton'
import BuynowBtn from './BuynowBtn'
import Navbar from './Navbar'
import InsaneFluidCursor from './InsaneFluidCursor'

import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import Typography from '@mui/material/Typography'

const labels = {
  0.5: 'Useless', 1: 'Useless+', 1.5: 'Poor', 2: 'Poor+',
  2.5: 'Ok', 3: 'Ok+', 3.5: 'Good', 4: 'Good+',
  4.5: 'Excellent', 5: 'Excellent+',
}

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

function YourRating() {
  const [value, setValue] = useState(null)
  const [hover, setHover] = useState(-1)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', mt: '6px' }}>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: 'inherit', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        Your Rating
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Rating
          name="user-rating"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(_, newValue) => setValue(newValue)}
          onChangeActive={(_, newHover) => setHover(newHover)}
          emptyIcon={<StarIcon style={{ opacity: 0.35, color: '#fff' }} fontSize="inherit" />}
          sx={{
            fontSize: '1.6rem',
            '& .MuiRating-iconFilled': { color: '#ffd055' },
            '& .MuiRating-iconHover': { color: '#ffe585' },
          }}
        />
        {value !== null && (
          <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: '#00e0c0', fontFamily: 'inherit', minWidth: '72px' }}>
            {labels[hover !== -1 ? hover : value]}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

function QuantitySelector({ quantity, setQuantity, maxStock }) {
  return (
    <div className="quantity-selector">
      <button
        className="qty-btn"
        onClick={() => setQuantity(q => Math.max(1, q - 1))}
      >
        −
      </button>
      <span className="qty-value">{quantity}</span>
      <button
        className="qty-btn"
        onClick={() => setQuantity(q => (maxStock !== 'N/A' ? Math.min(maxStock, q + 1) : q + 1))}
      >
        +
      </button>
    </div>
  )
}

function Product() {
  const { id, source } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgError, setImgError] = useState(false)
  const [selectedImg, setSelectedImg] = useState(null)
  const [wishlisted, setWishlisted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const normalizeProduct = (p, src) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    image: p.thumbnail || p.images?.[0] || p.image,
    images: p.images || [p.thumbnail || p.image],
    rating: src === 'fake' ? p.rating?.rate : p.rating,
    stock: p.stock ?? 'N/A',
    brand: p.brand ?? 'N/A',
    category: p.category,
  })

  useEffect(() => {
    setLoading(true)
    setImgError(false)
    setQuantity(1)

    let url = ''
    if (source === 'dummy') url = `https://dummyjson.com/products/${id}`
    else if (source === 'fake') url = `https://fakestoreapi.com/products/${id}`
    else { setLoading(false); return }

    axios.get(url)
      .then((res) => {
        const normalized = normalizeProduct(res.data, source)
        setProduct(normalized)
        setSelectedImg(normalized.images[0])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id, source])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="product-page">
      <InsaneFluidCursor />
      <Navbar />
      <div className="product-loading">
        <div className="spinner" />
        <p>Loading product...</p>
      </div>
    </div>
  )

  if (!product) return (
    <div className="product-page">
      <InsaneFluidCursor />
      <Navbar />
      <div className="product-loading">
        <p>No product found.</p>
      </div>
    </div>
  )

  return (
    <div className="product-page">
      <InsaneFluidCursor />
      <Navbar />

      <div className="product-wrapper">
        <div className="product-content">

          {/* ── Left Column ── */}
          <div className="product-left-col">
            <div className="product-image-card">
              {!imgError ? (
                <img
                  src={selectedImg}
                  alt={product.title}
                  className="product-image"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="product-image-fallback">
                  <span style={{ fontSize: '3rem' }}>🛍️</span>
                  <p>No Image</p>
                </div>
              )}
            </div>

            {product.images?.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    className={`thumb ${selectedImg === img ? 'active' : ''}`}
                    onClick={() => setSelectedImg(img)}
                  />
                ))}
              </div>
            )}

            <div className="product-actions-row">
              <button
                className={`action-btn ${wishlisted ? 'wishlisted' : ''}`}
                onClick={() => setWishlisted(w => !w)}
              >
                {wishlisted ? '❤️' : '🤍'} {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button className="action-btn" onClick={handleShare}>
                {copied ? '✅ Copied!' : '🔗 Share'}
              </button>
            </div>
          </div>

          {/* ── Info Card ── */}
          <div className="product-box">
            <h2 className="product-title">{product.title}</h2>

            <p className="product-description">
              <b>Description:</b> {product.description}
            </p>

            <div className="product-meta">
              <p><b>Price:</b> <span className="price">${product.price}</span></p>
              <p><b>Rating:</b> {product.rating}</p>
              <p><b>Stock:</b> {product.stock}</p>
              <p><b>Brand:</b> {product.brand}</p>
              <p><b>Category:</b> {product.category}</p>
            </div>

            <div className="your-rating-wrapper">
              <YourRating />
            </div>

            <div className="btn-box">
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxStock={product.stock}
              />
              <BuynowBtn product={product} quantity={quantity} />
              <StatusButton product={product} quantity={quantity} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Product