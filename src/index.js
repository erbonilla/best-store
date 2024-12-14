import React from 'react';
import ReactDOM from 'react-dom/client';
import { Footer, Navbar } from './components/layout';
import Home from './pages/Home';

function App() {
  return (

    <BrowserRouter>
  
      <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />

        </Routes>
      <Footer />
   
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);