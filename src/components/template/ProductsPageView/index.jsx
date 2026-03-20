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

export default function ProductsPageView({ cmsData }) {
  const _cmsData = cmsData;
  const router = useRouter();
  const { isLogin, location } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [showLocationsModal, setShowLocationsModal] = useState(false);
  const [loading, setLoading] = useState("");
  const [dropDown, setDropDown] = useState(SORT_BY_DROPDOWN?.[0]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [cardViewType, setCardViewType] = useState("card");
  const debouncedSearch = useDebounce(search, 500);
  const [isMob768, setIsMob768] = useState(false);
  const [is375, setIs375] = useState(false);
  const [is768, setIs768] = useState(false);

  console.log(SORT_BY_DROPDOWN, "==SORT_BY_DROPDOWN")

  useEffect(() => {
    isMobileViewHook(setIsMob768, 768);
    isMobileViewHook(setIs375, 376);
    isMobileViewHook(setIs768, 768);
  });

  const getProductsData = async ({
    pg = page,
    limit = PRODUCT_RECORDS_LIMIT,
    search = debouncedSearch,
    location,
    isLogin,
  }) => {
    setLoading("fetchProducts");

    const route = isLogin ? "products" : "products/public";
    const apiMethod = isLogin ? Post : Get;

    const params = new URLSearchParams({
      page: pg,
      limit,
      search,
    }).toString();

    const locationData = {
      custno: location?.ERP_CID,
      cshipno: location?.ERP_SID,
      date: new Date().toISOString().split("T")[0],
    };

    const { response } = await apiMethod({
      route: `${route}?${params}`,
      data: locationData,
    });

    let data = response?.data?.data || response?.data || [];

    if (!data.length) data = ALL_PRODUCT_DATA;

    // const formattedData = data.map((item) => ({
    //   ...item,
    //   selectedVariant: {
    //     label: `${
    //       item?.productVariant?.[0]?.type || "Default"
    //     } / ${getFormattedPrice(item?.productVariant?.[0]?.price || 0)}`,
    //     value: `${item?.productVariant?.[0]?.value || "default"} ${
    //       item?.productVariant?.[0]?.price || 0
    //     }`,
    //   },
    //   selectedCount: 1,
    // }));
    const formattedData = data.map((item) => {
      // Use the first UOM as default variant if available
      const defaultUom = item?.uoms?.[0];
      const defaultVariant = {
        label: defaultUom
          ? `${defaultUom.erp_uom} / ${getFormattedPrice(defaultUom.price)}`
          : "Default / $0.00",
        value: defaultUom ? defaultUom.erp_uom : "default 0",
      };

      return {
        ...item,
        selectedVariant: defaultVariant,
        selectedCount: 1,
      };
    });

    setProductData(formattedData);
    setPage(pg);
    setTotalRecords(response?.data?.totalRecords || formattedData.length);
    setLoading("");
  };

  useEffect(() => {
    if (isLogin && !location) {
      setShowLocationsModal(true);
      setProductData([]);
      setTotalRecords(0);
      return;
    }

    if (isLogin && location) getProductsData({ pg: 1, location, isLogin });
  }, [isLogin, location]);

  useEffect(() => {
    if (!isLogin && !location) getProductsData({ pg: 1 });
  }, []);

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

        <Col md={4} sm={12} lg={4} className="mt-2">
          <div className={classes.searchDiv}>
            <SearchInput
              search={search}
              setSearch={setSearch}
              noBorder
              rightIconClass={classes.searchIcon}
              placeholder={"Search for products..."}
              rightIconColor={"var(--gray-color-v1)"}
              inputClass={classes.searchInput}
            />
          </div>
        </Col>
        <Col
          md={8}
          lg={8}
          sm={12}
          className="mt-2 d-flex justify-content-end align-items-center"
        >
          <div className={classes.filtersDiv}>
            <div className={classes.sortByDiv}>
              <p className="fs-18 white-space">Sort by</p>
              <DropDown
                customStyle={{
                  fontWeight: "600",
                  paddingLeft: is375 ? "4px" : "1px",
                  paddingTop: is375 ? "5px" : "2px",
                  paddingBottom: "1px",
                  minHeight: "40px",
                  fontSize: is768 ? "14px !important" : "18px !important",
                }}
                isHoverColor={true}
                dropDownContainer={classes.dropDownContainer}
                value={dropDown}
                setValue={setDropDown}
                options={SORT_BY_DROPDOWN}
              />
            </div>
            <div className={classes.cardViewDivMain}>
              <div className={classes.viewCardTypeDiv}>
                <p className="fs-18">View</p>
              </div>
              <div className={classes.cardsView}>
                <div
                  className={classes.viewTypeDiv}
                  onClick={() => setCardViewType("card")}
                >
                  <div className={classes.gridIcon}>
                    {!is768 ? (
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
                  <p className={mergeClass("fw-700 fs-18", classes.cardTitle)}>
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
        </Col>

        {cardViewType === "card" ? (
          <Col
            md={12}
            style={{
              marginTop: isMob768 ? "20px" : "50.8px",
            }}
          >
            <div className={classes.productCard__wrapper}>
              {loading === "fetchProducts"
                ? Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      // width={280}
                      height={380}
                      className={classes.skeletonList}
                    />
                  ))
                : productData?.map((e, index) => (
                    <ProductCard
                      key={index}
                      data={e}
                      onClick={() => {
                        router?.push(`/products/${index}`);
                        dispatch(setTheProductData(e));
                      }}
                      setVariantSelect={(selectedItems) => {
                        let dataCopy = structuredClone(productData);
                        dataCopy.splice(index, 1, {
                          ...e,
                          ...selectedItems,
                        });
                        setProductData(dataCopy);
                      }}
                    />
                  ))}
            </div>
          </Col>
        ) : (
          <Col
            md={12}
            style={{
              marginTop: isMob768 ? "20px" : "50.8px",
            }}
          >
            <Row className="gy-2 gy-sm-4">
              {loading === "fetchProducts"
                ? Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      // width={280}
                      height={150}
                      className={classes.skeletonList}
                    />
                  ))
                : productData?.map((e, index) => (
                    <Col md={12} lg={12} xl={6} key={index}>
                      <ProductListCard
                        data={e}
                        onClick={() => {
                          router?.push(`/products/${index}`);
                          dispatch(setTheProductData(e));
                        }}
                        setVariantSelect={(selectedItems) => {
                          let dataCopy = structuredClone(productData);
                          dataCopy.splice(index, 1, {
                            ...e,
                            ...selectedItems,
                          });
                          setProductData(dataCopy);
                        }}
                      />
                    </Col>
                  ))}
            </Row>
          </Col>
        )}
        {totalRecords > PRODUCT_RECORDS_LIMIT && (
          <>
            <Col md={12}>
              <div className={classes.pagination}>
                <PaginationComponent
                  totalRecords={totalRecords}
                  currentPage={page}
                  setCurrentPage={(p) => {
                    if (p === page) return;
                    getProductsData({
                      pg: p,
                      limit: PRODUCT_RECORDS_LIMIT,
                      location,
                      isLogin,
                    });
                  }}
                />
              </div>
            </Col>
          </>
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
        cb={(location) => getProductsData({ pg: 1, location })}
      />
    </Container>
  );
}
