"use client";

import { Col, Row } from "react-bootstrap";
import SwiperWrapper from "@/components/organisms/SwiperWrapper/SwiperWrapper";
import FeatureCard from "@/components/molecules/FeatureCards";
import { useRouter } from "next/navigation";
import classes from "../LandingPageView.module.css";

export default function LandingHero({ cmsData }) {
  const router = useRouter();

  return (
    <>
      {/* HERO SECTION */}
      <Row>
        <Col md={12}>
          <div className={classes.mainHero}>
            <SwiperWrapper data={cmsData?.hero?.arr || []} />
          </div>
        </Col>
      </Row>

      {/* FEATURE CARDS */}
      <Row>
        <Col md={12}>
          <div className={`my-3 ${classes.afterHeroCard}`}>
            <Row>
              {cmsData?.homeCards?.arr?.map((item, index) => (
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
                      if (index === 0) router.push("/catalogs");
                      else if (index === 1) router.push("/order-guide");
                      else if (index === 2)
                        router.push("/news-and-updates");
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