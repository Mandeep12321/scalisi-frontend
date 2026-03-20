"use client";

import { Col } from "react-bootstrap";
import { mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { ReactSVG } from "react-svg";
import classes from "../LandingPageView.module.css";
import DropDown from "@/components/molecules/DropDown/DropDown";
import { SORT_BY_DROPDOWN } from "@/developmentContent/constants";

export default function LandingFilters({
  dropDown,
  setDropDown,
  cardViewType,
  setCardViewType,
  isMob768,
  is375,
}) {
  return (
    <>
      {/* ORDER GUIDE / FULL CATALOG TOGGLE */}
      <Col md={4} sm={12} lg={4} className="mt-sm-2 mt-0">
        <div className={classes.cardsView}>
          {/* ORDER GUIDE */}
          <div
            className={mergeClass(
              classes.viewTypeDiv,
              cardViewType === "orderGuide" && classes.listIconActive
            )}
            onClick={() => setCardViewType("orderGuide")}
          >
            <div className={classes.gridIcon}>
              <Image
                src={"/assets/images/svg/orderGuideIcon.svg"}
                fill
                alt="order-guide-icon"
              />
            </div>
            <p className={mergeClass("fw-700 fs-18", cardViewType === "orderGuide" && classes.listIconActive)}>
              Order Guide
            </p>
          </div>

          {/* FULL CATALOG */}
          <div
            className={mergeClass(
              classes.viewTypeDiv,
              cardViewType === "fullCatalog" && classes.listIconActive
            )}
            onClick={() => setCardViewType("fullCatalog")}
          >
            <div className={classes.gridIcon}>
              <Image
                src={"/assets/images/svg/fullCatalogIcon.svg"}
                fill
                alt="full-catalog-icon"
              />
            </div>
            <p className={mergeClass("fw-700 fs-18", cardViewType === "fullCatalog" && classes.listIconActive)}>
              Full Catalog
            </p>
          </div>
        </div>
      </Col>

      {/* SORT & VIEW TOGGLE */}
      <Col
        md={8}
        lg={8}
        sm={12}
        className="mt-sm-2 mt-0 d-flex justify-content-end align-items-center"
      >
        <div className={classes.filtersDiv}>
          {/* SORT */}
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

          {/* CARD / LIST VIEW */}
          <div className={classes.cardViewDivMain}>
            <div className={classes.viewCardTypeDiv}>
              <p className="fs-18">View</p>
            </div>

            <div className={classes.cardsView}>
              {/* CARD VIEW */}
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
                <p className={mergeClass("fw-700 fs-18", cardViewType === "card" && classes.listIconActive)}>
                  Cards
                </p>
              </div>

              {/* LIST VIEW */}
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
    </>
  );
}