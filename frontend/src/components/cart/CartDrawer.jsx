import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-drawer-overlay">
      <div
        className="cart-drawer-backdrop"
        onClick={onClose}
      />

      <aside className="cart-drawer">
        <header className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={18} />

            <div>
              <span>Your Bag</span>

              <small>
                {items.length}{" "}
                {items.length === 1
                  ? "item"
                  : "items"}
              </small>
            </div>
          </div>

          <button
            className="cart-drawer-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </header>

        <div className="cart-drawer-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <ShoppingBag size={24} />
              </div>

              <h3>Your bag is empty</h3>

              <p>
                Discover our collection of
                precision-crafted watches.
              </p>

              <button
                className="empty-cart-button"
                onClick={onClose}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={onRemove}
                  />
                ))}
              </div>

              <CartSummary
                subtotal={subtotal}
                shipping={subtotal >= 5000 ? 0 : 199}
                onCheckout={onCheckout}
              />
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;