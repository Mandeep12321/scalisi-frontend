"use client";
import { mergeClass } from "@/resources/utils/helper";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import classes from "./input.module.css";

export const Input = ({
  rightIcon,
  type,
  label,
  label2, // sub label
  value, // input value
  setValue, //setValue
  noBorder,
  placeholder,
  disabled,
  customStyle, //Input Container inline Style
  inputStyle, //Input inline Style
  labelStyle, //Label inline Style
  error, // Show Error Boolean
  errorText, // Error Text
  leftIcon, // Icon For Input
  inputRef,
  labelClass,
  onEnterClick,
  inputContainer,
  innerClass,
  inputClass,
  rightIconGreenVariant = false,
  prefix = "",
  rightIconClass,
  ...props
}) => {
  const [passToggle, setPassToggle] = useState(false);

  return (
    <>
      <div
        className={`${[
          classes.inputContainer,
          inputContainer && inputContainer,
        ].join(" ")}`}
      >
        {label && (
          <label
            htmlFor={`input${label}`}
            className={`fs-16 fw-700 ${[classes.labelText, labelClass].join(
              " "
            )}`}
            style={{ ...labelStyle }}
          >
            {label} <span className="label2">{label2 && label2}</span>
          </label>
        )}
        <div
          className={`${[classes.inputPassContainer, innerClass].join(" ")}`}
          style={{ ...customStyle }}
        >
          {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}

          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            min={"0"}
            disabled={disabled}
            placeholder={placeholder}
            type={passToggle === true ? "text" : type}
            id={`input${label}`}
            className={`fs-14 fw-400 ${[
              noBorder && classes.noBorder,
              classes.inputBox,
              rightIconGreenVariant && classes.greenInputBorder,
              errorText && classes.error,
              inputClass,
            ].join(" ")}`}
            style={{
              ...inputStyle,
              fontSize: "16px", // Prevent iOS zoom
              transform: "scale(1)", // Prevent zoom
              transformOrigin: "top left",
            }}
            onKeyPress={(e) =>
              ["Enter", "NumpadEnter"].includes(e.code) &&
              onEnterClick &&
              onEnterClick()
            }
            onBlur={() => {
              if (type === "text") {
                setValue(value?.trim());
              }
            }}
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...props}
          />
          {rightIcon && (
            <div
              className={mergeClass(
                rightIconGreenVariant && classes.rightIconGreen,
                classes.rightIconBox,
                rightIconClass
              )}
            >
              {rightIcon}
            </div>
          )}

          {type === "password" && passToggle === false && (
            <IoMdEyeOff
              color="black"
              size={26}
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
          {type === "password" && passToggle && (
            <img
              src="/assets/images/svg/forgotPassEye.svg"
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
        </div>
        <div className={errorText ? classes.errorContainer : ""}>
          {errorText && (
            <p className={`mt-2 text-danger ${[classes.errorText].join(" ")}`}>
              * {errorText}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
