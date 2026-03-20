import React from "react";
import classes from "./TextArea.module.css";
import PropTypes from "prop-types";
import { mergeClass } from "@/resources/utils/helper";

export default function TextArea({
  value,
  setValue,
  label,
  placeholder = "Enter text",
  customStyle,
  labelStyle,
  rows = 5,
  className = "",
  disabled,
  variant = "",
  labelClass = "",
  errorText,
  containerClass = "",
}) {
  return (
    <div
      className={mergeClass(
        containerClass && containerClass,
        classes.textAreaBox
      )}
      data-variant={variant}
    >
      {label && (
        <label
          style={{ ...labelStyle }}
          className={[classes.labelDisabled, labelClass].join(" ")}
        >
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        style={{ ...customStyle }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={disabled}
        rows={rows}
        className={`${className} ${errorText ? classes.error : ""}`}
      />
      {errorText && (
        <p className={`mt-2 text-danger ${[classes.errorText].join(" ")}`}>
          * {errorText}
        </p>
      )}
    </div>
  );
}
