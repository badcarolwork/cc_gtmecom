import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./components/navbar/NavBar";
import data from "./datas.json";
import Footer from "./components/Footer";
import ProductsPage from "./components/products/ProductsListPage";
import HomePage from "./components/home/HomePage";
import CheckoutPage from "./components/cart/CheckoutPage";
import { CartProvider } from "./components/cart/CartContext";
import PaymentPage from "./components/cart/PaymentPage";

function App() {
  return (
    <div className="fluid">
      <CartProvider>
        <Router basename="/cc_gtmecom/">
          <NavBar categories={data.categories} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:cat_id" element={<ProductsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Router>
      </CartProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
