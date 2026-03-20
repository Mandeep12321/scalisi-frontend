import { jackApiClient } from "./api";

const JACK_BASE = "/jack";

export const jackApi = {
  getProducts: ({ pageNumber = 1, pageSize = 25, subCategory = null }) => {
    let url = `${JACK_BASE}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    if (subCategory) {
      // ✅ convert slug to normal string
      const formattedSubCategory = subCategory.replace(/-/g, " ");

      // ✅ encode for URL safety
      url += `&Subcategory=${encodeURIComponent(formattedSubCategory)}`;
    }

    return jackApiClient.get(url);
  },

  getSubCategories: () => {
    return jackApiClient.get(`${JACK_BASE}/subcategories`);
  },
};
