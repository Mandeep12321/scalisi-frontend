"use client";
import AboutUsHeroSection from "@/components/molecules/AboutUsHeroSection";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import { CONTACT_PAGE_DATA } from "@/developmentContent/mock-data";
import CompanyHistorySection from "@/components/molecules/CompanyHistorySection";
import LeedCertifiedFaculty from "@/components/molecules/LeedCertifiedFaculty";
import PhotoGallery from "@/components/organisms/PhotoGallery";
import { mergeClass } from "@/resources/utils/helper";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./AboutUsPageView.module.css";
import LoadingComponent from "@/components/atoms/LoadingComponent";

import { ABOUT_US_PAGE_DATA } from "@/developmentContent/mock-data";

export default function AboutUsPageView({ cmsData }) {
  const _cmsData = cmsData;

  return (
    <main className={classes.mainDiv}>
      <div className={classes.heroSection}>
        <Container>
          <Row className="g-0">
            <Col md={12}>
              <AboutUsHeroSection
                styles={{
                  aboutTitle: classes.aboutTitle,
                  aboutSubTitle: classes.aboutSubTitle,
                  aboutDescription: classes.aboutDescription,
                }}
                data={_cmsData?.hero || ABOUT_US_PAGE_DATA?.heroSection}
                hasImage={true}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className={classes.historySection}>
        <Container>
          <Row className="g-0">
            <Col md={12}>
              <CompanyHistorySection
                data={_cmsData?.companyHistory || ABOUT_US_PAGE_DATA?.companyHistory}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className={classes.leedSection}>
        <Container>
          <Row className="g-0">
            <Col md={12}>
              <LeedCertifiedFaculty
                data={_cmsData?.ourLeedCertifies || ABOUT_US_PAGE_DATA?.ourLeedCertifies}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div className={classes.announcementSection}>
        <Container>
          <Row className="g-0">
            <Col md={12}>
              <PhotoGallery
                data={
                  _cmsData?.photoGallery?.arr || _cmsData?.photoGallery || ABOUT_US_PAGE_DATA?.photoGallery
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
}
