"use client";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import DropDown from "@/components/molecules/DropDown/DropDown";
import FeatureCard from "@/components/molecules/FeatureCards";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import ProductCard from "@/components/molecules/ProductCard";
import ProductListCard from "@/components/molecules/ProductListCard";
import SearchInput from "@/components/molecules/SearchInput";
import SwiperWrapper from "@/components/organisms/SwiperWrapper/SwiperWrapper";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { ALL_PRODUCT_DATA } from "@/developmentContent/mock-data";
import { Get, Post } from "@/interceptor/axiosInterceptor";
import LocationsModal from "@/modals/LocationsModal/LocationsModal";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import useDebounce from "@/resources/hooks/useDebounce";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import classes from "./LandingPageView.module.css";

export default function LandingPageView({ cmsData }) {
  const _cmsData = cmsData;
  const router = useRouter();
  const { isLogin, location } = useSelector((state) => state.authReducer);
  const [productData, setProductData] = useState(ALL_PRODUCT_DATA);
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

  useEffect(() => {
    isMobileViewHook(setIsMob768, 768);
    isMobileViewHook(setIs375, 376);
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
      let timeout = setTimeout(() => {
        setShowLocationsModal(true);
        return;
      }, 1500);
      setProductData([]);
      setTotalRecords(0);
      return () => clearTimeout(timeout);
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
          <div className={`${classes.mainHero}`}>
            <SwiperWrapper data={_cmsData?.hero?.arr} />
          </div>
        </Col>
        <Col md={12}>
          <div className={`my-3 ${classes.afterHeroCard}`}>
            {/* Note: THe linking of this card is temporary and will be changed later */}
            <Row>
              {_cmsData?.homeCards?.arr?.map((item, index) => (
                <Col
                  md={4}
                  key={index}
                  className={classes?.featureCardContainer}
                >
                  <FeatureCard
                    cardHome={classes.FeatureCardHome}
                    data={item}
                    onclick={() => {
                      if (index === 0) router?.push("/catalogs");
                      else if (index === 1) router?.push("/order-guide");
                      else if (index === 2) router?.push("/news-and-updates");
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
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
        <Col md={4} sm={12} lg={4} className="mt-sm-2 mt-0">
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
          className="mt-sm-2 mt-0 d-flex justify-content-end align-items-center"
        >
          <div className={classes.filtersDiv}>
            <div className={classes.sortByDiv}>
              <p className="fs-18 white-space">Sort by</p>
              <DropDown
                customStyle={{
                  fontWeight: "700",
                  paddingLeft: "1px",
                  paddingTop: is375 ? "0px" : "2px",
                  paddingBottom: is375 ? "0px" : "2px",
                  fontSize: isMob768 ? "14px !important" : "18px !important",
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
                    {!isMob768 ? (
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
                      // width={is375 ? 160 : 320}
                      height={380}
                      className={classes.skeleton}
                    />
                  ))
                : productData?.map((e, index) => (
                    <ProductCard
                      key={index}
                      data={e}
                      onClick={() => router?.push(`/products/${index}`)}
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
                      // width={is375 ? 360 : 280}
                      height={150}
                      className={classes.skeletonList}
                    />
                  ))
                : productData?.map((e, index) => (
                    <Col md={12} lg={12} xl={6} key={e?._id}>
                      <ProductListCard
                        data={e}
                        onClick={() => router?.push(`/products/${e?._id}`)}
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
        cb={(location) => getProductsData({ pg: 1, location, isLogin })}
      />
    </Container>
  );
}
