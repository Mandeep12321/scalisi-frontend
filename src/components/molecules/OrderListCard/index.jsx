"use client";

import {
  removeProductFromCart,
  updateQuantity,
  updateNoteInCart,
} from "@/store/cart/cartSlice";
import { getFormattedPrice, mergeClass, getDisplayUnitAndPrice } from "@/resources/utils/helper";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Counter from "../Counter";
import classes from "./OrderListCard.module.css";
import Cookies from "js-cookie";
import { useItemNote } from "@/components/common/hooks/useItemNote";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { MdOutlineEdit, MdOutlineNoteAdd } from "react-icons/md";

export default function OrderListCard({ data, index, mainClass }) {
  const dispatch = useDispatch();

  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const {
    noteValue,
    setNoteValue,
    isEditing,
    hasNote,
    handleNoteClick,
    handleRemoveNote,
    handleCancelNote,
  } = useItemNote({ data });

  const handleClick = () => {
    const isCurrentlySaving = isEditing;

    if (isCurrentlySaving && !noteValue.trim()) {
      handleCancelNote();
      return;
    }

    handleNoteClick(); // toggles isEditing / saves to localStorage

    if (isCurrentlySaving) {
      const trimmed = noteValue.trim();
      dispatch(
        updateNoteInCart({
          note: trimmed,
          productId: data?.itemid,
          productVariant: data?.selectedVariant?.value,
        })
      );

      RenderToast({
        type: "success",
        message: isSpanish
          ? (trimmed ? "Nota guardada exitosamente." : "Nota eliminada exitosamente.")
          : (trimmed ? "Note saved successfully." : "Note removed successfully."),
      });
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

        {/* Price + Note */}
        <div className={classes.priceDiv}>
          <p className={mergeClass("fs-15 fw-700", classes.price)}>
            {getFormattedPrice(
              (() => {
                const selectedUom =
                  data?.uoms?.find(
                    (uom) => uom.erp_uom === data?.selectedVariant?.value
                  ) || data?.uoms?.[0];
                const itemPrice = selectedUom?.price || 0;
                const display = getDisplayUnitAndPrice(data?.selectedVariant?.value || "CASE", itemPrice);
                return display.price * data?.selectedCount;
              })()
            )}
          </p>

          <div className={classes.noteBtn}>
            <button
              className={mergeClass(
                classes.noteTriggerBtn,
                hasNote && !isEditing && classes.noteTriggerBtnHasNote,
                isEditing && classes.noteTriggerBtnSave
              )}
              onClick={handleClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                borderRadius: "0",
                padding: "0",
                fontSize: "13px",
                fontWeight: 500,
                color: isEditing ? "#16a34a" : hasNote ? "var(--primary-color)" : "#4b5563",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                {isEditing ? <MdOutlineEdit size={18} /> : <MdOutlineNoteAdd size={18} />}
              </span>
              <span>{noteBtnLabel}</span>
            </button>
          </div>
        </div>

        {isEditing && (
          <div className={classes.noteWrapper} style={{ width: "100%", marginTop: "10px" }}>
            <textarea
              rows={2}
              placeholder={isSpanish ? "Añadir una nota…" : "Add a note for this item…"}
              value={noteValue}
              onChange={(e) => setNoteValue(e.target.value)}
              className={classes.noteTextarea}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        )}

        {hasNote && !isEditing && (
          <div style={{
            width: "100%",
            marginTop: "10px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#6b7280",
            background: "#f9fafb",
            borderLeft: "4px solid var(--primary-color)",
            borderRadius: "0 6px 6px 0",
            padding: "6px 12px",
            whiteSpace: "normal",
            wordBreak: "break-word"
          }}>
            {noteValue}
          </div>
        )}
      </div>
    </div>
  );
}
