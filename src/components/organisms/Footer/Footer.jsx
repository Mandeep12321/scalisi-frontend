"use client";

import { FOOTER_DATA, footerHead } from "@/developmentContent/app-data";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import classes from "./Footer.module.css";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import AccordionComponent from "@/components/atoms/AccordionComponent";
import { useSelector } from "react-redux";
import Link from "next/link";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [data, setData] = useState(FOOTER_DATA);
  const { isDrawerOpen, cmsData } = useSelector(
    (state) => state?.commonReducer
  );

  const { blogs } = useSelector((state) => state?.blogReducer);

  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const [is768, setIs768] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIs768, 768);
  });

  // Helper function to truncate title to 4 words
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return title;
  };

  // Get recent 2 blogs from Redux store
  const recentBlogs = useMemo(() => {
    if (blogs && blogs.length > 0) {
      return blogs.slice(0, 2).map((blog) => ({
        title: blog.title,
        date: blog.createdAt
          ? new Date(blog.createdAt)
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              .replace(/(\d+)/, (match) => {
                const day = parseInt(match);
                const suffix =
                  day === 1 || day === 21 || day === 31
                    ? "st"
                    : day === 2 || day === 22
                    ? "nd"
                    : day === 3 || day === 23
                    ? "rd"
                    : "th";
                return day + suffix;
              })
          : blog.date || "No date",
      }));
    }
    return [];
  }, [blogs]);

  const _cmsData = cmsData?.data?.socialLinks?.arr;

  console.log("cmsData878", _cmsData);

  // Update footer data with recent blogs
  const updatedFooterData = useMemo(() => {
    if (recentBlogs.length > 0) {
      return data.map((column) => {
        if (column.blogPosts) {
          return {
            ...column,
            blogPosts: recentBlogs,
          };
        }
        return column;
      });
    }
    return data;
  }, [data, recentBlogs]);

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

  // Use CMS data from Redux store, fallback to hardcoded data if not available
  const socialData = useMemo(() => {
    if (cmsData && _cmsData) {
      return _cmsData;
    }
    return [
      {
        icon: "/assets/images/svg/fb-icon.svg",
        url: "https://www.facebook.com",
      },
      {
        icon: "/assets/images/svg/instagram-icon.svg",
        url: "https://www.instagram.com",
      },
      {
        icon: "/assets/images/svg/twitter-icon.svg",
        url: "https://www.twitter.com",
      },
      {
        icon: "/assets/images/svg/linkedin-icon.svg",
        url: "https://www.linkedin.com",
      },
    ];
  }, [cmsData]);

  console.log("_cmsData8000", socialData);

  return (
    <>
      {is768 ? (
        <div
          className={classes.footerMobile}
          style={{
            transform: isDrawerOpen ? `translateX(-300px)` : `translateX(0)`,
            transition: "transform 0.5s ease",
          }}
        >
          <div className={classes.footerMain}>
            <Container>
              <Row className="g-0">
                {updatedFooterData?.map((column, index) => (
                  <Col
                    key={index}
                    // md={3}
                    // sm={6}
                    xs={12}
                    className={`${classes?.linksColContainer} ${
                      index == updatedFooterData.length - 1
                        ? classes.linksColLastContainer
                        : ""
                    }`}
                  >
                    <AccordionComponent
                      defaultKey="0"
                      heading={column?.heading}
                    >
                      {/* <h3 className="text-green fw-700 fs-22">
                      {column.heading}
                    </h3> */}
                      {column.links ? (
                        <ul className={classes.listItems}>
                          {column.links.map((link, idx) => (
                            <li key={idx}>
                              <Link
                                href={link.path}
                                className="text-decoration-none fs-16 fw-500"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className={classes.subDiv}>
                          {/* {column.blogPosts?.map((post, idx) => (
                            <div key={idx} className={classes.blogDiv}>
                              <span>
                                <p className="fs-16 fw-700 maxLine1 ">
                                  {truncateTitle(post.title)}
                                </p>
                                <p className="fs-16 fw-500">{post.date}</p>
                              </span>
                              <p className={classes.rm}>Read more</p>
                            </div>
                          ))} */}
                          {column.blogPosts?.map((post, idx) => (
                            <div key={idx} className={classes.blogDiv}>
                              <span>
                                <p className="fs-16 fw-700 maxLine1 ">
                                  {truncateTitle(post.title)}
                                </p>
                                <p className="fs-16 fw-500">{post.date}</p>
                              </span>
                              {/* <p
                            className={classes.rm}
                            onClick={() => router?.push(`/news-and-updates`)}
                          >
                            Read more
                          </p> */}
                            </div>
                          ))}
                        </div>
                      )}
                    </AccordionComponent>
                  </Col>
                ))}
                {/* s */}
                {/* <Col xs={12}>
                  <div className={classes.financeDiv}>
                    <div className={classes.cardsIcon}>
                      {updatedFooterData[
                        updatedFooterData.length - 1
                      ].cards.map((card, i) => (
                        <Image
                          key={i}
                          src={card}
                          alt="Payment Logo"
                          height={65}
                          width={200}
                        />
                      ))}
                    </div>
                    <p
                      className={mergeClass(
                        "fs-16 fw-500",
                        isSpanish && classes.spanishText
                      )}
                    >
                      Prices exclude sales tax
                    </p>
                  </div>
                </Col> */}

                <Col xs={12} sm={12} md={12}>
                  <div
                    className={mergeClass(
                      classes.footerBreadcrum,
                      classes.mobileFooterBreadcrum
                    )}
                  >
                    <span>
                      <p
                        className="fs-16 cursor-pointer"
                        onClick={() => router.push("/legal")}
                      >
                        Legal
                      </p>
                      <p className={mergeClass("fs-16 ", classes.bar)}>|</p>
                      <p
                        className="fs-16 cursor-pointer"
                        onClick={() => router.push("/privacy")}
                      >
                        Privacy
                      </p>
                    </span>
                    <div className={classes.socialIcon}>
                      {socialData?.map((social, i) => (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          <Image
                            src={mediaUrl(social.icon)}
                            alt="Social Logo"
                            height={34}
                            width={34}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className={classes.footerBottom}>
                    <p className="fs-15 fw-700">
                      © {new Date().getFullYear()} - Scalisi Produce | All
                      rights reserved
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ) : (
        <div
          className={classes.footerMain}
          style={{
            transform: isDrawerOpen ? `translateX(-300px)` : `translateX(0)`,
            transition: "transform 0.5s ease",
          }}
        >
          <Container>
            <Row className="g-0">
              {updatedFooterData?.map((column, index) => (
                <Col
                  key={index}
                  md={3}
                  sm={6}
                  xs={6}
                  className={`${classes?.linksColContainer} ${
                    index == updatedFooterData.length - 1
                      ? classes.linksColLastContainer
                      : ""
                  }`}
                >
                  <h3 className="text-green fw-700 fs-22">{column.heading}</h3>
                  {column.links ? (
                    <ul className={classes.listItems}>
                      {column.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            href={link.path}
                            className="text-decoration-none fs-16 fw-500"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className={classes.subDiv}>
                      {column.blogPosts?.map((post, idx) => (
                        <div key={idx} className={classes.blogDiv}>
                          <span>
                            <p className="fs-16 fw-700 maxLine1 ">
                              {truncateTitle(post.title)}
                            </p>
                            <p className="fs-16 fw-500">{post.date}</p>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Col>
              ))}
              {/* s */}
              {/* <Col xs={12} sm={6} md={12}>
                <div className={classes.financeDiv}>
                  <div className={classes.cardsIcon}>
                    {updatedFooterData[updatedFooterData.length - 1].cards.map(
                      (card, i) => (
                        <Image
                          key={i}
                          src={card}
                          alt="Payment Logo"
                          height={65}
                          width={200}
                        />
                      )
                    )}
                  </div>
                  <p className="fs-16 fw-500">Prices exclude sales tax</p>
                </div>
              </Col> */}

              <Col xs={12} sm={12} md={12}>
                <div className={classes.footerBreadcrum}>
                  <span>
                    <p
                      className="fs-16 cursor-pointer"
                      onClick={() => router.push("/legal")}
                    >
                      Legal
                    </p>
                    <p className={mergeClass("fs-16 ", classes.bar)}>|</p>
                    <p
                      className="fs-16 cursor-pointer"
                      onClick={() => router.push("/privacy")}
                    >
                      Privacy
                    </p>
                  </span>
                </div>
                <div className={classes.footerBottom}>
                  <p className="fs-15 fw-700">
                    © {new Date().getFullYear()} - Scalisi Produce | All rights
                    reserved
                  </p>
                  <div className={classes.socialIcon}>
                    {socialData?.map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        <Image
                          src={mediaUrl(social.icon)}
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
      )}
    </>
  );
}
