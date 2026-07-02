const BASE = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api`;

function getToken() {
  return localStorage.getItem("qb_token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...authHeaders(), ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  // Auth
  register: (name, email, password) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  me: () => request("/auth/me"),

  // Menu
  getMenuItems: (category) =>
    request(`/menu-items${category && category !== "All" ? `?category=${category}` : ""}`),

  // Orders
  placeOrder: (restaurantId, deliveryAddress, items) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify({ restaurantId, deliveryAddress, items }),
    }),
  getOrder: (id) => request(`/orders/${id}`),
  getMyOrders: () => request("/orders"),
  updateOrderStatus: (id, status) =>
    request(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // Seats
  getSeats: () => request("/seats"),
  bookSeat: (seat) => request("/seats/book", { method: "POST", body: JSON.stringify({ seat }) }),
  cancelSeat: (seat) => request(`/seats/${seat}`, { method: "DELETE" }),
};