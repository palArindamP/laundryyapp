import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";

import RegisterPage from "../pages/RegisterPage/RegisterPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderListPage from "../pages/OrderListPage/OrderListPage";

export default function MyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* <Route path="home" element={<HomePage />}> */}
        {/* <Route index element={<CreateOrderButtonPage />} /> */}
        <Route path="make-order" element={<OrderPage />} />
        <Route path="view-order" element={<OrderListPage />} />
      </Routes>
    </Router>
  );
}
