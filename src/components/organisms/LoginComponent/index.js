import { LOGIN_VALUES } from "@/formik/initial-values/initial-values";
import { loginSchema } from "@/formik/schema/Login";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import classes from "./LoginPopover.module.css";
import { Col, Row } from "react-bootstrap";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button";

export default function LoginComponent({
  handleLogin,
  loading,
  setShow,
  show,
}) {
  const router = useRouter();

  const loginFormik = useFormik({
    initialValues: LOGIN_VALUES,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  return (
    <div className={classes.modalMain}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginFormik.handleSubmit();
        }}
      >
        <Row className="gy-4">
          <Col md={12}>
            <div className={classes.headClass}>
              <p>Log In</p>
            </div>
          </Col>

          <Col md={12}>
            <Input
              labelStyle={{
                fontSize: "15px",
                fontWeight: 600,
                paddingBottom: "10px",
              }}
              placeholder="Enter username"
              label="Username"
              type="text"
              value={loginFormik.values.username}
              setValue={(val) => loginFormik?.setFieldValue("username", val)}
              errorText={
                loginFormik.touched.username && loginFormik.errors.username
              }
            />
          </Col>
          <Col md={12}>
            <Input
              labelStyle={{
                fontSize: "15px",
                fontWeight: 600,
                paddingBottom: "10px",
              }}
              placeholder="Enter password"
              label="Password"
              type="password"
              value={loginFormik.values.password}
              setValue={(val) => loginFormik?.setFieldValue("password", val)}
              errorText={
                loginFormik.touched.password && loginFormik.errors.password
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
              <p className="fs-15 fw-600">
                Not a Scalisi Customer?{"   "}
                <span
                  className="fw-700 cursor-pointer"
                  onClick={() => {
                    setShow(!show);
                    router?.push("/register");
                  }}
                >
                  Sign Up Here
                </span>
              </p>
              <p
                className="fs-15 fw-700 cursor-pointer"
                onClick={() => {
                  setShow(!show);
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
  );
}
