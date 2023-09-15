// React Router Dom Import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
// Pages
import Home from "./pages/Home";
import User from "./pages/User";
import Products from "./pages/Products";
import MyInvoice from "./pages/MyInvoice";
import Invoices from "./pages/Invoices";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./redux/actions/productActions";
import { Toaster } from "react-hot-toast";
import { getUserDetails } from "./redux/actions/userActions";
import { getAllInvoices } from "./redux/actions/invoiceActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getUserDetails());
    dispatch(getAllInvoices());
  }, []);
  return (
    <>
      <Router>
        <Header />
        <ScrollToTop />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/products" element={<Products />} />
          <Route path="/my-invoice" element={<MyInvoice />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
