"use client";

import NoProductsFound from "@/components/molecules/NoProductsFound/NoProductsFound";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import ProductListView from "@/components/organisms/ProductListView/ProductListView";
import { PRODUCT_RECORDS_LIMIT } from "@/developmentContent/constants";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import useCategories from "@/resources/hooks/useCategories";
import useDebounce from "@/resources/hooks/useDebounce";
import useProducts from "@/resources/hooks/useProducts";
import { setGlobalSearch } from "@/store/common/commonSlice";
import { setTheProductData } from "@/store/common/commonSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LandingFilters from "../LandingPageView/components/LandingFilters";
import classes from "./SearchPageView.module.css";

export default function SearchPageView() {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const { isLogin, location } = useSelector((state) => state.authReducer);
    const { search: globalSearch } = useSelector((state) => state?.commonReducer);

    // Seed local search from URL param on first render
    const urlQuery = searchParams.get("q") || "";
    const [localSearch, setLocalSearch] = useState(urlQuery || globalSearch || "");

    const [page, setPage] = useState(1);
    const [dropDown, setDropDown] = useState(SORT_BY_DROPDOWN[0]);
    const [cardViewType, setCardViewType] = useState("card");
    const [subCategory, setSubCategory] = useState(null);
    const [catalogType, setCatalogType] = useState(
        isLogin ? "orderGuide" : "fullCatalog"
    );
    const [isMob768, setIsMob768] = useState(false);
    const [is375, setIs375] = useState(false);

    const debouncedSearch = useDebounce(localSearch, 500);

    const pageRef = useRef(1);
    const dropDownRef = useRef(dropDown);
    const catalogRef = useRef(isLogin ? "orderGuide" : "fullCatalog");
    const subCatRef = useRef(null);
    const locationRef = useRef(location);
    const fetchedCatalogTypes = useRef(new Set([catalogRef.current]));

    const [fetchTrigger, setFetchTrigger] = useState(0);
    const triggerFetch = () => setFetchTrigger((n) => n + 1);

    const { productData, setProductData, totalRecords, loading, fetchProducts } =
        useProducts();
    const { categories, fetchCategories } = useCategories();

    useEffect(() => {
        isMobileViewHook(setIsMob768, 768);
        isMobileViewHook(setIs375, 376);
    }, []);

    // Sync URL param changes into local search
    useEffect(() => {
        const q = searchParams.get("q") || "";
        if (q && q !== localSearch) {
            setLocalSearch(q);
            dispatch(setGlobalSearch(q));
        }
    }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        locationRef.current = location;
    }, [location]);

    useEffect(() => {
        fetchCategories();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (categories.length && !subCatRef.current) {
            subCatRef.current = categories[0];
            setSubCategory(categories[0]);
            triggerFetch();
        }
    }, [categories]); // eslint-disable-line react-hooks/exhaustive-deps

    // Trigger fetch on debounced search change
    useEffect(() => {
        pageRef.current = 1;
        setPage(1);
        triggerFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    // THE fetch effect
    useEffect(() => {
        if (catalogRef.current !== "orderGuide" && !subCatRef.current) return;
        if (isLogin && !locationRef.current) return;

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

    const handleSearchChange = (val) => {
        setLocalSearch(val);
        dispatch(setGlobalSearch(val));
        // Update URL param without full navigation
        const params = new URLSearchParams(searchParams.toString());
        params.set("q", val);
        router.replace(`/search?${params.toString()}`, { scroll: false });
    };

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
        <>
            {/* Header — white background */}
            <div className={classes.mainDiv}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className={classes.headerSection}>
                                {localSearch ? (
                                    <h1 className={classes.searchHeading}>
                                        Showing search results for:{" "}
                                        <span className={classes.searchQuery}>&ldquo;{localSearch}&rdquo;</span>
                                    </h1>
                                ) : (
                                    <h1 className={classes.searchHeading}>Search Results</h1>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Full-width beige filter bar */}
            <div className={classes.filterBar}>
                <Container>
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
                        hideCatalogTabs={true}
                        totalRecords={!loading ? totalRecords : null}
                    />
                </Container>
            </div>

            {/* Product grid / list */}
            <Container>
                <Row>
                    <Col md={12} className={classes.contentRow}>
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
                </Row>

                {/* Pagination */}
                {totalRecords > PRODUCT_RECORDS_LIMIT && (
                    <Row>
                        <Col md={12}>
                            <div style={{ marginBottom: "60px" }}>
                                <PaginationComponent
                                    totalRecords={totalRecords}
                                    currentPage={page}
                                    setCurrentPage={goToPage}
                                />
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
}
