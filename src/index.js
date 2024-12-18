import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { AppContext } from './AppContext';
import { AdminRoute, AuthenticatedUserRoute } from './components/authorization';
import UserProfile from './pages/UserProfile';
import UserList from './pages/admin/users/UserList';
import UserDetails from './pages/admin/users/UserDetails';

function App() {
  function getStoredCredentials() {
    let data = localStorage.getItem("credentials");
    if (data) {
      let json = JSON.parse(data);
      return json;
    }
    return null;
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
          <Route path="/profile" element={<AuthenticatedUserRoute><UserProfile /></AuthenticatedUserRoute>} />

          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />

          <Route path="/admin/products" element={<AdminRoute><ProductList /></AdminRoute>} />
          <Route path="/admin/products/create" element={<AdminRoute><CreateProduct /></AdminRoute>} />
          <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />

          <Route path="/admin/users" element={<AdminRoute><UserList /></AdminRoute>} />
          <Route path="/admin/users/details/:id" element={<AdminRoute><UserDetails /></AdminRoute>} />

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