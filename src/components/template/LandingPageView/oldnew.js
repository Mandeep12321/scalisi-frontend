"use client";

import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProductGrid from "./components/ProductGrid";
import ProductListView from "./components/ProductList";
import LandingHero from "./components/LandingHero";
import LandingFilters from "./components/LandingFilters";
import useProducts from "./hooks/useProducts";
import useCategories from "./hooks/useCategories";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import { mergeClass } from "@/resources/utils/helper";
import OrderGuideView from "./components/OrderGuideView";

import PaginationComponent from "@/components/molecules/PaginationComponent";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";

import classes from "./LandingPageView.module.css";

export default function LandingPageView({ cmsData }) {
  const router = useRouter();
  const { isLogin, location } = useSelector((state) => state.authReducer);

  const [page, setPage] = useState(1);
  const [dropDown, setDropDown] = useState("Newest");

  const [catalogType, setCatalogType] = useState("orderGuide");
  const [viewType, setViewType] = useState("card");

  // ✅ Store FULL object (react-select)
  const [subCategory, setSubCategory] = useState(null);

  // ✅ HOOKS
  const {
    productData,
    setProductData,
    totalRecords,
    loading,
    fetchProducts,
  } = useProducts();

  const {
    categories,
    loading: catLoading,
    fetchCategories,
  } = useCategories();

  // ✅ Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Auto select "All"
  useEffect(() => {
    if (categories.length && !subCategory) {
      setSubCategory(categories[0]);
    }
  }, [categories]);

  // ✅ Fetch products
  useEffect(() => {
    fetchProducts({
      page,
      limit: PRODUCT_RECORDS_LIMIT,
      isLogin,
      location,
      sort: dropDown,
      type: catalogType,
      subCategory: subCategory?.value || null, // ✅ FIX
    });
  }, [isLogin, location, page, dropDown, catalogType, subCategory]);

  // ✅ Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [catalogType, subCategory]);

  return (
    <Container>
      <Row>
        {/* HERO */}
        <LandingHero cmsData={cmsData} />

        {/* TITLE */}
        <Col
          md={12}
          className={classes.displayNone}
          style={{ marginBlock: "1.75rem" }}
        >
          <div className={classes.headingClass}>
            <h3 className="fs-49 fw-700 black-color">Products</h3>
          </div>
        </Col>

        {/* FILTERS */}
        <LandingFilters
          dropDown={dropDown}
          setDropDown={setDropDown}
          catalogType={catalogType}
          setCatalogType={setCatalogType}
          viewType={viewType}
          setViewType={setViewType}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          subCategoryOptions={categories}
          catLoading={catLoading}
        />

        {/* CONTENT */}
        <Col md={12} style={{ marginTop: "40px" }}>
          {catalogType !== "orderGuide" && viewType === "card" && (
            <ProductGrid
              productData={productData}
              loading={loading}
              router={router}
              setProductData={setProductData}
            />
          )}

          {catalogType !== "orderGuide" && viewType === "list" && (
            <ProductListView
              productData={productData}
              loading={loading}
              router={router}
              setProductData={setProductData}
            />
          )}

          {catalogType === "orderGuide" && <OrderGuideView />}
        </Col>

        {/* PAGINATION */}
        {catalogType !== "orderGuide" &&
          totalRecords > PRODUCT_RECORDS_LIMIT && (
            <Col md={12}>
              <div style={{ marginTop: "40px" }}>
                <PaginationComponent
                  totalRecords={totalRecords}
                  currentPage={page}
                  setCurrentPage={(p) => {
                    if (p === page) return;

                    setPage(p);

                    fetchProducts({
                      page: p,
                      limit: PRODUCT_RECORDS_LIMIT,
                      isLogin,
                      location,
                      sort: dropDown,
                      type: catalogType,
                      subCategory: subCategory?.value || null, // ✅ FIX
                    });
                  }}
                />
              </div>
            </Col>
          )}
      </Row>

      {/* ANNOUNCEMENTS */}
      <Row className="g-0">
        <Col md={6} lg={6}>
          <div className={mergeClass(classes.announcementLeft)}>
            <AnnouncementCard data={cmsData?.support} />
          </div>
        </Col>
        <Col md={6} lg={6}>
          <div className={mergeClass(classes.announcementRight)}>
            <AnnouncementCard
              data={cmsData?.updates}
              placeholder="Email address"
              hasNewsletter={true}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}