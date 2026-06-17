import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/cart",
        {
          userId: user.id,
          productId,
          quantity: 1,
        }
      );

      alert("Added to Cart!");
    } catch (error) {
      console.log(error);
      alert("Failed to add item");
    }
  };

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        product.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        🛍️ Products
      </h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="mb-4 d-flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory ===
              category
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={() =>
              setSelectedCategory(
                category
              )
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div
            className="col-md-4 mb-4"
            key={product._id}
          >
            <div
              className="card shadow h-100 border-0"
              style={{
                borderRadius: "15px",
              }}
            >
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h4>{product.name}</h4>

                <p className="text-muted">
                  {product.description}
                </p>

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {product.category}
                </p>

                <h5 className="text-success">
                  ₹{product.price}
                </h5>

                <p>
                  Stock:
                  {product.stock}
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    addToCart(product._id)
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center mt-4">
          <h5>No products found</h5>
        </div>
      )}
    </div>
  );
}

export default Products;