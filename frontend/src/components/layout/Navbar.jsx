import { useState } from "react";

import {
  Search,
  ShoppingBag,
  UserRound,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import MobileMenu from "./MobileMenu";

import watches from "../../data/watches";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  /* =========================================
     AUTH
  ========================================= */

  const {
    isAuthenticated,
  } = useAuth();


  /* =========================================
     CART
  ========================================= */

  const {
    totalItems,
  } = useCart();


  /* =========================================
     SEARCH
  ========================================= */

  const results = watches.filter(
    (watch) => {

      const query =
        searchQuery
          .toLowerCase()
          .trim();

      if (!query) {
        return false;
      }

      return (
        watch.name
          .toLowerCase()
          .includes(query) ||

        watch.category
          .toLowerCase()
          .includes(query) ||

        watch.categoryLabel
          .toLowerCase()
          .includes(query)
      );
    }
  );


  /* =========================================
     CLOSE SEARCH
  ========================================= */

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };


  /* =========================================
     KEYBOARD
  ========================================= */

  const handleSearchKeyDown = (event) => {

    if (event.key === "Escape") {
      closeSearch();
    }

  };


  return (
    <>
      {/* =====================================
          NAVBAR
      ====================================== */}

      <header className="navbar">

        <div className="navbar-inner">


          {/* =================================
              MOBILE MENU
          ================================== */}

          <button
            type="button"
            className="navbar-menu"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Open menu"
          >

            <Menu size={20} />

          </button>


          {/* =================================
              LOGO
          ================================== */}

          <Link
            to="/"
            className="navbar-logo"
          >
            CHRONOVA
          </Link>


          {/* =================================
              DESKTOP NAVIGATION
          ================================== */}

          <nav className="navbar-links">

            <Link to="/">
              Home
            </Link>

            <Link to="/collections">
              Collection
            </Link>

            <Link to="/configurator">
              Configurator
            </Link>

            <Link to="/about">
              About
            </Link>

          </nav>


          {/* =================================
              ACTIONS
          ================================== */}

          <div className="navbar-actions">


            {/* ===============================
                SEARCH
            ================================ */}

            <button
              type="button"
              aria-label="Search"
              data-cursor-text="Search"
              onClick={() =>
                setSearchOpen(true)
              }
            >

              <Search size={18} />

            </button>


            {/* ===============================
                ACCOUNT
            ================================ */}

            <Link
              to={
                isAuthenticated
                  ? "/profile"
                  : "/login"
              }
              className="navbar-action-link"
              aria-label="Account"
              data-cursor-text="Account"
            >

              <UserRound size={18} />

            </Link>


            {/* ===============================
                CART
            ================================ */}

            <Link
              to="/cart"
              className="navbar-cart"
              aria-label="Shopping bag"
              data-cursor-text="Cart"
            >

              <ShoppingBag size={18} />

              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
                </span>
              )}

            </Link>

          </div>

        </div>

      </header>


      {/* =====================================
          SEARCH OVERLAY
      ====================================== */}

      {searchOpen && (

        <div className="search-overlay">


          <div className="search-overlay-inner">


            {/* ===============================
                SEARCH HEADER
            ================================ */}

            <div className="search-top">

              <span>
                SEARCH CHRONOVA
              </span>

              <button
                type="button"
                className="search-close"
                onClick={closeSearch}
                aria-label="Close search"
              >

                <X size={24} />

              </button>

            </div>


            {/* ===============================
                SEARCH INPUT
            ================================ */}

            <div className="search-input-wrapper">

              <Search size={25} />


              <input
                autoFocus
                type="text"
                placeholder="Search watches, collections..."
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleSearchKeyDown
                }
                aria-label="Search watches"
              />


              {searchQuery && (

                <button
                  type="button"
                  className="search-clear"
                  onClick={() =>
                    setSearchQuery("")
                  }
                >
                  CLEAR
                </button>

              )}

            </div>


            {/* ===============================
                SEARCH RESULTS
            ================================ */}

            <div className="search-results">


              {/* EMPTY SEARCH */}

              {!searchQuery && (

                <div className="search-empty">

                  <span>
                    SEARCH
                  </span>

                  <p>
                    Find your next
                    CHRONOVA timepiece.
                  </p>

                </div>

              )}


              {/* NO RESULTS */}

              {searchQuery &&
                results.length === 0 && (

                  <div className="search-empty">

                    <span>
                      NO RESULTS
                    </span>

                    <p>
                      No watches found for
                      "{searchQuery}".
                    </p>

                  </div>

                )}


              {/* RESULTS */}

              {results.length > 0 && (

                <>

                  <div className="search-result-count">

                    {results.length}

                    {" RESULT"}

                    {results.length > 1
                      ? "S"
                      : ""}

                  </div>


                  <div className="search-result-grid">

                    {results.map(
                      (watch) => (

                        <Link
                          key={watch.id}
                          to={`/product/${watch.id}`}
                          className="search-result-card"
                          onClick={closeSearch}
                        >


                          {/* IMAGE */}

                          <div className="search-result-image">

                            <img
                              src={watch.image}
                              alt={watch.name}
                            />

                          </div>


                          {/* INFO */}

                          <div className="search-result-info">

                            <span>
                              {
                                watch.categoryLabel
                              }
                            </span>

                            <h3>
                              {watch.name}
                            </h3>

                            <p>
                              ₹
                              {watch.price.toLocaleString(
                                "en-IN"
                              )}
                            </p>

                          </div>

                        </Link>

                      )
                    )}

                  </div>

                </>

              )}

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          MOBILE MENU
      ====================================== */}

      <MobileMenu
        isOpen={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

    </>
  );
}

export default Navbar;