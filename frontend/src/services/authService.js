import api from "./api";

export async function loginUser(credentials) {
  return api.post(
    "/auth/login",
    credentials
  );
}

export async function registerUser(userData) {
  return api.post(
    "/auth/register",
    userData
  );
}

export async function getCurrentUser() {
  return api.get("/auth/me");
}

export async function logoutUser() {
  return api.post("/auth/logout");
}

export async function updateProfile(data) {
  return api.put("/auth/profile", data);
}

export async function changePassword(data) {
  return api.put(
    "/auth/change-password",
    data
  );
}