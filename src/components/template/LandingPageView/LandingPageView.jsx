"use client";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import LandingHero from "./components/LandingHero";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { mergeClass, handleDecrypt } from "@/resources/utils/helper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from "./LandingPageView.module.css";
import { setGlobalSearch } from "@/store/common/commonSlice";
import LandingFilters from "./components/LandingFilters";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import useCategories from "@/resources/hooks/useCategories";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import ProductListView from "@/components/organisms/ProductListView/ProductListView";
import useProducts from "@/resources/hooks/useProducts";
import useDebounce from "@/resources/hooks/useDebounce";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";

export default function LandingPageView({ cmsData }) {
  const router = useRouter();
  const { isLogin: reduxIsLogin, location } = useSelector((state) => state.authReducer);
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  // Fallback to false if the physical cookie token has expired/been cleared
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const isLogin = reduxIsLogin && !!accessToken;


useEffect(() => {
  console.log("Auth State:", authState);
}, [authState]);

  // ── UI state (drives rendering only) ──────────────────────────────────────
  const [page, setPage] = useState(1);
  const [dropDown, setDropDown] = useState(SORT_BY_DROPDOWN[0]);
  // Guests always start on fullCatalog; logged-in users start on orderGuide
  const [catalogType, setCatalogType] = useState(
    isLogin ? "orderGuide" : "fullCatalog"
  );
  const [subCategory, setSubCategory] = useState(null);
  const { search } = useSelector((state) => state?.commonReducer);
  const setSearch = (val) => dispatch(setGlobalSearch(val));
  const [cardViewType, setCardViewType] = useState("card");
  const debouncedSearch = useDebounce(search, 500);
  const [isMob768, setIsMob768] = useState(false);
  const [is375, setIs375] = useState(false);
  const [showLocationsModal, setShowLocationsModal] = useState(false);

  // ── Refs: authoritative values for API calls ───────────────────────────────
  // These are always up-to-date synchronously; the fetch effect reads from them.
  const pageRef = useRef(1);
  const dropDownRef = useRef(SORT_BY_DROPDOWN[0]);
  const catalogRef = useRef(isLogin ? "orderGuide" : "fullCatalog");
  const subCatRef = useRef(null);
  const locationRef = useRef(location);
  const savedScrollY = useRef(0);

  // Tracks which catalog tabs have been explicitly activated.
  // Logged-in users: fullCatalog starts absent so API is skipped until clicked.
  const fetchedCatalogTypes = useRef(new Set([catalogRef.current]));

  // The ONLY dependency of the fetch useEffect.
  // Incrementing it is the sole trigger for an API call.
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // ── Data hooks ─────────────────────────────────────────────────────────────
  const { productData, setProductData, totalRecords, loading, fetchProducts } =
    useProducts();
  const { categories, fetchCategories } = useCategories();

  // Keep locationRef in sync with Redux
  useEffect(() => {
    const prevLocation = locationRef.current;
    locationRef.current = location;
    // If location just arrived, trigger a fetch
    if (!prevLocation && location) {
      triggerFetch();
    }
  }, [location]);

  // ── Fetch categories once on mount ─────────────────────────────────────────
  useEffect(() => {
    fetchCategories();
  }, []);

  // ── Auto-select first category once categories load ────────────────────────
  useEffect(() => {
    if (categories.length && !subCatRef.current) {
      subCatRef.current = categories[0];
      setSubCategory(categories[0]);
      triggerFetch();
    }
  }, [categories]);

  // ── Show location modal for logged-in users without a location ─────────────
  useEffect(() => {
    if (isLogin !== true) return;

    if (!location) {
      const timeout = setTimeout(() => {
        setShowLocationsModal(true);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [isLogin, location]);

  // ── Trigger fetch when debounced search changes ────────────────────────────
  useEffect(() => {
    resetPageAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // ── THE fetch effect ───────────────────────────────────────────────────────
  // Fires ONLY when fetchTrigger changes. All values come from refs so they
  // are always fresh regardless of React's render cycle.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger]);

  // ── Helper: increment the trigger (fires one API call) ────────────────────
  const triggerFetch = () => setFetchTrigger((n) => n + 1);

  // ── Helper: save scroll → reset page → fetch → restore scroll ────────────
  const resetPageAndFetch = () => {
    savedScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
    pageRef.current = 1;
    setPage(1);
    triggerFetch();
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    });
  };

  // ── Action handlers ────────────────────────────────────────────────────────
  const handleCatalogTypeChange = (type) => {
    fetchedCatalogTypes.current.add(type);
    catalogRef.current = type;
    setCatalogType(type);
    resetPageAndFetch();
  };

  const handleSubCategoryChange = (val) => {
    subCatRef.current = val;
    setSubCategory(val);
    resetPageAndFetch();
  };

  const handleSortChange = (val) => {
    dropDownRef.current = val;
    setDropDown(val);
    resetPageAndFetch();
  };

  // Pagination: go to a specific page without resetting scroll position
  const goToPage = (p) => {
    if (p === pageRef.current) return;
    pageRef.current = p;
    setPage(p);
    triggerFetch();
  };

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

        <LandingFilters
          dropDown={dropDown}
          setCatalogType={handleCatalogTypeChange}
          setDropDown={handleSortChange}
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
              router={router}
              setProductData={setProductData}
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

        {/* PAGINATION */}
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

      {isLogin === true && showLocationsModal && (
        <LocationsModal
          show={showLocationsModal}
          setShow={setShowLocationsModal}
          cb={(loc) => {
            locationRef.current = loc;
            triggerFetch();
          }}
        />
      )}
    </Container>
  );
}
