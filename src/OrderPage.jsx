import { useState } from "react";
import "./OrderPage.css";

function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  return (
    <div className="page-wrapper">
      <div className="order-container">
        <h2>Order Details</h2>

        <form onSubmit={handleSubmit}>
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
            <input type="text" placeholder="Enter phone number" required />
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>

            <div className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </div>

            <div className="payment-option">
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>UPI</span>
            </div>

            <div className="payment-option">
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Credit / Debit Card</span>
            </div>
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
