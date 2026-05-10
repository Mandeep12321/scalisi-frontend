"use client";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import HeroSection from "@/components/molecules/HeroSection";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setTheProductData } from "@/store/common/commonSlice";
import classes from "./ProductsPageView.module.css";
import landingClasses from "../LandingPageView/LandingPageView.module.css";
import LandingFilters from "../LandingPageView/components/LandingFilters";
import useCategories from "@/resources/hooks/useCategories";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import ProductListView from "@/components/organisms/ProductListView/ProductListView";
import useProducts from "@/resources/hooks/useProducts";
import useDebounce from "@/resources/hooks/useDebounce";
import { ABOUT_US_PAGE_DATA } from "@/developmentContent/mock-data";

export default function ProductsPageView({ cmsData }) {
  const _cmsData = cmsData;
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogin, location } = useSelector((state) => state.authReducer);

  const [showLocationsModal, setShowLocationsModal] = useState(false);
  const [dropDown, setDropDown] = useState(SORT_BY_DROPDOWN?.[0]);
  const [page, setPage] = useState(1);
  const [cardViewType, setCardViewType] = useState("card");
  const [isMob768, setIsMob768] = useState(false);
  const [is375, setIs375] = useState(false);
  const [subCategory, setSubCategory] = useState(null);

  const [catalogType, setCatalogType] = useState(
    isLogin ? "orderGuide" : "fullCatalog"
  );
  const { search } = useSelector((state) => state?.commonReducer);
  const debouncedSearch = useDebounce(search, 500);

  // ── Refs for stable API values ────────────────────────────────────────────────
  const pageRef = useRef(1);
  const dropDownRef = useRef(dropDown);
  const catalogRef = useRef(isLogin ? "orderGuide" : "fullCatalog");
  const subCatRef = useRef(null);
  const locationRef = useRef(location);

  // Track which catalog tabs have been fetched (avoid double-fetch on first load)
  const fetchedCatalogTypes = useRef(new Set([catalogRef.current]));

  // Single fetch trigger — the ONLY dep of the fetch effect
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const triggerFetch = () => setFetchTrigger((n) => n + 1);

  useEffect(() => {
    isMobileViewHook(setIsMob768, 768);
    isMobileViewHook(setIs375, 376);
  }, []);

  // Keep locationRef in sync
  useEffect(() => {
    const prevLocation = locationRef.current;
    locationRef.current = location;
    // If location just arrived, trigger a fetch
    if (!prevLocation && location) {
      triggerFetch();
    }
  }, [location]);

  const { productData, setProductData, totalRecords, loading, fetchProducts } =
    useProducts();
  const { categories, fetchCategories } = useCategories();

  // Fetch categories once
  useEffect(() => {
    fetchCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-select first category and trigger initial fetch
  useEffect(() => {
    if (categories.length && !subCatRef.current) {
      subCatRef.current = categories[0];
      setSubCategory(categories[0]);
      triggerFetch();
    }
  }, [categories]); // eslint-disable-line react-hooks/exhaustive-deps

  // Show locations modal for logged-in users without a location
  useEffect(() => {
    if (isLogin && !location) {
      const t = setTimeout(() => setShowLocationsModal(true), 1500);
      return () => clearTimeout(t);
    }
  }, [isLogin, location]);

  // ── Trigger fetch when debounced search changes ────────────────────────────
  useEffect(() => {
    pageRef.current = 1;
    setPage(1);
    triggerFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // THE fetch effect — fires only when fetchTrigger increments
  useEffect(() => {
    if (catalogRef.current !== "orderGuide" && !subCatRef.current) return;
    if (isLogin && !locationRef.current) return;
    if (isLogin && !fetchedCatalogTypes.current.has(catalogRef.current)) return;

    fetchProducts({
      page: pageRef.current,
      limit: PRODUCT_RECORDS_LIMIT,
      isLogin,
      location: locationRef.current,
      sort: dropDownRef.current?.value || dropDownRef.current,
      search: debouncedSearch,
      type: catalogRef.current,
      subCategory: subCatRef.current?.value || null,
    });
  }, [fetchTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleCatalogTypeChange = (type) => {
    fetchedCatalogTypes.current.add(type);
    catalogRef.current = type;
    setCatalogType(type);
    pageRef.current = 1;
    setPage(1);
    triggerFetch();
  };

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

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className={classes.bannerSec}>
            <HeroSection
              data={_cmsData?.hero}
              colorHeading={classes.heroSectionHeading}
              mainDivClass={classes.mainDiv}
              descriptionClass={classes?.__desc}
              imgSrc={"/assets/images/app-images/product-banner-img.png"}
            />
          </div>
        </Col>

        {/* Catalog type tabs (Order Guide / Full Catalog) + right-side filters */}
        <LandingFilters
          dropDown={dropDown}
          setCatalogType={handleCatalogTypeChange}
          setDropDown={handleDropDownChange}
          cardViewType={cardViewType}
          setCardViewType={setCardViewType}
          isMob768={isMob768}
          is375={is375}
          subCategory={subCategory}
          setSubCategory={handleSubCategoryChange}
          subCategoryOptions={categories}
          catalogType={catalogType}
          isLogin={isLogin}
        />

        {/* CONTENT */}
        <Col md={12} style={{ marginTop: "40px" }}>
          {cardViewType === "card" ? (
            <ProductGrid
              productData={productData}
              loading={loading}
              setProductData={setProductData}
              onCardClick={(item) => {
                dispatch(setTheProductData(item));
                router.push(`/products/${item?._id || item?.itemid}`);
              }}
            />
          ) : (
            <ProductListView
              productData={productData}
              loading={loading}
              router={router}
              setProductData={setProductData}
            />
          )}
        </Col>

        {/* Pagination */}
        {totalRecords > PRODUCT_RECORDS_LIMIT && (
          <Col md={12}>
            <div style={{ marginTop: "40px" }}>
              <PaginationComponent
                totalRecords={totalRecords}
                currentPage={page}
                setCurrentPage={goToPage}
              />
            </div>
          </Col>
        )}
      </Row>

      <Row className="g-0">
        <Col md={6} lg={6}>
          <div className={landingClasses.announcementLeft}>
            <AnnouncementCard data={_cmsData?.support || ABOUT_US_PAGE_DATA?.announcement1} />
          </div>
        </Col>
        <Col md={6} lg={6}>
          <div className={landingClasses.announcementRight}>
            <AnnouncementCard
              data={_cmsData?.updates || ABOUT_US_PAGE_DATA?.announcement2}
              placeholder="Email address"
              hasNewsletter={true}
            />
          </div>
        </Col>
      </Row>

      <LocationsModal
        show={showLocationsModal}
        setShow={setShowLocationsModal}
        cb={(loc) => {
          locationRef.current = loc;
          triggerFetch();
        }}
      />
    </Container>
  );
}
