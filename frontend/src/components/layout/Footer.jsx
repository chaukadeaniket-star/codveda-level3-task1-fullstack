import {
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      {/* =========================
          FOOTER MAIN
         ========================= */}

      <div className="footer-main container">

        {/* BRAND */}
        <div className="footer-brand">

          <span className="footer-logo">
            CHRONOVA
          </span>

          <p>
            Time, reimagined.
            <br />
            Precision without compromise.
          </p>

          <button
            type="button"
            className="footer-back-top"
            onClick={handleBackToTop}
          >
            <span>
              Back to top
            </span>

            <ArrowUpRight size={15} />
          </button>

        </div>


        {/* EXPLORE */}
        <div className="footer-column">

          <span className="footer-heading">
            Explore
          </span>

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

        </div>


        {/* CUSTOMER */}
        <div className="footer-column">

          <span className="footer-heading">
            Customer
          </span>

          <Link to="/profile">
            Account
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/shipping">
            Shipping
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        {/* SOCIAL */}
        <div className="footer-column">

          <span className="footer-heading">
            Follow
          </span>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            X / Twitter
          </a>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
         ========================= */}

      <div className="footer-bottom container">

        <span>
          © 2026 CHRONOVA
        </span>

        <span>
          INDIA / WORLD
        </span>

        <span>
          PRIVACY · TERMS
        </span>

      </div>

    </footer>
  );
}

export default Footer;