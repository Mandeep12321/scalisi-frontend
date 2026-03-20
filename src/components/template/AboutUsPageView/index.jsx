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

export default function AboutUsPageView({ cmsData }) {
  const _cmsData = cmsData;

  // if (loading === "loading") {
  //   return (
  //     <div className={classes.mainHeight}>
  //       <LoadingComponent />
  //     </div>
  //   );
  // }

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
                data={_cmsData?.hero}
                // data={data?.heroSection}
                hasImage={true}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="g-0">
          <Col md={12}>
            <CompanyHistorySection data={_cmsData?.companyHistory} />
          </Col>
        </Row>
      </Container>
      <div className={classes.heroSection}>
        <Container>
          <Row className="g-0">
            <Col md={12}>
              <LeedCertifiedFaculty data={_cmsData?.ourLeedCertifies} />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="g-0">
          <Col md={12}>
            <PhotoGallery data={_cmsData?.photoGallery?.arr} />
          </Col>

          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard
                styles={{
                  announcement: classes.announcementHead,
                }}
                data={_cmsData?.support}
              />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={_cmsData?.updates}
                placeholder="Email address"
                hasNewsletter={true}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
