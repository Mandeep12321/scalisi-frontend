"use client";

import Carousel from "react-elastic-carousel";
import Image from "next/image";
import classes from "./PhotoGallery.module.css";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import { useState, useRef } from "react";

export default function PhotoGallery({ data }) {
  const breakPoints = [{ width: 1200, itemsToShow: 1 }];
  const [activePhoto, setActivePhoto] = useState(0);
  const carouselRef = useRef(null);

  const handleCarouselChange = (currentIndex) => {
    setActivePhoto(currentIndex);
  };

  const handleImageClick = (index) => {
    setActivePhoto(index);
    carouselRef.current.goTo(index);
  };

  return (
    <>
      <style>
        {`
        .rec-pagination {
          gap: 17px;
          margin-block: 40px;
        }
        .rec-dot {
          box-shadow: 0 0 1px 3px var(--red-color);
          height: 20px;
          width: 20px
        }
          
        .rec-dot_active {
          background-color: var(--primary-color);
          outline: 1px solid var(--primary-color);
          box-shadow: 0 0 1px 3px var(--primary-color);
          height: 20px;
          width: 20px
        }
        .rec-dot:focus,
        .rec-dot:hover {
          box-shadow: 0 0 1px 3px var(--primary-color);
        }
        .rec-arrow {
          background-color: var(--primary-color);
          color: var(--white-color);
          width: 70px;
          height: 65px;
          font-size: 32px;
        }
        .rec-arrow:focus,
        .rec-arrow:hover {
          background-color: var(--black-color) !important;
        }
      
        @media (max-width: 1024px) {
          .rec-arrow {
            width: 55px;
                height: 50px;
                font-size: 24px;
          }
          .rec-dot {
             height: 15px;
            width: 15px
          }
          .rec-dot_active {
            height: 15px;
            width: 15px
          }
        }
        @media (max-width: 768px) {
         
           .rec-arrow-left {
            bottom: 25px;
            left: 120px;
            position: absolute;
            }
            .rec-arrow {
                width: 40px !important;
                height: 40px !important;
                min-height: 40px !important;
                min-width: 40px !important;
                font-size: 16px !important;
                line-height: 16px !important;
            }
            .rec-arrow-left {
                bottom: 33px;
                left: 70px;
                position: absolute;
            }
                .rec-arrow-right {
                bottom: 33px !important;
                right: 70px;
                position: absolute;
            }
            
         
        }

        @media (max-width: 650px) {
          .rec-pagination {
              gap: 5px;
              margin-block: 40px;
          }
          .rec-dot_active {
              height: 10px;
              width: 10px;
          }
          .rec-dot {
              height: 10px;
              width: 10px;
          }
        }


        @media (max-width: 480px) {
            .rec-arrow-left {
                left: 30px;
            }
                .rec-arrow-right {
                right: 30px;
            }
        }

         @media (max-width: 425px) {
            .rec-arrow {
              width: 30px !important;
              height: 30px !important;
              min-height: 30px !important;
              min-width: 30px !important;
              font-size: 18px !important;
              line-height: 15px !important;
            }
            .rec-arrow-left,
            .rec-arrow-right {
                bottom: 21px !important;
               
            }
              .rec-arrow-right {
                       right: 37px;
        bottom: 26px !important;
              }
                .rec-arrow-left {
                         left: 35px;
        bottom: 25px !important;
                }
              .rec-pagination {
                  gap: 3px;
                  margin-block: 30px 32px;
                }
              .rec-dot {
                  height: 6px;
                  width: 6px
              }
              .rec-dot_active {
                height: 6px;
                width: 6px;
              }
            }
        }

        @media (max-width: 376px) {
          .rec-arrow-left {
              bottom: 25px;
              left: 120px;
              position: absolute;
          }
                .rec-arrow {
              width: 50px;
              height: 50px;
              font-size: 20px;
          }
        }

         @media (max-width: 320px) {
          .rec-pagination {
            gap: 0px;
            margin-block: 30px;
          }
          .rec-arrow-left {
            left: 10px;
          }
          .rec-arrow-right {
            right: 10px;
          }
          .rec-dot {
              height: 6px;
              width: 6px
          }
          .rec-dot_active {
            height: 6px;
            width: 6px;
          }
        }
    `}
      </style>
      <div className={classes.mainDiv}>
        <p className={mergeClass("fs-53 fw-700", classes.heading)}>
          Photo Gallery
        </p>
        <div className={classes.carouselWrapper}>
          <Carousel
            ref={carouselRef}
            breakPoints={breakPoints}
            pagination={true}
            onChange={(currentItem) => handleCarouselChange(currentItem.index)}
          >
            {data?.map((e, index) => (
              <div
                className={mergeClass(
                  "cursor-pointer",
                  classes.photoGallerySwiperDiv
                )}
                key={index}
              >
                <div className={classes.photoDiv}>
                  <Image src={mediaUrl(e?.image)} alt="photo" fill draggable={false} />
                </div>
                <div className={classes.footer}>
                  <h1 className="fs-32 fs-500 maxLine3">{e?.description}</h1>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className={classes.imagesDiv}>
          {data?.map((e, index) => (
            <div
              className={mergeClass(
                "cursor-pointer",
                classes.imageDiv,
                activePhoto === index && classes.activeImageDiv
              )}
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <Image src={mediaUrl(e?.image)} alt="photo" fill />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
