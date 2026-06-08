import axios from "axios";
import { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [editingId, setEditingId] =
    useState(null);

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

  const addProduct = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          description,
          category,
          price,
          stock,
        }
      );

      alert("Product Added Successfully");

      clearForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setName(product.name);
    setDescription(product.description);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
  };

  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editingId}`,
        {
          name,
          description,
          category,
          price,
          stock,
        }
      );

      alert("Product Updated Successfully");

      setEditingId(null);

      clearForm();
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setStock("");
  };

  return (
    <div className="container mt-4">
      <h2>👨‍💼 Admin Dashboard</h2>

      <div className="card p-3 mb-4 shadow">
        <h4>
          {editingId
            ? "Update Product"
            : "Add Product"}
        </h4>

        <input
          className="form-control mb-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />

        {editingId ? (
          <button
            className="btn btn-warning"
            onClick={updateProduct}
          >
            Update Product
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={addProduct}
          >
            Add Product
          </button>
        )}
      </div>

      <h4>All Products</h4>

      <div className="row">
        {products.map((product) => (
          <div
            className="col-md-4"
            key={product._id}
          >
            <div className="card p-3 mb-3 shadow">
              <h5>{product.name}</h5>

              <p>
                {product.description}
              </p>

              <p>
                Category:
                {" "}
                {product.category}
              </p>

              <p>
                Price:
                ₹{product.price}
              </p>

              <p>
                Stock:
                {" "}
                {product.stock}
              </p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    editProduct(product)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deleteProduct(
                      product._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;