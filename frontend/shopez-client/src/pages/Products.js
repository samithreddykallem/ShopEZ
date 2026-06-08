import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Products</h2>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search by product name or category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="row">
        {filteredProducts.map((product) => (
          <div
            className="col-md-4"
            key={product._id}
          >
            <div className="card p-3 mb-3 shadow">
              <h4>{product.name}</h4>

              <p>{product.description}</p>

              <p>
                Category: {product.category}
              </p>

              <h5>
                ₹{product.price}
              </h5>

              <p>
                Stock: {product.stock}
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  addToCart(product._id)
                }
              >
                Add To Cart
              </button>
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