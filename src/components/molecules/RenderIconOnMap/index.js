"use client";

import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import classes from "./RenderIconOnMap.module.css";

const mapImage = "/assets/images/app-images/mapImage.png";

const RenderIconOnMap = ({ data }) => {
  return (
    <div className={classes?.imageContainer}>
      <Image
        src={mapImage}
        alt="Map Image"
        className={classes?.mapImage}
        fill
      />
      {data.map((item, index) => (
        <>
          <div
            key={`icon-${index}`}
            className={classes?.pointContainer}
            style={{
              left: `${
                ((item?.pointer?.x - item?.pointer?.pageScrollX) /
                  item?.pointer?.width) *
                100
              }%`,
              top: `${
                ((item?.pointer?.y - item?.pointer?.pageScrollY) /
                  item?.pointer?.height) *
                100
              }%`,
              transform: "translate(-50%, calc(-50% - 5px))",
            }}
          >
            <FaLocationDot className={classes.FaLocationDot} color="#0F9A08" />
          </div>
          {item.isHovered && (
            <div
              key={`popover-${index}`}
              className={classes?.popover}
              style={{
                left: `${
                  ((item?.pointer?.x - item?.pointer?.pageScrollX) /
                    item?.pointer?.width) *
                  100
                }%`,
                top: `${
                  ((item?.pointer?.y - item?.pointer?.pageScrollY) /
                    item?.pointer?.height) *
                  100
                }%`,
                transform: "translate(-50%, calc(-50% - 40px))",
              }}
            >
              <p>{item.name || `Point ${index + 1}`}</p>
              <div className={classes.arrow}></div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default RenderIconOnMap;
