"use client";

import { Col } from "react-bootstrap";
import DropDown from "@/components/molecules/DropDown/DropDown";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import { ReactSVG } from "react-svg";
import Image from "next/image";
import { mergeClass } from "@/resources/utils/helper";
import classes from "../LandingPageView.module.css";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdOutlineGridView } from "react-icons/md";

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
}) {
  return (
    <>
      {/* LEFT SECTION — Catalog Type Tabs */}
      <Col md={4} sm={12} lg={4} className="d-flex align-items-center">
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
                 <MdOutlineMenuBook size={22} />
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
              !isLogin && classes.catalogTabDisabled,
            )}
            onClick={() => isLogin && setCatalogType("fullCatalog")}
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

      {/* RIGHT SECTION (FILTERS) */}
      {catalogType !== "orderGuide" && (
        <Col
          md={8}
          lg={8}
          sm={12}
          className="d-flex justify-content-end align-items-center"
        >
          <div className={classes.filtersDiv}>
            {/* DROPDOWNS */}
            <div className={classes.sortByDiv}>
              {/* CATEGORY */}
              <DropDown
                placeholder="Category"
                dropDownContainer={classes.dropDownContainer}
                value={subCategory}
                setValue={setSubCategory}
                options={subCategoryOptions}
              />

              {/* SORT */}
              <DropDown
                placeholder="Sort"
                isHoverColor
                dropDownContainer={classes.dropDownContainer}
                value={dropDown}
                setValue={setDropDown}
                options={SORT_BY_DROPDOWN}
              />
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
      )}
    </>
  );
}
