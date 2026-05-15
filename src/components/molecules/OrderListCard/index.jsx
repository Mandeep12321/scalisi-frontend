"use client";

import {
  removeProductFromCart,
  updateQuantity,
} from "@/store/cart/cartSlice";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Counter from "../Counter";
import classes from "./OrderListCard.module.css";
import Cookies from "js-cookie";
import ItemNote from "@/components/common/ItemNote/ItemNote";

export default function OrderListCard({ data, index, mainClass }) {
  const dispatch = useDispatch();

  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

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
                return itemPrice * data?.selectedCount;
              })()
            )}
          </p>

          <div className={classes.noteBtn}>
            <ItemNote
              item={data}
              productId={data?.itemid}
              productVariant={data?.selectedVariant?.value}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
