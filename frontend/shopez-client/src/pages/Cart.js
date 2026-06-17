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

      console.log("Cart Data:", res.data);

      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (
    cartId,
    quantity
  ) => {
    try {
      if (quantity < 1) return;

      console.log(
        "Updating Cart:",
        cartId,
        quantity
      );

      await axios.put(
        `http://localhost:5000/api/cart/${cartId}`,
        {
          quantity,
        }
      );

      fetchCart();
    } catch (error) {
      console.log(
        "Update Error:",
        error.response?.data || error
      );
    }
  };

  const removeItem = async (cartId) => {
    try {
      console.log(
        "Removing Cart:",
        cartId
      );

      await axios.delete(
        `http://localhost:5000/api/cart/${cartId}`
      );

      fetchCart();
    } catch (error) {
      console.log(
        "Delete Error:",
        error.response?.data || error
      );
    }
  };

  const checkout = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/orders/checkout",
        {
          userId: user.id,
        }
      );

      alert(
        "Order Placed Successfully!"
      );

      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Checkout Failed");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.productId.price *
        item.quantity,
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
              className="card p-3 mb-3 shadow"
            >
              <h4>
                {item.productId?.name}
              </h4>

              <p>
                Price:
                ₹
                {item.productId?.price}
              </p>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    updateQuantity(
                      item._id,
                      item.quantity - 1
                    )
                  }
                >
                  -
                </button>

                <span className="fw-bold">
                  {item.quantity}
                </span>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    updateQuantity(
                      item._id,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>

              <p className="mt-3">
                Total:
                ₹
                {item.productId?.price *
                  item.quantity}
              </p>

              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  removeItem(item._id)
                }
              >
                🗑 Remove Item
              </button>
            </div>
          ))}

          <div className="card p-4 shadow">
            <h3>
              Grand Total:
              ₹{totalPrice}
            </h3>

            <button
              className="btn btn-success mt-3"
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;