"use client";

import ProductCard from "@/components/molecules/ProductCard";
import { Skeleton } from "@mui/material";
import classes from "../template/LandingPageView/LandingPageView.module.css";

export default function ProductGrid({
  productData = [],
  loading,
  onCardClick,
  setProductData,
  skeletonCount = 12,
}) {
  return (
    <div className={classes.productCard__wrapper}>
      {loading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={380}
              className={classes.skeleton}
            />
          ))
        : productData?.map((item, index) => (
            <ProductCard
              key={item?.itemid || index}
              data={item}
              onClick={() =>
                onCardClick ? onCardClick(item, index) : null
              }
              setVariantSelect={(selectedItems) => {
                if (!setProductData) return;

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