import axios from "axios";
import Cookies from "js-cookie";
import momentTimezone from "moment-timezone";
import { handleDecrypt } from "@/resources/utils/helper";

// ===============================
// 🌐 JACK API INSTANCE
// ===============================
export const jackApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JACK_API_BASE_URL,
  timeout: 10000,
});

// ===============================
// 🔐 Request Interceptor
// ===============================
jackApiClient.interceptors.request.use(
  (config) => {
    // ✅ Get token from cookie
    const token = Cookies.get("_xpdx");

    // ✅ Default headers
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      timezone: momentTimezone.tz.guess(),

      // ✅ Attach token if exists
      ...(token && {
        Authorization: `Bearer ${handleDecrypt(token)}`,
      }),

      ...config.headers,
    };

    // ✅ Handle FormData automatically
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
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

      // 🔐 Handle Unauthorized
      if (status === 401) {
        if (typeof window !== "undefined") {
          Cookies.remove("_xpdx"); // ✅ remove cookie
          window.location.href = "/login";
        }
      }

      // ❌ Optional: log other errors
      console.error("API ERROR:", error.response);
    } else {
      console.error("NETWORK ERROR:", error.message);
    }

    return Promise.reject(error);
  }
);