
import { useEffect, useState } from "react";

function MyCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

import React, { useContext } from "react";
import Navbar from "./Navbar";
import { CartContext } from "./CartContext";
import "./Cart.css";

function MyCart() {

  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-page">

      <Navbar />

      <div className="cart-container">

        <h2 className="cart-heading">My Cart</h2>

        {cartItems.length === 0 ? (

          // ✅ PREMIUM EMPTY CART UI
          <div className="empty-cart-box">

            <div className="empty-icon">🛒</div>

            <h2 className="empty-title">Your Cart is Empty</h2>

            <p className="empty-sub">
              Looks like you haven't added anything yet.
            </p>

            <button
              className="shop-btn"
              onClick={() => window.location.href = "/"}
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          // ✅ PRODUCT GRID
          <div className="cart-grid">

            {cartItems.map((item, index) => (

              <div key={index} className="cart-card">

                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-image"
                />

                <h3 className="cart-title">
                  {item.title}
                </h3>

                <p className="cart-price">
                  ${item.price}
                </p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  Remove ✖
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyCart;

