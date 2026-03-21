"use client";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import DropDown from "@/components/molecules/DropDown/DropDown";
import HeroSection from "@/components/molecules/HeroSection";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import ProductCard from "@/components/molecules/ProductCard";
import ProductListCard from "@/components/molecules/ProductListCard";
import SearchInput from "@/components/molecules/SearchInput";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { ALL_PRODUCT_DATA } from "@/developmentContent/mock-data";
import { Get, Post } from "@/interceptor/axiosInterceptor";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import useDebounce from "@/resources/hooks/useDebounce";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import { setTheProductData } from "@/store/common/commonSlice";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import classes from "./ProductsPageView.module.css";
import LandingFilters from "../LandingPageView/components/LandingFilters";
import useCategories from "../LandingPageView/hooks/useCategories";
import FiltersBar from "@/components/common/FiltersBar";
import ProductGrid from "@/components/common/ProductGrid";
import useProducts from "../LandingPageView/hooks/useProducts";
import ProductListView from "../LandingPageView/components/ProductList";

export default function ProductsPageView({ cmsData }) {
  const _cmsData = cmsData;
  const router = useRouter();
  const { isLogin, location } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [showLocationsModal, setShowLocationsModal] = useState(false);
  const [dropDown, setDropDown] = useState(SORT_BY_DROPDOWN?.[0]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [cardViewType, setCardViewType] = useState("card");
  const debouncedSearch = useDebounce(search, 500);
  const [isMob768, setIsMob768] = useState(false);
  const [is375, setIs375] = useState(false);
  const [is768, setIs768] = useState(false);
  const [subCategory, setSubCategory] = useState(null);
  const [catalogType, setCatalogType] = useState("orderGuide");

  useEffect(() => {
    isMobileViewHook(setIsMob768, 768);
    isMobileViewHook(setIs375, 376);
    isMobileViewHook(setIs768, 768);
  });

  const { productData, setProductData, totalRecords, loading, fetchProducts } =
    useProducts();

  // 👇 ADD LOGS HERE
  console.log("totalRecords:", totalRecords);
  console.log("PRODUCT_RECORDS_LIMIT:", PRODUCT_RECORDS_LIMIT);
  console.log("productData length:", productData?.length);

  const { categories, loading: catLoading, fetchCategories } = useCategories();

  // ✅ Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isLogin && !location) {
      let timeout = setTimeout(() => {
        setShowLocationsModal(true);
        return;
      }, 1500);
      return () => clearTimeout(timeout);
    }

    if (isLogin && location) fetchProducts({ pg: 1, location, isLogin });
  }, [isLogin, location]);

  // ✅ Fetch products
  useEffect(() => {
    if (!subCategory) return;

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

        <Col md={4} sm={12} lg={4} className="d-flex align-items-center"></Col>

        <Col
          md={8}
          lg={8}
          sm={12}
          className="mt-sm-2 mt-0 d-flex justify-content-end align-items-center"
        >
          <FiltersBar
            subCategory={subCategory}
            subCategoryOptions={categories}
            setSubCategory={setSubCategory}
            dropDown={dropDown}
            setDropDown={setDropDown}
            cardViewType={cardViewType}
            setCardViewType={setCardViewType}
            isMob768={isMob768}
            is375={is375}
          />
        </Col>

        <Col md={12} style={{ marginTop: "40px" }}>
          {cardViewType === "card" && (
            <ProductGrid
              productData={productData}
              loading={loading}
              setProductData={setProductData}
              onCardClick={(item, index) => router.push(`/products/${index}`)}
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
        </Col>

        {totalRecords > PRODUCT_RECORDS_LIMIT && (
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
      <LocationsModal
        show={showLocationsModal}
        setShow={setShowLocationsModal}
        cb={(location) => fetchProducts({ pg: 1, location, isLogin })}
      />
    </Container>
  );
}
