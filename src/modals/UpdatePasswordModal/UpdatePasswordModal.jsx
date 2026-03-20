"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import { UPDATE_PASSWORD_VALUES } from "@/formik/initial-values/initial-values";
import { updatePasswordSchema } from "@/formik/schema/Login";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./UpdatePasswordModal.module.css";

const UpdatePasswordModal = ({
  show,
  setShow,
  headerText,
  showCloseIcon,
  loading,
  setLoading,
}) => {
  const UpdatePasswordFormik = useFormik({
    initialValues: UPDATE_PASSWORD_VALUES,
    validationSchema: updatePasswordSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!show) {
      UpdatePasswordFormik.resetForm();
    }
  }, [show]);

  return (
    <>
      <ModalSkeleton
        headerClass={classes.headClass}
        borderRadius="20px"
        header={headerText || "Update Password"}
        setShow={setShow}
        show={show}
        modalClass={classes.modalBody}
        size={100}
        width={"400px"}
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              UpdatePasswordFormik.handleSubmit();
            }}
          >
            <Row className="gy-3 px-2">
              <Col md={12}>
                <Input
                  placeholder="********"
                  label="Old Password"
                  type="password"
                  value={UpdatePasswordFormik.values.password}
                  setValue={(val) =>
                    UpdatePasswordFormik.setFieldValue("password", val)
                  }
                  errorText={
                    UpdatePasswordFormik.touched.password &&
                    UpdatePasswordFormik.errors.password
                  }
                />
              </Col>
              <Col md={12}>
                <Input
                  placeholder="********"
                  label="New Password"
                  type="password"
                  value={UpdatePasswordFormik.values.newPassword}
                  setValue={(val) =>
                    UpdatePasswordFormik.setFieldValue("newPassword", val)
                  }
                  errorText={
                    UpdatePasswordFormik.touched.newPassword &&
                    UpdatePasswordFormik.errors.newPassword
                  }
                />
              </Col>
              <Col md={12}>
                <Input
                  placeholder="********"
                  label="Confirm New Password"
                  type="password"
                  value={UpdatePasswordFormik.values.confirmNewPassword}
                  setValue={(val) =>
                    UpdatePasswordFormik.setFieldValue(
                      "confirmNewPassword",
                      val
                    )
                  }
                  errorText={
                    UpdatePasswordFormik.touched.confirmNewPassword &&
                    UpdatePasswordFormik.errors.confirmNewPassword
                  }
                />
              </Col>

              <Col md={12}>
                <div className={classes.btnContainer}>
                  <Button
                    className={classes.btnClass}
                    type={"submit"}
                    label={loading ? "Loading..." : "Update Password"}
                    variant={"primary"}
                    disabled={loading}
                  />
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default UpdatePasswordModal;
