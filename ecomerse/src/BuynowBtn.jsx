import React from "react";
import { useNavigate } from "react-router-dom";

function BuynowBtn({ product }) {

  const navigate = useNavigate();

  const handleBuyNow = async () => {

    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Safety check
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user.id,
      productId: product.id,
      quantity: 1
    };

    try {
      const response = await fetch("http://localhost:8080/api/orders/buyNow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error("Order failed");
      }

      const data = await response.json();
      console.log("Order saved successfully:", data);

      alert("Order placed successfully!");

      // Navigate after success
      navigate("/orders");

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing order!");
    }
  };

  return (
    <div>
      <div className="button" onClick={handleBuyNow} style={{ cursor: "pointer" }}>
        <div className="button-wrapper">
          <div className="text">Buy Now</div>

          <span className="icon">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </span>

        </div>
      </div>
    </div>
  );
}

export default BuynowBtn;