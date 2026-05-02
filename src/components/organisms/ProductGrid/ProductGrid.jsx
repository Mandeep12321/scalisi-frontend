"use client";

import ProductCard from "@/components/molecules/ProductCard";
import NoProductsFound from "@/components/molecules/NoProductsFound/NoProductsFound";
import { Skeleton } from "@mui/material";
import classes from "./ProductGrid.module.css";
import { useDispatch } from "react-redux";
import { setTheProductData } from "@/store/common/commonSlice";
import { useRouter } from "next/navigation";

export default function ProductGrid({
  productData = [],
  loading,
  setProductData,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={classes.productCard__wrapper}>
      {loading
        ? Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={380}
              className={classes.skeleton}
            />
          ))
        : productData?.length > 0
        ? productData?.map((item, index) => (
            <ProductCard
              key={item?._id || item?.itemid || index}
              data={item}
              onClick={() => {
                dispatch(setTheProductData(item));
                router.push(`/products/${item?._id || item?.itemid}`);
              }}
              setVariantSelect={(selectedItems) => {
                const dataCopy = structuredClone(productData);
                dataCopy.splice(index, 1, {
                  ...item,
                  ...selectedItems,
                });
                setProductData(dataCopy);
              }}
            />
          ))
        : <NoProductsFound />}
    </div>
  );
}
