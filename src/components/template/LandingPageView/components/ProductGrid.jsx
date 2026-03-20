"use client";

import ProductCard from "@/components/molecules/ProductCard";
import { Skeleton } from "@mui/material";
import classes from "../LandingPageView.module.css";

export default function ProductGrid({
  productData,
  loading,
  router,
  setProductData,
}) {
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
        : productData?.map((item, index) => (
            <ProductCard
              key={index}
              data={item}
              onClick={() => router.push(`/products/${index}`)}
              setVariantSelect={(selectedItems) => {
                const dataCopy = structuredClone(productData);

                dataCopy.splice(index, 1, {
                  ...item,
                  ...selectedItems,
                });

                setProductData(dataCopy);
              }}
            />
          ))}
    </div>
  );
}