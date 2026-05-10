"use client";

import React, { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./RegisterPageView.module.css";

export default function RegisterPageView({ data: _data = null }) {
  const router = useRouter();
  const googleTrans = Cookies.get("googtrans");
  const isSpanish = googleTrans === "/en/es";

  const [data, setData] = useState(REGISTER_BANNER || _data?.data || []);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState("");

  const registrationFormik = useFormik({
    initialValues: SIGNUP_VALUES,
    validationSchema: signupSchema(),
    onSubmit: async (values) => {
      if (currentStep === 1) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
      } else {
        await handleSignupSubmit(values);
      }
    },
  });

  const handleSignupSubmit = async (values) => {
    setLoading("signup");
    const { response } = await Post({
      route: "auth/request-signup",
      data: values,
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

  const renderProgress = () => (
    <div className={classes.progressContainer}>
      <div className={classes.progressBar}>
        <div className={mergeClass(classes.progressStep, currentStep >= 1 ? classes.progressStepActive : "", currentStep > 1 ? classes.progressStepCompleted : "")}>1</div>
        <div className={mergeClass(classes.progressStep, currentStep >= 2 ? classes.progressStepActive : "", currentStep > 2 ? classes.progressStepCompleted : "")}>2</div>
      </div>
      <div className="d-flex justify-content-between px-1">
        <span className={mergeClass("fs-12 fw-700 uppercase", currentStep === 1 ? "text-green" : "text-muted")}>Step 1: Info</span>
        <span className={mergeClass("fs-12 fw-700 uppercase", currentStep === 2 ? "text-green" : "text-muted")}>Step 2: Account</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className={classes.formBox}>
      <Row className="g-3">
        <Col md={12} className="mb-2">
          <h2 className="fs-24 fw-bold text-green">New Customer Information</h2>
          <p className="fs-14 text-muted">Please fill in the details below to register your business.</p>
        </Col>
        
        {/* Row 1: General Info & Corporate HQ */}
        <Col lg={7}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>General Information</h3>
            <Row className="g-2">
              <Col md={12}><Input label="Company Name" value={registrationFormik.values.companyName} setValue={(val) => registrationFormik.setFieldValue("companyName", val)} errorText={registrationFormik.touched.companyName && registrationFormik.errors.companyName} inputClass="py-2" /></Col>
              <Col md={12}><Input label="Corporate Headquarters (If different)" value={registrationFormik.values.corporateHeadquarters} setValue={(val) => registrationFormik.setFieldValue("corporateHeadquarters", val)} inputClass="py-2" /></Col>
              <Col md={12}><Input label="Street Address" value={registrationFormik.values.address} setValue={(val) => registrationFormik.setFieldValue("address", val)} errorText={registrationFormik.touched.address && registrationFormik.errors.address} inputClass="py-2" /></Col>
              <Col md={4}><Input label="City" value={registrationFormik.values.city} setValue={(val) => registrationFormik.setFieldValue("city", val)} inputClass="py-2" /></Col>
              <Col md={4}><Input label="State" value={registrationFormik.values.state} setValue={(val) => registrationFormik.setFieldValue("state", val)} inputClass="py-2" /></Col>
              <Col md={4}><Input label="Zip" value={registrationFormik.values.zip} setValue={(val) => registrationFormik.setFieldValue("zip", val)} inputClass="py-2" /></Col>
              <Col md={6}><Input label="Main Phone" value={registrationFormik.values.phone} setValue={(val) => registrationFormik.setFieldValue("phone", val)} inputClass="py-2" /></Col>
              <Col md={6}><Input label="Main Fax" value={registrationFormik.values.fax} setValue={(val) => registrationFormik.setFieldValue("fax", val)} inputClass="py-2" /></Col>
            </Row>
          </div>
        </Col>

        {/* Row 1, Col 2: Web Login & Specs */}
        <Col lg={5}>
          <div className="d-flex flex-column gap-3 h-100">
            <div className={classes.sectionCard}>
              <h3 className={classes.sectionTitle}>Web Portal Access</h3>
              <Row className="g-2">
                <Col md={12}><Input label="Login Email" type="email" value={registrationFormik.values.webLogin.email} setValue={(val) => registrationFormik.setFieldValue("webLogin.email", val)} inputClass="py-2" /></Col>
                <Col md={12}><Input label="Password" type="password" value={registrationFormik.values.webLogin.password} setValue={(val) => registrationFormik.setFieldValue("webLogin.password", val)} inputClass="py-2" /></Col>
              </Row>
            </div>
            <div className={classes.sectionCard}>
              <h3 className={classes.sectionTitle}>Additional Specifications</h3>
              <Row className="g-2">
                <Col md={6}><Input label="Price Plan" value={registrationFormik.values.pricePlan} setValue={(val) => registrationFormik.setFieldValue("pricePlan", val)} inputClass="py-2" /></Col>
                <Col md={6}><Input label="Labels" value={registrationFormik.values.labels} setValue={(val) => registrationFormik.setFieldValue("labels", val)} inputClass="py-2" /></Col>
                <Col md={12} className="mt-2">
                  <div className="d-flex gap-3">
                    <Checkbox label="Kitchen List" value={registrationFormik.values.attachedKitchenList} setValue={(val) => registrationFormik.setFieldValue("attachedKitchenList", val)} isBool={true} />
                    <Checkbox label="Spec Guide" value={registrationFormik.values.attachedSpecGuide} setValue={(val) => registrationFormik.setFieldValue("attachedSpecGuide", val)} isBool={true} />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>

        {/* Row 2: Contacts (3 Columns) */}
        <Col md={4}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Primary Contact</h3>
            <Input label="Name" value={registrationFormik.values.primaryContact.name} setValue={(val) => registrationFormik.setFieldValue("primaryContact.name", val)} inputClass="mb-1 py-1" />
            <Input label="Title" value={registrationFormik.values.primaryContact.title} setValue={(val) => registrationFormik.setFieldValue("primaryContact.title", val)} inputClass="mb-1 py-1" />
            <Input label="Phone" value={registrationFormik.values.primaryContact.phone} setValue={(val) => registrationFormik.setFieldValue("primaryContact.phone", val)} inputClass="mb-1 py-1" />
            <Input label="Email" type="email" value={registrationFormik.values.primaryContact.email} setValue={(val) => registrationFormik.setFieldValue("primaryContact.email", val)} inputClass="py-1" />
          </div>
        </Col>
        <Col md={4}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Secondary Contact</h3>
            <Input label="Name" value={registrationFormik.values.secondaryContact.name} setValue={(val) => registrationFormik.setFieldValue("secondaryContact.name", val)} inputClass="mb-1 py-1" />
            <Input label="Title" value={registrationFormik.values.secondaryContact.title} setValue={(val) => registrationFormik.setFieldValue("secondaryContact.title", val)} inputClass="mb-1 py-1" />
            <Input label="Phone" value={registrationFormik.values.secondaryContact.phone} setValue={(val) => registrationFormik.setFieldValue("secondaryContact.phone", val)} inputClass="mb-1 py-1" />
            <Input label="Email" type="email" value={registrationFormik.values.secondaryContact.email} setValue={(val) => registrationFormik.setFieldValue("secondaryContact.email", val)} inputClass="py-1" />
          </div>
        </Col>
        <Col md={4}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>A/P Contact</h3>
            <Input label="Name" value={registrationFormik.values.apContact.name} setValue={(val) => registrationFormik.setFieldValue("apContact.name", val)} inputClass="mb-1 py-1" />
            <Input label="Phone" value={registrationFormik.values.apContact.phone} setValue={(val) => registrationFormik.setFieldValue("apContact.phone", val)} inputClass="mb-1 py-1" />
            <Input label="Email" type="email" value={registrationFormik.values.apContact.email} setValue={(val) => registrationFormik.setFieldValue("apContact.email", val)} inputClass="py-1" />
          </div>
        </Col>

        {/* Row 3: Delivery Details */}
        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Delivery & Operational Details</h3>
            <Row className="g-2">
              <Col md={3}><Input label="Window" value={registrationFormik.values.deliveryWindow} setValue={(val) => registrationFormik.setFieldValue("deliveryWindow", val)} inputClass="py-2" /></Col>
              <Col md={3}><Input label="Route" value={registrationFormik.values.route} setValue={(val) => registrationFormik.setFieldValue("route", val)} inputClass="py-2" /></Col>
              <Col md={3}><Input label="Stop" value={registrationFormik.values.stop} setValue={(val) => registrationFormik.setFieldValue("stop", val)} inputClass="py-2" /></Col>
              <Col md={3}><Input label="Ship To's" value={registrationFormik.values.shipTo[0]} setValue={(val) => registrationFormik.setFieldValue("shipTo.0", val)} inputClass="py-2" /></Col>
              <Col md={6}><Input label="Instructions" value={registrationFormik.values.deliveryInstructions} setValue={(val) => registrationFormik.setFieldValue("deliveryInstructions", val)} inputClass="py-2" /></Col>
              <Col md={6}><Input label="Comments" value={registrationFormik.values.invoiceComments} setValue={(val) => registrationFormik.setFieldValue("invoiceComments", val)} inputClass="py-2" /></Col>
            </Row>
          </div>
        </Col>

        <Col md={12} className="mt-3 text-center">
          <Button label="Continue to Business Application" type="submit" variant="primary" className="px-5 py-2 fs-18 fw-bold" />
        </Col>
      </Row>
    </div>
  );

  const renderStep2 = () => (
    <div className={classes.formBox2}>
      <Row className="g-3">
        <Col md={12} className="mb-2">
          <h2 className="fs-24 fw-bold text-green">Business Account Application</h2>
          <p className="fs-14 text-muted">Legal and financial information for credit approval.</p>
        </Col>

        <Col lg={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Tax & Legal Identification</h3>
            <Row className="g-2">
              <Col md={4}><Input label="Federal Tax I.D. / SS#" value={registrationFormik.values.federalTaxId} setValue={(val) => registrationFormik.setFieldValue("federalTaxId", val)} inputClass="py-2" /></Col>
              <Col md={4}><Input label="PACA License #" value={registrationFormik.values.pacaLicense} setValue={(val) => registrationFormik.setFieldValue("pacaLicense", val)} inputClass="py-2" /></Col>
              <Col md={4}><DropDown label="Company Type" value={registrationFormik.values.companyType} setValue={(val) => registrationFormik.setFieldValue("companyType", val)} options={[{ label: "Proprietorship", value: "Prop" }, { label: "Partnership", value: "Partnership" }, { label: "Franchisee", value: "Franchisee" }, { label: "Corporation", value: "Corp" }]} /></Col>
            </Row>
          </div>
        </Col>

        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Trade References</h3>
            <p className="fs-12 text-muted mb-3 italic">Do not include alcohol or liquor vendors.</p>
            {registrationFormik.values.tradeReferences.map((ref, index) => (
              <Row key={index} className={mergeClass("g-2 pb-3 mb-3", index < 2 ? "border-bottom border-light" : "")}>
                <Col md={4}><Input label={`Ref ${index + 1} Name`} value={ref.name} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.name`, val)} inputClass="py-1" /></Col>
                <Col md={5}><Input label="Full Address" value={ref.address} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.address`, val)} inputClass="py-1" /></Col>
                <Col md={3}><Input label="Phone" value={ref.phone} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.phone`, val)} inputClass="py-1" /></Col>
              </Row>
            ))}
          </div>
        </Col>

        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Terms of Agreement</h3>
            <div className="bg-light p-2 border rounded mb-3 fs-12 text-muted line-height-1-4" style={{ maxHeight: '100px', overflowY: 'auto' }}>
              The perishable agricultural commodities listed on invoices are sold subject to the statutory trust authorized by Section 5(c) of the PACA, 1930...
            </div>
            <Checkbox label="I accept the Terms and Conditions of Sale" value={registrationFormik.values.termsAccepted} setValue={(val) => registrationFormik.setFieldValue("termsAccepted", val)} isBool={true} />
            {registrationFormik.touched.termsAccepted && registrationFormik.errors.termsAccepted && (
              <p className="text-danger fs-12 mt-1 fw-600">* {registrationFormik.errors.termsAccepted}</p>
            )}
          </div>
        </Col>

        <Col md={12} className="mt-3 d-flex justify-content-center gap-3">
          <Button label="Go Back" variant="secondary" onClick={() => setCurrentStep(1)} className="px-4 py-2 fs-16 fw-bold" />
          <Button label={loading === "signup" ? "Submitting..." : "Submit Application"} type="submit" variant="primary" disabled={loading === "signup"} loading={loading === "signup"} className="px-5 py-2 fs-18 fw-bold" />
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
                data={{
                  ...data?.heroSection,
                  header: "Business Registration",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {renderProgress()}

      <Container className="pb-5">
        <Row className="justify-content-center">
          <Col lg={12}>
            <div className={classes.main}>
              <form onSubmit={registrationFormik.handleSubmit}>
                {currentStep === 1 ? renderStep1() : renderStep2()}
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
