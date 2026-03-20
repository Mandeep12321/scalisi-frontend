"use client";
import { Button } from "@/components/atoms/Button";
import LoadingComponent from "@/components/atoms/LoadingComponent";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import BlogCard from "@/components/molecules/BlogCard";
import HeroSection from "@/components/molecules/HeroSection";
import { BLOGS_DETAIL_DATA } from "@/developmentContent/mock-data";
import { Get } from "@/interceptor/axiosInterceptor";
import { mergeClass } from "@/resources/utils/helper";
import HTMLReactParser from "html-react-parser";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaLinkedin, FaSquareFacebook } from "react-icons/fa6";
import classes from "./BlogsDetailView.module.css";

export default function BlogsDetailView({ cmsUpdateData, cmsSupportData }) {
  const router = useRouter();
  const support = cmsSupportData;
  const updates = cmsUpdateData;
  const [data, setData] = useState(BLOGS_DETAIL_DATA);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const { slug } = useParams();
  const getData = async () => {
    setLoading("loading");

    const url = "blog";
    const { response } = await Get({
      route: `${url}/${slug}`,
    });
    if (response) {
      setData(response?.data?.data);
    }
    setLoading("");
  };

  useEffect(() => {
    getData();
  }, []);

  const shareToFacebook = () => {
    if (typeof window === 'undefined') return;
    const currentUrl = encodeURIComponent(window.location.href);
    // const currentUrl = encodeURIComponent("https://scalisi-web-alpha.vercel.app/news-and-updates/blog-16857-11");
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    window.open(fbUrl, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const shareToLinkedIn = () => {
    if (typeof window === 'undefined') return;
    const currentUrl = encodeURIComponent(window.location.href);
    // const currentUrl = encodeURIComponent("https://scalisi-web-alpha.vercel.app/news-and-updates/blog-16857-11");
    const title = encodeURIComponent(data?.blog?.title || "");
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
    window.open(linkedinUrl, "_blank", "width=600,height=600,noopener,noreferrer");
  };

  if (loading === "loading") {
    return (
      <div className={classes.mainHeight}>
        <LoadingComponent />
      </div>
    );
  }




  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12} className="p-0">
            <HeroSection
              hasDate={true}
              isColor={false}
              isTextLeft={true}
              hasBtn={true}
              data={data?.blog}
              hasDescription={false}
              is31={true}
              onClick={() => router?.push(`/news-and-updates`)}
              imgSrc={"/assets/images/dummy-images/blogDetail.png"}
              mainDivClass={classes.mainDivClass}
              imageDivText={classes.imageDivText}
              backBtnMain={classes.backBtnMain}
              svgClass={classes.svgClass}
            />
          </Col>
        </Row>
      </Container>
      <Container className="mt-0">
        <Row className="pt-0">
          <Col md={12} className="my-0">
            <div className={`mb-3 ${classes.blogsDetailsDiv}`}>
              {data?.blog?.description &&
                HTMLReactParser(data?.blog?.description || "")}
              <div className={mergeClass(" my-4 ", classes.detailBoxBottom)}>
                <Button
                  onClick={() => router?.push(`/news-and-updates`)}
                  variant="primaryBorder"
                  label={"Back to News"}
                  className={"fs-15 fw-600"}
                />
                <div className={classes.SocialIcons}>
                  <p className="fs-26 fw-700"> Share </p>
                  <div className={classes.iconsMain}>
                    <span
                      className="cursor-pointer"
                      onClick={shareToLinkedIn}
                    >
                      <FaLinkedin color={"var(--white-color)"} size={20} />
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={shareToFacebook}
                    >
                      <FaSquareFacebook
                        color={"var(--white-color)"}
                        size={20}
                      />
                    </span>
                    {/* TODO: Uncomment these when the whatsapp and email are added */}
                    {/* <span>
                      <IoLogoWhatsapp color={"var(--white-color)"} size={20} />
                    </span>
                    <span>
                      <FaEnvelope color={"var(--white-color)"} size={20} />
                    </span>
                    <span>
                      <FaPrint color={"var(--white-color)"} size={20} />
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className={`my-3 ${classes.blogCardWrapper}`}>
              <Row>
                <Col md={12} className="my-2 my-lg-5">
                  <h3 className="fs-45 fw-700"> Related Articles </h3>
                </Col>
                <Col md={12}>
                  <Row className=" gx-5 gx-lg-5 gx-md-3 gy-0">
                    {data?.relatedBlogs?.map((data, index) => (
                      <Col
                        sm={6}
                        md={4}
                        className={mergeClass("mt-1 ", classes.blogCard)}
                        key={index}
                      >
                        <BlogCard
                          onClick={() =>
                            router?.push(`/news-and-updates/${data?.slug}`)
                          }
                          data={data}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row className="g-0">
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard data={support?.value?.data} />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={updates?.value?.data}
                placeholder="Email address"
                hasNewsletter={true}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
