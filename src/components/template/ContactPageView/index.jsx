"use client";

import AboutUsHeroSection from "@/components/molecules/AboutUsHeroSection";
import ContactForm from "@/components/molecules/contactForm/ContactForm";
import ContactFormMap from "@/components/molecules/contactFormMap/ContactFormMap";
import Table from "@/components/organisms/Table";
import { CONTACT_PAGE_DATA } from "@/developmentContent/mock-data";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./ContactPageView.module.css";
import RepresentativeCard from "@/components/atoms/RepresentativeCard/RepresentativeCard";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";

export default function ContactPageView({ cmsData }) {
  const router = useRouter();
  const _cmsData = cmsData;
  console.log("cmsData22", cmsData);
  const [data, setData] = useState(CONTACT_PAGE_DATA || []);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [email, setEmail] = useState("");
  const [is375, setIs375] = useState(false);

  useEffect(() => {
    isMobileViewHook(setIs375, 376);
  }, []);

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

  const tableHeader = [
    {
      id: "title",
      style: { width: "25%" },
      bodyStyle: {
        fontWeight: 700,
        fontSize: "21px",
        color: "var(--black-color)",
      },
    },

    {
      id: "designation",
      style: { width: "25%" },
      bodyStyle: {
        fontWeight: 700,
        fontSize: "21px",
        color: "var(--red-color)",
      },
    },

    {
      id: "expNum",
      style: { width: "20%" },
      bodyStyle: {
        fontWeight: 700,
        fontSize: "21px",
        color: "var(--black-color)",
      },
    },
    {
      id: "email",
      style: { width: "24%" },
      bodyStyle: {
        fontWeight: 700,
        fontSize: "21px",
        color: "var(--primary-color)",
      },
    },
  ];

  const tableBody = _cmsData?.contactSectionImage?.arr?.map((e) => ({
    title: e?.title,
    designation: e?.designation,
    expNum: e?.expNum,
    email: e?.email,
  }));

  return (
    <>
      <style>
        {`
      .Table_tableHeader__VKfPJ{
        padding: 0px !important;
        border-bottom: 0px !important;
      }
      `}
      </style>
      <div className={classes.mainDiv}>
        <div className={classes.heroSection}>
          <Container>
            <Row>
              <Col md={12}>
                <AboutUsHeroSection
                  styles={{
                    mainDivContact: classes.mainDivContact,
                    contactLeftCol: classes.contactLeftCol,
                  }}
                  data={_cmsData?.hero}
                  hasImage={false}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div className={classes.ContactFormSection}>
          <Container>
            <Row>
              <Col md={12}>
                <div className={classes.formAndLocationSec}>
                  <Row className={mergeClass(classes.contactDiv)}>
                    <Col sm={12} md={12} lg={6} xl={6} className="my-2">
                      <ContactForm data={data} />
                    </Col>
                    <Col sm={12} md={12} lg={6} xl={6} className="my-2">
                      <div className={classes.contactMapCol}>
                        <div className={classes.mapComp}>
                          <ContactFormMap />
                        </div>
                        <div className={classes.articleImg}>
                          {is375 ? (
                            <Image
                              src={mediaUrl(
                                _cmsData?.contactSectionImage?.image375
                              )}
                              className={classes.cardImage}
                              fill
                            />
                          ) : (
                            <Image
                              src={mediaUrl(
                                _cmsData?.contactSectionImage?.image
                              )}
                              className={classes.cardImage}
                              fill
                            />
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={12}>
                <h3
                  className={mergeClass("fs-39 fw-700", classes.tableHeading)}
                >
                  Representatives
                </h3>
                <div className={classes.tableDiv}>
                  <Table
                    tableBodyClass={mergeClass(
                      "fs-21 fw-600",
                      classes.tableBodyClass
                    )}
                    headings={tableHeader}
                    tableData={tableBody}
                    loading={loading}
                    tableHeaderDiv={classes.tablePadding}
                  />
                </div>
                <div className={classes.representative}>
                  <Row className={classes?.representativeRow}>
                    {tableBody?.length > 0 &&
                      tableBody?.map((item) => {
                        return (
                          <Col md="6" lg="4">
                            <RepresentativeCard item={item} key={item?._id} />
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
