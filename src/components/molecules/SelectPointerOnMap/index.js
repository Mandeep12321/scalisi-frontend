"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./SelectPointerOnMap.module.css";

const mapImage = "/assets/images/app-images/mapImage.png";
import { FaLocationDot } from "react-icons/fa6";

const SelectPointerOnMap = ({ data, setData, isReadable = false }) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollPosition({ x: window.pageXOffset, y: window.pageYOffset });
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleImageClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + window.pageXOffset;
    const y = rect.top + window.pageYOffset;

    setData((prev) => [
      ...prev,
      {
        x: event.pageX - x,
        y: event.pageY - y,
        pageScrollX: scrollPosition.x,
        pageScrollY: scrollPosition.y,
        title: "",
        description: [""],
        width: rect.width,
        height: rect.height,
      },
    ]);
  };

  return (
    <div className={classes?.imageContainer}>
      <Image
        src={mapImage}
        alt="Map Image"
        onClick={!isReadable ? handleImageClick : undefined}
        className={classes?.mapImage}
        fill
      />
      {data.map((item, index) => (
        <div
          key={index}
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
          <FaLocationDot size={24} color="#0F9A08" />
        </div>
      ))}
    </div>
  );
};

export default SelectPointerOnMap;
