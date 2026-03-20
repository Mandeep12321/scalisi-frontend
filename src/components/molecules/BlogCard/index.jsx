import { htmlToText, mediaUrl, mergeClass } from "@/resources/utils/helper";
import moment from "moment";
import Image from "next/image";
import { Button } from "../../atoms/Button";
import classes from "./BlogCard.module.css";

const BlogCard = ({
  data,
  buttonLabel = "Learn More",
  customStyles = {},
  onClick,
}) => {
  return (
    <div
      className={mergeClass("cursor-pointer", classes.cardContainer)}
      onClick={onClick}
      style={customStyles.cardContainer}
    >
      <div
        className={classes.imageContainer}
        style={customStyles.imageContainer}
      >
        <Image
          src={mediaUrl(data?.image)}
          alt="Card Image"
          className={classes.cardImage}
          width={100}
          height={100}
          layout="responsive"
        />
      </div>

      <div
        className={classes.contentContainer}
        style={customStyles.contentContainer}
      >
        <div className={classes.title} style={customStyles.title}>
          <p className="fs-27 fw-700 maxLine2 text-color-v2">{data?.title}</p>
        </div>
        <div className={classes.date} style={customStyles.date}>
          <p className="fs-15 fw-700 red-color">
            {moment(data?.createdAt).format(`MMMM Do, YYYY`)}
          </p>
        </div>
        <div className={` ${classes.detail}`} style={customStyles.detail}>
          <p className="fs-15 fw-500  maxLine4">
            {htmlToText(data?.description)}
          </p>
        </div>
        <Button
          label={"Read More"}
          variant="primaryBorder"
          className={`fs-14 fw-700 ${classes.button}`}
          style={customStyles.button}
          onClick={onclick}
        />
      </div>
    </div>
  );
};

export default BlogCard;
