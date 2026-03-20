import Button from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import { initialFormValues } from "@/data/initial-values";
import ChangePassSchema from "@/schema/ChangePassSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./PasswordSettingModal.module.css";

const PasswordSettingModal = ({ show, setShow, headerText, showCloseIcon }) => {
  const router = useRouter();

  const [loading, setLoading] = useState("");

  const formikChangePass = useFormik({
    initialValues: initialFormValues,
    validationSchema: ChangePassSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
    const payload = {
      currentPassword: values?.currentPassword,
      password: values?.password,
      confirmPassword: values?.confirmPassword,
    };
    // const { response } = await Patch({
    //   route: "auth/update/password",
    //   data: payload,
    // });
    // if (response) {
    //   RenderToast({
    //     type: "success",
    //     message: "Password Updated Successfully...",
    //   });
    //   router.push("/profile-setting");
    // }

    setLoading("");
  };

  return (
    <>
      <ModalSkeleton
        headerClass={classes.headClass}
        borderRadius="20px"
        header={headerText || "Password Setting"}
        setShow={setShow}
        show={show}
        width={"640px"}
        showCloseIcon={showCloseIcon}
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formikChangePass?.handleSubmit();
            }}
          >
            <Row className="gy-4">
              <Col md={12}>
                <Input
                  placeholder={"********"}
                  label={"Current Password"}
                  type="password"
                  value={formikChangePass?.values?.currentPassword}
                  setValue={formikChangePass?.handleChange("currentPassword")}
                  errorText={
                    formikChangePass?.touched?.formikChangePass &&
                    formikChangePass?.errors?.currentPassword
                  }
                />
              </Col>
              <Col md={12}>
                <Input
                  placeholder={"********"}
                  label={"New Password"}
                  type="password"
                  value={formikChangePass?.values?.password}
                  setValue={formikChangePass?.handleChange("password")}
                  errorText={
                    formikChangePass?.touched?.password &&
                    formikChangePass?.errors?.password
                  }
                />
              </Col>
              <Col md={12}>
                <Input
                  placeholder={"********"}
                  label={"Confirm Password"}
                  type="password"
                  value={formikChangePass?.values?.confirmPassword}
                  setValue={formikChangePass?.handleChange("confirmPassword")}
                  errorText={
                    formikChangePass?.touched?.confirmPassword &&
                    formikChangePass?.errors?.confirmPassword
                  }
                />
              </Col>
              <Col md={12} className={classes.btnContainer}>
                <Button
                  className={classes.btnClass}
                  type={"submit"}
                  label={loading ? "Updating Password..." : "Update Password"}
                  variant={"primary"}
                />
              </Col>
            </Row>
          </form>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default PasswordSettingModal;
