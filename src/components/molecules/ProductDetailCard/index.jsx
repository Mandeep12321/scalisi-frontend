"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
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
  removeNoteFromCart,
} from "@/store/cart/cartSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidFilePlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../Counter";
import DropDown from "../DropDown/DropDown";
import classes from "./ProductDetailCard.module.css";

export default function ProductDetailCard({ data, setVariantSelect }) {
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const { cart } = useSelector((state) => state?.cartReducer);

  // Early return if data is null or undefined
  if (!data) {
    return null;
  }

  // Check if this product is in cart (considering variant)
  const isInCart = cart.some(
    (item) =>
      item.itemid === data.itemid &&
      item.selectedVariant?.value === data.selectedVariant?.value
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [noteIndex, setNoteIndex] = useState(false);
  const [addNote, setAddNote] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  // Get existing note from cart if item is in cart
  const existingNote = isInCart
    ? cart.find(
        (item) =>
          item.itemid === data.itemid &&
          item.selectedVariant?.value === data.selectedVariant?.value
      )?.note || ""
    : "";

  // Get quantity from cart if item is in cart, otherwise use local state
  const currentQuantity = isInCart
    ? cart.find(
        (item) =>
          item.itemid === data.itemid &&
          item.selectedVariant?.value === data.selectedVariant?.value
      )?.selectedCount || 1
    : data?.selectedCount || 1;

  // Language detection - check on every render to ensure it's always current
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  // Force re-render when cart changes
  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [cart]);

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

  const handleAddNote = () => {
    if (noteIndex) {
      // If input field is empty, remove the note
      if (!addNote.trim()) {
        dispatch(
          removeNoteFromCart({
            productId: data?.itemid,
            productVariant: data?.selectedVariant?.value,
          })
        );
        setAddNote("");
        setNoteIndex(false);
        RenderToast({
          type: "success",
          message: isSpanish
            ? "Nota eliminada exitosamente"
            : "Note removed successfully",
        });
      } else {
        // Save the note
        dispatch(
          updateNoteInCart({
            note: addNote.trim(),
            productId: data?.itemid, // Use itemid instead of _id
            productVariant: data?.selectedVariant?.value,
          })
        );
        setNoteIndex(false); // Close the input field
        RenderToast({
          type: "success",
          message: isSpanish
            ? "Nota guardada exitosamente"
            : "Note saved successfully",
        });
      }
    } else {
      // Open the input field and populate with existing note
      setAddNote(existingNote);
      setNoteIndex(true);
    }
  };

  return (
    <div className={classes.mainDiv}>
      <div className={!isInCart ? classes.imageDiv : classes.imageDivInCart}>
        <Image fill alt={data?.title} src={mediaUrl(data?.fullimagepath)} />
      </div>

      <div className={!isInCart ? classes.cardBody : classes.cardBodyInCart}>
        <h3 className={mergeClass(classes.title, "fs-20 maxLine2 fw-500")}>
          {data?.description}
        </h3>
        <p className={mergeClass("fs-12 fw-500", classes.productId)}>
          {data?.itemid}
        </p>

        {accessToken ? (
          <>
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
                onClick={() => {
                  cartHandler(isInCart ? "remove" : "add");
                  // Reset note state when removing from cart
                  if (isInCart) {
                    setAddNote("");
                    setNoteIndex(false);
                  }
                }}
                label={
                  isInCart
                    ? isSpanish
                      ? "Eliminar del carrito"
                      : "Remove from Cart"
                    : isSpanish
                    ? "Añadir a la cesta"
                    : "Add To Cart"
                }
                className={mergeClass(
                  classes.removeFromCartButton,
                  classes.button
                )}
              />

              {isInCart && (
                <div
                  className={mergeClass("cursor-pointer", classes.addNote)}
                  onClick={handleAddNote}
                >
                  <BiSolidFilePlus className={classes.noteIcon} />
                  <p className="fs-15 fw-700">
                    {noteIndex
                      ? addNote.trim()
                        ? isSpanish
                          ? "Guardar nota"
                          : "Save Note"
                        : isSpanish
                        ? "Eliminar"
                        : "Remove"
                      : existingNote
                      ? isSpanish
                        ? "Editar nota"
                        : "Edit Note"
                      : isSpanish
                      ? "Añadir nota"
                      : "Add note"}
                  </p>
                </div>
              )}
            </div>

            <div className={classes.textAreaDiv}>
              {noteIndex && (
                <div
                  style={{
                    paddingBottom: "10px",
                  }}
                >
                  <Input
                    type="text"
                    inputClass={classes.inputClass}
                    placeholder={isSpanish ? "Añadir una nota" : "Add a Note"}
                    value={addNote}
                    setValue={setAddNote}
                  />
                </div>
              )}
              {!noteIndex && existingNote && (
                <div
                  style={{
                    paddingBottom: "10px",
                    padding: "16px 12px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "4px",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <p
                    className="fs-12 fw-500"
                    style={{ margin: 0, color: "#666" }}
                  >
                    <strong>{isSpanish ? "Nota:" : "Note:"}</strong>{" "}
                    {existingNote}
                  </p>
                </div>
              )}
            </div>
          </>
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
