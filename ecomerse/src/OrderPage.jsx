import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OrderPage.css";

function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get product from BuyNow button
  const product = location.state?.product;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product) {
      alert("No product selected!");
      return;
    }

    // Generate delivery date
    const days = Math.floor(Math.random() * 3) + 2;
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + days);

    // ✅ Correct Order Object
    const newOrder = {
      id: Date.now(),
      name: product.name,
      image: product.image,   // ⭐⭐⭐ MOST IMPORTANT
      paymentMethod: paymentMethod,
      orderDate: new Date().toDateString(),
      deliveryDate: delivery.toDateString(),
    };

    // Get existing orders
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Add new order
    existingOrders.push(newOrder);

    // Save
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert("Order Placed Successfully!");

    navigate("/your-orders");
  };

  return (
    <div className="page-wrapper">
      <div className="order-container">
        <h2>Order Details</h2>

        {/* ✅ Show Product Preview */}
        {product && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "150px" }}
            />
            <h4>{product.name}</h4>
          </div>
        )}

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
            <input type="number" placeholder="Enter phone number" required />
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Card
            </label>
          </div>

          <button className="place-order-btn" type="submit">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
