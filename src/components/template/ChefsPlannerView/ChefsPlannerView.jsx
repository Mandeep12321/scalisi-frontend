"use client";

import LoadingComponent from "@/components/atoms/LoadingComponent";
import { Get } from "@/interceptor/axiosInterceptor";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "@/components/atoms/Button";
import Image from "next/image";
import classes from "./ChefsPlannerView.module.css";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import { ABOUT_US_PAGE_DATA } from "@/developmentContent/mock-data";

export default function ChefsPlannerView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("loading");

  const getData = async () => {
    setLoading("loading");
    const { response } = await Get({
      route: "chef-planners",
    });
    if (response) {
      setData(response?.data);
    }
    setLoading("");
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = (url) => {
    if (url) {
      window.open(mediaUrl(url), "_blank");
    }
  };

  if (loading === "loading") {
    return (
      <div className={classes.mainHeight}>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <Container className="pt-5">
        <div className={classes.headerSection}>
          <h1 className={classes.mainHeading}>Chef's Planners</h1>
          <p className={classes.subHeading}>
            Monthly guides that are useful as a quick reference to products that are particular to the month, season, and time of year.
          </p>
        </div>
        <Row className={mergeClass("gx-0", classes.plannerRow)}>
          {data?.map((item, index) => (
            <Col key={index} sm={6} md={4} lg={3} className={classes.plannerCol}>
              <div className={classes.plannerCard}>
                <h3 className={mergeClass("chefsPlanner_month fw-600", classes.monthName)}>
                  {item.name}
                </h3>
                <div className={classes.imageContainer}>
                  {item.imageUrl && (
                    <Image
                      src={mediaUrl(item.imageUrl)}
                      alt={item.name}
                      width={237}
                      height={157}
                      className={classes.plannerImage}
                    />
                  )}
                </div>
                <Button
                  variant="primary"
                  label="DOWNLOAD"
                  onClick={() => handleDownload(item.pdfUrl)}
                  customStyle={{
                    width: "100%",
                    fontWeight: "bold",
                    padding:"17px 25px",
                    backgroundColor: "var(--primary-color)",
                    borderColor: "var(--primary-color)",
                  }}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      
      <div className={classes.announcementSection}>
        <Container>
          <Row className="g-0">
            <Col md={6} lg={6}>
              <div className={mergeClass(classes.announcementLeft)}>
                <AnnouncementCard
                  data={ABOUT_US_PAGE_DATA?.announcement1}
                />
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className={mergeClass(classes.announcementRight)}>
                <AnnouncementCard
                  data={ABOUT_US_PAGE_DATA?.announcement2}
                  placeholder="Email address"
                  hasNewsletter={true}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
