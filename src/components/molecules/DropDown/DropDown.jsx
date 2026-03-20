"use client";
import { mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ReactSelect, { components } from "react-select";
import classes from "./DropDown.module.css";
import { useEffect, useState } from "react";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";

const DropDown = ({
  options,
  label,
  customStyle,
  disabled,
  value,
  setValue,
  placeholder,
  placeholderFontStyle = "var(--inter)",
  placeholderColor = "var(--placeholder-color) !important",
  isMulti,
  style,
  leftIcon,
  Components,
  labelClassName,
  indicatorColor = "#363636",
  optionLabel,
  optionValue,
  errorText,
  selectRef,
  isSearchable = true,
  borderRadius = "5px",
  classNamePrefix,
  dropDownContainerClass = "",
  variant = "",
  isHoverColor,
  iconClass,
  dropDownContainer,
  dropdownWidth,
  subComponentVariant,
  backgroundColor,
  extraPlaceholderStyles = {},
  ...props
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [is375, setIs375] = useState(false);
  useEffect(() => {
    isMobileViewHook(setIsMobile, 992);
    isMobileViewHook(setIs375, 376);
  });

  const DropdownIndicator = (props) => {
    const {
      selectProps: { menuIsOpen },
    } = props;

    return (
      <components.DropdownIndicator {...props}>
        {menuIsOpen ? (
          <IoIosArrowUp
            className={iconClass}
            size={17}
            color={indicatorColor}
          />
        ) : (
          <IoIosArrowDown
            className={iconClass}
            size={17}
            color={indicatorColor}
          />
        )}
      </components.DropdownIndicator>
    );
  };

  const CustomOption = (props) => {
    const { data, isSelected, innerRef, innerProps } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={classes.customOption}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          cursor: "pointer",
          backgroundColor: isSelected ? "var(--red-color)" : "white",
          color: isSelected ? "white" : "black",
        }}
        onClick={() => props.selectOption(data)}
      >
        {subComponentVariant ? (
          <>
            <div className={classes.flagIconImageDiv}>
              <Image
                src={data.image}
                alt="flag"
                fill
                className={classes.flagIconImage}
              />
            </div>
            <div className="ps-2 ">{data.label}</div>
          </>
        ) : (
          <div>{data.label}</div>
        )}
      </div>
    );
  };

  const dropDownStyle = {
    control: (styles, { isDisabled, menuIsOpen }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? "#EBEBEB"
        : backgroundColor || "transparent",
      borderRadius: menuIsOpen ? "7px 7px 0px 0px" : "7px",
      // border: "2px solid rgba(142, 142, 142, 0.45) !important",
      border: errorText
        ? "2px solid #dc3545 !important"
        : "2px solid rgba(142, 142, 142, 0.45) !important",
      fontSize: isMobile ? "12px" : "15px",
      paddingLeft: "2.3px",
      cursor: "pointer",
      ":hover": {
        border: "2px solid #8E8E8E !important",
      },
      ...customStyle,
    }),

    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      fontSize: is375 ? "12px" : "14px",
      color: placeholderColor,
      fontStyle: placeholderFontStyle,
      fontWeight: 700,
      textTransform: "capitalize",
      ...extraPlaceholderStyles,
    }),

    singleValue: (styles) => ({
      ...styles,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip",
      maxWidth: "100%",
    }),

    valueContainer: (styles) => ({
      ...styles,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "clip",
      maxWidth: "100%",
    }),

    option: (styles, { isSelected }) => ({
      ...styles,
      backgroundColor: "transparent",
      color: "transparent",
      cursor: "pointer",
      padding: 0,
      margin: 0,
    }),

    menu: (base) => ({
      ...base,
      marginTop: 0,
      borderRadius: "0px 0px 4px 4px",
      border: "1px solid rgba(142, 142, 142, 0.45)",
      fontSize: "14px",
      backgroundColor: "white",
    }),
  };

  return (
    <div
      className={mergeClass(
        classes.Container,
        dropDownContainer,
        dropDownContainerClass
      )}
      data-variant={variant}
    >
      {label && (
        <label
          htmlFor={`dropdown${label}`}
          className={`${[
            classes.label,
            labelClassName && labelClassName,
            disabled && classes.disabled,
          ].join(" ")}`}
        >
          {label}
        </label>
      )}

      <div
        className={`${[
          classes.dropdownContainer,
          dropdownWidth,
          disabled && classes.cursorDisabled,
        ].join(" ")}`}
      >
        <ReactSelect
          closeMenuOnSelect={!isMulti}
          inputId={`dropdown${label}`}
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          className={`${[
            classes.reactSelect,
            dropDownContainerClass && dropDownContainerClass,
          ].join(" ")}`}
          isMulti={isMulti}
          isDisabled={disabled}
          placeholder={placeholder}
          options={options}
          styles={{ ...dropDownStyle, ...style }}
          isClearable={false}
          isSearchable={isSearchable}
          classNamePrefix={`DropdownOptionContainer ${
            classNamePrefix && classNamePrefix
          }`}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: (e) => DropdownIndicator(e),
            Option: (props) => <CustomOption {...props} />,
            ...Components,
          }}
          getOptionLabel={(option) =>
            optionLabel ? option[optionLabel] : option.label
          }
          getOptionValue={(option) =>
            optionValue ? option[optionValue] : option.value
          }
          ref={selectRef}
          {...props}
        />
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
      </div>
      {errorText && (
        <p className={`mt-2 text-danger ${[classes.errorText].join(" ")}`}>
          {errorText}
        </p>
      )}
    </div>
  );
};

export default DropDown;
