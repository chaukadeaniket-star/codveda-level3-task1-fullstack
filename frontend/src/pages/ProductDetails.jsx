import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import watches from "../data/watches";
import useCart from "../hooks/useCart";

function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const watch = useMemo(
    () => watches.find((item) => String(item.id) === String(id)),
    [id]
  );

  if (!watch) {
    return (
      <main className="product-page product-not-found">
        <div>
          <span>404</span>
          <h1>TIMEPIECE NOT FOUND</h1>
          <p>The watch you are looking for does not exist.</p>

          <Link to="/collections" className="product-back-button">
            BACK TO COLLECTION
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(watch);
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <main className="product-page">
      <div className="product-container">

        <Link to="/collections" className="product-back">
          <ArrowLeft size={16} />
          BACK TO COLLECTION
        </Link>

        <section className="product-detail">

          {/* IMAGE */}
          <div className="product-image-section">
            <div className="product-image-frame">
              <img
                src={watch.image}
                alt={watch.name}
                className="product-main-image"
              />
            </div>

            <div className="product-image-caption">
              <span>CHRONOVA</span>
              <span>{watch.categoryLabel}</span>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="product-info">

            <span className="product-category">
              {watch.categoryLabel}
            </span>

            <h1>{watch.name}</h1>

            <div className="product-rating">
              <div className="stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill={index < Math.round(watch.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <span>{watch.rating} / 5.0</span>
            </div>

            <div className="product-price">
              ₹{watch.price.toLocaleString("en-IN")}
            </div>

            <p className="product-description">
              {watch.description}
            </p>

            <div className="product-divider" />

            {/* QUANTITY */}
            <div className="quantity-section">
              <span>QUANTITY</span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              type="button"
              className={`product-add-button ${added ? "added" : ""}`}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />

              {added ? "ADDED TO CART" : "ADD TO CART"}
            </button>

            <Link
              to="/cart"
              className="product-view-cart"
            >
              VIEW CART
            </Link>

            {/* DETAILS */}
            <div className="product-specs">

              <div>
                <span>COLLECTION</span>
                <strong>{watch.categoryLabel}</strong>
              </div>

              <div>
                <span>REFERENCE</span>
                <strong>CHR-{String(watch.id).padStart(3, "0")}</strong>
              </div>

              <div>
                <span>CRAFTED FOR</span>
                <strong>MODERN TIMEKEEPING</strong>
              </div>

            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;