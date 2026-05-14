"use client";

import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { mergeClass } from "@/resources/utils/helper";
import { updateNoteInCart } from "@/store/cart/cartSlice";
import Cookies from "js-cookie";
import { MdOutlineEdit, MdOutlineNoteAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useItemNote } from "../hooks/useItemNote";
import classes from "./ItemNote.module.css";

/**
 * Shared ItemNote component used in Product Cards and Checkout.
 * Manages its own local state via useItemNote and syncs with Redux.
 */
const ItemNote = ({ item, productId, productVariant, onSave }) => {
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
  } = useItemNote({ data: item || { itemid: productId } });

  const handleClick = () => {
    const isCurrentlySaving = isEditing;
    handleNoteClick(); // toggles isEditing / saves to localStorage

    if (isCurrentlySaving) {
      const trimmed = noteValue.trim();
      dispatch(
        updateNoteInCart({
          note: trimmed,
          productId: productId || item?.itemid || item?._id,
          productVariant: productVariant || item?.selectedVariant?.value,
        })
      );

      if (onSave) onSave(trimmed);

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
    <div className={classes.noteSection}>
      <button
        className={mergeClass(
          classes.noteTriggerBtn,
          hasNote && !isEditing && classes.noteTriggerBtnHasNote,
          isEditing && classes.noteTriggerBtnSave,
        )}
        onClick={handleClick}
      >
        <span className={classes.noteIcon}>
          {isEditing ? <MdOutlineEdit size={14} /> : <MdOutlineNoteAdd size={14} />}
        </span>
        <span className={classes.noteBtnText}>{noteBtnLabel}</span>
      </button>

      {isEditing && (
        <div className={classes.noteWrapper}>
          <textarea
            rows={2}
            placeholder={isSpanish ? "Añadir una nota…" : "Add a note for this item…"}
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            className={classes.noteTextarea}
            autoComplete="off"
            spellCheck={false}
          />
          <div className={classes.noteActions}>
            <button className={classes.noteCancelBtn} onClick={handleCancelNote}>
              {isSpanish ? "Cancelar" : "Cancel"}
            </button>
            {hasNote && (
              <button className={classes.noteRemoveBtn} onClick={() => {
                handleRemoveNote();
                dispatch(updateNoteInCart({
                  note: "",
                  productId: productId || item?.itemid || item?._id,
                  productVariant: productVariant || item?.selectedVariant?.value,
                }));
              }}>
                {isSpanish ? "Eliminar" : "Remove"}
              </button>
            )}
          </div>
        </div>
      )}

      {hasNote && !isEditing && (
        <p className={classes.notePreview}>{noteValue}</p>
      )}
    </div>
  );
};

export default ItemNote;
