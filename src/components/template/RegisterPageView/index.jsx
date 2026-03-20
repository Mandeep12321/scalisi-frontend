"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import { Checkbox } from "@/components/molecules/Checkbox";
import DropDown from "@/components/molecules/DropDown/DropDown";
import HeroSection from "@/components/molecules/HeroSection";
import { REGISTER_BANNER } from "@/developmentContent/mock-data";
import { SIGNUP_VALUES } from "@/formik/initial-values/initial-values";
import { signupSchema } from "@/formik/schema/SignupSchema";

import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { Post } from "@/interceptor/axiosInterceptor";
import { mergeClass } from "@/resources/utils/helper";
import { City, Country, State } from "country-state-city";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./RegisterPageView.module.css";

export default function RegisterPageView({ data: _data = null }) {
  const router = useRouter();
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const [data, setData] = useState(REGISTER_BANNER || _data?.data || []);
  const [isEditable, setIsEditable] = useState(false);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState("");

  const registrationFormik = useFormik({
    initialValues: SIGNUP_VALUES,
    validationSchema: signupSchema({
      isCityReq: true,
      isStateReq: true,
    }),

    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
      await handleSignupSubmit(values);
    },
  });

  // Handle signup form submission
  const handleSignupSubmit = async (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      jobTitle: values.jobTitle,
      newsletter: values.newsletter ? true : false,
      companyInformation: {
        companyName: values.companyInformation.companyName,
        companyPhoneNumber: values.companyInformation.companyPhoneNumber,
        streetAddress: values.companyInformation.streetAddress,
        city:
          typeof values.companyInformation.city === "object"
            ? values.companyInformation.city?.label ||
              values.companyInformation.city?.name
            : values.companyInformation.city,
        state:
          typeof values.companyInformation.state === "object"
            ? values.companyInformation.state?.label ||
              values.companyInformation.state?.name
            : values.companyInformation.state,
        country:
          typeof values.companyInformation.country === "object"
            ? values.companyInformation.country?.label ||
              values.companyInformation.country?.name
            : values.companyInformation.country,
        postalCode: values.companyInformation.postalCode,
      },
    };

    setLoading("signup");

    const { response } = await Post({
      route: "auth/request-signup",
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: isSpanish
          ? "Registro exitoso. Te contactaremos a la brevedad."
          : "Registration successful",
      });
      router.push("/");
    }
    setLoading("");
  };

  //   handleCountryChange
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  // render personal info

  const renderPersonalInfo = () => (
    <div className={classes.formBox}>
      <Row>
        <Col md={12}>
          <h2
            className={mergeClass(
              "fs-20 fw-bold text-green",
              classes.headingText
            )}
          >
            Personal Information
          </h2>
        </Col>
        <Col md={12} className={`${classes.TopInputDiv} ${classes.inputDiv}`}>
          <Input
            label="First Name"
            name="firstName"
            value={registrationFormik.values.firstName}
            setValue={(val) =>
              registrationFormik.setFieldValue("firstName", val)
            }
            labelClass={classes.labelClass}
            inputClass={classes.inputClass}
            errorText={
              registrationFormik.touched.firstName &&
              registrationFormik.errors.firstName
            }
          />
        </Col>
        <Col md={12} className={classes.inputDiv}>
          <Input
            label="Last Name"
            name="lastName"
            labelClass={classes.labelClass}
            value={registrationFormik.values.lastName}
            setValue={(val) =>
              registrationFormik.setFieldValue("lastName", val)
            }
            inputClass={classes.inputClass}
            errorText={
              registrationFormik.touched.lastName &&
              registrationFormik.errors.lastName
            }
          />
        </Col>
        <Col md={12}>
          <Input
            label="Email Address"
            name="email"
            value={registrationFormik.values.email}
            setValue={(val) => registrationFormik.setFieldValue("email", val)}
            inputClass={classes.inputClass}
            labelClass={classes.labelClass}
            type="email"
            errorText={
              registrationFormik.touched.email &&
              registrationFormik.errors.email
            }
          />
        </Col>
        <Col md={12} className="mt-3">
          <Checkbox
            checkboxMain={classes.checkboxMain}
            value={registrationFormik.values.newsletter}
            setValue={(val) => {
              console.log("val", val);
              registrationFormik.setFieldValue("newsletter", val);
            }}
            name="newsletter"
            label={"Sign Up for our Newsletter"}
          />
        </Col>
        <Col md={12} className={mergeClass("mt-3", classes.inputPhoneNumber)}>
          <Input
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={registrationFormik.values.phoneNumber}
            setValue={(val) => {
              // Only allow digits and limit to 11 characters
              const numericValue = val.replace(/\D/g, "").slice(0, 11);
              registrationFormik.setFieldValue("phoneNumber", numericValue);
            }}
            inputClass={classes.inputClass}
            labelClass={classes.labelClass}
            maxLength={11}
            errorText={
              registrationFormik.touched.phoneNumber &&
              registrationFormik.errors.phoneNumber
            }
          />
        </Col>
        <Col md={12} className={classes.jobTitle}>
          <Input
            label="Job Title"
            name="jobTitle"
            value={registrationFormik.values.jobTitle}
            setValue={(val) =>
              registrationFormik.setFieldValue("jobTitle", val)
            }
            inputClass={classes.inputClass}
            labelClass={classes.labelClass}
            errorText={
              registrationFormik.touched.jobTitle &&
              registrationFormik.errors.jobTitle
            }
          />
        </Col>
      </Row>
    </div>
  );

  const renderCompanyInfo = () => (
    <div className={classes.formBox2}>
      <Row>
        <Col sm={12} md={12}>
          <h2
            className={mergeClass(
              "fs-20 fw-bold text-green",
              classes.headingText
            )}
          >
            Company Information
          </h2>
        </Col>

        <Col
          md={12}
          className={mergeClass(classes.TopInputDiv, classes.inputDiv)}
        >
          <Input
            label="Company Name"
            name="companyName"
            value={registrationFormik.values.companyInformation.companyName}
            setValue={(val) =>
              registrationFormik.setFieldValue(
                "companyInformation.companyName",
                val
              )
            }
            inputClass={classes.inputClass}
            labelClass={classes.labelClass}
            errorText={
              registrationFormik.touched.companyInformation?.companyName &&
              registrationFormik.errors.companyInformation?.companyName
            }
          />
        </Col>
        <Col md={12} className={classes.inputDiv}>
          <Input
            label="Phone Number"
            // name="companyPhoneNumber"
            name="phoneNumber"
            type="tel"
            value={
              registrationFormik.values.companyInformation.companyPhoneNumber
            }
            setValue={(val) => {
              // Only allow digits and limit to 11 characters
              const numericValue = val.replace(/\D/g, "").slice(0, 11);
              registrationFormik.setFieldValue(
                "companyInformation.companyPhoneNumber",
                numericValue
              );
            }}
            inputClass={classes.inputClass}
            labelClass={classes.labelClass}
            maxLength={11}
            errorText={
              registrationFormik.touched.companyInformation
                ?.companyPhoneNumber &&
              registrationFormik.errors.companyInformation?.companyPhoneNumber
            }
          />
        </Col>
        <Col md={12} className={classes?.inputDiv}>
          <Input
            label="Street Address"
            name="streetAddress"
            value={registrationFormik.values.companyInformation.streetAddress}
            setValue={(val) =>
              registrationFormik.setFieldValue(
                "companyInformation.streetAddress",
                val
              )
            }
            inputClass={classes.inputClass}
            labelClass={classes.labelClass}
            errorText={
              registrationFormik.touched.companyInformation?.streetAddress &&
              registrationFormik.errors.companyInformation?.streetAddress
            }
          />
        </Col>
        <Col sm={12} md={12}>
          <DropDown
            customStyle={{
              border: "2px solid #3636364A",
            }}
            labelClassName={classes.labelClass}
            dropDownContainer={classes.dropDownClass}
            placeholder={""}
            label="Country"
            value={registrationFormik.values.companyInformation.country}
            setValue={(selectedCountry) => {
              const countryIsoCode = selectedCountry?.value;
              const citiesOfCountry = City.getCitiesOfCountry(countryIsoCode);
              const statesOfCountry = State.getStatesOfCountry(countryIsoCode);

              const updatedCountry = {
                ...selectedCountry,
                hasCities: citiesOfCountry.length > 0,
                hasStates: statesOfCountry.length > 0,
              };

              registrationFormik.setFieldValue(
                "companyInformation.country",
                updatedCountry
              );
              setCities(citiesOfCountry);
              setStates(statesOfCountry);

              registrationFormik.setFieldValue("companyInformation.city", null);
              registrationFormik.setFieldValue(
                "companyInformation.state",
                null
              );
              registrationFormik.setErrors({});
            }}
            errorText={
              registrationFormik.touched.companyInformation?.country &&
              registrationFormik.errors.companyInformation?.country
            }
            options={countries?.map((item) => ({
              label: item?.name,
              value: item?.isoCode,
            }))}
          />
        </Col>
        <Col md={12}>
          <DropDown
            customStyle={{
              border: "2px solid #3636364A",
            }}
            labelClassName={classes.labelClass}
            dropDownContainer={classes.dropDownClass}
            placeholder={""}
            label={"City"}
            value={registrationFormik?.values?.companyInformation?.city}
            setValue={(val) => {
              registrationFormik?.setFieldValue("companyInformation.city", val);
            }}
            errorText={
              registrationFormik.touched.companyInformation?.city &&
              registrationFormik.errors.companyInformation?.city
            }
            options={cities?.map((city) => ({
              label: city.name,
              value: city.name,
            }))}
            disabled={!cities?.length}
          />
        </Col>
        <Col md={6}>
          <DropDown
            customStyle={{
              border: "2px solid #3636364A",
            }}
            labelClassName={classes.labelClass}
            dropDownContainer={classes.dropDownClass}
            placeholder={"Select"}
            label={"State"}
            value={registrationFormik?.values?.companyInformation?.state}
            setValue={(val) =>
              registrationFormik?.setFieldValue("companyInformation.state", val)
            }
            errorText={
              registrationFormik.touched.companyInformation?.state &&
              registrationFormik.errors.companyInformation?.state
            }
            options={states?.map((state) => ({
              label: state.name,
              value: state.isoCode,
            }))}
            disabled={!states?.length}
            extraPlaceholderStyles={{
              fontSize: "15px",
              color: "#000000",
            }}
          />
        </Col>
        <Col md={6}>
          <Input
            label="Zip/Postal Code"
            name="postalCode"
            value={registrationFormik.values.companyInformation.postalCode}
            setValue={(val) => {
              // Only allow alphanumeric characters and limit to 10 characters
              const alphanumericValue = val
                .replace(/[^a-zA-Z0-9]/g, "")
                .slice(0, 10);
              registrationFormik.setFieldValue(
                "companyInformation.postalCode",
                alphanumericValue
              );
            }}
            inputClass={classes.inputClass}
            labelClass={classes.labelClass}
            maxLength={10}
            errorText={
              registrationFormik.touched.companyInformation?.postalCode &&
              registrationFormik.errors.companyInformation?.postalCode
            }
          />
        </Col>

        <Col md={12} className={mergeClass("my-2", classes.btnParent)}>
          <div className={classes.registerBtn}>
            <Button
              label={loading === "signup" ? "Submitting..." : "Submit"}
              type="submit"
              variant="primary"
              disabled={loading === "signup"}
              className={mergeClass("fs-16 fw-600", classes.submitBtn)}
              onClick={() => {
                // Manually trigger form submission
                registrationFormik.handleSubmit();
              }}
              loading={loading === "signup"}
            />
            <p className={classes.PrivacyDiv}>
              By submitting this form I agree to Scalisi Produce's
              <span
                className="red-color fw-600 cursor-pointer"
                onClick={() => router.push("/privacy")}
              >
                Privacy Policy.
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );

  return (
    <>
      <div className={classes.heroSecColor}>
        <Container>
          <Row>
            <Col md={12} className="p-0">
              <HeroSection
                mainDivClass={classes.mainDivClass}
                isColor={true}
                data={data?.heroSection}
                styles={{
                  colorText: classes.colorTextClass,
                  colorHeading: classes.colorHeadingClass,
                  header: classes.header,
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={12}>
            <div className={classes.main}>
              <form onSubmit={registrationFormik.handleSubmit}>
                {renderPersonalInfo()}
                {renderCompanyInfo()}
              </form>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="g-0">
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementLeft)}>
              <AnnouncementCard data={data?.announcement1} />
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className={mergeClass(classes.announcementRight)}>
              <AnnouncementCard
                data={data?.announcement2}
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
