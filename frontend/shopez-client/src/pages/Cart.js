import axios from "axios";
import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/cart"
      );

      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.post(
        "http://localhost:5000/api/orders/checkout",
        {
          userId: user.id,
        }
      );

      console.log(res.data);

      alert("Order Placed Successfully!");

      setCartItems([]);
    } catch (error) {
      console.log(error);

      alert("Checkout Failed");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2>🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="card p-3 mb-3"
            >
              <h4>
                {item.productId.name}
              </h4>

              <p>
                Price: ₹{item.productId.price}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                Total: ₹
                {item.productId.price *
                  item.quantity}
              </p>
            </div>
          ))}

          <h3>
            Grand Total: ₹{totalPrice}
          </h3>

          <button
            className="btn btn-success"
            onClick={checkout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;