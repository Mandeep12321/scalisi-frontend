"use client";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import ProductCard from "@/components/molecules/ProductCard";
import ProductDetailCard from "@/components/molecules/ProductDetailCard";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearProductData, setTheProductData } from "@/store/common/commonSlice";
import classes from "./ProductDetailView.module.css";
import landingClasses from "../LandingPageView/LandingPageView.module.css";
import useProducts from "../LandingPageView/hooks/useProducts";
import ProductGrid from "@/components/common/ProductGrid";
import ProductListView from "../LandingPageView/components/ProductList";
import LandingFilters from "../LandingPageView/components/LandingFilters";
import DropDown from "@/components/molecules/DropDown/DropDown";
import { ReactSVG } from "react-svg";
import Image from "next/image";




// Convert raw ERP_Category string → slug used by the API
// e.g. "DAIRY PRODUCTS" → "dairy-products"
const toSlug = (str) =>
  str ? str.toLowerCase().trim().replace(/\s+/g, "-") : null;

export default function ProductDetailView({ cmsUpdateData, cmsSupportData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const support = cmsSupportData;
  const updates = cmsUpdateData;

  const { productData: commonProductData } = useSelector(
    (state) => state.commonReducer
  );
  const { isLogin, location } = useSelector((state) => state.authReducer);

  // ── Main product local state ──────────────────────────────────────────────
  const [productData, setProductData] = useState(commonProductData);
  const [isMobile, setIsMobile] = useState(false);

  // ── Related products list / filter state ──────────────────────────────────
  const [page, setPage] = useState(1);
  const [dropDown, setDropDown] = useState(SORT_BY_DROPDOWN?.[0]);
  const [cardViewType, setCardViewType] = useState("card");
  const [isMob768, setIsMob768] = useState(false);
  const [is375, setIs375] = useState(false);

  // ── Derive category slug once from the main product (stable initial value) ─
  const initialCatSlug = toSlug(
    commonProductData?.category || commonProductData?.mastercategory || ""
  );
  const initialCatOption = initialCatSlug
    ? { label: commonProductData?.category || initialCatSlug, value: initialCatSlug }
    : null;

  const [subCategory, setSubCategory] = useState(initialCatOption);

  // ── Refs – same pattern as ProductsPageView ────────────────────────────────
  const pageRef = useRef(1);
  const dropDownRef = useRef(dropDown);
  const subCatRef = useRef(initialCatOption);   // pre-seeded → category goes in API
  const locationRef = useRef(location);

  // ── Fetch trigger — only dep of the fetch effect ──────────────────────────
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const triggerFetch = () => setFetchTrigger((n) => n + 1);

  // ── useProducts hook — same as landing / products pages ───────────────────
  const {
    productData: relatedProducts,
    setProductData: setRelatedProducts,
    totalRecords,
    loading,
    fetchProducts,
  } = useProducts();

  // ── Keep refs in sync ──────────────────────────────────────────────────────
  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    isMobileViewHook(setIsMobile, 769);
    isMobileViewHook(setIsMob768, 768);
    isMobileViewHook(setIs375, 376);
  }, []);

  // ── Redirect if no product in Redux; transform data for ProductDetailCard ──
  useEffect(() => {
    if (!commonProductData) {
      router.push("/products");
      return;
    }
    if (commonProductData?.uoms) {
      setProductData({
        ...commonProductData,
        productVariant: commonProductData.uoms.map((uom) => ({
          type: uom.erp_uom,
          value: uom.erp_uom,
          price: uom.price || 0,
        })),
        selectedVariant: {
          label: `${commonProductData.uoms[0]?.erp_uom} / ${getFormattedPrice(
            commonProductData.uoms[0]?.price || 0
          )}`,
          value: commonProductData.uoms[0]?.erp_uom,
          price: commonProductData.uoms[0]?.price || 0,
        },
        selectedCount: 1,
      });
    } else {
      setProductData(commonProductData);
    }
  }, [commonProductData]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Trigger initial related-products fetch once product is ready ──────────
  useEffect(() => {
    if (!commonProductData) return;
    if (isLogin && !locationRef.current) return;
    triggerFetch();
  }, [commonProductData, isLogin, location]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── THE fetch effect — fires only when fetchTrigger increments ─────────────
  useEffect(() => {
    if (isLogin && !locationRef.current) return;

    fetchProducts({
      page: pageRef.current,
      limit: PRODUCT_RECORDS_LIMIT,
      isLogin,
      location: locationRef.current,
      sort: dropDownRef.current,
      subCategory: subCatRef.current?.value || null,  // ← category slug goes here
    });
  }, [fetchTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cleanup Redux on unmount ───────────────────────────────────────────────
  useEffect(() => {
    return () => {
      dispatch(clearProductData());
    };
  }, [dispatch]);

  // ── Handlers (same pattern as ProductsPageView) ────────────────────────────
  const handleSubCategoryChange = (val) => {
    subCatRef.current = val;
    setSubCategory(val);
    pageRef.current = 1;
    setPage(1);
    triggerFetch();
  };

  const handleDropDownChange = (val) => {
    dropDownRef.current = val;
    setDropDown(val);
    pageRef.current = 1;
    setPage(1);
    triggerFetch();
  };

  const goToPage = (p) => {
    if (p === pageRef.current) return;
    pageRef.current = p;
    setPage(p);
    triggerFetch();
  };

  const handleRelatedCardClick = (item) => {
    dispatch(setTheProductData(item));
    router.push(`/products/${item?.itemid || item?._id}`);
  };

  return (
    <Container>
      <Row>
        {/* ── Main product card ── */}
        <Col md={12}>
          <div className={classes.productDetail}>
            {isMobile ? (
              <ProductCard
                data={productData}
                setVariantSelect={(selectedItems) => {
                  setProductData((prev) => ({ ...prev, ...selectedItems }));
                }}
              />
            ) : (
              <ProductDetailCard
                data={productData}
                setVariantSelect={(selectedItems) => {
                  setProductData((prev) => ({ ...prev, ...selectedItems }));
                }}
              />
            )}
          </div>
        </Col>

        <div className={classes.productFilterRow}>
          <h3 className="fs-40 fw-700"> Related Products </h3>

          <div className={classes.searchSortOption}>
            <div className={classes.filtersDiv}>
              <div className={classes.sortByDiv}>
                <p className="fs-18 white-space">Sort By</p>
                <DropDown
                  dropDownContainer={classes.dropDownContainer}
                  customStyle={{
                    fontWeight: "700",
                    paddingLeft: "1px",
                    paddingTop: "2px",
                    paddingBottom: "3px",
                  }}
                  container
                  value={dropDown}
                  setValue={setDropDown}
                  options={SORT_BY_DROPDOWN}
                />
              </div>
              <div className={classes.sortCards}>
                <div className={classes.viewCardTypeDiv}>
                  <p className="fs-18">View</p>
                </div>
                <div className={classes.cardsView}>
                  <div
                    className={classes.viewTypeDiv}
                    onClick={() => setCardViewType("card")}
                  >
                    <div className={classes.gridIcon}>
                      {!isMobile ? (
                        <Image
                          src={"/assets/images/svg/card-grid-icon.svg"}
                          fill
                          alt="card-view-image"
                        />
                      ) : (
                        <Image
                          src={"/assets/images/app-images/cardGrid.png"}
                          fill
                          alt="card-view-image"
                        />
                      )}
                    </div>
                    <p
                      className={mergeClass("fw-700 fs-18", classes.cardTitle)}
                    >
                      Cards
                    </p>
                  </div>

                  <div
                    className={classes.listViewTypeDiv}
                    onClick={() => setCardViewType("list")}
                  >
                    <ReactSVG
                      src={"/assets/images/svg/productListIcon.svg"}
                      className={mergeClass(
                        "fw-700",
                        cardViewType === "list" && classes.listIconActive,
                        classes.listIcon
                      )}
                    />

                    <p
                      className={mergeClass(
                        "fs-18",
                        classes.listTitle,
                        cardViewType === "list" && classes.listIconActive
                      )}
                    >
                      List
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related products grid ── */}
        <Col md={12} style={{ marginTop: "40px" }}>
          {cardViewType === "card" ? (
            <ProductGrid
              productData={relatedProducts}
              loading={loading}
              setProductData={setRelatedProducts}
              onCardClick={(item) => handleRelatedCardClick(item)}
            />
          ) : (
            <ProductListView
              productData={relatedProducts}
              loading={loading}
              setProductData={setRelatedProducts}
            />
          )}
        </Col>

        {/* ── Pagination ── */}
        {totalRecords > PRODUCT_RECORDS_LIMIT && (
          <Col md={12}>
            <div className={classes.pagination}>
              <PaginationComponent
                totalRecords={totalRecords}
                currentPage={page}
                setCurrentPage={goToPage}
              />
            </div>
          </Col>
        )}
      </Row>

      {/* ── Announcements ── */}
      <Row className="g-0">
        <Col sm={6} md={6} lg={6}>
          <div className={mergeClass(classes.announcementLeft)}>
            <AnnouncementCard data={support?.value?.data} />
          </div>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <div className={mergeClass(classes.announcementRight)}>
            <AnnouncementCard
              data={updates?.value?.data}
              placeholder="Email address"
              hasNewsletter={true}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
