"use client";
import AboutUsHeroSection from "@/components/molecules/AboutUsHeroSection";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
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

            <Col md={6} lg={6}>
              <div className={mergeClass(classes.announcementLeft)}>
                <AnnouncementCard
                  styles={{
                    announcement: classes.announcementHead,
                  }}
                  data={_cmsData?.support || ABOUT_US_PAGE_DATA?.announcement1}
                />
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className={mergeClass(classes.announcementRight)}>
                <AnnouncementCard
                  data={_cmsData?.updates || ABOUT_US_PAGE_DATA?.announcement2}
                  placeholder="Email address"
                  hasNewsletter={true}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
}
