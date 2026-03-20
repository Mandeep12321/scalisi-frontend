"use client";

import { FOOTER_DATA } from "@/developmentContent/app-data";
import Image from "next/image";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { mergeClass } from "@/resources/utils/helper";
import classes from "./MobileFooter.module.css";

export default function MobileFooter() {
  const [data, setData] = useState(FOOTER_DATA);

  // Function to get social media URL based on icon path
  const getSocialMediaUrl = (iconPath) => {
    const socialMapping = {
      "/assets/images/svg/fb-icon.svg": "https://www.facebook.com",
      "/assets/images/svg/instagram-icon.svg": "https://www.instagram.com",
      "/assets/images/svg/twitter-icon.svg": "https://www.twitter.com",
      "/assets/images/svg/linkedin-icon.svg": "https://www.linkedin.com",
    };
    return socialMapping[iconPath] || "#";
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
                  {column.links.map((link, idx) => (
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
              <span>
                <p className="fs-16 ">Legal</p>
                <p className={mergeClass("fs-16 ", classes.bar)}>|</p>
                <p className="fs-16 ">Privacy</p>
              </span>
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
