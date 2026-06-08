import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `http://localhost:5000/api/orders/${user.id}`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card p-3 mb-3"
          >
            <h5>
              Order ID:
              {order._id}
            </h5>

            <p>
              Status:
              {order.status}
            </p>

            <p>
              Total:
              ₹{order.totalAmount}
            </p>

            <p>
              Ordered On:
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;