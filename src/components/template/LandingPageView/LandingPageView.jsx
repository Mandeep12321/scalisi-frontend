"use client";

"use client";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import LandingHero from "./components/LandingHero";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { mergeClass } from "@/resources/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from "./LandingPageView.module.css";
import LandingFilters from "./components/LandingFilters";
import useCategories from "./hooks/useCategories";
import ProductGrid from "./components/ProductGrid";
import ProductListView from "./components/ProductList";
import useProducts from "./hooks/useProducts";
import OrderGuideView from "./components/OrderGuideView";
import SearchInput from "@/components/molecules/SearchInput";
import useDebounce from "@/resources/hooks/useDebounce";
import DropDown from "@/components/molecules/DropDown/DropDown";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { ReactSVG } from "react-svg";
import Image from "next/image";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";


export default function LandingPageView({ cmsData }) {

  console.log(cmsData, "cmsData");
  const router = useRouter();
  const { isLogin, location } = useSelector((state) => state.authReducer);

  const [page, setPage] = useState(1);
  const [dropDown, setDropDown] = useState("Newest");

  const [catalogType, setCatalogType] = useState("orderGuide");
  // ✅ Store FULL object (react-select)
  const [subCategory, setSubCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [cardViewType, setCardViewType] = useState("card");
  const debouncedSearch = useDebounce(search, 500);
  const [isMob768, setIsMob768] = useState(false);
  const [is375, setIs375] = useState(false);
    const [showLocationsModal, setShowLocationsModal] = useState(false);
  

  // ✅ HOOKS
  const { productData, setProductData, totalRecords, loading, fetchProducts } =
    useProducts();

  const { categories, loading: catLoading, fetchCategories } = useCategories();

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

   useEffect(() => {
    if (isLogin && !location) {
      let timeout = setTimeout(() => {
        setShowLocationsModal(true);
        return;
      }, 1500);
      return () => clearTimeout(timeout);
    }

  }, [isLogin, location]);

  // ✅ Fetch products
  useEffect(() => {
    if (!subCategory || (isLogin && !location)) return;

    fetchProducts({
      page,
      limit: PRODUCT_RECORDS_LIMIT,
      isLogin,
      location,
      sort: dropDown,
      type: catalogType,
      subCategory: subCategory?.value || null,
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

        <LandingFilters
          search={search}
          setSearch={setSearch}
          dropDown={dropDown}
          setCatalogType={setCatalogType}
          setDropDown={setDropDown}
          cardViewType={cardViewType}
          setCardViewType={setCardViewType}
          isMob768={isMob768}
          is375={is375}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          subCategoryOptions={categories}
          catalogType={catalogType}
        />

        {/* CONTENT */}
  

        <Col md={12} style={{ marginTop: "40px" }}>
          {catalogType !== "orderGuide" && cardViewType === "card" && (
            <ProductGrid
              productData={productData}
              loading={loading}
              router={router}
              setProductData={setProductData}
            />
          )}

          {catalogType !== "orderGuide" && cardViewType === "list" && (
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
      <LocationsModal
              show={showLocationsModal}
              setShow={setShowLocationsModal}
              cb={(location) => fetchProducts({ pg: 1, location, isLogin })}
            />
    </Container>
  );
}
