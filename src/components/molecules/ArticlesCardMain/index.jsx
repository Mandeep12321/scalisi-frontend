import Image from "next/image";
import classes from "./ArticlesCardMain.module.css";

import { Button } from "@/components/atoms/Button";
import { htmlToText, mediaUrl, mergeClass } from "@/resources/utils/helper";
import moment from "moment";

export const ArticlesCardMain = ({
  data,
  buttonLabel = "Read More",
  onClick,
}) => {
  return (
    <div
      className={mergeClass("cursor-pointer ", classes.cardContainer)}
      onClick={onClick}
    >
      <div className={classes.imageContainer}>
        <Image
          src={mediaUrl(data?.image)}
          alt="Card Image"
          className={classes.cardImage}
          width={100}
          height={100}
          layout="responsive"
        />
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.title}>
          <p className="fs-35 fw-700 maxLine2">{data?.title}</p>
        </div>

        <div className={classes.detail}>
          <p className="maxLine7 fs-20 fw-500">
            {htmlToText(data?.description)}
          </p>
        </div>
        <div className={classes.date}>
          <p className="fs-21 fw-700">
            {" "}
            {moment(data?.createdAt).format(`MMMM Do, YYYY`)}
          </p>
        </div>
        <Button
          label={buttonLabel}
          className={`fs-15 fw-700 ${classes.prodBtn}`}
          onClick={onclick}
        />
      </div>
    </div>
  );
};
