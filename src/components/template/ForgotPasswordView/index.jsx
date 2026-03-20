"use client";

import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./ForgotPasswordView.module.css";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import { mergeClass } from "@/resources/utils/helper";
import { FORGOT_PAGE_CMS } from "@/developmentContent/mock-data";

export default function ForgotPasswordView() {
  const [status, setStatus] = useState("forgotPassword");
  const [loading, setLoading] = useState("emailSendFalse");

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading("emailSendLoading");

      setStatus("emailSent");
      setLoading("emailSendFalse");
    },
  });

  const renderForgotPassword = () => {
    if (status === "forgotPassword") {
      return (
        <Col md={12}>
          <div className={classes.emailContainer}>
            <h1 className="fs-31 fw-700">Forgot password?</h1>
            <p className="fs-21 fw-700">
              No worries, we'll send you reset instructions.
            </p>
            <form
              onSubmit={forgotPasswordFormik.handleSubmit}
              className={classes.resetEmail}
            >
              <Input
                label="Email Address"
                placeholder="info.jackscalisi@reallylongemailaddressdomain.co.uk"
                name="email"
                inputClass={classes.inputClass}
                labelClass={classes.labelClass}
                value={forgotPasswordFormik.values.email}
                setValue={(value) =>
                  forgotPasswordFormik.setFieldValue("email", value)
                }
                onBlur={forgotPasswordFormik.handleBlur}
                errorText={
                  forgotPasswordFormik.touched.email &&
                  forgotPasswordFormik.errors.email
                }
              />
              <Button
                label={
                  loading === "emailSendLoading"
                    ? "Please Wait..."
                    : "Reset password"
                }
                className={`${classes.buttonClasses} fw-700 fs-18`}
                type="submit"
              />
            </form>
          </div>
        </Col>
      );
    } else {
      return (
        <Col md={12}>
          <div className={classes.checkEmailContainer}>
            <h1 className="fs-35 fw-700">Check your email!</h1>
            <p className={`${classes.emailLink} fs-21 fw-600`}>
              We sent a password reset link to
              info.jackscalisi@reallylongemailaddressdomain.co.uk
            </p>
            <p className={`${classes.resendLink} fs-19 fw-600`}>
              Didn't receive the email?{" "}
              <span className="fw-700">Click to resend</span>
            </p>
          </div>
        </Col>
      );
    }
  };

  return (
    <>
      <div
        className={`${classes.main} ${
          status === "emailSent" && classes.emailSentMargin
        }`}
      >
        <Container>
          <Row>{renderForgotPassword()}</Row>
        </Container>
      </div>
      <Container className={classes.containerClass}>
        <Row className="g-0">
          <Col sm={6} md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard data={FORGOT_PAGE_CMS?.announcement1} />
            </div>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={FORGOT_PAGE_CMS?.announcement2}
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
