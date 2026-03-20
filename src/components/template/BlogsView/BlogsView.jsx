"use client";

import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";

import LoadingComponent from "@/components/atoms/LoadingComponent";
import { ArticlesCardMain } from "@/components/molecules/ArticlesCardMain";
import BlogCard from "@/components/molecules/BlogCard";
import HeroSection from "@/components/molecules/HeroSection";
import PaginationComponent from "@/components/molecules/PaginationComponent";
import { RECORDS_LIMIT } from "@/developmentContent/constants";
import { Get } from "@/interceptor/axiosInterceptor";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { mergeClass } from "@/resources/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// Removed blog dispatch dependency - footer blogs are now managed independently
import classes from "./BlogsView.module.css";

export default function BlogsView({ cmsData }) {
  const _cmsData = cmsData;
  const router = useRouter();
  // BLOGS_DATA
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const getData = async (pg = page) => {
    setLoading("loading");
    const params = {
      page: pg,
      limit: RECORDS_LIMIT,
    };
    const queryParams = new URLSearchParams(params)?.toString();
    const url = "blog";
    const { response } = await Get({
      route: `${url}?${queryParams}`,
    });
    if (response) {
      setData(response?.data?.data);
      setTotalRecords(response?.data?.totalRecords);
      setPage(pg);
      // Footer blogs are now managed independently via Redux thunk
    }
    setLoading("");
  };

  useEffect(() => {
    isMobileViewHook(setIsMobile, 992);
    getData(page);
  }, [page]);

  if (loading === "loading") {
    return (
      <div className={classes.mainHeight}>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <div className={classes.heroSecColor}>
        <Container>
          <Row>
            <Col md={12} className="p-0">
              <HeroSection
                colorDiv={classes.mainDiv}
                isColor={true}
                data={_cmsData?.hero}
                mainDivClass={classes.mainDivClass}
                styles={{
                  colorText: classes.colorTextClass,
                  colorHeading: classes.colorHeadingClass,
                }}
                onClick={() => router.push("/news-and-updates")}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container className={isMobile ? "mt-4" : "mt-5"}>
        <Row>
          <Col md={12} className={classes.blogsCard}>
            <div className={mergeClass(classes.blogsCard, "p-0")}>
              <ArticlesCardMain
                data={data?.slice(0, 1)[0]}
                onClick={() =>
                  router?.push(
                    `/news-and-updates/${data?.slice(0, 1)[0]?.slug}`
                  )
                }
              />
            </div>
          </Col>
          <Col md={12} className="mb-5">
            <div className={`my-3 ${classes.blogCardWrapper}`}>
              <Row className="gx-md-5 gx-3">
                {data?.slice(1).map((data, index) => (
                  <Col sm={6} md={6} lg={4} className="mt-md-5  mt-3">
                    <BlogCard
                      data={data}
                      onClick={() =>
                        router?.push(`/news-and-updates/${data?.slug}`)
                      }
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          {totalRecords > RECORDS_LIMIT && (
            <Col md={12} className={isMobile ? "mb-0 mt-0" : "mb-4 mt-2"}>
              <PaginationComponent
                totalRecords={totalRecords}
                currentPage={page}
                setCurrentPage={(p) => {
                  if (p === page) return;
                  setPage(p);
                }}
              />
            </Col>
          )}
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
    </div>
  );
}
