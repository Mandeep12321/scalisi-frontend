import React from "react";
import classes from "./RepresentativeCard.module.css";
import { mergeClass } from "@/resources/utils/helper";

const RepresentativeCard = ({ item }) => {
  return (
    <div className={classes.card}>
      <div className={classes.titleMain}>
        <h5>{item?.title}</h5>
        <p>{item?.expNum}</p>
      </div>
      <div className={mergeClass(classes.email)}>{item?.email}</div>
      <div className={mergeClass(classes.designation)}>{item?.designation}</div>
    </div>
  );
};

export default RepresentativeCard;
