import React from "react";
import classes from "./LaodingComponent.module.css";
import { ThreeDot } from "react-loading-indicators";

const LoadingComponent = ({ size = "large" }) => {
  return (
    <div className={classes.loading}>
      <ThreeDot color="var(--primary-text)" size={size} text="" textColor="" />
    </div>
  );
};

export default LoadingComponent;
