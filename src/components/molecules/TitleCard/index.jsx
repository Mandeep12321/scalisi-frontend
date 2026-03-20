import React from "react";
import classes from "./TitleCard.module.css";
import Image from "next/image";
import { mergeClass } from "@/resources/utils/helper";

export default function TitleCard({
  data,
  catalogContent,
  catalogTitle,
  catalogMainDiv,
  cardHome,
  onclick,
}) {
  return (
    <div
      className={mergeClass(
        "cursor-pointer",
        classes.cardMain,
        catalogMainDiv,
        cardHome
      )}
      onClick={onclick}
    >
      <div className={classes.cardMainImg}>
        <Image src={data?.image} alt={data?.title || "Card Image"} fill />
      </div>
      <div className={mergeClass(catalogContent, classes.cardMainContent)}>
        <p className={mergeClass("fs-23 fw-700", catalogTitle)}>
          {data?.title}
        </p>
      </div>
    </div>
  );
}
