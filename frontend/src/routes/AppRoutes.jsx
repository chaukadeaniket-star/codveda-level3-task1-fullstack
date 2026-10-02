import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Collections from "../pages/Collections";
import ProductDetails from "../pages/ProductDetails";
import Configurator from "../pages/Configurator";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import About from "../pages/About";


import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>

      {/* =========================================
          MAIN WEBSITE
         ========================================= */}

      <Route element={<MainLayout />}>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Products */}
        <Route
          path="/collections"
          element={<Collections />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Product Configurator */}
        <Route
          path="/configurator"
          element={<Configurator />}
        />

        {/* Shopping */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Account */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />
         <Route
    path="/about"
    element={<About />}
  />


        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;