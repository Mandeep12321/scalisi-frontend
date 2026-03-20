import React from "react";
import classes from "./OrderCard.module.css";
import { mergeClass } from "@/resources/utils/helper";
import { FaEye, FaReceipt } from "react-icons/fa";
import { Button } from "../Button";

const OrderCard = ({
  item,
  showProductModal,
  setShowProductModal,
  data,
  setSelectedItem,
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.titleMain}>
        <span>
          <h5>Order ID: </h5>
          <p>{item?.orderNumber}</p>
        </span>
        <span>
          <h5>Quantity: </h5>
          <p>{item?.quantity}</p>
        </span>
        <span>
          <h5>Date Order: </h5>
          <p>{item?.dateOrdered}</p>
        </span>
        <span>
          <h5>Date of Delivery: </h5>
          <p>{item?.dateDelivery}</p>
        </span>
      </div>
      <span>
        <div className={classes.productContent}>
          <h5>Products: </h5>
          <button
            className={classes.viewAllButton}
            onClick={() => {
              let selectedData = data?.tableData?.find(
                (e) => e?._id === item?._id
              );
              setSelectedItem(selectedData);

              setShowProductModal(!showProductModal);
            }}
          >
            <FaEye className={classes.orderReceiptText} /> View all
          </button>
        </div>
        <div className={classes.productDetails}>
          <p className="maxLine2">{item?.products}</p>
        </div>
      </span>
      <div className={classes.titleMain}>
        <span>
          <h5 style={{ marginTop: "2px" }}>Total: </h5>
          <p style={{ marginTop: "3px" }}>{item?.total}</p>
        </span>
        <span>
          <Button
            className={mergeClass("fw-700 fs-15", classes.actionButton)}
            variant="borderRed"
            label="Order Receipt"
            leftIcon={<FaReceipt size={20} />}
          />
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
