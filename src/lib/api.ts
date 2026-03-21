export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers);
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "An unexpected error occurred");
  }

  return data;
}

export const watchlistApi = {
  getWatchlist: () => fetchWithAuth("/watchlist"),
  addToWatchlist: (data: any) => fetchWithAuth("/watchlist", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateStatus: (id: string, status: string) => fetchWithAuth(`/watchlist/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  }),
  removeFromWatchlist: (id: string) => fetchWithAuth(`/watchlist/${id}`, {
    method: "DELETE",
  }),
};
