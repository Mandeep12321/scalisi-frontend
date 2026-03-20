"use client";
import { Input } from "@/components/atoms/Input/Input";
import { contactValidationSchema } from "@/formik/schema/contact";
import { mergeClass } from "@/resources/utils/helper";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "../../atoms/Button";
import TextArea from "../../atoms/TextArea";
import classes from "./contactForm.module.css";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { Post } from "@/interceptor/axiosInterceptor";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import CustomPhoneInput from "@/components/atoms/CustomPhoneInput";
import Cookies from "js-cookie";

export default function ContactForm() {
  const [loading, setLoading] = useState();
  const [is375, setIs375] = useState(false);

  // Language detection
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const contactForm = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      callingCode: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, resetForm);
    },
  });

  const handleSubmit = async (values, resetForm) => {
    setLoading("loading");
    const body = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };
    const url = "contact-us";
    const { response } = await Post({
      route: `${url}`,
      data: body,
    });
    if (response) {
      RenderToast({
        message: isSpanish ? "Enviado exitosamente" : "Submitted Successfully",
        type: "success",
      });
      resetForm();
    }
    setLoading("");
  };

  useEffect(() => {
    isMobileViewHook(setIs375, 376);
  }, []);

  return (
    <div className={classes.mainForm}>
      <div className={classes.main}>
        <h1 className="fs-24" classNam={classes.contactHeading}>
          Contact Form
        </h1>

        <div className={classes.formGroup}>
          <Input
            labelClass={classes.labelClass}
            label="Full Name*"
            name="fullName"
            value={contactForm.values.fullName}
            setValue={(val) => contactForm?.setFieldValue("fullName", val)}
            inputClass={
              contactForm.touched.fullName && contactForm.errors.fullName
                ? classes.inputClassWithError
                : classes.inputClass
            }
            type="text"
            placeholder=""
            errorText={
              contactForm.touched.fullName && contactForm.errors.fullName
            }
          />

          <CustomPhoneInput
            label={"Phone"}
            phoneInput={
              contactForm.touched.phoneNumber && contactForm.errors.phoneNumber
                ? classes.phoneInputClassWithError
                : classes.phoneInputClass
            }
            labelClass={
              contactForm.touched.phoneNumber && contactForm.errors.phoneNumber
                ? classes.labelClassWithError
                : ""
            }
            value={
              contactForm.values.phoneNumber == ""
                ? ""
                : `+${contactForm.values.callingCode}${contactForm.values.phoneNumber}`
            }
            setValue={(value) => {
              contactForm.setFieldValue("callingCode", value?.callingCode);
              contactForm.setFieldValue("phoneNumber", value?.phoneNumber);
            }}
            errorText={
              contactForm.touched.phoneNumber && contactForm.errors.phoneNumber
            }
          />
        </div>

        <Input
          labelClass={`${classes.labelClass} ${classes?.labelClass_padLess}`}
          label="Email Address*"
          name="email"
          value={contactForm.values.email}
          setValue={(val) => contactForm?.setFieldValue("email", val)}
          inputClass={
            contactForm.touched.email && contactForm.errors.email
              ? classes.inputClassWithError
              : classes.inputClass
          }
          type="email"
          placeholder=""
          errorText={contactForm.touched.email && contactForm.errors.email}
        />

        <Input
          labelClass={`${classes.labelClass} ${classes?.labelClass_padLess}`}
          label="Subject*"
          name="subject"
          value={contactForm.values.subject}
          setValue={(val) => contactForm?.setFieldValue("subject", val)}
          inputClass={
            contactForm.touched.subject && contactForm.errors.subject
              ? classes.inputClassWithError
              : classes.inputClass
          }
          type="text"
          placeholder=""
          errorText={contactForm.touched.subject && contactForm.errors.subject}
        />

        <TextArea
          labelClass={classes.textArealabelClass}
          className={classes.textAreaClass}
          label="Message*"
          value={contactForm.values.message}
          setValue={(val) => contactForm?.setFieldValue("message", val)}
          rows={is375 ? "7" : "17"}
          placeholder=""
          errorText={contactForm.touched.message && contactForm.errors.message}
        />

        <Button
          variant="primary"
          label={loading === "loading" ? "Submitting..." : "Submit"}
          className={mergeClass("fs-16 fw-700 mt-4", classes.subBtn)}
          onClick={contactForm?.handleSubmit}
          disabled={loading === "loading"}
        />
      </div>
    </div>
  );
}
