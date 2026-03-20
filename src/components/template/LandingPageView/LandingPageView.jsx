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
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";




import PaginationComponent from "@/components/molecules/PaginationComponent";

import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import classes from "./LandingPageView.module.css";


export default function LandingPageView({ cmsData }) {
  const _cmsData = cmsData;
  const router = useRouter();

  const { isLogin, location } = useSelector((state) => state.authReducer);
  const [showLocationsModal, setShowLocationsModal] = useState(false);


  const [page, setPage] = useState(1);
  const [dropDown, setDropDown] = useState("Newest");
  const [cardViewType, setCardViewType] = useState("card");

  const {
    productData,
    setProductData,
    totalRecords,
    loading,
    fetchProducts,
  } = useProducts();

  /* -------------------- FETCH PRODUCTS -------------------- */
  useEffect(() => {
    if (cardViewType === "card" || cardViewType === "list") {
      fetchProducts({
        page,
        isLogin,
        location,
        sort: dropDown,
      });
    }
  }, [isLogin, location, page, dropDown, cardViewType]);

  return (
    <Container>
      <Row>
        {/* HERO */}
        <LandingHero cmsData={cmsData} />
         <Col
          md={12}
          className={classes.displayNone}
          style={{
            marginBlock: "1.75rem",
          }}
        >
          <div className={classes.headingClass}>
            <h3 className="fs-49 fw-700 black-color"> Products </h3>
          </div>
        </Col>

        {/* FILTERS */}
        <LandingFilters
          dropDown={dropDown}
          setDropDown={setDropDown}
          cardViewType={cardViewType}
          setCardViewType={setCardViewType}
        />

        {/* CONTENT */}
        <Col md={12} style={{ marginTop: "40px" }}>
          {cardViewType === "card" && (
            <ProductGrid
              productData={productData}
              loading={loading}
              router={router}
              setProductData={setProductData}
            />
          )}

          {cardViewType === "list" && (
            <ProductListView
              productData={productData}
              loading={loading}
              router={router}
              setProductData={setProductData}
            />
          )}

          {cardViewType === "orderGuide" && (
            <div> {/* Replace with your Order Guide component */}
              <h3>Order Guide Content</h3>
            </div>
          )}

          {cardViewType === "fullCatalog" && (
            <div> {/* Replace with your Full Catalog component */}
              <h3>Full Catalog Content</h3>
            </div>
          )}
        </Col>

        {/* PAGINATION */}
        {(cardViewType === "card" || cardViewType === "list") &&
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
                      isLogin,
                      location,
                      sort: dropDown,
                    });
                  }}
                />
              </div>
            </Col>
          )}
      </Row>
      <Row className="g-0">
        <Col md={6} lg={6}>
          <div className={mergeClass(classes.announcementLeft)}>
            <AnnouncementCard data={_cmsData?.support} />
          </div>
        </Col>
        <Col md={6} lg={6}>
          <div className={mergeClass(classes.announcementRight)}>
            <AnnouncementCard
              data={_cmsData?.updates}
              placeholder="Email address"
              hasNewsletter={true}
            />
          </div>
        </Col>
      </Row>
      {/* <LocationsModal
        show={showLocationsModal}
        setShow={setShowLocationsModal}
        cb={(location) => getProductsData({ pg: 1, location, isLogin })}
      /> */}
    </Container>
  );
}