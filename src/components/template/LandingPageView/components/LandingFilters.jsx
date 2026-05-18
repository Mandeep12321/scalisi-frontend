"use client";

import { Col, Row } from "react-bootstrap";
import DropDown from "@/components/molecules/DropDown/DropDown";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { ReactSVG } from "react-svg";
import Image from "next/image";
import { mergeClass } from "@/resources/utils/helper";
import classes from "../LandingPageView.module.css";
import { MdChecklist, MdOutlineMenuBook, MdOutlineGridView } from "react-icons/md";

export default function LandingFilters({
  setCatalogType,
  dropDown,
  setDropDown,
  cardViewType,
  setCardViewType,
  isMob768,
  is375,
  subCategory,
  subCategoryOptions,
  setSubCategory,
  catalogType,
  isLogin,
  hideCatalogTabs = false,
  totalRecords = null,
}) {
  // ── Search-results mode: compact bar ──────────────────────────────────────
  if (hideCatalogTabs) {
    return (
      <Row className={mergeClass("align-items-center", classes.searchFiltersRow)}>
        {/* LEFT — result count */}
        <Col xs={12} sm={4} md={3} className={classes.resultsCountCol}>
          {totalRecords !== null && (
            <p className={classes.resultsCount}>{totalRecords} results found</p>
          )}
        </Col>

        {/* RIGHT — Sort + View */}
        <Col xs={12} sm={8} md={9} className="d-flex justify-content-end align-items-center">
          <div className={classes.filtersDiv}>
            <div className={classes.sortByDiv}>
              <p className={mergeClass("fs-18", classes.sortByLabel)}>Sort by</p>
              <DropDown
                placeholder="Sort"
                isHoverColor
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
                  className={mergeClass(
                    classes.viewTypeDiv,
                    cardViewType === "card" && classes.listIconActive,
                  )}
                  onClick={() => setCardViewType("card")}
                >
                  <div className={classes.gridIcon}>
                    <Image
                      src={!isMob768
                        ? "/assets/images/svg/card-grid-icon.svg"
                        : "/assets/images/app-images/cardGrid.png"}
                      fill
                      alt="card-view"
                    />
                  </div>
                  <p className={mergeClass(classes.cardTitle)}>Cards</p>
                </div>

                <div
                  className={mergeClass(
                    classes.listViewTypeDiv,
                    cardViewType === "list" && classes.listIconActive,
                  )}
                  onClick={() => setCardViewType("list")}
                >
                  <ReactSVG
                    src={"/assets/images/svg/productListIcon.svg"}
                    className={mergeClass(
                      classes.listIcon,
                      cardViewType === "list" && classes.listIconActive,
                    )}
                  />
                  <p className={mergeClass("fs-18", classes.listTitle, cardViewType === "list" && classes.listIconActive)}>
                    List
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  // ── Default mode: full catalog filter bar ─────────────────────────────────
  return (
    <>
      <Row className="align-items-center">
        {/* LEFT SECTION — Catalog Type Tabs (hidden when hideCatalogTabs is true) */}
        {!hideCatalogTabs && (
          <Col md={4} sm={12} lg={4} className="px-0 d-flex align-items-center mainCatalog_outer">
            <div className={classes.catalogTabsRow}>

              {/* ORDER GUIDE — only for logged-in users */}
              {isLogin && (
                <div
                  className={mergeClass(
                    classes.catalogTab,
                    catalogType === "orderGuide" && classes.catalogTabActive,
                  )}
                  onClick={() => {
                    setCatalogType("orderGuide");
                    setCardViewType("card");
                  }}
                >
                  <div className={classes.catalogTabIcon}>
                    <MdChecklist size={22} />
                  </div>
                  <p className={mergeClass("fs-18", classes.cardTitle)}>
                    Order Guide
                  </p>
                </div>
              )}

              {/* FULL CATALOG — always visible */}
              <div
                className={mergeClass(
                  classes.catalogTab,
                  catalogType === "fullCatalog" && classes.catalogTabActive,
                )}
                onClick={() => setCatalogType("fullCatalog")}
              >
                <div className={classes.catalogTabIcon}>
                  <MdOutlineGridView size={22} />
                </div>
                <p className={mergeClass("fs-18", classes.cardTitle)}>
                  Full Catalog
                </p>
              </div>

            </div>
          </Col>
        )}

        {/* RIGHT SECTION (FILTERS) */}
        <Col
          md={8}
          lg={8}
          sm={12}
          className="d-flex justify-content-end align-items-center px-0"
        >
          <div className={classes.filtersDiv}>
            {/* DROPDOWNS */}
            <div className={classes.sortByDiv}>
              {/* CATEGORY */}
              <div className="d-flex align-items-center gap-3">
                <p className={mergeClass("fs-18 mb-0", classes.sortByLabel)} style={{ whiteSpace: "nowrap" }}>Category</p>
                <DropDown
                  placeholder="All"
                  dropDownContainer={classes.dropDownContainer}
                  value={subCategory}
                  setValue={setSubCategory}
                  options={subCategoryOptions}
                />
              </div>

              {/* SORT */}
              <div className="d-flex align-items-center gap-3">
                <p className={mergeClass("fs-18 mb-0", classes.sortByLabel)} style={{ whiteSpace: "nowrap" }}>Sort By</p>
                <DropDown
                  placeholder="Sort"
                  isHoverColor
                  dropDownContainer={classes.dropDownContainer}
                  value={dropDown}
                  setValue={setDropDown}
                  options={SORT_BY_DROPDOWN}
                />
              </div>
            </div>

            {/* VIEW TOGGLE */}
            <div className={classes.cardViewDivMain}>
              <div className={classes.viewCardTypeDiv}>
                <p className="fs-18">View</p>
              </div>

              <div className={classes.cardsView}>
                {/* CARD VIEW */}
                <div
                  className={mergeClass(
                    classes.viewTypeDiv,
                    cardViewType === "card" && classes.listIconActive,
                  )}
                  onClick={() => setCardViewType("card")}
                >
                  <div className={classes.gridIcon}>
                    <Image
                      src={
                        !isMob768
                          ? "/assets/images/svg/card-grid-icon.svg"
                          : "/assets/images/app-images/cardGrid.png"
                      }
                      fill
                      alt="card-view"
                    />
                  </div>

                  <p className={mergeClass(classes.cardTitle)}>
                    Cards
                  </p>
                </div>

                {/* LIST VIEW */}
                <div
                  className={mergeClass(
                    classes.listViewTypeDiv,
                    cardViewType === "list" && classes.listIconActive,
                  )}
                  onClick={() => setCardViewType("list")}
                >
                  <ReactSVG
                    src={"/assets/images/svg/productListIcon.svg"}
                    className={mergeClass(
                      classes.listIcon,
                      cardViewType === "list" && classes.listIconActive,
                    )}
                  />

                  <p
                    className={mergeClass(
                      "fs-18",
                      classes.listTitle,
                      cardViewType === "list" && classes.listIconActive,
                    )}
                  >
                    List
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
