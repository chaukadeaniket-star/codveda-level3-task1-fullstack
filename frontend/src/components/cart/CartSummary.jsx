import { ArrowRight } from "lucide-react";
import Button from "../common/Button";

function CartSummary({
  subtotal = 0,
  shipping = 0,
  discount = 0,
  onCheckout,
}) {
  const total = subtotal + shipping - discount;

  return (
    <section className="cart-summary">
      <div className="cart-summary-header">
        <span>Order Summary</span>

        <span className="cart-summary-count">
          CHRONOVA
        </span>
      </div>

      <div className="summary-lines">
        <div>
          <span>Subtotal</span>
          <strong>
            ₹{subtotal.toLocaleString("en-IN")}
          </strong>
        </div>

        <div>
          <span>Shipping</span>
          <strong>
            {shipping === 0
              ? "FREE"
              : `₹${shipping.toLocaleString("en-IN")}`}
          </strong>
        </div>

        {discount > 0 && (
          <div className="discount-line">
            <span>Discount</span>
            <strong>
              -₹{discount.toLocaleString("en-IN")}
            </strong>
          </div>
        )}
      </div>

      <div className="summary-total">
        <span>Total</span>

        <strong>
          ₹{total.toLocaleString("en-IN")}
        </strong>
      </div>

      <Button
        fullWidth
        onClick={onCheckout}
      >
        Proceed to Checkout
        <ArrowRight size={16} />
      </Button>

      <p className="secure-payment">
        Secure checkout · Encrypted payment
      </p>
    </section>
  );
}

export default CartSummary;