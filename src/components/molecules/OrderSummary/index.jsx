"use client";

import { Input } from "@/components/atoms/Input/Input";
import { getFormattedPrice, mergeClass } from "@/resources/utils/helper";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../atoms/Button";
import TextArea from "../../atoms/TextArea";
import DatePickerComp from "../DatePickerComp";
import classes from "./OrderSummary.module.css";

export default function OrderSummary({
  data,
  cmsData,
  handleChange,
  orderSummary,
  setOrderPlaced,
  deliveryDate,
  deliveryDates = [],
  submitOrder,
  loading = false,
}) {
  const datePickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    deliveryDate || moment().format("DD/MM/YYYY")
  );
  const [autoOpenDatePicker, setAutoOpenDatePicker] = useState(false);

  const totalAmount = data?.reduce((total, item) => {
    // Always find the correct UOM based on selectedVariant value
    const selectedUom = item?.uoms?.find(
      (uom) => uom.erp_uom === item?.selectedVariant?.value
    );

    // If no UOM found, fallback to first UOM
    const finalUom = selectedUom || item?.uoms?.[0];
    const itemPrice = finalUom?.price || 0;

    return total + itemPrice * item?.selectedCount;
  }, 0);

  const totalQuantity = data?.reduce(
    (total, item) => total + item?.selectedCount,
    0
  );

  const handleSubmitOrder = async () => {
    if (submitOrder) {
      const orderData = {
        items: data,
        orderSummary,
        deliveryDate: selectedDate,
        totalAmount,
        totalQuantity,
      };

      const success = await submitOrder(orderData);
      if (success) {
        window.scrollTo(0, 0);
        setOrderPlaced(true);
      }
    } else {
      window.scrollTo(0, 0);
      setOrderPlaced(true);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAutoOpenDatePicker(true);
    }, 500);
    return () => clearTimeout(timeOut);
    // Auto-open the date picker when the component mounts
  }, []);

  return (
    <div className={classes.mainClass}>
      <h6
        className={mergeClass(
          classes.title,
          classes.borderBottom,
          "fs-20 fw-700"
        )}
      >
        Order Summary
      </h6>

      <div className={classes.dateDiv}>
        <h3 className={mergeClass(classes.dateHead, "fs-20 fw-700")}>
          Delivery Date
        </h3>
        <DatePickerComp
          setValue={setSelectedDate}
          value={selectedDate}
          availableDates={deliveryDates}
          ref={datePickerRef}
          autoOpen={autoOpenDatePicker}
        />
      </div>
      <h6 className={mergeClass(classes.orderNoteClass, "fs-20 fw-700")}>
        Order Note
      </h6>
      <TextArea
        containerClass={mergeClass(classes.borderBottom, classes.textArea)}
        rows={4}
        placeholder=""
        value={orderSummary?.orderNote}
        setValue={(e) => handleChange("orderNote", e)}
      />
      <h6 className={mergeClass(classes.purchaseOrderClass, "fs-20 fw-700")}>
        Purchase Order
      </h6>
      <Input
        placeholder={""}
        value={orderSummary?.purchaseOrder}
        setValue={(e) => handleChange("purchaseOrder", e)}
      />
      <div className={mergeClass(classes.borderBottom, classes.quantityDiv)}>
        <h6 className={mergeClass(classes.quantityTitle, "fs-20 fw-700")}>
          Quantity
        </h6>
        <h6
          className={mergeClass(
            classes.deliveryDateClass,
            classes.quantity,
            "fs-20 fw-700"
          )}
        >
          {totalQuantity}
        </h6>
      </div>
      <div className={mergeClass(classes.totalDiv)}>
        <h6 className={mergeClass(classes.totalTitle, "fs-20 fw-700")}>
          Total
        </h6>
        <h6
          className={mergeClass(
            classes.deliveryDateClass,
            classes.price,

            "fs-24 fw-700"
          )}
        >
          {getFormattedPrice(totalAmount)}
        </h6>
      </div>
      <Button
        variant="primary"
        label={loading ? "Submitting Order..." : "Submit Order"}
        className={classes.buttonDiv}
        onClick={handleSubmitOrder}
        disabled={loading || data?.length === 0}
      />
    </div>
  );
}
