import api from "./api";

export async function createOrder(orderData) {
  return api.post(
    "/orders",
    orderData
  );
}

export async function getMyOrders() {
  return api.get("/orders/my-orders");
}

export async function getOrderById(orderId) {
  return api.get(
    `/orders/${orderId}`
  );
}

export async function cancelOrder(orderId) {
  return api.patch(
    `/orders/${orderId}/cancel`
  );
}

export async function updateOrderStatus(
  orderId,
  status
) {
  return api.patch(
    `/orders/${orderId}/status`,
    { status }
  );
}