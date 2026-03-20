"use client";

import Carousel from "react-elastic-carousel";
import HomeHeroSec from "../../molecules/HomeHeroSec/HomeHeroSec";
import classes from "./SwiperWrapper.module.css";
import { mediaUrl } from "@/resources/utils/helper";

const breakPoints = [{ width: 1200, itemsToShow: 1 }];

export default function SwiperWrapper({ data }) {
  return (
    <>
      <style>
        {`
    .rec-pagination {
        position: absolute !important;
      bottom: 42px !important;
          left: 55px !important;
        z-index: 9;
            column-gap: 4px;
      }
      button.rec-arrow-left,
      button.rec-arrow-right {
        display: none !important;
      }
      .rec-pagination .rec-dot {
          box-shadow: 0 0 1.5px 1.5px rgb(255 255 255 / 50%);
          width: 11px;
          height: 11px;
      }
      .rec-pagination .rec-dot_active {
        background-color: var(--primary-color);
        box-shadow: 0 0 1px 2px var(--primary-color);
        width: 11px;
        height: 11px;
      }

    @media(max-width: 1024px){
      .rec-pagination {
        left: 38px !important;
      }
    }
   
      @media(max-device-width: 767px){
          .rec-pagination {
            left: 18px !important;
            bottom: 27px !important;
          }
         
        }

    `}
      </style>
      <div className={classes.carouselWrapper}>
        <Carousel breakPoints={breakPoints} pagination={true}>
          {data?.map((item, index) => (
            <HomeHeroSec key={index} item={item} />
          ))}
        </Carousel>
      </div>
    </>
  );
}
