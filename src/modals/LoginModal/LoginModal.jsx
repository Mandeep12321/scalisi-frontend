import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import { LOGIN_VALUES } from "@/formik/initial-values/initial-values";
import { loginSchema } from "@/formik/schema/Login";
import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./LoginModal.module.css";
import { useRouter } from "next/navigation";

const LoginModal = ({
  show,
  setShow,
  headerText,
  showCloseIcon,
  loading,
  handleLogin,
}) => {
  const router = useRouter();

  const loginFormik = useFormik({
    initialValues: LOGIN_VALUES,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <ModalSkeleton
        headerClass={classes.headClass}
        borderRadius="20px"
        header={headerText || "Log In"}
        setShow={setShow}
        show={show}
        size={100}
        width={"417px"}
        showCloseIcon={showCloseIcon}
      >
        <div className={classes.modalMain}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginFormik.handleSubmit();
            }}
          >
            <Row className="gy-4">
              <Col md={12}>
                <Input
                  labelStyle={{
                    fontSize: "15px",
                    fontWeight: 600,
                    paddingBottom: "10px",
                  }}
                  placeholder="info@gmail.com"
                  label="Email Address"
                  type="email"
                  value={loginFormik.values.email}
                  setValue={(val) => loginFormik?.setFieldValue("email", val)}
                  errorText={
                    loginFormik.touched.email && loginFormik.errors.email
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
                  placeholder="********"
                  label="Password"
                  type="password"
                  value={loginFormik.values.password}
                  setValue={(val) =>
                    loginFormik?.setFieldValue("password", val)
                  }
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
                    label={loading ? "Loading..." : "Login"}
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
      </ModalSkeleton>
    </>
  );
};

export default LoginModal;
