import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout.jsx';
import Home from './pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import ProductList from './pages/admin/products/ProductList.jsx';
import CreateProduct from './pages/admin/products/CreateProduct.jsx';
import EditProduct from './pages/admin/products/EditProduct.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import { AppContext } from './AppContext.jsx';
import { AdminRoute, AuthenticatedUserRoute } from './components/authorization.jsx';
import UserProfile from './pages/UserProfile.jsx';

// Import these two lines to fix the errors:
import UserList from './pages/admin/users/UserList.jsx';
import UserDetails from './pages/admin/users/UserDetails.jsx';

function App() {
  function getStoredCredentials() {
    let data = localStorage.getItem("credentials");
    return data ? JSON.parse(data) : null;
  }

  const [userCredentials, setUserCredentials] = useState(getStoredCredentials());

  useEffect(() => {
    let str = JSON.stringify(userCredentials);
    localStorage.setItem("credentials", str);
  }, [userCredentials]);

  return (
    <AppContext.Provider value={{ userCredentials, setUserCredentials }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/profile"
            element={
              <AuthenticatedUserRoute>
                <UserProfile />
              </AuthenticatedUserRoute>
            }
          />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <ProductList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users/details/:id"
            element={
              <AdminRoute>
                <UserDetails />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);