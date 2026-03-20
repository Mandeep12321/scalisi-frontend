"use client";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import RenderIconOnMap from "@/components/molecules/RenderIconOnMap";
import { DISTRIBUTION_PAGE_DATA } from "@/developmentContent/mock-data";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { mergeClass } from "@/resources/utils/helper";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import classes from "./DistributionMapView.module.css";

export default function DistributionMapView({ cmsData }) {
  const _cmsData = cmsData;
  const [locationData, setLocationData] = useState(
    DISTRIBUTION_PAGE_DATA.locations
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIsMobile, 768);
  }, []);

  // Split locations into two columns
  const leftColumn = locationData.slice(0, 6);
  const rightColumn = locationData.slice(6);

  return (
    <>
      <div className={classes.distributionMapMain}>
        <Container>
          <Row>
            <Col md={12}>
              <div className={classes.distributionHead}>
                <h2 className="fs-31 fw-700 black-color mt-3">
                  {_cmsData?.title}
                </h2>
                <h3 className="fs-24 fw-700 text-green">
                  {_cmsData?.subTitle}
                </h3>
                <p className=" fs-24 text-color-v2">{_cmsData?.description}</p>
              </div>
            </Col>
            <Col md={12}>
              <div className={classes.distributionMapDiv}>
                <Row>
                  <Col xl={5} lg={6}>
                    <div className={classes.mapLocationList}>
                      <p className="fs-21 fw-700 text-color-v3">
                        Scalisi Produce delivers quality wholesale produce to:
                      </p>

                      <div className={classes.locationColumns}>
                        <ul>
                          {leftColumn.map((location, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setLocationData((prev) => {
                                  return prev.map((item, i) => {
                                    if (i === index) {
                                      if (item.isHovered) {
                                        return { ...item, isHovered: false };
                                      }
                                      return { ...item, isHovered: true };
                                    }
                                    return { ...item, isHovered: false };
                                  });
                                });
                              }}
                            >
                              <div className={classes.mapICon}>
                                <ReactSVG
                                  src={
                                    isMobile
                                      ? "/assets/images/svg/locationPinIcon.svg"
                                      : "/assets/images/svg/pinDesktop.svg"
                                  }
                                  fill
                                  alt="icon"
                                  className={classes.mapIConMark}
                                  color="var(--primary-color)"
                                />
                              </div>
                              <span
                                className={`fs-21 ${classes.locationName} text-color-v2`}
                              >
                                {location.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className={classes.locationColumnsTwo}>
                          {rightColumn.map((location, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                setLocationData((prev) => {
                                  return prev.map((item, i) => {
                                    if (i === index + 6) {
                                      if (item.isHovered) {
                                        return { ...item, isHovered: false };
                                      }
                                      return { ...item, isHovered: true };
                                    }
                                    return { ...item, isHovered: false };
                                  });
                                });
                              }}
                            >
                              <div>
                                <ReactSVG
                                  src={
                                    isMobile
                                      ? "/assets/images/svg/locationPinIcon.svg"
                                      : "/assets/images/svg/pinDesktop.svg"
                                  }
                                  fill
                                  alt="icon"
                                  color="var(--primary-color)"
                                />
                              </div>
                              <span
                                className={`fs-21 ${classes.locationName} text-color-v2`}
                              >
                                {location.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col xl={7} lg={6}>
                    <div className={classes.mapSec}>
                      <div className={classes.mapImage}>
                        <RenderIconOnMap data={locationData} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="g-0">
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard data={_cmsData?.support} />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={_cmsData?.updates}
                placeholder="Email address"
                hasNewsletter={true}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
