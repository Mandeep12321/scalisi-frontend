"use client";
import React, { useState } from "react";
import classes from "./NotificationsComp.module.css";
import { Col, Container, Row } from "react-bootstrap";
// import RadioButton from "@/components/RadioButton/RadioButton";

export default function NotificationsComp({ data }) {
  // const handleToggle = (label) => {
  //   setData((prevData) => {
  //     const updatedNotifications = prevData.notifications.map((item) =>
  //       label === item.label ? { ...item, value: !item.value } : item
  //     );
  //     return { ...prevData, notifications: updatedNotifications };
  //   });
  // };

  return (
    <div className={classes.mainNotifySec}>
      <div className={`${classes.emailHeader} fs-14`}>
        <h1 className="fs-25 fw-700">{data?.title}</h1>
        <p>
          {data?.description}
          {/* <strong className="fs-700"> info.jackscalisi@gmail.com</strong>
              from your profile information for notifications. */}
        </p>
      </div>

      <div className={classes.NotifyDiv}>
        <div className={classes.notifyList}>
          {data?.notificationsList?.map((notification, index) => (
            <div className={classes.radioBtn} key={index}>
              <p className={"fs-18 fw-400"}>{notification.label}</p>
              {/* <RadioButton
                isActive={notification.value}
                onClick={() => handleToggle(notification.label)}
              /> */}
            </div>
          ))}
        </div>

        <div className={`${classes.emailNotificationsSide}`}>
          <h1 className={`fs-25 fw-700`}>{data?.essentialTitle}</h1>
          <p className={`fs-14 fw-500`}>{data?.essentialDesc}</p>
        </div>
      </div>
    </div>
  );
}
