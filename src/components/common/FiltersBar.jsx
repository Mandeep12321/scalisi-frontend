"use client";

import DropDown from "@/components/molecules/DropDown/DropDown";
import { SORT_BY_DROPDOWN } from "@/developmentContent/dropdown-options";
import Image from "next/image";
import { ReactSVG } from "react-svg";
import { mergeClass } from "@/resources/utils/helper";
import classes from "../template/LandingPageView/LandingPageView.module.css";

export default function FiltersBar({
  subCategory,
  subCategoryOptions,
  setSubCategory,
  dropDown,
  setDropDown,
  cardViewType,
  setCardViewType,
  isMob768,
  is375,
}) {
  return (
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
            customStyle={{
            fontWeight: "700",
            paddingLeft: "1px",
            paddingTop: is375 ? "0px" : "2px",
            paddingBottom: is375 ? "0px" : "2px",
            fontSize: isMob768 ? "14px" : "18px",
          }}
        />

        {/* SORT */}
        <DropDown
          customStyle={{
            fontWeight: "700",
            paddingLeft: "1px",
            paddingTop: is375 ? "0px" : "2px",
            paddingBottom: is375 ? "0px" : "2px",
            fontSize: isMob768 ? "14px" : "18px",
          }}
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
              cardViewType === "card" && classes.listIconActive
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

            <p className={mergeClass("fw-700 fs-18", classes.cardTitle)}>
              Cards
            </p>
          </div>

          {/* LIST VIEW */}
          <div
            className={mergeClass(
              classes.listViewTypeDiv,
              cardViewType === "list" && classes.listIconActive
            )}
            onClick={() => setCardViewType("list")}
          >
            <ReactSVG
              src={"/assets/images/svg/productListIcon.svg"}
              className={mergeClass(
                classes.listIcon,
                cardViewType === "list" && classes.listIconActive
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
  );
}