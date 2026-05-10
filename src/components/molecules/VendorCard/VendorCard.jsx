import React from "react";
import classes from "./VendorCard.module.css";
import Image from "next/image";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";

export default function VendorCard({ data, vendor, mainClass }) {
  return (
    <div
      className={mergeClass(
        classes.vendorCardMain,
        vendor && classes.vendorTop,
        mainClass
      )}
    >
      <h3 className={mergeClass(vendor ? "fs-27" : "fs-21")}>
        {data?.label || "default Text"}
      </h3>
      <div className={classes.vendorCardImage}>
        <Image
          src={mediaUrl(data?.image)}
          fill
          alt="img"
          quality={100}
        />
      </div>
    </div>
  );
}
