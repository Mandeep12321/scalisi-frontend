import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { mergeClass } from "../../resources/utils/helper";
import classes from "./modalSkeleton.module.css";
import { ImCross } from "react-icons/im";

export default function ModalSkeleton({
  size = "lg",
  show,
  setShow,
  header,
  footer,
  children,
  modalClass,
  hideHeaderBorder,
  headerStyles,
  borderRadius,
  showCloseIcon,
  width,
  maxWidth,
  height,
  borderLine = true,
  headerClass,
  modalStyles,
  headerHeading,
  className = "",
  isfaq = false,
  isEditing = false, // Adding default value for isEditing
}) {
  const [isLoading, setIsLoading] = useState(false);

  function handleClose() {
    setShow(false);
  }

  return (
    <>
      <style>
        {`
          
.modal-dialog {
            width: ${width || "auto"} !important;
            max-width: ${maxWidth || "90%"} !important;
            border-radius: ${borderRadius || "8px"};
                margin: auto;
          }


    ${height ? `.modal-content { height: ${height} !important; }` : ""}
        `}
      </style>
      <Modal
        size={size}
        show={show}
        onHide={handleClose}
        centered
        className={`${[classes.modal, modalStyles].join(" ")}`}
      >
        {header && (
          <Modal.Header
            closeButton
            className={`${[classes.header, headerClass && headerClass].join(
              " "
            )}`}
            style={{ ...headerStyles }}
          >
            <h2 className={mergeClass("fw-700", headerHeading)}>{header}</h2>
          </Modal.Header>
        )}
        {showCloseIcon && (
          <div className={classes.iconBox} onClick={handleClose}>
            <ImCross size={12} className={classes.icon} />
          </div>
        )}
        <Modal.Body
          className={`${[
            isfaq ? classes.faq : classes.body,
            modalClass && modalClass,
          ].join(" ")}`}
        >
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}
