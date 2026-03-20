import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import classes from "./DatePicker.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { mergeClass } from "@/resources/utils/helper";

const DatePickerComp = ({
  value,
  setValue,
  className,
  placeholder,
  minDate,
  availableDates = [],
  ref,
  autoOpen = false,
}) => {
  // .react-datepicker__day, .react-datepicker__day-name, .react-datepicker__time-name {
  //   color: #000;
  //   display: inline-block;
  //   width: 1.7rem;
  //   line-height: 1.7rem;
  //   text-align: center;
  //   margin: .166rem;
  //   overflow: hidden;
  // }

  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const maxSelectableDate = new Date(currentYear - 4, 11, 31);

  // Function to check if a date is available for selection
  const isDateAvailable = (date) => {
    if (availableDates.length === 0) return true; // If no dates provided, allow all dates

    const dateString = moment(date).format("YYYY-MM-DD");
    const isAvailable = availableDates.some((availableDate) => {
      const availableDateString = moment(availableDate).format("YYYY-MM-DD");
      return availableDateString === dateString;
    });

    return isAvailable;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-open the date picker when autoOpen prop is true
  useEffect(() => {
    if (autoOpen) {
      setIsOpen(true);
    }
  }, [autoOpen]);

  return (
    <>
      <style>
        {`
        .react-datepicker {
          font-family: var(--titillium-web) !important;
          font-size: 15px !important;
          font-weight: 700 !important;
        }


        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__year-wrapper {
          max-width: 300px;
        }
        .react-datepicker__navigation{
          top:11px !important;
        }
        .react-datepicker__day--disabled {
          color: #ccc !important;
          background-color: #f5f5f5 !important;
          cursor: not-allowed !important;
        }
        .react-datepicker__day--disabled:hover {
          background-color: #f5f5f5 !important;
        }

        .react-datepicker__day, .react-datepicker__day-name, .react-datepicker__time-name {
          overflow: hidden !important;
        }

        .react-datepicker__input-container input {
          cursor: pointer !important;
        }

        .react-datepicker__input-container input:focus {
          outline: none !important;
        }

          @media (max-width: 992px) {
          .react-datepicker-popper {
            left: -58px !important;
          }
        }
        `}
      </style>
      <div className={classes.inputWrapper} ref={datePickerRef}>
        <div
          className={classes.calendarIcon}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FaCalendarAlt />
        </div>
        <DatePicker
          selected={value ? moment(value, "DD/MM/YYYY").toDate() : null}
          onChange={(date) => {
            if (date) {
              setValue(moment(date).format("DD/MM/YYYY"));
              setIsOpen(false);
            } else {
              setValue(null);
            }
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder}
          className={mergeClass(classes.datePicker, className)}
          open={isOpen}
          onCalendarOpen={() => setIsOpen(true)}
          onCalendarClose={() => setIsOpen(false)}
          onInputClick={() => setIsOpen(true)}
          minDate={new Date()}
          filterDate={isDateAvailable}
          readOnly={true}
          popperProps={{
            modifiers: [{ name: "preventOverflow", options: { padding: 10 } }],
          }}
          ref={ref}
        />
      </div>
    </>
  );
};

export default DatePickerComp;
