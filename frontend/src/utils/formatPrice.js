import {
  CURRENCY,
} from "./constants";

export function formatPrice(
  price,
  currency = CURRENCY
) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(number) {
  return new Intl.NumberFormat("en-IN").format(
    number
  );
}

export function calculateDiscount(
  originalPrice,
  currentPrice
) {
  if (
    !originalPrice ||
    originalPrice <= currentPrice
  ) {
    return 0;
  }

  return Math.round(
    ((originalPrice - currentPrice) /
      originalPrice) *
      100
  );
}

export default formatPrice;