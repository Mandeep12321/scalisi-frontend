"use client";
import Button from "@/components/atoms/Button";
import { mergeClass } from "@/resources/utils/helper";
import { Modal } from "react-bootstrap";
import classes from "./AreYouSureModal.module.css";

const AreYouSureModal = ({
  show = false,
  setShow = () => {},
  content = "",
  onClick = () => {},
  loading = false,
  backDrop = true,
  text = "",
  noLabel,
  noVariant,
  yesLabel,
  yesVariant,
  customBtnClass,
}) => {
  return (
    <>
      <Modal
        className={classes.modal}
        show={show}
        onHide={() => setShow(false)}
        centered
        backdrop={backDrop}
      >
        <Modal.Body className={classes.body}>
          <div className={classes.content}>
            <div className={classes.mainDiv}>
              <h3 className={[classes.message, "ubuntu"].join(" ")}>
                {content}
              </h3>
              {text && <p>{text}</p>}
            </div>
            <div className={mergeClass(classes.buttonBox, customBtnClass)}>
              <Button
                variant={noVariant}
                className={classes.noBtn}
                onClick={async () => {
                  setShow(false);
                }}
                disabled={loading}
                label={noLabel || "Cancel"}
              />
              <Button
                variant={yesVariant}
                className={classes.yesBtn}
                onClick={onClick}
                disabled={loading}
                label={loading ? "Please Wait..." : yesLabel || "Confirm"}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AreYouSureModal;
