"use client";

import {
  removeProductFromCart,
  updateNoteInCart,
  updateQuantity,
} from "@/store/cart/cartSlice";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSolidFilePlus } from "react-icons/bi";
import { IoIosRemoveCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import Counter from "../Counter";
import { Input } from "@/components/atoms/Input/Input";
import classes from "./OrderListCard.module.css";
import Cookies from "js-cookie";

export default function OrderListCard({ data, index, mainClass }) {
  const dispatch = useDispatch();

  const [noteIndex, setNoteIndex] = useState(-1);
  const [addNote, setAddNote] = useState("");

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const handleAddNote = (index) => {
    if (noteIndex === index) {
      // Save the note

      dispatch(
        updateNoteInCart({
          note: addNote,
          productId: data?.itemid || data?._id,
          productVariant: data?.selectedVariant?.value,
        })
      );
      setNoteIndex(-1); // Close the input
    } else {
      // Open the input for editing
      setNoteIndex(index);
      setAddNote(data?.note || "");
    }
  };

  const handleRemoveNote = () => {
    dispatch(
      updateNoteInCart({
        note: "",
        productId: data?.itemid || data?._id,
        productVariant: data?.selectedVariant?.value,
      })
    );
    setAddNote("");
    setNoteIndex(-1);
  };

  const handleCancelNote = () => {
    setNoteIndex(-1);
    setAddNote(data?.note || "");
  };

  useEffect(() => {
    if (data?.note) {
      setAddNote(data?.note);
    }
  }, [data?.note]);

  return (
    <div>
      <div className={mergeClass(classes.mainDiv, mainClass)}>
        <div className={classes.cardWrapper}>
          <div className={classes.imageDiv}>
            <Image fill alt={data?.description} src={data?.fullimagepath} />
          </div>
          <div className={classes.cardBody}>
            <h3 className={mergeClass(classes.title, "fs-15 fw-500 maxLine2")}>
              {data?.description}
            </h3>
            <p className={mergeClass("fs-12 fw-500", classes.productId)}>
              {data?.itemid}
            </p>
          </div>
        </div>
        <div className={classes.counterDiv}>
          <Counter
            data={data?.selectedCount}
            setData={(newCount) => {
              dispatch(
                updateQuantity({
                  _id: data?.itemid,
                  quantityChange: newCount,
                  productVariant: data?.selectedVariant?.value,
                })
              );
            }}
          />
          <p
            className={mergeClass("fs-12 fw-600", classes.removeLink)}
            onClick={() =>
              dispatch(
                removeProductFromCart({
                  _id: data?.itemid,
                  productVariant: data?.selectedVariant?.value,
                })
              )
            }
          >
            {isSpanish ? "Eliminar" : "Remove"}
          </p>
        </div>

        <div className={classes.priceDiv}>
          <p className={mergeClass("fs-15 fw-700", classes.price)}>
            {getFormattedPrice(
              (() => {
                // Always find the correct UOM based on selectedVariant value
                const selectedUom =
                  data?.uoms?.find(
                    (uom) => uom.erp_uom === data?.selectedVariant?.value
                  ) || data?.uoms?.[0];

                const itemPrice = selectedUom?.price || 0;
                return itemPrice * data?.selectedCount;
              })()
            )}
          </p>
          <div className={classes.noteActions}>
            <div
              className={mergeClass(
                "fs-12 fw-600 cursor-pointer",
                classes.addNote
              )}
              onClick={() => handleAddNote(index)}
            >
              <BiSolidFilePlus
                style={{ marginRight: "5px" }}
                className={classes.iconDiv}
              />
              <p className="fs-12">
                {noteIndex === index
                  ? isSpanish
                    ? "Guardar nota"
                    : "Save note"
                  : data?.note
                  ? isSpanish
                    ? "Editar nota"
                    : "Edit note"
                  : isSpanish
                  ? "Añadir nota"
                  : "Add note"}
              </p>
            </div>

            {data?.note && noteIndex !== index && (
              <div
                className={mergeClass(
                  "fs-12 fw-600 cursor-pointer",
                  classes.removeNote
                )}
                onClick={handleRemoveNote}
              >
                <IoIosRemoveCircle
                  style={{ marginRight: "5px" }}
                  className={classes.iconDiv}
                />
                <p className="fs-12">
                  {isSpanish ? "Eliminar nota" : "Remove note"}
                </p>
              </div>
            )}

            {noteIndex === index && (
              <div
                className={mergeClass(
                  "fs-12 fw-600 cursor-pointer",
                  classes.cancelNote
                )}
                onClick={handleCancelNote}
              >
                <p className="fs-12">{isSpanish ? "Cancelar" : "Cancel"}</p>
              </div>
            )}
          </div>
        </div>

        {noteIndex === index && (
          <Input
            type="text"
            inputClass={classes.inputClass}
            placeholder={"Add a Note"}
            value={addNote}
            setValue={setAddNote}
          />
        )}
      </div>
    </div>
  );
}
