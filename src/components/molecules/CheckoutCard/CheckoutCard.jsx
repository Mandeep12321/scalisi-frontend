"use client";

import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { mergeClass, getFormattedPrice } from "@/resources/utils/helper";
import {
  updateQuantity,
  removeProductFromCart,
  updateNoteInCart,
} from "@/store/cart/cartSlice";
import Image from "next/image";
import { MdOutlineNoteAdd, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import Counter from "../Counter";
import classes from "./CheckoutCard.module.css";
import Cookies from "js-cookie";
import { useItemNote } from "@/components/common/hooks/useItemNote";
import ItemNote from "@/components/common/ItemNote/ItemNote";

/**
 * Per-item note UI — single button, textarea opens on click & saves on 2nd click.
 * Stays in sync with localStorage (shared with ProductCard / ProductListCard).
 */

const CheckoutCard = ({ tableData }) => {
  const dispatch = useDispatch();

  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const calculateItemPrice = (item) => {
    const selectedUom = item?.uoms?.find(
      (uom) => uom.erp_uom === item?.selectedVariant?.value
    );
    const finalUom = selectedUom || item?.uoms?.[0];
    const itemPrice = finalUom?.price || 0;
    const totalPrice = itemPrice * item?.selectedCount;
    return getFormattedPrice(totalPrice);
  };

  return (
    <div className={classes.checkoutCardMain}>
      {tableData?.map((item) => (
        <div className={classes.cardContainer} key={item._id}>
          <div className={classes.cardTop}>
            <p className={mergeClass("fw-600 cursor-pointer", classes.type)}>
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
                <h3 className={mergeClass(classes.title, "fs-13 fw-500 maxLine2")}>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutCard;
