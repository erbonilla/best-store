import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});

  // Wrap getProductDetails in useCallback to prevent unnecessary recreation
  const getProductDetails = useCallback(async () => {
    try {
      const response = await fetch(process.env.REACT_APP_WEBAPI_URL + `/products/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data);
      } else {
        alert("Unable to get the product details");
      }
    } catch (error) {
      alert("Unable to connect to the server");
    }
  }, [params.id]); // Dependency: params.id (fetch URL depends on this)

  // Run getProductDetails when the component mounts or params.id changes
  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={process.env.REACT_APP_WEBAPI_URL + `/images/` + product.imageFilename}
            className="img-fluid mb-3"
            alt={product.name || "Product Image"}
            width="250"
          />
        </div>
        <div className="col-md-8">
          <h3 className="mb-3">{product.name}</h3>
          <h3 className="mb-3">{product.price}$</h3>
          <button type="button" className="btn btn-warning btn-sm">
            Add to Cart <i className="bi bi-cart4"></i>
          </button>

          <hr />

          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Brand</div>
            <div className="col-sm-9">{product.brand}</div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-3 fw-bold">Category</div>
            <div className="col-sm-9">{product.category}</div>
          </div>

          <div className="fw-bold">Description</div>
          <div style={{ whiteSpace: "pre-line" }}>
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}