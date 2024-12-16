import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="Best Store"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Best Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Admin
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/admin/products">
                    Manage Products
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>&copy; 2024 Best Store. All rights reserved.</p>
    </footer>
  );
}