export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  let token = getAuthToken();
  const headers = new Headers(options.headers);
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  headers.set("Content-Type", "application/json");

  // Include credentials (cookies) for refresh token access
  const fetchOptions = {
    ...options,
    headers,
    credentials: options.credentials || 'include',
  };

  let response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);

  // Auto Refresh Logic on 401
  if (response.status === 401 && !endpoint.includes('/auth/refresh')) {
    console.log("Access token expired, attempting refresh...");
    const refreshData = await authApi.refresh();
    
    if (refreshData.success && refreshData.data?.accessToken) {
      const newToken = refreshData.data.accessToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", newToken);
      }
      
      // Retry with new token
      headers.set("Authorization", `Bearer ${newToken}`);
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
      });
    } else {
      // Refresh failed, logout
      authApi.logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

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

export const authApi = {
  login: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Login failed");
    if (data.data?.accessToken) {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.data.accessToken);
      }
    }
    return data;
  },
  register: async (credentials: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Registration failed");
    return data;
  },
  refresh: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: 'include', // Send the browser cookie
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  },
};

export const contentApi = {
  search: (query: string, page: number = 1) => fetchWithAuth(`/content/search?query=${encodeURIComponent(query)}&page=${page}`),
  getTrending: (page: number = 1) => fetchWithAuth(`/content/trending?page=${page}`),
};

export const usersApi = {
  getMe: () => fetchWithAuth("/users/me"),
};
