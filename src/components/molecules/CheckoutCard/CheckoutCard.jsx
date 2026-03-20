"use client";

import { Input } from "@/components/atoms/Input/Input";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { mergeClass, getFormattedPrice } from "@/resources/utils/helper";
import {
  updateQuantity,
  removeProductFromCart,
  updateNoteInCart,
} from "@/store/cart/cartSlice";
import Image from "next/image";
import { BiSolidFilePlus } from "react-icons/bi";
import { IoIosRemoveCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Counter from "../Counter";
import classes from "./CheckoutCard.module.css";
import Cookies from "js-cookie";

const CheckoutCard = ({
  tableData,
  noteIndex,
  addNote,
  setAddNote,
  handleAddNote,
  updateNoteInCart,
}) => {
  const dispatch = useDispatch();

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const calculateItemPrice = (item) => {
    // Always find the correct UOM based on selectedVariant value
    const selectedUom = item?.uoms?.find(
      (uom) => uom.erp_uom === item?.selectedVariant?.value
    );

    // If no UOM found, fallback to first UOM
    const finalUom = selectedUom || item?.uoms?.[0];
    const itemPrice = finalUom?.price || 0;
    const totalPrice = itemPrice * item?.selectedCount;

    return getFormattedPrice(totalPrice);
  };

  return (
    <div className={classes.checkoutCardMain}>
      {tableData?.map((item, index) => (
        <div className={classes.cardContainer} key={item._id}>
          <div className={classes.cardTop}>
            <p className={mergeClass(" fw-600 cursor-pointer", classes.type)}>
              {item?.selectedVariant?.value || "CASE"}
            </p>
            <p
              className={mergeClass(
                "fs-15 fw-600 cursor-pointer",
                classes.removeLink
              )}
              onClick={() => {
                dispatch(
                  removeProductFromCart({
                    _id: item?.itemid,
                    productVariant: item?.selectedVariant?.value,
                  })
                );
                RenderToast({
                  type: "success",
                  message: isSpanish
                    ? "Producto eliminado del carrito exitosamente."
                    : "Product Removed From Cart. Successfully.",
                });
              }}
            >
              Remove
            </p>
          </div>

          <div className={classes.cardBody}>
            <div className={classes.cardWrapper}>
              <div className={classes.imageDiv}>
                <Image
                  fill
                  alt={item?.description || item?.title}
                  src={item?.fullimagepath || item?.image}
                />
              </div>
              <div className={classes.cardDetails}>
                <h3
                  className={mergeClass(classes.title, "fs-13 fw-500 maxLine2")}
                >
                  {item?.description || item?.title}
                </h3>
                <span>
                  <p className={mergeClass("fs-15 fw-500", classes.productId)}>
                    {item?.itemid || item?.productId}
                  </p>
                  <p className={mergeClass(classes.price, "fs-22 fw-600")}>
                    {calculateItemPrice(item)}
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div className={classes.cardEnd}>
            <div className={classes.cardBottom}>
              <span>
                <div
                  className={mergeClass("cursor-pointer", classes.addNote)}
                  onClick={() => handleAddNote(index)}
                >
                  <BiSolidFilePlus
                    size={27}
                    color="var(--text-gray-color)"
                    style={{
                      marginLeft: "-4px",
                      marginBottom: "3px",
                    }}
                  />
                  <p className="fs-15 fw-700">
                    {noteIndex === index
                      ? isSpanish
                        ? "Enviar nota"
                        : "Submit Note"
                      : item?.note
                      ? isSpanish
                        ? "Editar nota"
                        : "Edit Note"
                      : isSpanish
                      ? "Añadir nota"
                      : "Add note"}
                  </p>
                </div>

                {item?.note && noteIndex !== index && (
                  <div
                    className={mergeClass("cursor-pointer", classes.removeNote)}
                    onClick={() =>
                      dispatch(
                        updateNoteInCart({
                          note: "",
                          productId: item?.itemid,
                          productVariant: item?.selectedVariant?.value,
                        })
                      )
                    }
                  >
                    <IoIosRemoveCircle className={classes.noteIcon} />
                    <p className="fs-15 fw-700">
                      {isSpanish ? "Eliminar nota" : "Remove Note"}
                    </p>
                  </div>
                )}
              </span>

              <div className={classes.counterDiv}>
                <Counter
                  data={item?.selectedCount}
                  setData={(newCount) => {
                    dispatch(
                      updateQuantity({
                        _id: item.itemid,
                        quantityChange: newCount,
                        productVariant: item?.selectedVariant?.value,
                      })
                    );
                  }}
                />
              </div>
            </div>

            {(item?.note || noteIndex === index) && (
              <div
                style={{
                  paddingBlock: "10px",
                }}
              >
                <Input
                  type="text"
                  inputClass={classes.inputClass}
                  placeholder={isSpanish ? "Añadir una nota" : "Add a Note"}
                  value={noteIndex == index ? addNote : item?.note || ""}
                  setValue={setAddNote}
                  disabled={noteIndex !== index}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutCard;
