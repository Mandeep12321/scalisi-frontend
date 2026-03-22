"use client";

import {
  removeProductFromCart,
  updateNoteInCart,
  updateQuantity,
} from "@/store/cart/cartSlice";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { MdOutlineNoteAdd, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import Counter from "../Counter";
import classes from "./OrderListCard.module.css";
import Cookies from "js-cookie";
import { useItemNote } from "@/components/common/hooks/useItemNote";

export default function OrderListCard({ data, index, mainClass }) {
  const dispatch = useDispatch();

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  // Shared note hook — reads/writes localStorage keyed by itemid
  const {
    noteValue,
    setNoteValue,
    isEditing,
    hasNote,
    handleNoteClick,
  } = useItemNote({ data });

  // On Save: also sync the Redux cart so checkout includes the note
  const handleClick = () => {
    const isSaving = isEditing;
    handleNoteClick(); // toggles state & writes localStorage

    if (isSaving) {
      dispatch(
        updateNoteInCart({
          note: noteValue.trim(),
          productId: data?.itemid || data?._id,
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
    <div>
      <div className={mergeClass(classes.mainDiv, mainClass)}>
        {/* Product image + title + id */}
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

        {/* Counter + Remove */}
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

        {/* Price + Note button */}
        <div className={classes.priceDiv}>
          <p className={mergeClass("fs-15 fw-700", classes.price)}>
            {getFormattedPrice(
              (() => {
                const selectedUom =
                  data?.uoms?.find(
                    (uom) => uom.erp_uom === data?.selectedVariant?.value
                  ) || data?.uoms?.[0];
                const itemPrice = selectedUom?.price || 0;
                return itemPrice * data?.selectedCount;
              })()
            )}
          </p>

          {/* Single smart note button */}
          <button
            className={mergeClass(
              classes.noteTriggerBtn,
              hasNote && !isEditing && classes.noteTriggerBtnHasNote,
              isEditing && classes.noteTriggerBtnSave,
            )}
            onClick={handleClick}
          >
            {isEditing ? <MdOutlineEdit size={12} /> : <MdOutlineNoteAdd size={12} />}
            <span>{noteBtnLabel}</span>
          </button>
        </div>
      </div>

      {/* 2-row textarea — only visible when editing */}
      {isEditing && (
        <div className={classes.noteWrapper}>
          <textarea
            rows={2}
            placeholder={
              isSpanish ? "Añadir una nota…" : "Add a note for this item…"
            }
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
}
