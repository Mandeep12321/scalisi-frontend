import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import classes from "./HeroSection.module.css";
import moment from "moment";

export default function HeroSection({
  data,
  isColor = false,
  hasDate = false,
  isTextLeft = false,
  hasBtn = false,
  hasDescription = true,
  onClick,
  mainDivClass,
  styles = {},
  is31 = false,
  colorDiv,
  descriptionClass,
  colorHeading,
  imageDivText,
  backBtnMain,
  imgSrc,
  svgClass,
}) {
  const [is375, setIs375] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIs375, 376);
  }, []);

  return (
    <div className={mergeClass(classes.mainDiv, mainDivClass)}>
      <div
        className={`${
          isColor
            ? classes.colorDiv
            : isTextLeft
            ? mergeClass(classes.imageDivTextLeft, imageDivText)
            : classes.imageDiv
        } ${isColor && colorDiv}`}
      >
        {hasBtn && (
          <p
            className={mergeClass("fs-19 fw-700", classes.backBtn, backBtnMain)}
            onClick={onClick}
          >
            <IoIosArrowDropleftCircle size={25} className={svgClass} />
            <span className="my-2 ">Back to News</span>
          </p>
        )}
        {!isColor && (
          <>
            {is375 ? (
              <Image
                fill
                src={mediaUrl(data?.image375 || imgSrc)}
                alt="hero-section-image"
              />
            ) : (
              <Image
                fill
                src={mediaUrl(data?.image || imgSrc)}
                alt="hero-section-image"
              />
            )}
          </>
        )}
        <h1
          className={mergeClass(
            is31 ? "fs-31 fw-700" : "fs-41 fw-700",
            styles.colorHeading,
            colorHeading
          )}
        >
          {data?.title}
        </h1>
        {hasDescription && data?.description && (
          <p
            className={mergeClass(
              "fs-15 fw-500",
              classes.description,
              styles.colorText,
              descriptionClass
            )}
          >
            {data?.description}
          </p>
        )}
        {hasDate && (
          <p className={mergeClass("fs-15 fw-600")}>
            {moment(data?.date || data?.createdAt).format("MMMM D, YYYY")}
          </p>
        )}
      </div>
    </div>
  );
}
