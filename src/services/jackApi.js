import { jackApiClient } from "./api";

const JACK_BASE = "/jack";

export const jackApi = {
  // ===============================
  // 📦 GET PRODUCTS (Public)
  // ===============================
  getProducts: ({ pageNumber = 1, pageSize = 25, subCategory = null }) => {
    let url = `${JACK_BASE}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (subCategory) {
      const formattedSubCategory = subCategory.replace(/-/g, " ");
      url += `&Subcategory=${encodeURIComponent(formattedSubCategory)}`;
    }

    return jackApiClient.get(url);
  },

  // ===============================
  // 📂 GET SUBCATEGORIES
  // ===============================
  getSubCategories: () => {
    return jackApiClient.get(`${JACK_BASE}/subcategories`);
  },

  // ===============================
  // 🔐 GET PRODUCTS (AUTH - POST)
  // ===============================
  getAuthProducts: ({
    pageNumber = 1,
    pageSize = 100,
    subCategory = null,
    payload = {},
  }) => {
    let url = `${JACK_BASE}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (subCategory) {
      const formattedSubCategory = subCategory.replace(/-/g, " ");
      url += `&subCategory=${encodeURIComponent(formattedSubCategory)}`;
    }

    return jackApiClient.post(url, payload);
  },
};
