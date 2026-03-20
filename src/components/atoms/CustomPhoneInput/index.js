"use client";
import React, { useState } from "react";
import classes from "./CustomPhoneInput.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { mergeClass } from "@/resources/utils/helper";
// new
// Utility function to check for repeated digits
const hasRepeatedDigits = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length < 4) return false;

  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, "");

  // Check for repeated digits (4 or more consecutive same digits)
  for (let i = 0; i <= digits.length - 4; i++) {
    if (
      digits[i] === digits[i + 1] &&
      digits[i] === digits[i + 2] &&
      digits[i] === digits[i + 3]
    ) {
      return true;
    }
  }

  // Check for alternating repeated patterns (like 77777777777777)
  if (digits.length >= 8) {
    const firstDigit = digits[0];
    const secondDigit = digits[1];

    // Check if it's a pattern like 77777777777777
    if (digits.length % 2 === 0) {
      let isRepeatingPattern = true;
      for (let i = 0; i < digits.length; i += 2) {
        if (digits[i] !== firstDigit || digits[i + 1] !== secondDigit) {
          isRepeatingPattern = false;
          break;
        }
      }
      if (isRepeatingPattern) return true;
    }

    // Check if it's all the same digit
    if (digits.split("").every((digit) => digit === firstDigit)) {
      return true;
    }
  }

  return false;
};
// new
const CustomPhoneInput = ({
  label,
  value,
  setValue = () => {},
  disabled,
  errorText,
  placeholder = "Phone Number",
  defaultCountry = "US",
  containerClass,
  phoneInputClass,
  phoneInput,
  labelClass,
}) => {
  const [error, setError] = useState(""); // Local state for error handling

  const handlePhoneChange = (phone) => {
    if (typeof phone === "string" && phone.trim() !== "") {
      const phoneNumberObj = parsePhoneNumberFromString(`${phone}`);
      if (phoneNumberObj && phoneNumberObj.country) {
        const nationalNumber = phoneNumberObj.nationalNumber;

        // Check for repeated digits first
        if (hasRepeatedDigits(nationalNumber)) {
          setError("Phone number contains invalid digits");
          return;
        }

        const isValid = isValidPhoneNumber(
          nationalNumber,
          phoneNumberObj.country
        );

        setValue({
          callingCode: phoneNumberObj.countryCallingCode,
          phoneNumber: nationalNumber,
          country: phoneNumberObj.country, // Add country code to the value
        });

        if (!isValid) {
          setError("Invalid phone number");
        } else {
          setError("");
        }
      }
    }
  };

  return (
    <>
      <style>
        {`
         .PhoneInputCountrySelect[disabled],
            .PhoneInputCountrySelect[readonly] {
              cursor: default;
              background: #ebebeb !important;
            }
        `}
      </style>

      <div
        className={[
          classes.phoneNumberDiv,
          containerClass && containerClass,
        ].join(" ")}
      >
        {label && (
          <label className={mergeClass(classes.labelText, labelClass)}>
            {label}
          </label>
        )}
        <PhoneInput
          placeholder={placeholder}
          value={value}
          onChange={handlePhoneChange}
          disabled={disabled}
          className={[
            classes.phoneNumberInput,
            phoneInput,
            phoneInputClass && phoneInputClass,
            disabled && classes.disabled,
            error || errorText ? classes.error : "",
          ].join(" ")}
          defaultCountry={defaultCountry}
          international
          countryCallingCodeEditable={true}
          limitMaxLength={true}
        />
        <div className={error || errorText ? classes.errorContainer : ""}>
          {(error || errorText) && (
            <p className={`mt-2 text-danger ${[classes.errorText].join(" ")}`}>
              * {error || errorText}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomPhoneInput;
