import {
  API_BASE_URL,
} from "../utils/constants";

async function request(
  endpoint,
  options = {}
) {
  const token =
    localStorage.getItem("chronova_token");

  const config = {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  // Attach JWT token
  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }
let response;

try {
  response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    config
  );
} catch {
  throw new Error(
    "Unable to connect to the server."
  );
}

  // Handle empty responses
  let data = null;

  const contentType =
    response.headers.get("content-type");

  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  // Handle API errors
  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}


// ============================================
// API METHODS
// ============================================

export const api = {

  get: (endpoint, options = {}) =>
    request(endpoint, {
      ...options,
      method: "GET",
    }),

  post: (
    endpoint,
    body,
    options = {}
  ) =>
    request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (
    endpoint,
    body,
    options = {}
  ) =>
    request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: (
    endpoint,
    body,
    options = {}
  ) =>
    request(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (
    endpoint,
    options = {}
  ) =>
    request(endpoint, {
      ...options,
      method: "DELETE",
    }),
};

export default api;