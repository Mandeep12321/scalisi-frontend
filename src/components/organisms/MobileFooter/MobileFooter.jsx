"use client";

import { FOOTER_DATA } from "@/developmentContent/app-data";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { mergeClass, handleDecrypt } from "@/resources/utils/helper";
import classes from "./MobileFooter.module.css";
import Cookies from "js-cookie";

export default function MobileFooter() {
  const [data, setData] = useState(FOOTER_DATA);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const accessToken = mounted ? handleDecrypt(Cookies?.get("_xpdx")) : null;

  // Function to get social media URL based on icon path
  const getSocialMediaUrl = (iconPath, fallbackUrl = "#") => {
    const path = (iconPath || "").toLowerCase();
    const fallback = (fallbackUrl || "").toLowerCase();
    if (path.includes("fb-icon") || path.includes("facebook") || path.includes("fb") || fallback.includes("facebook.com")) {
      return "https://www.facebook.com/people/Jack-Scalisi-Wholesale-Fruit-Produce/100067056498461/#";
    }
    if (path.includes("instagram") || fallback.includes("instagram.com")) {
      return "https://www.instagram.com/scalisiproduce/";
    }
    if (path.includes("twitter") || path.includes("x.com") || fallback.includes("twitter.com") || fallback.includes("x.com")) {
      return "https://x.com/scalisiproduce";
    }
    if (path.includes("linkedin") || fallback.includes("linkedin.com")) {
      return "https://www.linkedin.com/in/jack-scalisi-a8101672";
    }
    return fallbackUrl;
  };

  return (
    <div className={classes.footerMain}>
      <Container>
        <Row className="g-0">
          {data?.map((column, index) => (
            <Col
              key={index}
              md={3}
              sm={6}
              xs={6}
              className={`${classes?.linksColContainer} ${
                index == data.length - 1 ? classes.linksColLastContainer : ""
              }`}
            >
              <h3 className="text-green fw-700 fs-22">{column.heading}</h3>
               {column.links ? (
                <ul className={classes.listItems}>
                  {column.links
                    .filter((link) => accessToken || link.label !== "Order Guide")
                    .map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.path}
                          className="text-decoration-none fs-16 fw-500"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                </ul>
              ) : (
                <div className={classes.subDiv}>
                  {column.blogPosts?.map((post, idx) => (
                    <div key={idx} className={classes.blogDiv}>
                      <span>
                        <p className="fs-16 fw-700 maxLine1 ">{post.title}</p>
                        <p className="fs-16 fw-500">{post.date}</p>
                      </span>
                      <p className={classes.rm}>Read more</p>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          ))}
          {/* s */}
          <Col xs={12} sm={6} md={12}>
            <div className={classes.financeDiv}>
              <div className={classes.cardsIcon}>
                {data[data.length - 1].cards.map((card, i) => (
                  <Image
                    key={i}
                    src={card}
                    alt="Payment Logo"
                    height={65}
                    width={200}
                  />
                ))}
              </div>
              <p className="fs-16 fw-500">Prices exclude sales tax</p>
            </div>
          </Col>

          <Col xs={12} sm={12} md={12}>
            <div className={classes.footerBreadcrum}>
              {/* <span>
                <p className="fs-16 ">Legal</p>
                <p className={mergeClass("fs-16 ", classes.bar)}>|</p>
                <p className="fs-16 ">Privacy</p>
              </span> */}
            </div>
            <div className={classes.footerBottom}>
              <p className="fs-15 fw-700">
                © {new Date().getFullYear()} - Scalisi Produce | All rights
                reserved
              </p>
              <div className={classes.socialIcon}>
                {data[data.length - 1].socials.map((social, i) => (
                  <a
                    key={i}
                    href={getSocialMediaUrl(social)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <Image
                      src={social}
                      alt="Social Logo"
                      height={34}
                      width={34}
                    />
                  </a>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
