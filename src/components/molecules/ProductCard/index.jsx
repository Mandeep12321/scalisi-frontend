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
import { MdRemoveShoppingCart } from "react-icons/md";

export default function ProductCard({ data, setVariantSelect, onClick }) {
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const { cart } = useSelector((state) => state?.cartReducer);

  // Early return if data is null or undefined
  if (!data) {
    return null;
  }

  const dispatch = useDispatch();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isMobile375, setIsMobile375] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Language detection - check on every render to ensure it's always current
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  // Force re-render when cart changes
  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [cart]);

  useEffect(() => {
    isMobileViewHook(setIsMobile, 576);
    isMobileViewHook(setIsMobile375, 376);
  });

  const dropDownOptions = data?.uoms?.map((e) => ({
    label: `${e?.erp_uom} / ${getFormattedPrice(e?.price)}`,
    value: e?.erp_uom,
    price: e?.price,
  }));

  // Check if this product is in cart
  const isInCart = cart.some(
    (item) =>
      item.itemid === data.itemid &&
      item.selectedVariant?.value === data.selectedVariant?.value
  );

  // Get quantity from cart if item is in cart, otherwise use local state
  const currentQuantity = isInCart
    ? cart.find(
        (item) =>
          item.itemid === data.itemid &&
          item.selectedVariant?.value === data.selectedVariant?.value
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

      // Ensure selectedVariant is set
      if (!productDataCopy.selectedVariant && dropDownOptions?.length > 0) {
        productDataCopy.selectedVariant = dropDownOptions[0];
      }

      dispatch(addProductToCart(productDataCopy));
      RenderToast({
        type: "success",
        message: isSpanish
          ? "Artículo añadido al carrito"
          : "Item added to cart",
      });
    } else if (action === "remove") {
      dispatch(
        removeProductFromCart({
          _id: data.itemid,
          productVariant: data.selectedVariant?.value,
        })
      );
      RenderToast({
        type: "success",
        message: isSpanish
          ? "Artículo eliminado del carrito"
          : "Item removed from cart",
      });
    }
  };

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
        style={{
          paddingBottom: accessToken ? "0px" : "15px",
        }}
      >
        <h3
          className={mergeClass(
            classes.title,
            "fs-20 maxLine2 fw-500 cursor-pointer"
          )}
          onClick={onClick}
        >
          {data?.description}
        </h3>
        <p className={mergeClass("fs-12 fw-500", classes.productId)}>
          {data?.itemid}
        </p>
        {accessToken ? (
          <>
            <DropDown
              dropDownContainer={classes.dropdownDiv}
              dropdownWidth={classes.dropdownWidthClass}
              customStyle={{
                minHeight: "36px",
                fontWeight: "600",
                fontSize: "13px",
                paddingBlock: "0px",
                color: isMobile375 ? "#36363696 !important" : undefined,
                paddingLeft: "0px !important",
              }}
              placeholderColor={
                isMobile375 ? "#36363696 !important" : undefined
              }
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

            <div
              className={mergeClass(classes.counterDivTwo, classes.counterDiv)}
            >
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
                    isInCart ? (
                      <MdRemoveShoppingCart />
                    ) : (
                      <FaShoppingCart />
                    )
                  ) : isInCart ? (
                    isSpanish ? (
                      "Eliminar artículo"
                    ) : (
                      "Remove Item"
                    )
                  ) : isSpanish ? (
                    "Añadir a la cesta"
                  ) : (
                    "Add To Cart"
                  )
                }
                className={mergeClass(
                  "fs-15 fw-600",
                  classes.removeFromCartButton,
                  classes.button
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
