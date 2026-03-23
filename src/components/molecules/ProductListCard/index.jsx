"use client";

import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
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
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdRemoveShoppingCart, MdOutlineNoteAdd, MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms/Button";
import Counter from "../Counter";
import DropDown from "../DropDown/DropDown";
import classes from "./ProductListCard.module.css";
import { useItemNote } from "@/components/common/hooks/useItemNote";

export default function ProductListCard({
  data,
  setVariantSelect,
  onClick,
  productData,
  isApi = false,
}) {
  const { cart } = useSelector((state) => state?.cartReducer);
  const { isLogin } = useSelector((state) => state?.authReducer);
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const isAuthenticated = accessToken && isLogin;

  const dispatch = useDispatch();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [isMobile575, setIsMobile575] = useState(false);
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
    isMobileViewHook(setIsMobile575, 575);
    isMobileViewHook(setIsMobile, 768);
  });

  const dropDownOptions = !isApi
    ? data?.productVariant?.map((e) => ({
        label: `${e?.type} / ${getFormattedPrice(e?.price)}`,
        value: e?.value,
        price: e?.price,
      }))
    : data?.uoms?.map((e) => ({
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
    if (!data.selectedVariant && dropDownOptions?.length > 0) {
      setVariantSelect({
        selectedVariant: dropDownOptions[0],
        selectedCount: 1,
      });
    }
  }, [data.selectedVariant, dropDownOptions]);

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
        })
      );
      RenderToast({
        type: "success",
        message: isSpanish ? "Artículo eliminado del carrito" : "Item removed from cart",
      });
    }
  };

  // Smart note button label
  const noteBtnLabel = isEditing ? "Save Note" : hasNote ? "Edit Note" : "Add Note";

  // Shared note UI block
  const NoteBlock = () => (
    <div className={classes.noteSection}>
      {/* ID row + note button */}
      <div className={classes.noteRow}>
        <p className={mergeClass("fs-12 fw-500", classes.productId)}>
          {data?.itemid}
        </p>
        {isAuthenticated && (
          <button
            className={mergeClass(
              classes.noteTriggerBtn,
              hasNote && !isEditing && classes.noteTriggerBtnHasNote,
              isEditing && classes.noteTriggerBtnSave,
            )}
            onClick={handleNoteClick}
          >
            {isEditing ? <MdOutlineEdit size={13} /> : <MdOutlineNoteAdd size={13} />}
            <span>{noteBtnLabel}</span>
          </button>
        )}
      </div>

      {/* Textarea — opens on button click, closes on Save */}
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

    </div>
  );

  return (
    <>
      {!isMobile ? (
        /* ── DESKTOP layout ── */
        <div className={classes.mainDiv}>
          <div className={classes.imageDiv}>
            <Image fill alt={data?.itemid} src={data?.fullimagepath} />
          </div>

          <div className={classes.cardBody}>
            <h3
              onClick={() => router.push("/products/product-detail")}
              className={mergeClass(
                classes.title,
                "cursor-pointer fs-20 maxLine2 fw-500"
              )}
            >
              {data?.description}
            </h3>

            <NoteBlock />

            {/* Cart controls */}
            {isAuthenticated ? (
              <>
                <DropDown
                  customStyle={{
                    height: "37px",
                    padding: "0px",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                  options={dropDownOptions}
                  setValue={(e) => {
                    setVariantSelect({
                      selectedVariant: e,
                      selectedCount: data.selectedCount || 1,
                    });
                  }}
                  value={data?.selectedVariant}
                />

                <div className={classes.counterDiv}>
                  <Counter
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
                      isInCart
                        ? isSpanish
                          ? "Eliminar artículo"
                          : "Remove Item"
                        : isSpanish
                        ? "Añadir a la cesta"
                        : "Add To Cart"
                    }
                    className={mergeClass(
                      classes.removeFromCartButton,
                      classes.button
                    )}
                  />
                </div>
              </>
            ) : (
              <p
                className={mergeClass("fs-14 fw-500", classes.link)}
                onClick={() => router?.push("/login")}
              >
                Please log in to place your order.
              </p>
            )}
          </div>
        </div>
      ) : (
        /* ── MOBILE layout ── */
        <div className={classes.mainDivMobCard}>
          <div className={classes.cardHead}>
            <div className={classes.imageDiv}>
              <Image fill alt={data?.description} src={data?.fullimagepath} />
            </div>
            <div className={classes.headContent}>
              <h3
                onClick={() => router.push("/products/product-detail")}
                className={mergeClass(
                  classes.title,
                  "cursor-pointer fs-20 maxLine2 fw-500"
                )}
              >
                {data?.description}
              </h3>
              <NoteBlock />
            </div>
          </div>

          <div className={classes.cardBody}>
            {isAuthenticated ? (
              <div className={classes.counterDiv}>
                <DropDown
                  customStyle={{
                    height: "37px",
                    padding: "0px",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}
                  options={dropDownOptions}
                  setValue={(e) => {
                    setVariantSelect({
                      selectedVariant: e,
                      selectedCount: data.selectedCount || 1,
                    });
                  }}
                  value={data?.selectedVariant}
                />
                <Counter
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
                  key={`${isInCart}-${isSpanish}-${forceUpdate}-mobile`}
                  variant={isInCart ? "secondary" : "primary"}
                  onClick={() => {
                    cartHandler(isInCart ? "remove" : "add");
                  }}
                  label={
                    isMobile575 ? (
                      isInCart ? (
                        <MdRemoveShoppingCart size={17} />
                      ) : (
                        <FaShoppingCart size={17} />
                      )
                    ) : isInCart ? (
                      isSpanish ? (
                        "Eliminar del carrito"
                      ) : (
                        "Remove from Cart"
                      )
                    ) : isSpanish ? (
                      "Añadir a la cesta"
                    ) : (
                      "Add To Cart"
                    )
                  }
                  className={mergeClass(
                    classes.removeFromCartButton,
                    classes.button
                  )}
                />
              </div>
            ) : (
              <p
                className={mergeClass("fs-14 fw-500", classes.link)}
                onClick={() => router?.push("/login")}
              >
                Please log in to place your order.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
