"use client";

import ToggleButton from "@/components/atoms/ToggleButton/ToggleButton";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import HeroSection from "@/components/molecules/HeroSection";
import { NOTIFICATION_DATA } from "@/developmentContent/mock-data";
import { mergeClass } from "@/resources/utils/helper";
import HTMLReactParser from "html-react-parser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./NotificationsView.module.css";

export default function NotificationsView() {
  const router = useRouter();

  const [data, setData] = useState(NOTIFICATION_DATA || []);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const getData = async ({ pg = page }) => {
    setLoading("fetchData");
    const params = {
      page: pg,
      limit: RECORDS_LIMIT,
    };
    const queryParams = new URLSearchParams(params)?.toString();
    const url = "";
    const { response } = await Get({
      route: `${url}?${queryParams}`,
    });
    if (response) {
      setData(response?.data?.data);
      setPage(pg);
      setTotalRecords(response?.data?.totalRecords);
    }
    setLoading("");
  };

  useEffect(() => {
    // getData({ pg: 1 });
  }, []);

  const handleToggle = (label) => {
    setData((prevData) => {
      const updatedNotifications =
        prevData.emailNotification.notificationsList.map((item) =>
          item.label === label ? { ...item, value: !item.value } : item
        );

      return {
        ...prevData,
        emailNotification: {
          ...prevData.emailNotification,
          notificationsList: updatedNotifications,
        },
      };
    });
  };

  return (
    <>
      <div className={classes.heroSecColor}>
        <Container>
          <Row>
            <Col md={12}>
              <HeroSection
                isColor={true}
                data={data?.heroSection}
                mainDivClass={classes.mainDivClass}
                styles={{
                  colorText: classes.colorTextClass,
                  colorHeading: classes.colorHeadingClass,
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="mt-1">
        <Row>
          <Col md={12} className={mergeClass("my-5", classes.ColRow)}>
            <div className={classes.mainNotifySec}>
              <div className={`${classes.emailHeader} fs-14`}>
                <h1 className="fs-25 fw-700">
                  {data?.emailNotification?.title}
                </h1>
                <p>
                  {data?.emailNotification?.description &&
                    HTMLReactParser(data?.emailNotification?.description)}
                </p>
              </div>

              <div className={classes.NotifyDiv}>
                <div className={classes.notifyList}>
                  {data?.emailNotification?.notificationsList?.map(
                    (notification, index) => (
                      <div className={classes.toggleBtn} key={index}>
                        <p
                          className={mergeClass(
                            "fs-18 fw-500",
                            classes.labelText
                          )}
                        >
                          {notification.label}
                        </p>
                        <ToggleButton
                          isActive={notification.value}
                          onClick={() => handleToggle(notification.label)}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className={`${classes.emailNotificationsSide}`}>
                  <h1 className={`fs-25 fw-700`}>
                    {data?.emailNotification?.essentialTitle}
                  </h1>
                  <p className={`fs-14 fw-400`}>
                    {data?.emailNotification?.essentialDesc}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="g-0">
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard data={data?.announcement1} />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={data?.announcement2}
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
