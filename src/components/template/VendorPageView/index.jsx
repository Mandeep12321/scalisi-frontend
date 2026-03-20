"use client";

import { Button } from "@/components/atoms/Button";
import VendorLocationCard from "@/components/atoms/VendorLocationCard/VendorLocationCard";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import HeroSection from "@/components/molecules/HeroSection";
import VendorCard from "@/components/molecules/VendorCard/VendorCard";
import { VENDORS_DATA } from "@/developmentContent/mock-data";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import classes from "./VendorPageView.module.css";

export default function VendorPageView({ cmsData }) {
  const [data, setData] = useState(VENDORS_DATA);
  const _cmsData = cmsData;

  const [loading, setLoading] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const getData = async () => {
    setLoading("fetchData");

    const queryParams = new URLSearchParams(params)?.toString();
    const url = "";
    const { response } = await Get({
      route: `${url}?${queryParams}`,
    });
    if (response) {
      setData(response?.data?.data);
    }
    setLoading("");
  };

  useEffect(() => {
    // getData({ pg: 1 });
    isMobileViewHook(setIsMobile, 1201);
  }, []);

  return (
    <>
      <div className={classes.heroSecColor}>
        <Container>
          <Row>
            <Col md={12} className="p-0">
              <HeroSection
                isColor={true}
                data={_cmsData?.hero}
                mainDivClass={classes.mainDivClass}
                colorDiv={classes.mainDiv}
                styles={{
                  colorText: classes.colorTextClass,
                  colorHeading: classes.colorHeadingClass,
                  description: classes?.descriptionClass,
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col md={12} className="my-3">
            <h3
              className={mergeClass(
                " fw-700",
                isMobile ? ` ${classes.headingText}` : `fs-31 py-5 `
              )}
            >
              Local Produce Vendors
            </h3>
            <div className={classes.vendorCardDivTwo}>
              {data?.localVendors?.slice(0, 2).map((item, index) => (
                <div className={classes.vendorsCardDiv}>
                  <VendorCard vendor data={item} />
                </div>
              ))}
            </div>

            <div className={classes.vendorCardDiv}>
              {data?.localVendors?.slice(2).map((item, index) => (
                <div className={classes.vendorCard}>
                  <VendorCard data={item} mainClass={classes.vendorCardClass} />
                </div>
              ))}
            </div>
          </Col>
          <Col md={12}>
            <div className={classes.vendorMapHead}>
              <span>
                <h3 className="fs-31 fw-700">{data?.localVendorMap?.title}</h3>
                <p className=" fs-20 fw-700  text-green">
                  {data?.localVendorMap?.description}
                </p>
              </span>
              <Button
                leftIcon={<BsFileEarmarkPdfFill size={22} />}
                label="PDF Map of Local Vendors"
                onClick={() => {
                  window.open(mediaUrl(_cmsData?.hero?.pdf), "_blank");
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <div className={classes.vendorMapSecBox}>
        <Container>
          <Row className="p-0 m-0">
            <Col xs={12} md={12} lg={12} xl={6} className="p-0 m-0">
              <div className={classes.locationList}>
                <Row className="p-0 m-0">
                  {data?.localVendorMap?.locations?.map((data, index) => (
                    <Col
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      key={index}
                      className="p-0 m-0"
                    >
                      <VendorLocationCard data={data} />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col xs={12} md={12} lg={12} xl={6} className="m-0 p-0">
              <div className={classes.VendorMapImage}>
                <Image src={data?.localVendorMap?.image} fill quality={100} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col md={12} className="my-3">
            <h3 className={mergeClass(classes.headingTwo, " fs-31 fw-700")}>
              National Vendor Partners
            </h3>
            <div className={classes.vendorCardDiv}>
              {data?.nationalVendors?.map((item, index) => (
                <div className={classes.vendorCard}>
                  <VendorCard data={item} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={12} className="m-0">
            <h3
              className={mergeClass("fs-31 fw-700", classes.affiliationHeading)}
            >
              Affiliations
            </h3>
            <div
              className={mergeClass(
                classes.affiliationDiv,
                classes.vendorCardDivTwo
              )}
            >
              {data?.affiliations?.slice(0, 2).map((item, index) => (
                <div className={classes.vendorsCardDiv}>
                  <VendorCard vendor data={item} />
                </div>
              ))}
            </div>
            <div className={classes.vendorCardDiv}>
              {data?.affiliations?.slice(2).map((item, index) => (
                <div className={classes.vendorCard}>
                  <VendorCard data={item} mainClass={classes.vendorCardClass} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
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
