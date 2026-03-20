import React from "react";
import ModalSkeleton from "../ModalSkeleton";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "../../components/atoms/Button";
import { useRouter } from "next/navigation";
import classes from "./EmptyCartModal.module.css";

const EmptyCartModal = ({ show, setShow }) => {
  const router = useRouter();

  const handleClose = () => {
    setShow(false);
  };

  const handleAddProducts = () => {
    setShow(false);
    router.push("/products");
  };

  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      size="sm"
      header="Cart is Empty"
      modalClass={classes.modalBody}
      headerHeading={classes.headClass}
      width={"340px"}
      maxWidth={"340px"}
    >
      <div className={classes.content}>
        <div className={classes.iconContainer}>
          <FaShoppingCart size={48} color="#ccc" />
        </div>
        <h3 className={classes.title}>Your cart is empty</h3>
        <p className={classes.message}>
          First add products to your cart to continue shopping
        </p>
        <div className={classes.buttonContainer}>
          <Button
            variant="primary"
            label="Browse Products"
            onClick={handleAddProducts}
            customStyle={{
              minWidth: "200px",
              height: "45px",
              fontWeight: 600,
              fontSize: "16px",
            }}
          />
        </div>
      </div>
    </ModalSkeleton>
  );
};

export default EmptyCartModal;
