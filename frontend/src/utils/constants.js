export const APP_NAME = "CHRONOVA";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const CURRENCY = "INR";

export const CURRENCY_SYMBOL = "₹";

export const FREE_SHIPPING_LIMIT = 5000;

export const SHIPPING_FEE = 199;

export const PRODUCT_CATEGORIES = [
  "Automatic",
  "Chronograph",
  "Dive",
  "Luxury",
  "Minimal",
  "Skeleton",
];

export const ORDER_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const STORAGE_KEYS = {
  CART: "chronova_cart",
  AUTH: "chronova_auth",
  WISHLIST: "chronova_wishlist",
};

export const ROUTES = {
  HOME: "/",
  COLLECTIONS: "/collections",
  CONFIGURATOR: "/configurator",
  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  ORDERS: "/orders",
};