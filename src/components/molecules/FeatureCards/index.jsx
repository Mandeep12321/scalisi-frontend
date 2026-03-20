import React, { useEffect, useState } from "react";
import classes from "./FeatureCard.module.css";
import Image from "next/image";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";

export default function FeatureCard({ data, catalogTitle, onclick }) {
  const [is375, setIs375] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIs375, 376);
  }, []);
  return (
    <div
      className={mergeClass("cursor-pointer", classes.featureCardMain)}
      onClick={onclick}
    >
      <div className={classes.featureCardImg}>
        {is375 ? (
          <Image src={mediaUrl(data?.image375)} alt="Slide 1" fill />
        ) : (
          <Image
            src={mediaUrl(data?.image)}
            alt={data?.title || "Card Image"}
            fill
          />
        )}
      </div>
      <div className={mergeClass(classes.featureCardText)}>
        <p className={mergeClass("fs-20 fw-600 ", catalogTitle)}>
          {data?.title}
        </p>
      </div>
    </div>
  );
}
