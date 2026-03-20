"use client";
import HeroSection from "@/components/molecules/HeroSection";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./LoginPageView.module.css";
import { LogonPageData } from "@/developmentContent/mock-data";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import { loginSchema } from "@/formik/schema/Login";
import { useFormik } from "formik";
import { LOGIN_VALUES } from "@/formik/initial-values/initial-values";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import Cookies from "js-cookie";
import { handleEncrypt } from "@/resources/utils/encryption";
import { Post } from "@/interceptor/axiosInterceptor";
import { saveLoginUserData } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPageView() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState("");

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const handleLogin = async (values) => {
    setLoading("loggingIn");

    const response = await Post({ route: "auth/login", data: values });

    if (response && response?.response?.data?.status == "success") {
      const data = response?.response?.data?.data;

      const updatedData = {
        user: values?.username,
        token: data?.token,
      };

      dispatch(saveLoginUserData(updatedData));
      Cookies.set("_xpdx", handleEncrypt(String(data?.token)), { expires: 90 });
      Cookies.set("_xpdx_u", JSON.stringify(values), { expires: 90 });

      // Get redirect URL from query params, default to home page
      const redirectUrl = searchParams.get("redirect") || "/";
      window.location.href = redirectUrl;

      response?.response?.data?.status == "success" &&
        RenderToast({
          type: "success",
          message: isSpanish
            ? "Inicio de sesión exitoso."
            : "Login Successful.",
        });
    }

    setLoading("");
  };

  const loginFormik = useFormik({
    initialValues: LOGIN_VALUES,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      {" "}
      <div className={classes.heroSecColor}>
        <Container>
          <Row>
            <Col md={12} className="p-0 m-0">
              <HeroSection
                isColor={true}
                data={LogonPageData?.heroSection}
                mainDivClass={classes.mainDivClass}
                styles={{
                  colorText: classes.colorTextClass,
                  colorHeading: classes.colorHeadingClass,
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={classes.main}>
        <Container className="my-5">
          <div className={classes.modalMain}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginFormik.handleSubmit();
              }}
            >
              <Row className="gy-3">
                <Col md={12}>
                  <Input
                    inputClass={classes.input}
                    labelClass={classes.labelText}
                    labelStyle={{
                      fontSize: "15px",
                      fontWeight: 600,
                      paddingBottom: "0px",
                    }}
                    placeholder="Enter username"
                    label="Username"
                    type="text"
                    value={loginFormik.values.username}
                    setValue={(val) =>
                      loginFormik?.setFieldValue("username", val)
                    }
                    errorText={
                      loginFormik.touched.username &&
                      loginFormik.errors.username
                    }
                  />
                </Col>
                <Col md={12}>
                  <Input
                    inputClass={classes.input}
                    labelClass={classes.labelTextPassword}
                    labelStyle={{
                      fontSize: "15px",
                      fontWeight: 600,
                      paddingBottom: "0px",
                    }}
                    placeholder="********"
                    label="Password"
                    type="password"
                    value={loginFormik.values.password}
                    setValue={(val) =>
                      loginFormik?.setFieldValue("password", val)
                    }
                    errorText={
                      loginFormik.touched.password &&
                      loginFormik.errors.password
                    }
                  />
                </Col>

                <Col md={12}>
                  <div className={classes.btnContainer}>
                    <Button
                      className={classes.btnClass}
                      type={"submit"}
                      label={loading ? "Loading..." : "Enter"}
                      variant={"primary"}
                      disabled={loading}
                    />
                  </div>
                </Col>
                <Col md={12}>
                  <div className={classes.forgetText}>
                    <p className="fs-15 fw-700">
                      Not a Scalisi Customer?{"   "}
                      <span
                        className="fw-700 cursor-pointer"
                        onClick={() => {
                          router?.push("/register");
                        }}
                      >
                        Sign Up Here
                      </span>
                    </p>
                    <p
                      className="fs-15 fw-700 cursor-pointer"
                      onClick={() => {
                        router?.push("/forgot-password");
                      }}
                    >
                      <u>Forgot your password?</u>
                    </p>
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
}
