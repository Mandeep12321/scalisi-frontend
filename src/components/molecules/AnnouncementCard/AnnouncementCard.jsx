"use client";
import React, { useEffect, useState } from "react";
import classes from "./AnnouncementCard.module.css";
import Image from "next/image";

import HTMLReactParser from "html-react-parser";
import { mediaUrl, mergeClass } from "@/resources/utils/helper";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { Post } from "@/interceptor/axiosInterceptor";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { NEWSLETTER_VALUES } from "@/formik/initial-values/initial-values";
import { newsletterValidationSchema } from "@/formik/schema/newsletter";

export const AnnouncementCard = ({
  data,
  hasNewsletter = false,

  label,
  placeholder,
  styles,
  customClass,
}) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState();
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const formik = useFormik({
    initialValues: NEWSLETTER_VALUES,
    validationSchema: newsletterValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
    const body = {
      email: values.email,
    };
    const url = "newsletter";
    const { response } = await Post({
      route: `${url}`,
      data: body,
    });
    if (response) {
      RenderToast({
        message: isSpanish ? "Suscripción exitosa" : "Subscribed Successfully",
        type: "success",
      });
      formik.resetForm();
    }
    setLoading("");
  };

  useEffect(() => {
    isMobileViewHook(setIsMobile, 576);
  }, [window.innerWidth]);

  return (
    <div className={mergeClass(classes.cardContainer, customClass)}>
      <div
        className={
          hasNewsletter && isMobile
            ? classes.updatesImage
            : classes.imageContainer
        }
      >
        <Image
          src={mediaUrl(data?.image) || data?.image}
          alt={data?.title}
          fill
        />
      </div>
      <div
        className={mergeClass(
          hasNewsletter && isMobile
            ? classes.newLetterSection
            : classes.contentContainer
        )}
      >
        <span className={`${classes.title}`}>
          {data?.htmlDescription && HTMLReactParser(data?.htmlDescription)}
        </span>
        {hasNewsletter ? (
          <>
            <span>
              <div className={classes.subscribeContainer}>
                <Input
                  inputContainer={classes.inputContainer}
                  value={formik.values.email}
                  setValue={(value) => formik.setFieldValue("email", value)}
                  placeholder={placeholder}
                  className={`fs-13 fw-600 ${classes.input} `}
                />

                <Button
                  className={mergeClass("fs-14", classes.subscribeBtn)}
                  label={loading === "loading" ? "Please Wait..." : "Subscribe"}
                  disabled={loading === "loading"}
                  variant="primary"
                  onClick={formik.handleSubmit}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className={classes.errorText}>{formik.errors.email}</p>
              )}
            </span>
          </>
        ) : (
          <div
            className={mergeClass(
              classes.support,
              isSpanish && classes.supportSpanish
            )}
          >
            <Button
              className={mergeClass("fs-14", classes.supportBtn)}
              variant="primary"
              label="Contact Our Support Team"
              onClick={() => router.push("/contact-us")}
            />
          </div>
        )}
      </div>
    </div>
  );
};
