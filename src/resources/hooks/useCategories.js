import { useState } from "react";
import { jackApi } from "@/services/jackApi";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const res = await jackApi.getSubCategories();

      const rawData = res?.data || [];

      console.log("Raw API response:", rawData);

      // ✅ REMOVE DUPLICATES
      const uniqueCategories = [...new Set(rawData)];

      console.log("Unique categories:", uniqueCategories);

      const formatted = [
        {
          label: "Category",
          value: null, // important → matches your API logic
        },
        ...uniqueCategories.map((item) => ({
          label: item,
          value: item
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-"), // convert spaces → hyphen
        })),
      ];

      console.log("Formatted categories:", formatted);

      setCategories(formatted);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
  };
}