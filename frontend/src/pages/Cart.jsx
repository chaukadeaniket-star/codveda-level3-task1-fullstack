import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

import useCart from "../hooks/useCart";

function Cart() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    total,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart-page cart-empty-page">
        <div className="cart-empty">
          <span>YOUR BAG</span>

          <h1>YOUR CART IS EMPTY</h1>

          <p>
            Discover the CHRONOVA collection and find your next timepiece.
          </p>

          <Link to="/collections" className="cart-shop-button">
            EXPLORE COLLECTION
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">

        <Link to="/collections" className="cart-back">
          <ArrowLeft size={16} />
          CONTINUE SHOPPING
        </Link>

        <div className="cart-heading">
          <div>
            <span>CHRONOVA</span>
            <h1>YOUR BAG</h1>
          </div>

          <span className="cart-item-count">
            {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
          </span>
        </div>

        <section className="cart-layout">

          {/* ITEMS */}

          <div className="cart-items">

            {items.map((item) => (
              <article className="cart-item" key={item.id}>

                <Link
                  to={`/product/${item.id}`}
                  className="cart-item-image"
                >
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="cart-item-info">

                  <span>{item.categoryLabel}</span>

                  <Link to={`/product/${item.id}`}>
                    <h2>{item.name}</h2>
                  </Link>

                  <p>
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  <div className="cart-item-actions">

                    <div className="cart-quantity">

                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={15} />
                      REMOVE
                    </button>

                  </div>
                </div>

                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </div>

              </article>
            ))}

            <button
              type="button"
              className="cart-clear"
              onClick={clearCart}
            >
              CLEAR CART
            </button>

          </div>

          {/* SUMMARY */}

          <aside className="cart-summary">

            <span className="cart-summary-label">
              ORDER SUMMARY
            </span>

            <div className="cart-summary-row">
              <span>SUBTOTAL</span>
              <strong>
                ₹{subtotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="cart-summary-row">
              <span>SHIPPING</span>
              <strong>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping.toLocaleString("en-IN")}`}
              </strong>
            </div>

            {shipping > 0 && (
              <p className="cart-shipping-note">
                Free shipping on orders above ₹5,000.
              </p>
            )}

            <div className="cart-summary-divider" />

            <div className="cart-total-row">
              <span>TOTAL</span>
              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            <Link
              to="/checkout"
              className="cart-checkout-button"
            >
              PROCEED TO CHECKOUT
            </Link>

            <div className="cart-secure">
              <span>SECURE CHECKOUT</span>
              <span>•</span>
              <span>CHRONOVA</span>
            </div>

          </aside>

        </section>
      </div>
    </main>
  );
}

export default Cart;