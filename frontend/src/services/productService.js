import api from "./api";

export async function getProducts(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        query.append(key, value);
      }
    }
  );

  const queryString = query.toString();

  return api.get(
    `/products${queryString ? `?${queryString}` : ""}`
  );
}

export async function getProductById(id) {
  return api.get(`/products/${id}`);
}

export async function getFeaturedProducts() {
  return api.get("/products/featured");
}

export async function getProductsByCategory(
  category
) {
  return api.get(
    `/products/category/${category}`
  );
}

export async function searchProducts(query) {
  return api.get(
    `/products/search?q=${encodeURIComponent(
      query
    )}`
  );
}