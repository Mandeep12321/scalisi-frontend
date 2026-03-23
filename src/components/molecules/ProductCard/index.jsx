"use client";

import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import {
  getFormattedPrice,
  handleDecrypt,
  mergeClass,
} from "@/resources/utils/helper";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/store/cart/cartSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms/Button";
import Counter from "../Counter";
import DropDown from "../DropDown/DropDown";
import classes from "./ProductCard.module.css";
import { useEffect, useState } from "react";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { FaShoppingCart } from "react-icons/fa";
import { MdRemoveShoppingCart, MdOutlineNoteAdd, MdOutlineEdit } from "react-icons/md";
import { useItemNote } from "@/components/common/hooks/useItemNote";

export default function ProductCard({ data, setVariantSelect, onClick }) {
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const { cart } = useSelector((state) => state?.cartReducer);
  const { isLogin } = useSelector((state) => state?.authReducer);
  const isAuthenticated = accessToken && isLogin;
  const dispatch = useDispatch();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isMobile375, setIsMobile375] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Language detection - check on every render to ensure it's always current
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const {
    noteValue,
    setNoteValue,
    isEditing,
    hasNote,
    handleNoteClick,
    handleCancelNote,
    handleRemoveNote,
  } = useItemNote({ data });

  // Force re-render when cart changes
  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [cart]);

  useEffect(() => {
    isMobileViewHook(setIsMobile, 576);
    isMobileViewHook(setIsMobile375, 376);
  });

  // Early return if data is null or undefined
  if (!data) {
    return null;
  }

  const dropDownOptions = data?.uoms?.map((e) => ({
    label: `${e?.erp_uom} / ${getFormattedPrice(e?.price)}`,
    value: e?.erp_uom,
    price: e?.price,
  }));

  // Check if this product is in cart
  const isInCart = cart.some(
    (item) =>
      item.itemid === data.itemid &&
      item.selectedVariant?.value === data.selectedVariant?.value,
  );

  // Get quantity from cart if item is in cart, otherwise use local state
  const currentQuantity = isInCart
    ? cart.find(
        (item) =>
          item.itemid === data.itemid &&
          item.selectedVariant?.value === data.selectedVariant?.value,
      )?.selectedCount || 1
    : data?.selectedCount || 1;

  // Set default variant if not selected
  useEffect(() => {
    if (!data?.selectedVariant && dropDownOptions?.length > 0) {
      setVariantSelect({
        selectedVariant: dropDownOptions[0],
        selectedCount: 1,
      });
    }
  }, [data?.selectedVariant, dropDownOptions, setVariantSelect]);

  const cartHandler = (action) => {
    if (action === "add") {
      let productDataCopy = { ...data };
      delete productDataCopy?.productVariant;

      if (!productDataCopy.selectedVariant && dropDownOptions?.length > 0) {
        productDataCopy.selectedVariant = dropDownOptions[0];
      }

      dispatch(addProductToCart(productDataCopy));
      RenderToast({
        type: "success",
        message: isSpanish ? "Artículo añadido al carrito" : "Item added to cart",
      });
    } else if (action === "remove") {
      dispatch(
        removeProductFromCart({
          _id: data.itemid,
          productVariant: data.selectedVariant?.value,
        }),
      );
      RenderToast({
        type: "success",
        message: isSpanish ? "Artículo eliminado del carrito" : "Item removed from cart",
      });
    }
  };

  // Smart button label
  const noteBtnLabel = isEditing ? "Save Note" : hasNote ? "Edit Note" : "Add Note";

  return (
    <div className={mergeClass(classes.mainDiv)}>
      <div
        className={mergeClass("cursor-pointer ", classes.imageDiv)}
        onClick={onClick}
      >
        <Image fill alt={data?.itemid} src={data?.fullimagepath} />
      </div>

      <div
        className={classes.cardBody}
        style={{ paddingBottom: isAuthenticated ? "0px" : "15px" }}
      >
        <h3
          className={mergeClass(
            classes.title,
            "fs-20 maxLine2 fw-500 cursor-pointer mb-3",
          )}
          onClick={onClick}
        >
          {data?.description}
        </h3>

        {/* ID row + Note trigger */}
        <div className="d-flex justify-content-between align-items-center flexWrap">
          <p className={mergeClass("fs-12 fw-500 pt-0", classes.productId)}>
            {data?.itemid}
          </p>

          {/* Single smart note button */}
          {isAuthenticated && (
            <button
              className={mergeClass(
                classes.noteTriggerBtn,
                hasNote && !isEditing && classes.noteTriggerBtnHasNote,
                isEditing && classes.noteTriggerBtnSave,
              )}
              onClick={handleNoteClick}
            >
              {isEditing ? <MdOutlineEdit size={14} /> : <MdOutlineNoteAdd size={14} />}
              <span>{noteBtnLabel}</span>
            </button>
          )}
        </div>

        {/* Note editing area — opens on button click, closes on Save */}
        {isAuthenticated && isEditing && (
          <div className={classes.noteWrapper}>
            <textarea
              rows={2}
              placeholder="Add a note for this item…"
              value={noteValue}
              onChange={(e) => setNoteValue(e.target.value)}
              className={classes.noteTextarea}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        )}

        {isAuthenticated ? (
          <>
            <DropDown
              dropDownContainer={mergeClass(
                classes.dropdownDiv,
                isEditing && classes.dropdownTight
              )}
              dropdownWidth={classes.dropdownWidthClass}
              customStyle={{
                minHeight: "36px",
                fontWeight: "600",
                fontSize: "13px",
                paddingBlock: "0px",
                color: isMobile375 ? "#36363696 !important" : undefined,
                paddingLeft: "0px !important",
              }}
              placeholderColor={isMobile375 ? "#36363696 !important" : undefined}
              container
              options={dropDownOptions}
              setValue={(e) => {
                setVariantSelect({
                  selectedVariant: e,
                  selectedCount: data.selectedCount || 1,
                });
              }}
              value={data?.selectedVariant}
            />

            <div className={mergeClass(classes.counterDivTwo, classes.counterDiv)}>
              <Counter
                iconStyle={"fs-18"}
                data={currentQuantity}
                setData={(e) => {
                  setVariantSelect({
                    selectedVariant: data.selectedVariant,
                    selectedCount: e,
                  });
                }}
                isInCart={isInCart}
                productId={data?.itemid}
                productVariant={data?.selectedVariant?.value}
              />
              <Button
                key={`${isInCart}-${isSpanish}-${forceUpdate}`}
                variant={isInCart ? "secondary" : "primary"}
                onClick={() => {
                  cartHandler(isInCart ? "remove" : "add");
                }}
                label={
                  isMobile ? (
                    isInCart ? <MdRemoveShoppingCart /> : <FaShoppingCart />
                  ) : isInCart ? (
                    isSpanish ? "Eliminar artículo" : "Remove Item"
                  ) : isSpanish ? (
                    "Añadir a la cesta"
                  ) : (
                    "Add To Cart"
                  )
                }
                className={mergeClass(
                  "fs-15 fw-600",
                  classes.removeFromCartButton,
                  classes.button,
                )}
              />
            </div>
          </>
        ) : (
          <p
            className={mergeClass("fs-14 fw-500", classes.link)}
            onClick={() => router.push("/login")}
          >
            Please log in to place your order.
          </p>
        )}
      </div>
    </div>
  );
}
