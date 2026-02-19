import { useEffect, useState } from "react";
import "./YourOrders.css";

function YourOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2>Your Orders</h2>

        {orders.length === 0 ? (
          <p className="no-orders">No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              
              {/* ✅ Product Image */}
              <img
                src={order.image}
                alt={order.name}
                className="order-image"
              />

              <h4>{order.name}</h4>
              <p>Order Date: {order.orderDate}</p>
              <p>Delivery Date: {order.deliveryDate}</p>
              <p>Payment: {order.paymentMethod}</p>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default YourOrders;
