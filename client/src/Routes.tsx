import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/Nav";
import HomePage from "./pages/AllProduct";
import LogInPage from "./pages/LogIn";
import ProductPage from "./pages/Product";
import AdminPage from "./pages/Admin";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";

const Routing = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Nav />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/product" element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/user" element={<UserProfile />} />
        {/* <Route path=":userId" element={<UserProfile />}/> */}
        {/* <Route path="new" element={<NewUser />}/> */}

        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route
          path="/*"
          element={
            <main style={{ paddingTop: "80px" }}>
              <p>There's nothing here!</p>
              <p>There's nothing here!</p>
              <p>There's nothing here!</p>
              <p>There's nothing here!</p>
              <p>There's nothing here!</p>
              <p>There's nothing here!</p>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
