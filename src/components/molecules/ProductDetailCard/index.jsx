"use client";

import { Button } from "@/components/atoms/Button";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import {
  getFormattedPrice,
  handleDecrypt,
  mediaUrl,
  mergeClass,
} from "@/resources/utils/helper";
import {
  addProductToCart,
  removeProductFromCart,
  updateNoteInCart,
} from "@/store/cart/cartSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineNoteAdd, MdOutlineEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../Counter";
import DropDown from "../DropDown/DropDown";
import classes from "./ProductDetailCard.module.css";
import { useItemNote } from "@/components/common/hooks/useItemNote";

export default function ProductDetailCard({ data, setVariantSelect }) {
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const { cart } = useSelector((state) => state?.cartReducer);
  const dispatch = useDispatch();

  const [forceUpdate, setForceUpdate] = useState(0);

  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  // Shared note hook — reads/writes localStorage (same key as all other cards)
  const {
    noteValue,
    setNoteValue,
    isEditing,
    hasNote,
    handleNoteClick,
  } = useItemNote({ data });

  // Force re-render when cart changes
  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [cart]);

  // Early return if data is null or undefined
  if (!data) return null;

  // Check if this product is in cart
  const isInCart = cart.some(
    (item) =>
      item.itemid === data.itemid &&
      item.selectedVariant?.value === data.selectedVariant?.value
  );

  // Get quantity from cart
  const currentQuantity = isInCart
    ? cart.find(
        (item) =>
          item.itemid === data.itemid &&
          item.selectedVariant?.value === data.selectedVariant?.value
      )?.selectedCount || 1
    : data?.selectedCount || 1;

  const dropDownOptions = data?.productVariant?.map((e) => ({
    label: `${e?.type} / ${getFormattedPrice(e?.price || 0)}`,
    value: e?.value,
    price: e?.price || 0,
  }));

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
        })
      );
      RenderToast({
        type: "success",
        message: isSpanish ? "Artículo eliminado del carrito" : "Item removed from cart",
      });
    }
  };

  // Wrap note click to also sync Redux cart on save
  const handleClick = () => {
    const isSaving = isEditing;
    handleNoteClick();
    if (isSaving) {
      dispatch(
        updateNoteInCart({
          note: noteValue.trim(),
          productId: data?.itemid,
          productVariant: data?.selectedVariant?.value,
        })
      );
    }
  };

  const noteBtnLabel = isEditing
    ? isSpanish ? "Guardar nota" : "Save Note"
    : hasNote
    ? isSpanish ? "Editar nota" : "Edit Note"
    : isSpanish ? "Añadir nota" : "Add Note";

  return (
    <div className={classes.mainDiv}>
      <div className={!isInCart ? classes.imageDiv : classes.imageDivInCart}>
        <Image fill alt={data?.title} src={mediaUrl(data?.fullimagepath)} />
      </div>

      <div className={!isInCart ? classes.cardBody : classes.cardBodyInCart}>
        <h3 className={mergeClass(classes.title, "fs-20 maxLine2 fw-500")}>
          {data?.description}
        </h3>

        {/* ID + Note button row */}
        <div className={classes.noteRow}>
          <p className={mergeClass("fs-12 fw-500", classes.productId)}>
            {data?.itemid}
          </p>
          <button
            className={mergeClass(
              classes.noteTriggerBtn,
              hasNote && !isEditing && classes.noteTriggerBtnHasNote,
              isEditing && classes.noteTriggerBtnSave,
            )}
            onClick={handleClick}
          >
            {isEditing
              ? <MdOutlineEdit size={13} />
              : <MdOutlineNoteAdd size={13} />}
            <span>{noteBtnLabel}</span>
          </button>
        </div>

        {/* 2-row textarea — opens on button click, saves on second click */}
        {isEditing && (
          <textarea
            rows={2}
            placeholder={isSpanish ? "Añadir una nota…" : "Add a note for this item…"}
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            className={classes.noteTextarea}
            autoComplete="off"
            spellCheck={false}
          />
        )}

        {accessToken ? (
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
              key={`${isInCart}-${isSpanish}-${forceUpdate}`}
              variant={isInCart ? "secondary" : "primary"}
              onClick={() => cartHandler(isInCart ? "remove" : "add")}
              label={
                isInCart
                  ? isSpanish ? "Eliminar del carrito" : "Remove from Cart"
                  : isSpanish ? "Añadir a la cesta" : "Add To Cart"
              }
              className={mergeClass(classes.removeFromCartButton, classes.button)}
            />
          </div>
        ) : (
          <p className={mergeClass("fs-14 fw-500", classes.link)}>
            {isSpanish
              ? "Por favor, inicie sesión para realizar su pedido."
              : "Please log in to place your order."}
          </p>
        )}
      </div>
    </div>
  );
}
