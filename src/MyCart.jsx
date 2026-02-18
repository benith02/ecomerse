import { useEffect, useState } from "react";

export default function MyCart() {
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
