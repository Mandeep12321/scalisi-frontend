"use client";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import DropDown from "@/components/molecules/DropDown/DropDown";
import ProductCard from "@/components/molecules/ProductCard";

import PaginationComponent from "@/components/molecules/PaginationComponent";
import ProductDetailCard from "@/components/molecules/ProductDetailCard";
import ProductListCard from "@/components/molecules/ProductListCard";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { ALL_PRODUCT_DATA } from "@/developmentContent/mock-data";
import { Get, Post } from "@/interceptor/axiosInterceptor";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import useDebounce from "@/resources/hooks/useDebounce";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ReactSVG } from "react-svg";
import classes from "./ProductDetailView.module.css";
import {
  clearProductData,
  setTheProductData,
} from "@/store/common/commonSlice";

let singleProduct = ALL_PRODUCT_DATA[0];

export default function ProductDetailView({ cmsUpdateData, cmsSupportData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const support = cmsSupportData;
  const updates = cmsUpdateData;
  const { productData: commonProductData } = useSelector(
    (state) => state.commonReducer
  );
  const { isLogin, location } = useSelector((state) => state.authReducer);

  const [productData, setProductData] = useState(commonProductData);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [dropDown, setDropDown] = useState(SORT_BY_DROPDOWN?.[0]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");
  const [cardViewType, setCardViewType] = useState("card");
  const debounce = useDebounce(search, 500);

  const [isMobile, setIsMobile] = useState(false);
  const [is375, setIs375] = useState(false);

  console.log("commonProductData", productData);
  useEffect(() => {
    isMobileViewHook(setIs375, 376);
    isMobileViewHook(setIsMobile, 769);
  });

  const getProductsData = async () => {
    // Transform the data structure to match component expectations
    if (commonProductData && commonProductData.uoms) {
      const transformedData = {
        ...commonProductData,
        productVariant: commonProductData.uoms.map((uom) => ({
          type: uom.erp_uom,
          value: uom.erp_uom,
          price: uom.price || 0, // Handle null price
        })),
        selectedVariant: {
          label: `${commonProductData.uoms[0]?.erp_uom} / ${getFormattedPrice(
            commonProductData.uoms[0]?.price || 0
          )}`,
          value: commonProductData.uoms[0]?.erp_uom,
          price: commonProductData.uoms[0]?.price || 0,
        },
        selectedCount: 1,
      };
      setProductData(transformedData);
    } else {
      let newCopy = {
        ...singleProduct,
        selectedVariant: {
          label: `${
            singleProduct?.productVariant[0]?.type
          } / ${getFormattedPrice(singleProduct?.productVariant[0]?.price)}`,
          value: `${singleProduct?.productVariant[0]?.value}`,
          price: singleProduct?.productVariant[0]?.price,
        },
        selectedCount: 1,
      };
      setProductData(commonProductData);
    }
  };

  const getRelatedProductData = async ({
    pg = page,
    limit = PRODUCT_RECORDS_LIMIT,
    search = debounce,
    location,
    isLogin,
  }) => {
    setLoading("fetchRelatedProducts");

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

    try {
      const { response } = await apiMethod({
        route: `${route}?${params}`,
        data: locationData,
      });

      let data = response?.data?.data || response?.data || [];

      if (!data.length) data = ALL_PRODUCT_DATA;

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

      setRelatedProducts(formattedData);
      setPage(pg);
      setTotalRecords(response?.data?.totalRecords || formattedData.length);
    } catch (error) {
      console.error("Error fetching related products:", error);
      // Fallback to mock data
      let newCopy = ALL_PRODUCT_DATA?.map((item, index) => ({
        ...item,
        selectedVariant: {
          label: `${item?.productVariant[0]?.type} / ${getFormattedPrice(
            item?.productVariant[0]?.price
          )}`,
          value: `${item?.productVariant[0]?.value}`,
          price: item?.productVariant[0]?.price,
        },
        selectedCount: 1,
      }));
      setRelatedProducts(newCopy);
    }

    setLoading("");
  };

  useEffect(() => {
    // when productData is null, redirect to products page
    if (!commonProductData) {
      router.push("/products");
    }
    getProductsData();
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && !location) {
      // Show loading or handle no location case
      return;
    }

    if (isLogin && location) {
      getRelatedProductData({ pg: 1, location, isLogin });
    } else if (!isLogin) {
      getRelatedProductData({ pg: 1 });
    }
  }, [debounce, isLogin, location]);

  // Cleanup function to clear Redux data when component unmounts due to navigation
  useEffect(() => {
    return () => {
      // Only clear data when navigating away, not on page refresh
      // This will be called when the component unmounts due to navigation
      dispatch(clearProductData());
    };
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className={classes.productDetail}>
            {isMobile ? (
              <ProductCard
                data={productData}
                setVariantSelect={(selectedItems) => {
                  let dataCopy = structuredClone(productData);
                  dataCopy = {
                    ...dataCopy,
                    ...selectedItems,
                  };
                  setProductData(dataCopy);
                }}
              />
            ) : (
              <ProductDetailCard
                data={productData}
                setVariantSelect={(selectedItems) => {
                  let dataCopy = structuredClone(productData);
                  dataCopy = {
                    ...dataCopy,
                    ...selectedItems,
                  };
                  setProductData(dataCopy);
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
        {cardViewType === "card" ? (
          <Col
            md={12}
            style={{
              marginTop: "19.8px",
            }}
          >
            <div className={classes.productCard__wrapper}>
              {loading === "fetchRelatedProducts"
                ? Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      height={380}
                      className={classes.skeletonList}
                    />
                  ))
                : relatedProducts?.map((e, index) => (
                    <ProductCard
                      key={index}
                      data={e}
                      onClick={() => {
                        router?.push(`/products/${index}`);
                        dispatch(setTheProductData(e));
                      }}
                      setVariantSelect={(selectedItems) => {
                        let dataCopy = structuredClone(relatedProducts);
                        dataCopy.splice(index, 1, {
                          ...e,
                          ...selectedItems,
                        });
                        setRelatedProducts(dataCopy);
                      }}
                    />
                  ))}
            </div>
          </Col>
        ) : (
          <Col md={12} className="my-5">
            <Row className="gy-4">
              {loading === "fetchRelatedProducts"
                ? Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      height={150}
                      className={classes.skeletonList}
                    />
                  ))
                : relatedProducts?.map((e, index) => (
                    <Col md={12} lg={12} xl={6} key={index}>
                      <ProductListCard
                        data={e}
                        onClick={() => {
                          router?.push(`/products/${index}`);
                          dispatch(setTheProductData(e));
                        }}
                        setVariantSelect={(selectedItems) => {
                          let dataCopy = structuredClone(relatedProducts);
                          dataCopy.splice(index, 1, {
                            ...e,
                            ...selectedItems,
                          });
                          setRelatedProducts(dataCopy);
                        }}
                      />
                    </Col>
                  ))}
            </Row>
          </Col>
        )}

        {totalRecords > PRODUCT_RECORDS_LIMIT && (
          <Col md={12}>
            <div className={classes.pagination}>
              <PaginationComponent
                totalRecords={totalRecords}
                currentPage={page}
                setCurrentPage={(p) => {
                  if (p === page) return;
                  getRelatedProductData({
                    pg: p,
                    limit: PRODUCT_RECORDS_LIMIT,
                    location,
                    isLogin,
                  });
                }}
              />
            </div>
          </Col>
        )}
      </Row>
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
