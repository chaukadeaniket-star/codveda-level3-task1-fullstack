import { useState } from "react";
import { Lock, Check } from "lucide-react";

import useCart from "../hooks/useCart";
import Button from "../components/common/Button";

function Checkout() {
  const {
    items,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /*
   * STEP 3 MUST BE CHECKED BEFORE EMPTY CART.
   *
   * After confirming the order we clear the cart.
   * Without this condition, clearing the cart would
   * immediately show "Your bag is empty" instead of
   * the confirmation screen.
   */

  if (!items.length && step !== 3) {
    return (
      <div className="empty-page section">
        <div className="container">
          <h1>Your bag is empty.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page section">

      <div className="container">

        {/* PAGE HEADING */}

        <div className="page-heading">

          <span className="section-label">
            CHRONOVA / CHECKOUT
          </span>

          <h1>
            Complete your order.
          </h1>

        </div>

        <div className="checkout-layout">

          {/* =========================================
              LEFT SIDE
          ========================================= */}

          <div className="checkout-form">

            {/* CHECKOUT STEPS */}

            <div className="checkout-steps">

              <span
                className={
                  step >= 1
                    ? "step-active"
                    : ""
                }
              >
                01 Shipping
              </span>

              <span
                className={
                  step >= 2
                    ? "step-active"
                    : ""
                }
              >
                02 Payment
              </span>

              <span
                className={
                  step >= 3
                    ? "step-active"
                    : ""
                }
              >
                03 Confirmation
              </span>

            </div>

            {/* =====================================
                STEP 1 — SHIPPING
            ===================================== */}

            {step === 1 && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setStep(2);
                }}
              >

                <div className="form-grid">

                  <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                  />

                  <textarea
                    name="address"
                    placeholder="Complete Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />

                </div>

                <Button type="submit">
                  Continue to Payment
                </Button>

              </form>
            )}

            {/* =====================================
                STEP 2 — PAYMENT
            ===================================== */}

            {step === 2 && (
              <div className="payment-placeholder">

                <Lock size={25} />

                <h2>
                  Secure Payment
                </h2>

                <p>
                  Payment gateway integration will be
                  connected to the MERN backend.
                </p>

                <div className="checkout-payment-actions">

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Back to Shipping
                  </button>

                  <Button
                    type="button"
                    onClick={() => {
                      clearCart();
                      setStep(3);
                    }}
                  >
                    Confirm Order
                  </Button>

                </div>

              </div>
            )}

            {/* =====================================
                STEP 3 — CONFIRMATION
            ===================================== */}

            {step === 3 && (
              <div className="payment-placeholder">

                <div className="success-check">
                  <Check size={28} />
                </div>

                <h2>
                  Order Confirmed
                </h2>

                <p>
                  Your order has been successfully
                  prepared for confirmation.
                </p>

                <div className="order-confirmation-details">

                  <div>
                    <span>NAME</span>
                    <strong>{form.name}</strong>
                  </div>

                  <div>
                    <span>EMAIL</span>
                    <strong>{form.email}</strong>
                  </div>

                  <div>
                    <span>PHONE</span>
                    <strong>{form.phone}</strong>
                  </div>

                  <div>
                    <span>DELIVERY</span>
                    <strong>
                      {form.city}, {form.postalCode}
                    </strong>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* =========================================
              RIGHT SIDE — ORDER SUMMARY
          ========================================= */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            {/* PRODUCTS */}

            {items.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >

                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  ₹
                  {(item.price * item.quantity).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>
            ))}

            {/* SUBTOTAL */}

            <div className="checkout-total-line">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal.toLocaleString("en-IN")}
              </strong>

            </div>

            {/* SHIPPING */}

            <div className="checkout-total-line">

              <span>
                Shipping
              </span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping.toLocaleString("en-IN")}`}
              </strong>

            </div>

            {/* TOTAL */}

            <div className="checkout-grand-total">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>

            </div>

          </aside>

        </div>

      </div>

    </div>
  );
}

export default Checkout;