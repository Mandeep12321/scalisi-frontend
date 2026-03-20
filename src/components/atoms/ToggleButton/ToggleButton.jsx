import React from "react";
import classes from "./ToggleButton.module.css";

export default function ToggleButton({ isActive, onClick }) {
  return (
    <div
      className={`${classes.btnBorder} ${
        isActive ? classes.active : classes.inActive
      }`}
      onClick={onClick}
    >
      <div
        className={`${classes.btn} ${isActive ? classes.green : classes.red}`}
      ></div>
    </div>
  );
}
