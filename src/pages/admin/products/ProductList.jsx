import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // Fetch products from JSON server
  useEffect(() => {
    fetch("http://localhost:4000/products?_sort=id&_order=desc")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/admin/products/create"
            role="button"
          >
            Create Product
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}$</td>
              <td>
                <img
                  src={`http://localhost:4000/images/${product.imageFilename}`}
                  alt={product.name}
                  width="100"
                />
              </td>
              <td>{product.createdAt.slice(0, 10)}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <Link
                  className="btn btn-primary btn-sm me-1"
                  to={`/admin/products/edit/${product.id}`}
                >
                  Edit
                </Link>
                <button type="button" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}