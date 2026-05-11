import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import classes from "./AboutUsHeroSection.module.css";
import { useEffect, useState } from "react";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { CONTACT_PAGE_DATA } from "@/developmentContent/mock-data";
export default function AboutUsHeroSection({
  data,
  hasImage = true,
  styles = {},
  lineHeight,
  aboutStyle = {},
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [is375, setIs375] = useState(false);
  useEffect(() => {
    isMobileViewHook(setIsMobile, 486);
    isMobileViewHook(setIs375, 376);
  }, []);

  return (
    <div className={mergeClass(classes.mainDiv, styles.mainDivContact)}>
      <div className={mergeClass(classes.leftCol, styles.contactLeftCol)}>
        <h3
          className={mergeClass(classes.title, "capitalize", styles.aboutTitle)}
        >
          {data?.title}
        </h3>
        <div
          className={`${mergeClass(classes?.subTitle, styles?.aboutSubTitle)} ${hasImage ? "" : "fs-29 500"} ${!hasImage ? classes.lineHeight : ""}`}
        >
          {data?.heading ? HTMLReactParser(data?.heading) : (data?.htmlDescription ? HTMLReactParser(data.htmlDescription) : null)}
        </div>

        <p
          className={mergeClass(classes.description, styles?.aboutDescription)}
        >
          {data?.description}
        </p>
      </div>
      <div className={mergeClass(hasImage ? classes.rightCol : classes.rightColText, !hasImage ? styles?.contactRightCol : "")}>
        {hasImage ? (
          <>
            {is375 ? (
              <div className={classes.imageDiv}>
                {mediaUrl(data?.image375) && (
                  <Image fill alt="earth-icon" src={mediaUrl(data?.image375)} />
                )}
              </div>
            ) : (
              <div className={classes.imageDiv}>
                {mediaUrl(data?.image) && (
                  <Image fill alt="earth-icon" src={mediaUrl(data?.image)} />
                )}
              </div>
            )}
          </>
        ) : (
          <div className={classes.callToActionDiv}>
            {(data?.arr || data?.calToAction)?.map((item, index) => (
              <div className={classes.ctaInner} key={index}>
                <span>{item?.TheImage}</span>
                <p className="fs-17 fw-600">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
