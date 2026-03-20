import { mergeClass } from "@/resources/utils/helper";
import classes from "./Checkbox.module.css";
import PropTypes from "prop-types";

export const Checkbox = ({
  value,
  setValue,
  label,
  disabled,
  labelStyle,
  isBool = false,
  showLabel = true,
  checkboxMain,
}) => {
  const checkValueTypeArray = Array.isArray(value);
  let isChecked = checkValueTypeArray
    ? value?.findIndex((findValue) => findValue == label)
    : value == label
    ? true
    : false;

  if (isBool) {
    isChecked = value;
  }

  const HandleClick = () => {
    let newArray = [];
    if (checkValueTypeArray) {
      newArray = value?.slice();
      if (isChecked !== -1) {
        newArray.splice(isChecked, 1);
      } else {
        newArray.push(label);
      }
    } else {
      newArray = isChecked ? "" : label;
    }
    setValue(newArray);
  };
  return (
    <>
      <style jsx>{`
        .${classes.container} input:disabled ~ .${classes.checkmark} {
          border: ${checkValueTypeArray && isChecked !== -1
              ? 0
              : checkValueTypeArray == false && isChecked == true
              ? 0
              : 2}px
            solid #4d4d4d;
          background-color: ${checkValueTypeArray && isChecked !== -1
            ? "green"
            : checkValueTypeArray == false && isChecked == true
            ? "green"
            : "transparent"};
        }
      `}</style>

      <div
        className={mergeClass(`my-2`, classes.checkboxWithLabel, checkboxMain)}
      >
        <div className={`${classes.container}`}>
          <input
            type="checkbox"
            checked={
              checkValueTypeArray && isChecked !== -1
                ? "checked"
                : checkValueTypeArray == false && isChecked == true && "checked"
            }
            disabled={disabled}
            id={`checkbox${label}`}
          />
          <span
            className={classes.checkmark}
            onClick={() => disabled !== true && HandleClick()}
          ></span>
        </div>
        {label && (
          <label
            htmlFor={`checkbox${label}`}
            className={` ${
              isChecked !== -1 && disabled == false
                ? classes.labelChecked
                : disabled == true
                ? classes.labelDisabled
                : classes.label
            }`}
            style={{
              ...labelStyle,
              display: showLabel ? "block" : "none",
            }}
          >
            <span className={classes.labelText}>{label}</span>
          </label>
        )}
      </div>
    </>
  );
};
