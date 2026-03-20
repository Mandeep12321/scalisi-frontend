"use client";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import HeroSection from "@/components/molecules/HeroSection";
import TitleCard from "@/components/molecules/TitleCard";
import { CATALOG_DATA } from "@/developmentContent/mock-data";
import { mergeClass } from "@/resources/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./CatalogView.module.css";

export default function CatalogView({ cmsData }) {
  const router = useRouter();
  const _cmsData = cmsData;
  const [data, setData] = useState(CATALOG_DATA);
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

  return (
    <Container>
      <Row>
        <Col md={12}>
          <HeroSection
            colorHeading={classes.heroSectionHeading}
            mainDivClass={classes.mainClass}
            descriptionClass={classes.descriptionClass}
            data={_cmsData?.hero}
          />
        </Col>
        <Col md={12}>
          <div className={` ${classes.afterHeroCard}`}>
            <div className={classes?.afterHeroSecRow}>
              {data?.catalogCards?.map((data, index) => (
                <TitleCard
                  onclick={() => router?.push("/products")}
                  catalogTitle={classes.catalogTitleClass}
                  key={index}
                  data={data}
                  catalogMainDiv={classes.catalogDiv}
                  catalogContent={classes.catalogContentClass}
                />
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="g-0">
        <Col md={6} lg={6}>
          <div className={mergeClass(classes.announcementLeft)}>
            <AnnouncementCard data={_cmsData?.support} />
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
  );
}
