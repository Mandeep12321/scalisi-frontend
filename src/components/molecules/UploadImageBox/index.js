import { useRef } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { MdClose, MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import classes from "./UploadImageBox.module.css";
import { mediaUrl } from "@/config";
import { mergeClass } from "@/resources/utils/helper";
import Image from "next/image";

const UploadImageBox = ({
  disabled = false,
  state,
  setter,
  label,
  subLabel,
  edit = true,
  onDelete,
  onClose,
  fallBackImage,
  isCloseable,
  hideDeleteIcon = false,
  imgClass,
  uploadImageBox,
  containerClass = "",
  onEdit = () => {},
}) => {
  const inputRef = useRef(null);

  return (
    <>
      {/* {label && (
        <label className={`${classes.label} ${subLabel && "m-0"}`}>
          {label}
        </label>
      )}
      {subLabel && <label className={classes.subLabel}>{subLabel}</label>} */}

      <div className={`${classes.box} ${containerClass}`}>
        <div className={mergeClass(classes.uploadImageBox, uploadImageBox)}>
          {/* Close Icon */}
          {isCloseable && (
            <span className={classes.closeIcon} onClick={onClose}>
              <MdClose  />
            </span>
          )}
          {state?.name || typeof state == "string" ? (
            <div className={classes.imageUploaded}>
              <img
                src={
                  typeof state == "object"
                    ? URL.createObjectURL(state)
                    : mediaUrl(state)
                }
                alt=""
                className={imgClass ? imgClass : ""}
              />
              <div className={classes.editAndDelete}>
                {edit && (
                  <>
                    {hideDeleteIcon && (
                      <div className={classes.icon} onClick={onDelete}>
                        <RiDeleteBinLine />
                      </div>
                    )}
                    <div
                      className={classes.icon}
                      onClick={() => {
                        inputRef.current.click();
                        onEdit();
                      }}
                    >
                      <MdModeEdit />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => inputRef.current.click()}
              className={classes.uploadBox}
            >
              <div className={classes?.user}>
                <Image src={"/assets/images/svg/user.svg"} fill alt="user" />
              </div>
              <div
                className={
                  disabled ? classes.uploadIconDisabled : classes.uploadIcon
                }
              >
                {fallBackImage ? (
                  <div className={classes.imgDiv}>
                    <img src={fallBackImage} alt="fallBackImage" />
                  </div>
                ) : (
                  <div className={classes?.addIcon}>
                    <Image src={"/assets/images/svg/plus.svg"} alt="add icon" fill />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Input For Image Upload */}
        <input
          disabled={disabled}
          hidden
          type={"file"}
          ref={inputRef}
          onChange={(e) => setter(e.target.files[0])}
        />
      </div>
    </>
  );
};

export default UploadImageBox;
