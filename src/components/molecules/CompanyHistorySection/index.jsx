import React, { useEffect, useState } from "react";
import classes from "./CompanyHistorySection.module.css";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";

export default function CompanyHistorySection({ data }) {
  const [is375, setIs375] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIs375, 376);
  }, []);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.subDiv}>
        <div className={classes.leftCol}>
          <div className={classes.bgImage}>
            <Image
              src={"/assets/images/app-images/green-circle-vector.png"}
              fill
              alt="green-ellipse"
            />
            {is375 ? (
              <>
                <div className={classes.bottomImage}>
                  <Image
                    src={mediaUrl(data?.imageBottom?.image375)}
                    fill
                    alt="bottom-images"
                  />
                </div>
                <div className={classes.centerImage}>
                  <Image
                    src={mediaUrl(data?.imageCenter?.image375)}
                    fill
                    alt="middle-image"
                  />
                </div>
                <div className={classes.topImage}>
                  <Image
                    src={mediaUrl(data?.imageTop?.image375)}
                    fill
                    alt="top-image"
                  />
                </div>
              </>
            ) : (
              <>
                <div className={classes.bottomImage}>
                  <Image
                    src={mediaUrl(data?.imageBottom?.image)}
                    fill
                    alt="bottom-image"
                  />
                </div>
                <div className={classes.centerImage}>
                  <Image
                    src={mediaUrl(data?.imageCenter?.image)}
                    fill
                    alt="middle-image"
                  />
                </div>
                <div className={classes.topImage}>
                  <Image
                    src={mediaUrl(data?.imageTop?.image)}
                    fill
                    alt="top-image"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className={classes.rightCol}>
          <h1 className={classes.title}>{data?.title}</h1>
          <div className={classes.descriptionDiv}>
            <p className={mergeClass(classes.description)}>
              {data?.descriptionOne?.htmlDescription &&
                HTMLReactParser(data?.descriptionOne?.htmlDescription)}
            </p>
          </div>
        </div>
      </div>
      <p className={classes.descriptionTwo}>
        {data?.descriptionTwo?.htmlDescription &&
          HTMLReactParser(data?.descriptionTwo?.htmlDescription)}
      </p>
    </div>
  );
}
