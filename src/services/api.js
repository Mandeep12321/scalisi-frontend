import axios from "axios";

// ===============================
// 🌐 JACK API INSTANCE
// ===============================
export const jackApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JACK_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// 🔐 Request Interceptor
// ===============================
jackApiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// 📥 Response Interceptor
// ===============================
jackApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);