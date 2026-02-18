import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";
import Product from "./Product";

function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate random delivery between 2–4 days
    const days = Math.floor(Math.random() * 3) + 2;
    const today = new Date();
    today.setDate(today.getDate() + days);

    const newOrder = {
      id: Date.now(),
      name: "Sample Product",
       
      paymentMethod: paymentMethod,
      orderDate: new Date().toDateString(),
      deliveryDate: today.toDateString(),
    };

    // Get existing orders
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Add new order
    existingOrders.push(newOrder);

    // Save to localStorage
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert("Order Placed Successfully!");

    // Redirect to Your Orders page
    navigate("/your-orders");
  };

  return (
    <div className="page-wrapper">
      <div className="order-container">
        <h2>Order Details</h2>

        <form onSubmit={handleSubmit} className="order-form">
          
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea placeholder="Enter your address" required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" required />
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit / Debit Card
            </label>
          </div>

          <button className="place-order-btn" type="submit">
            Place Order
          </button>
        </form>

        {paymentMethod && (
          <p className="selected-payment">
            Selected Payment: {paymentMethod}
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
