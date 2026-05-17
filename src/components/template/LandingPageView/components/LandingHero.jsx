"use client";

import { Col, Row } from "react-bootstrap";
import SwiperWrapper from "@/components/organisms/SwiperWrapper/SwiperWrapper";
import FeatureCard from "@/components/molecules/FeatureCards";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { handleDecrypt } from "@/resources/utils/helper";
import Cookies from "js-cookie";
import classes from "../LandingPageView.module.css";

import { HOME_PAGE_DATA } from "@/developmentContent/mock-data";

export default function LandingHero({ cmsData }) {
  const router = useRouter();
  const { isLogin: reduxIsLogin } = useSelector((state) => state.authReducer);
  const accessToken = handleDecrypt(Cookies?.get("_xpdx"));
  const isLogin = reduxIsLogin && !!accessToken;

  return (
    <>
      {/* HERO SECTION */}
      <Row>
        <Col md={12}>
          <div className={classes.mainHero}>
            <SwiperWrapper data={cmsData?.hero?.arr || HOME_PAGE_DATA?.heroSection || []} />
          </div>
        </Col>
      </Row>

      {/* FEATURE CARDS */}
      <Row>
        <Col md={12}>
          <div className={`my-3 ${classes.afterHeroCard}`}>
            <Row>
              {(cmsData?.homeCards?.arr || HOME_PAGE_DATA?.featureSection)?.map((item, index) => (
                <Col
                  md={4}
                  sm={12}
                  key={index}
                  className={classes.featureCardContainer}
                >
                  <FeatureCard
                    cardHome={classes.FeatureCardHome}
                    data={item}
                    onclick={() => {
                      if (index === 0) router.push("chefs-planner");
                      else if (index === 1) {
                        if (isLogin) {
                          router.push("/?tab=orderGuide");
                        } else {
                          router.push("/order-guide");
                        }
                      }
                      else if (index === 2)
                        router.push("/products");
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}