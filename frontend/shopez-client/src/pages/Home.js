import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container text-center">
        <h1
          className="fw-bold"
          style={{
            fontSize: "5rem",
          }}
        >
          🛒 ShopEZ
        </h1>

        <p
          className="lead mt-3"
          style={{
            fontSize: "1.5rem",
          }}
        >
          Your One-Stop Online Shopping
          Destination
        </p>

        <p className="mb-4">
          Discover premium products,
          amazing deals, and a seamless
          shopping experience.
        </p>

        <Link
          to="/products"
          className="btn btn-light btn-lg px-5 py-3"
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
}

export default Home;