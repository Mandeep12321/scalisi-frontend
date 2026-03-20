import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import classes from "./LeedCertifiedFaculty.module.css";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import { Button } from "../../atoms/Button";
import { useEffect, useState } from "react";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";

export default function LeedCertifiedFaculty({ data }) {
  const [isMobile, setIsMobile] = useState(false);
  const [is375, setIs375] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIsMobile, 486);
    isMobileViewHook(setIs375, 376);
  }, []);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.subDiv}>
        <div
          className={`${classes.leftCol} ${isMobile && classes.leftColMobile}`}
        >
          <div className={classes.bgImage}>
            {is375 ? (
              <Image src={mediaUrl(data?.image375)} fill alt="image375" />
            ) : (
              <Image src={mediaUrl(data?.image)} fill alt="image" />
            )}
          </div>
        </div>
        <div className={classes.rightCol}>
          <h1 className={classes.title}>{data?.title}</h1>
          <h3 className={classes.heading}>{data?.heading}</h3>
          <h5 className={classes.tagline}>
            <u>{data?.tagline}</u>
          </h5>
          <h6 className={classes.description}>
            {data?.descriptionOne?.htmlDescription &&
              HTMLReactParser(data?.descriptionOne?.htmlDescription)}
          </h6>
        </div>
      </div>
      <p className={mergeClass(classes.descriptionTwo, classes.text)}>
        {data?.descriptionTwo?.htmlDescription &&
          HTMLReactParser(data?.descriptionTwo?.htmlDescription)}
      </p>
      <div className={classes.operatingPlanDiv}>
        <div className={classes.scalisiProduceImage}>
          {is375 ? (
            <Image
              src={mediaUrl(data?.scalisiProduceImage?.image375)}
              fill
              alt="image375"
            />
          ) : (
            <Image
              src={mediaUrl(data?.scalisiProduceImage?.image)}
              fill
              alt="image"
            />
          )}
        </div>
        <div>
          <Button
            label={"View Our Emergency Operating Plan Statement"}
            className={mergeClass(classes.buttonClass)}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
