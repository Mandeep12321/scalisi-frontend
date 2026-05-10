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

  const commonLabelStyle = {
    fontSize: "15px",
    fontWeight: 600,
    paddingBottom: "10px",
    textTransform: "capitalize",
  };

  const renderProgress = () => (
    <div className={classes.progressContainer}>
      <div className={classes.progressBar}>
        <div className={mergeClass(classes.progressStep, currentStep >= 1 ? classes.progressStepActive : "", currentStep > 1 ? classes.progressStepCompleted : "")}>1</div>
        <div className={mergeClass(classes.progressStep, currentStep >= 2 ? classes.progressStepActive : "", currentStep > 2 ? classes.progressStepCompleted : "")}>2</div>
      </div>
      <div className="d-flex justify-content-between px-1">
        <span className={mergeClass("fs-12 fs-md-13 fw-700 uppercase tracking-wide", currentStep === 1 ? "text-green" : "text-muted")}>1. Information</span>
        <span className={mergeClass("fs-12 fs-md-13 fw-700 uppercase tracking-wide", currentStep === 2 ? "text-green" : "text-muted")}>2. Account</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className={classes.formBox}>
      <Row className="g-3 g-md-4">
        <Col md={12}>
          <h2 className="fs-24 fs-md-31 fw-700 text-green mb-2 mb-md-3">New Customer Information</h2>
          <p className="fs-14 fs-md-15 text-muted mb-4">Complete the profile below to register your business with Scalisi.</p>
        </Col>
        
        <Col lg={7}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Business Details</h3>
            <Row className="g-2">
              <Col xs={12} md={12} className={classes.inputFieldWrapper}><Input label="Company Name" placeholder="Enter your company name" labelStyle={commonLabelStyle} value={registrationFormik.values.companyName} setValue={(val) => registrationFormik.setFieldValue("companyName", val)} errorText={registrationFormik.touched.companyName && registrationFormik.errors.companyName} /></Col>
              <Col xs={12} md={12} className={classes.inputFieldWrapper}><Input label="Street Address" placeholder="123 Business Way" labelStyle={commonLabelStyle} value={registrationFormik.values.address} setValue={(val) => registrationFormik.setFieldValue("address", val)} errorText={registrationFormik.touched.address && registrationFormik.errors.address} /></Col>
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="City" placeholder="City" labelStyle={commonLabelStyle} value={registrationFormik.values.city} setValue={(val) => registrationFormik.setFieldValue("city", val)} /></Col>
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="State" placeholder="State" labelStyle={commonLabelStyle} value={registrationFormik.values.state} setValue={(val) => registrationFormik.setFieldValue("state", val)} /></Col>
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="Zip" placeholder="Zip" labelStyle={commonLabelStyle} value={registrationFormik.values.zip} setValue={(val) => registrationFormik.setFieldValue("zip", val)} /></Col>
              <Col xs={12} md={6} className={classes.inputFieldWrapper}><Input label="Main Phone" placeholder="(555) 000-0000" labelStyle={commonLabelStyle} value={registrationFormik.values.phone} setValue={(val) => registrationFormik.setFieldValue("phone", val)} /></Col>
              <Col xs={12} md={6} className={classes.inputFieldWrapper}><Input label="Main Fax" placeholder="(555) 000-0000" labelStyle={commonLabelStyle} value={registrationFormik.values.fax} setValue={(val) => registrationFormik.setFieldValue("fax", val)} /></Col>
            </Row>
          </div>
        </Col>

        <Col lg={5}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Corporate & Logistics</h3>
            <Row className="g-2">
              <Col xs={12} md={12} className={classes.inputFieldWrapper}><Input label="Corporate Headquarters" placeholder="HQ Address if different" labelStyle={commonLabelStyle} value={registrationFormik.values.corporateHeadquarters} setValue={(val) => registrationFormik.setFieldValue("corporateHeadquarters", val)} /></Col>
              <Col xs={12} md={12} className={classes.inputFieldWrapper}><Input label="Ship To's" placeholder="Delivery locations" labelStyle={commonLabelStyle} value={registrationFormik.values.shipTo[0]} setValue={(val) => registrationFormik.setFieldValue("shipTo.0", val)} /></Col>
              <Col xs={12} md={12} className={classes.inputFieldWrapper}><Input label="Invoice Comments" placeholder="Special billing instructions" labelStyle={commonLabelStyle} value={registrationFormik.values.invoiceComments} setValue={(val) => registrationFormik.setFieldValue("invoiceComments", val)} /></Col>
            </Row>
          </div>
        </Col>

        <Col md={12}>
          <Row className="g-3 g-md-4">
            <Col lg={4}>
              <div className={classes.sectionCard}>
                <h3 className={classes.sectionTitle}>Primary Contact</h3>
                <div className={classes.inputFieldWrapper}><Input label="Full Name" placeholder="Contact person name" labelStyle={commonLabelStyle} value={registrationFormik.values.primaryContact.name} setValue={(val) => registrationFormik.setFieldValue("primaryContact.name", val)} /></div>
                <div className={classes.inputFieldWrapper}><Input label="Phone" placeholder="Direct phone" labelStyle={commonLabelStyle} value={registrationFormik.values.primaryContact.phone} setValue={(val) => registrationFormik.setFieldValue("primaryContact.phone", val)} /></div>
                <div className={classes.inputFieldWrapper}><Input label="Email" type="email" placeholder="email@example.com" labelStyle={commonLabelStyle} value={registrationFormik.values.primaryContact.email} setValue={(val) => registrationFormik.setFieldValue("primaryContact.email", val)} errorText={registrationFormik.touched.primaryContact?.email && registrationFormik.errors.primaryContact?.email} /></div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={classes.sectionCard}>
                <h3 className={classes.sectionTitle}>Secondary Contact</h3>
                <div className={classes.inputFieldWrapper}><Input label="Full Name" placeholder="Alternate contact name" labelStyle={commonLabelStyle} value={registrationFormik.values.secondaryContact.name} setValue={(val) => registrationFormik.setFieldValue("secondaryContact.name", val)} /></div>
                <div className={classes.inputFieldWrapper}><Input label="Phone" placeholder="Alternate phone" labelStyle={commonLabelStyle} value={registrationFormik.values.secondaryContact.phone} setValue={(val) => registrationFormik.setFieldValue("secondaryContact.phone", val)} /></div>
                <div className={classes.inputFieldWrapper}><Input label="Email" type="email" placeholder="email@example.com" labelStyle={commonLabelStyle} value={registrationFormik.values.secondaryContact.email} setValue={(val) => registrationFormik.setFieldValue("secondaryContact.email", val)} /></div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={classes.sectionCard}>
                <h3 className={classes.sectionTitle}>A/P Contact</h3>
                <div className={classes.inputFieldWrapper}><Input label="Full Name" placeholder="Accounts Payable name" labelStyle={commonLabelStyle} value={registrationFormik.values.apContact.name} setValue={(val) => registrationFormik.setFieldValue("apContact.name", val)} /></div>
                <div className={classes.inputFieldWrapper}><Input label="Phone" placeholder="A/P direct phone" labelStyle={commonLabelStyle} value={registrationFormik.values.apContact.phone} setValue={(val) => registrationFormik.setFieldValue("apContact.phone", val)} /></div>
                <div className={classes.inputFieldWrapper}><Input label="Email" type="email" placeholder="ap@example.com" labelStyle={commonLabelStyle} value={registrationFormik.values.apContact.email} setValue={(val) => registrationFormik.setFieldValue("apContact.email", val)} /></div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col lg={8}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Sales & Internal Specs</h3>
            <Row className="g-2">
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="Salesman" placeholder="Assigned salesman" labelStyle={commonLabelStyle} value={registrationFormik.values.salesman} setValue={(val) => registrationFormik.setFieldValue("salesman", val)} /></Col>
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="Price Plan" placeholder="Pricing level" labelStyle={commonLabelStyle} value={registrationFormik.values.pricePlan} setValue={(val) => registrationFormik.setFieldValue("pricePlan", val)} /></Col>
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="Labels" placeholder="Label type" labelStyle={commonLabelStyle} value={registrationFormik.values.labels} setValue={(val) => registrationFormik.setFieldValue("labels", val)} /></Col>
            </Row>
            <hr className="my-3 my-md-4 border-light" />
            <Row className="g-2">
              <Col xs={12} md={3} className={classes.inputFieldWrapper}><Input label="Credit Appr" placeholder="Approved by" labelStyle={commonLabelStyle} value={registrationFormik.values.creditApproved} setValue={(val) => registrationFormik.setFieldValue("creditApproved", val)} /></Col>
              <Col xs={12} md={3} className={classes.inputFieldWrapper}><Input label="Sales Mgr" placeholder="Manager name" labelStyle={commonLabelStyle} value={registrationFormik.values.salesManager} setValue={(val) => registrationFormik.setFieldValue("salesManager", val)} /></Col>
              <Col xs={12} md={3} className={classes.inputFieldWrapper}><Input label="Purchasing Mgr" placeholder="Purchasing contact" labelStyle={commonLabelStyle} value={registrationFormik.values.purchasingManager} setValue={(val) => registrationFormik.setFieldValue("purchasingManager", val)} /></Col>
              <Col xs={12} md={3} className={classes.inputFieldWrapper}><Input label="Dir of Ops" placeholder="Director name" labelStyle={commonLabelStyle} value={registrationFormik.values.directorOfOps} setValue={(val) => registrationFormik.setFieldValue("directorOfOps", val)} /></Col>
            </Row>
          </div>
        </Col>

        <Col lg={4}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Web Portal & Verification</h3>
            <div className={classes.inputFieldWrapper}><Input label="Portal Login Email" type="email" placeholder="info@example.com" labelStyle={commonLabelStyle} value={registrationFormik.values.webLogin.email} setValue={(val) => registrationFormik.setFieldValue("webLogin.email", val)} errorText={registrationFormik.touched.webLogin?.email && registrationFormik.errors.webLogin?.email} /></div>
            <div className={classes.inputFieldWrapper}><Input label="Portal Password" type="password" placeholder="********" labelStyle={commonLabelStyle} value={registrationFormik.values.webLogin.password} setValue={(val) => registrationFormik.setFieldValue("webLogin.password", val)} errorText={registrationFormik.touched.webLogin?.password && registrationFormik.errors.webLogin?.password} /></div>
            <div className="d-flex flex-column gap-2 mt-2">
              <Checkbox label="Attached Kitchen List w/ Pars" labelStyle={{ ...commonLabelStyle, paddingBottom: 0 }} value={registrationFormik.values.attachedKitchenList} setValue={(val) => registrationFormik.setFieldValue("attachedKitchenList", val)} isBool={true} />
              <Checkbox label="Attached Spec Guide Complete" labelStyle={{ ...commonLabelStyle, paddingBottom: 0 }} value={registrationFormik.values.attachedSpecGuide} setValue={(val) => registrationFormik.setFieldValue("attachedSpecGuide", val)} isBool={true} />
            </div>
          </div>
        </Col>

        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Delivery Operational Details</h3>
            <Row className="g-2">
              <Col xs={12} md={2} className={classes.inputFieldWrapper}><Input label="Delivery Window" placeholder="e.g. 8am-10am" labelStyle={commonLabelStyle} value={registrationFormik.values.deliveryWindow} setValue={(val) => registrationFormik.setFieldValue("deliveryWindow", val)} /></Col>
              <Col xs={12} md={2} className={classes.inputFieldWrapper}><Input label="Route" placeholder="Route #" labelStyle={commonLabelStyle} value={registrationFormik.values.route} setValue={(val) => registrationFormik.setFieldValue("route", val)} /></Col>
              <Col xs={12} md={2} className={classes.inputFieldWrapper}><Input label="Stop" placeholder="Stop #" labelStyle={commonLabelStyle} value={registrationFormik.values.stop} setValue={(val) => registrationFormik.setFieldValue("stop", val)} /></Col>
              <Col xs={12} md={6} className={classes.inputFieldWrapper}><Input label="Special Delivery Instructions" placeholder="Gate codes, door preference, etc." labelStyle={commonLabelStyle} value={registrationFormik.values.deliveryInstructions} setValue={(val) => registrationFormik.setFieldValue("deliveryInstructions", val)} /></Col>
            </Row>
          </div>
        </Col>

        <Col md={12} className="mt-4 d-flex justify-content-end">
          <Button label="Proceed to Step 2" type="submit" variant="primary" loading={loading === "signup"} className="px-4 px-md-5 w-xs-100" />
        </Col>
      </Row>
    </div>
  );

  const renderStep2 = () => (
    <div className={classes.formBox2}>
      <Row className="g-3 g-md-4">
        <Col md={12}>
          <h2 className="fs-24 fs-md-31 fw-700 text-green mb-2 mb-md-3">Business Account Application</h2>
          <p className="fs-14 fs-md-15 text-muted mb-4">Legal and financial information required for credit approval.</p>
        </Col>

        <Col lg={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Legal Identification</h3>
            <Row className="g-3">
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="Federal Tax I.D. / SS#" placeholder="XX-XXXXXXX" labelStyle={commonLabelStyle} value={registrationFormik.values.federalTaxId} setValue={(val) => registrationFormik.setFieldValue("federalTaxId", val)} /></Col>
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label="PACA License #" placeholder="License number" labelStyle={commonLabelStyle} value={registrationFormik.values.pacaLicense} setValue={(val) => registrationFormik.setFieldValue("pacaLicense", val)} /></Col>
              <Col xs={12} md={4} className={classes.inputFieldWrapper}><DropDown label="Company Type" labelStyle={commonLabelStyle} value={registrationFormik.values.companyType} setValue={(val) => registrationFormik.setFieldValue("companyType", val)} options={[{ label: "Proprietorship", value: "Prop" }, { label: "Partnership", value: "Partnership" }, { label: "Franchisee", value: "Franchisee" }, { label: "Corporation", value: "Corp" }]} /></Col>
            </Row>
          </div>
        </Col>

        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Trade References</h3>
            <p className="fs-13 text-muted mb-3 mb-md-4 italic">Please provide three reliable trade references.</p>
            {registrationFormik.values.tradeReferences.map((ref, index) => (
              <Row key={index} className={mergeClass("g-2 g-md-3 pb-3 pb-md-4 mb-3 mb-md-4", index < 2 ? "border-bottom border-light" : "")}>
                <Col xs={12} md={4} className={classes.inputFieldWrapper}><Input label={`Ref ${index + 1} Name`} placeholder="Company name" labelStyle={commonLabelStyle} value={ref.name} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.name`, val)} /></Col>
                <Col xs={12} md={5} className={classes.inputFieldWrapper}><Input label="Full Mailing Address" placeholder="Street, City, State, Zip" labelStyle={commonLabelStyle} value={ref.address} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.address`, val)} /></Col>
                <Col xs={12} md={3} className={classes.inputFieldWrapper}><Input label="Direct Phone Number" placeholder="(555) 000-0000" labelStyle={commonLabelStyle} value={ref.phone} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.phone`, val)} /></Col>
              </Row>
            ))}
          </div>
        </Col>

        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Terms of Agreement</h3>
            <div className="bg-light p-2 p-md-3 border rounded mb-3 mb-md-4 fs-12 text-muted line-height-1-6" style={{ maxHeight: '100px', overflowY: 'auto' }}>
              The perishable agricultural commodities listed on invoices are sold subject to the statutory trust authorized by Section 5(c) of the PACA, 1930...
            </div>
            <Checkbox label="I accept the Terms and Conditions of Sale" labelStyle={{ ...commonLabelStyle, paddingBottom: 0 }} value={registrationFormik.values.termsAccepted} setValue={(val) => registrationFormik.setFieldValue("termsAccepted", val)} isBool={true} />
            {registrationFormik.touched.termsAccepted && registrationFormik.errors.termsAccepted && (
              <p className="text-danger fs-13 mt-2 fw-600">* {registrationFormik.errors.termsAccepted}</p>
            )}
          </div>
        </Col>

        <Col md={12} className="mt-4 d-flex flex-column flex-md-row justify-content-end gap-3 gap-md-4">
          <Button label="Back" variant="secondaryButton" onClick={() => setCurrentStep(1)} className="px-4 px-md-5 order-2 order-md-1" />
          <Button label={loading === "signup" ? "Submitting..." : "Submit Application"} type="submit" variant="primary" disabled={loading === "signup"} loading={loading === "signup"} className="px-4 px-md-5 order-1 order-md-2" />
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

      <Container>
        {renderProgress()}
      </Container>

      <Container className="pb-3">
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
