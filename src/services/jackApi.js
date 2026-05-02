import { jackApiClient } from "./api";

const JACK_BASE = "/jack";

export const jackApi = {
  // ===============================
  // 📦 GET PRODUCTS (Public)
  // ===============================
  getProducts: ({ pageNumber = 1, pageSize = 25, subCategory = null, search = "", sort = "" }) => {
    let url = `${JACK_BASE}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (subCategory) {
      const formattedSubCategory = subCategory.replace(/-/g, " ");
      url += `&Subcategory=${encodeURIComponent(formattedSubCategory)}`;
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    if (sort) {
      url += `&sort=${encodeURIComponent(sort)}`;
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
    search = "",
    sort = "",
    payload = {},
  }) => {
    let url = `${JACK_BASE}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (subCategory) {
      const formattedSubCategory = subCategory.replace(/-/g, " ");
      url += `&subCategory=${encodeURIComponent(formattedSubCategory)}`;
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    if (sort) {
      url += `&sort=${encodeURIComponent(sort)}`;
    }

    return jackApiClient.post(url, payload);
  },

  // ===============================
  // 📋 GET ORDER GUIDE (AUTH - POST)
  // ===============================
  getOrderGuide: ({
    pageNumber = 1,
    pageSize = 25,
    subCategory,
    search = "",
    sort = "",
    payload = {},
  }) => {
    let url = `${JACK_BASE}/orderguide?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    if (subCategory) {
      const formattedSubCategory = subCategory
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      url += `&subCategory=${encodeURIComponent(formattedSubCategory)}`;
    }

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    if (sort) {
      url += `&sort=${encodeURIComponent(sort)}`;
    }

    return jackApiClient.post(url, payload);
  },
};
