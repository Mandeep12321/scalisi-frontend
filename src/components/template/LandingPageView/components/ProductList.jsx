"use client";

import { Row, Col } from "react-bootstrap";
import ProductListCard from "@/components/molecules/ProductListCard";
import { Skeleton } from "@mui/material";
import classes from "../LandingPageView.module.css";

export default function ProductListView({
  productData,
  loading,
  router,
  setProductData,
}) {
  return (
    <Row className="gy-2 gy-sm-4">
      {loading === "fetchProducts"
        ? Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={150}
              className={classes.skeletonList}
            />
          ))
        : productData?.map((item, index) => (
            <Col md={12} lg={12} xl={6} key={item?._id || index}>
              <ProductListCard
                data={item}
                onClick={() => router.push(`/products/${item?._id}`)}
                setVariantSelect={(selectedItems) => {
                  let dataCopy = structuredClone(productData);

                  dataCopy.splice(index, 1, {
                    ...item,
                    ...selectedItems,
                  });

                  setProductData(dataCopy);
                }}
              />
            </Col>
          ))}
    </Row>
  );
}