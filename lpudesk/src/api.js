const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(path, options = {}) {
  const { body, headers, ...requestOptions } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body && typeof body !== "string" ? JSON.stringify(body) : body
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Unable to complete the request");
  }
  return response.status === 204 ? null : response.json();
}

export const authApi = {
  me: () => apiRequest("/auth/me"),
  login: (credentials) => apiRequest("/auth/login", { method: "POST", body: credentials }),
  register: (details) => apiRequest("/auth/register", { method: "POST", body: details }),
  forgotPassword: (email) => apiRequest("/auth/forgot-password", { method: "POST", body: { email } }),
  resetPassword: (details) => apiRequest("/auth/reset-password", { method: "POST", body: details }),
  verifyEmail: (token) => apiRequest("/auth/verify-email", { method: "POST", body: { token } }),
  logout: () => apiRequest("/auth/logout", { method: "POST" })
};

export const requestsApi = {
  list: () => apiRequest("/requests"),
  create: (request) => apiRequest("/requests", { method: "POST", body: request }),
  detail: (id) => apiRequest(`/requests/${id}`),
  update: (id, changes) => apiRequest(`/requests/${id}`, { method: "PATCH", body: changes })
};
