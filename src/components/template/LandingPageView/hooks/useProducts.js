import { useState } from "react";
import { formatProducts } from "../utils/formatProducts";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { jackApi } from "@/services/jackApi"; // <-- use the new file
import apiClient from "@/services/api"; // optional: your main api instance for logged-in users

export default function useProducts() {
  const [productData, setProductData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async ({
    page = 1,
    limit = PRODUCT_RECORDS_LIMIT,
    search = "",
    isLogin,
    location,
    subCategory
  }) => {
    setLoading(true);

    try {
      if (!isLogin) {
        const res = await jackApi.getProducts({
          pageNumber: page,
          pageSize: limit,
          subCategory
        });


        const formatted = formatProducts(res.data.Items);
        let filtered = formatted;

        // ⚠️ IMPORTANT: search is still client-side (optional improvement later)
        if (search) {
          filtered = formatted.filter((p) =>
            p.description?.toLowerCase().includes(search.toLowerCase())
          );
        }

        setProductData(filtered);

        // ✅ Use backend total count
        setTotalRecords(res.data.TotalCount);
      } else {
        // Logged-in users: use your internal API
        const res = await jackApi.getAuthProducts({
          pageNumber: page,
          pageSize: limit,
          payload: {
            custno: location?.ERP_CID,
            cshipno: location?.ERP_SID,
            date: new Date().toISOString().split("T")[0],
          },
          subCategory
        });
        const formatted = formatProducts(res.data.Items, true);

        setProductData(formatted);
        setTotalRecords(res?.data?.totalRecords || res?.data?.TotalCount);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    productData,
    setProductData,
    totalRecords,
    loading,
    fetchProducts,
  };
}