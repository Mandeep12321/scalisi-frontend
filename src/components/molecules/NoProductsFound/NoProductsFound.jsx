"use client";

import React from "react";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import { Button } from "@/components/atoms/Button";
import { useDispatch } from "react-redux";
import { setGlobalSearch } from "@/store/common/commonSlice";
import classes from "./NoProductsFound.module.css";

const NoProductsFound = ({ 
  title = "No Products Found", 
  message = "We couldn't find any products matching your current filters or search terms. Try adjusting them to find what you're looking for.",
  showReset = true 
}) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(setGlobalSearch(""));
  };

  return (
    <div className={classes.container}>
      <div className={classes.iconWrapper}>
        <HiOutlineMagnifyingGlassCircle className={classes.icon} />
      </div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.message}>{message}</p>
      {showReset && (
        <Button 
          variant="primary" 
          label="Clear Search" 
          onClick={handleReset}
          customStyle={{ marginTop: "24px", minWidth: "160px" }}
        />
      )}
    </div>
  );
};

export default NoProductsFound;
