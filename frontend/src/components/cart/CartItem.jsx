import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <article className="cart-item">
      <div className="cart-item-image">
        <img
          src={item.image}
          alt={item.name}
        />
      </div>

      <div className="cart-item-content">
        <div className="cart-item-top">
          <div>
            <p className="cart-item-category">
              {item.category || "Luxury Watch"}
            </p>

            <h3>{item.name}</h3>
          </div>

          <button
            className="cart-remove"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="cart-item-bottom">
          <div className="quantity-control">
            <button
              onClick={() => onDecrease(item.id)}
              disabled={item.quantity <= 1}
            >
              <Minus size={13} />
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => onIncrease(item.id)}
            >
              <Plus size={13} />
            </button>
          </div>

          <span className="cart-item-price">
            ₹{(
              item.price * item.quantity
            ).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </article>
  );
}

export default CartItem;