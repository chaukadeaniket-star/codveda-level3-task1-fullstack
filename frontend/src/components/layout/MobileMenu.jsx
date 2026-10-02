import {
  X,
  ArrowUpRight,
} from "lucide-react";

import { useEffect } from "react";
import { Link } from "react-router-dom";

function MobileMenu({
  isOpen,
  onClose,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const links = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Collection",
      path: "/collections",
    },
    {
      label: "Configurator",
      path: "/configurator",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="mobile-menu">

      {/* HEADER */}
      <div className="mobile-menu-header">

        <Link
          to="/"
          className="navbar-logo"
          onClick={onClose}
        >
          CHRONOVA
        </Link>

        <button
          type="button"
          className="mobile-menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

      </div>


      {/* NAVIGATION */}
      <nav className="mobile-menu-links">

        {links.map((link, index) => (
          <Link
            key={link.label}
            to={link.path}
            onClick={onClose}
          >

            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <strong>
              {link.label}
            </strong>

            <ArrowUpRight size={18} />

          </Link>
        ))}

      </nav>


      {/* FOOTER */}
      <div className="mobile-menu-footer">

        <span>
          CHRONOVA
        </span>

        <span>
          TIME / DESIGN / PRECISION
        </span>

      </div>

    </div>
  );
}

export default MobileMenu;