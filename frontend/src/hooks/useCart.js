import { useMemo } from "react";
import useCartStore from "../store/cartStore";

function useCart() {
  const items = useCartStore(
    (state) => state.items
  );

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  }, [items]);

  const shipping =
    subtotal >= 5000
      ? 0
      : subtotal > 0
      ? 199
      : 0;

  const total = subtotal + shipping;

  return {
    items,

    addItem,
    removeItem,

    increaseQuantity,
    decreaseQuantity,

    clearCart,

    totalItems,
    subtotal,
    shipping,
    total,
  };
}

export default useCart;