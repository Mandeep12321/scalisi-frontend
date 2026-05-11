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
      await handleSignupSubmit(values);
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate = [
      "companyName",
      "address",
      "primaryContact.email",
      "webLogin.email",
      "webLogin.password"
    ];

    fieldsToValidate.forEach(field => registrationFormik.setFieldTouched(field, true));
    const errors = await registrationFormik.validateForm();
    
    const hasStep1Errors = fieldsToValidate.some(field => {
      const fieldParts = field.split('.');
      if (fieldParts.length > 1) {
        return errors[fieldParts[0]]?.[fieldParts[1]];
      }
      return errors[field];
    });

    if (!hasStep1Errors) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    } else {
      RenderToast({
        type: "error",
        message: "Please fill in all required fields to continue."
      });
    }
  };

  const handleSignupSubmit = async (values) => {
    setLoading("signup");
    const { response } = await Post({
      route: "auth/request-signup",
      data: values,
    });

    if (response) {
      setCurrentStep(3); // Success Step
      window.scrollTo(0, 0);
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
            <Row className="g-3">
              <Col xs={12} md={4}><Input label="Salesman" placeholder="Assigned salesman" labelStyle={commonLabelStyle} value={registrationFormik.values.salesman} setValue={(val) => registrationFormik.setFieldValue("salesman", val)} /></Col>
              <Col xs={12} md={4}><Input label="Price Plan" placeholder="Pricing level" labelStyle={commonLabelStyle} value={registrationFormik.values.pricePlan} setValue={(val) => registrationFormik.setFieldValue("pricePlan", val)} /></Col>
              <Col xs={12} md={4}><Input label="Labels" placeholder="Label type" labelStyle={commonLabelStyle} value={registrationFormik.values.labels} setValue={(val) => registrationFormik.setFieldValue("labels", val)} /></Col>
            </Row>
            <hr className="my-3 border-light" />
            <Row className="g-3">
              <Col xs={12} md={3}><Input label="Credit Appr" placeholder="Approved by" labelStyle={commonLabelStyle} value={registrationFormik.values.creditApproved} setValue={(val) => registrationFormik.setFieldValue("creditApproved", val)} /></Col>
              <Col xs={12} md={3}><Input label="Sales Mgr" placeholder="Manager name" labelStyle={commonLabelStyle} value={registrationFormik.values.salesManager} setValue={(val) => registrationFormik.setFieldValue("salesManager", val)} /></Col>
              <Col xs={12} md={3}><Input label="Purchasing Mgr" placeholder="Purchasing contact" labelStyle={commonLabelStyle} value={registrationFormik.values.purchasingManager} setValue={(val) => registrationFormik.setFieldValue("purchasingManager", val)} /></Col>
              <Col xs={12} md={3}><Input label="Dir of Ops" placeholder="Director name" labelStyle={commonLabelStyle} value={registrationFormik.values.directorOfOps} setValue={(val) => registrationFormik.setFieldValue("directorOfOps", val)} /></Col>
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
          <Button label="Proceed to Step 2" type="button" onClick={handleNextStep} variant="primary" loading={loading === "signup"} className="px-4 px-md-5 w-xs-100" />
        </Col>
      </Row>
    </div>
  );

  const renderStep2 = () => (
    <div className={classes.formBox2}>
      <Row className="g-3 g-md-4">
        <Col md={12}>
          <h2 className="fs-24 fs-md-31 fw-700 text-green mb-2 mb-md-3">Business Account Application</h2>
          <p className="fs-14 fs-md-15 text-muted mb-4">Detailed legal and financial information for account approval.</p>
        </Col>

        <Col lg={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>General Business Information</h3>
            <Row className="g-3">
              <Col xs={12} md={4}><Input label="Federal Tax I.D. # / SS#" placeholder="XX-XXXXXXX" labelStyle={commonLabelStyle} value={registrationFormik.values.federalTaxId} setValue={(val) => registrationFormik.setFieldValue("federalTaxId", val)} /></Col>
              <Col xs={12} md={4}><Input label="PACA License #" placeholder="License number" labelStyle={commonLabelStyle} value={registrationFormik.values.pacaLicense} setValue={(val) => registrationFormik.setFieldValue("pacaLicense", val)} /></Col>
              <Col xs={12} md={4}><Input label="D&B #" placeholder="D-U-N-S Number" labelStyle={commonLabelStyle} value={registrationFormik.values.dAndBNumber} setValue={(val) => registrationFormik.setFieldValue("dAndBNumber", val)} /></Col>
              <Col xs={12} md={4}><Input label="Year Business Established" placeholder="YYYY" labelStyle={commonLabelStyle} value={registrationFormik.values.yearEstablished} setValue={(val) => registrationFormik.setFieldValue("yearEstablished", val)} /></Col>
              <Col xs={12} md={8}><Input label="Requested Delivery Days/Times" placeholder="e.g. Mon-Fri, 6am-8am" labelStyle={commonLabelStyle} value={registrationFormik.values.requestedDeliveryDays} setValue={(val) => registrationFormik.setFieldValue("requestedDeliveryDays", val)} /></Col>
              <Col xs={12} md={12}><Input label="Special Delivery Instructions" placeholder="Any specific requirements" labelStyle={commonLabelStyle} value={registrationFormik.values.specialDeliveryInstructions} setValue={(val) => registrationFormik.setFieldValue("specialDeliveryInstructions", val)} /></Col>
            </Row>
          </div>
        </Col>

        <Col lg={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Ownership Structure</h3>
            <p className="fs-13 text-muted mb-4 italic">(A) and if applicable (B) or (C) must be filled out for non-cash payment forms.</p>
            
            <div className="mb-4">
              <h4 className="fs-15 fw-700 text-green mb-3 uppercase tracking-wider">Company Type</h4>
              <div className="d-flex flex-wrap gap-4">
                {["Prop", "Partnership", "Franchisee", "Corp"].map((type) => (
                  <Checkbox 
                    key={type}
                    label={type} 
                    labelStyle={{ ...commonLabelStyle, paddingBottom: 0 }} 
                    value={registrationFormik.values.companyType === type} 
                    setValue={() => registrationFormik.setFieldValue("companyType", type)} 
                    isBool={true} 
                  />
                ))}
              </div>
            </div>

            <div className="bg-light p-3 rounded mb-4">
              <h4 className="fs-15 fw-700 text-dark mb-3 uppercase">(A) - Individual Responsible</h4>
              <Row className="g-2">
                <Col xs={12} md={6}><Input label="Name" placeholder="Full name" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeA?.name} setValue={(val) => registrationFormik.setFieldValue("ownership.typeA.name", val)} /></Col>
                <Col xs={12} md={6}><Input label="Home Address" placeholder="Street, City, State, Zip" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeA?.homeAddress} setValue={(val) => registrationFormik.setFieldValue("ownership.typeA.homeAddress", val)} /></Col>
                <Col xs={12} md={4}><Input label="Home Phone" placeholder="(555) 000-0000" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeA?.homePhone} setValue={(val) => registrationFormik.setFieldValue("ownership.typeA.homePhone", val)} /></Col>
                <Col xs={12} md={4}><Input label="Social Security Number" placeholder="XXX-XX-XXXX" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeA?.ssn} setValue={(val) => registrationFormik.setFieldValue("ownership.typeA.ssn", val)} /></Col>
                <Col xs={6} md={2}><Input label="DL #" placeholder="Driver License" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeA?.dlNumber} setValue={(val) => registrationFormik.setFieldValue("ownership.typeA.dlNumber", val)} /></Col>
                <Col xs={6} md={2}><Input label="State" placeholder="State" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeA?.state} setValue={(val) => registrationFormik.setFieldValue("ownership.typeA.state", val)} /></Col>
              </Row>
            </div>

            <div className="bg-light p-3 rounded mb-4">
              <h4 className="fs-15 fw-700 text-dark mb-3 uppercase">(B) - Partnership</h4>
              {registrationFormik.values.ownership.typeB?.map((partner, index) => (
                <div key={index} className={mergeClass("pb-3 mb-3", index === 0 ? "border-bottom border-secondary-subtle" : "")}>
                  <Row className="g-2">
                    <Col xs={12} md={6}><Input label="Partner Name" placeholder="Full name" labelStyle={commonLabelStyle} value={partner.partnerName} setValue={(val) => registrationFormik.setFieldValue(`ownership.typeB.${index}.partnerName`, val)} /></Col>
                    <Col xs={12} md={6}><Input label="Home Address" placeholder="Street, City, State, Zip" labelStyle={commonLabelStyle} value={partner.homeAddress} setValue={(val) => registrationFormik.setFieldValue(`ownership.typeB.${index}.homeAddress`, val)} /></Col>
                    <Col xs={12} md={4}><Input label="Home Phone" placeholder="(555) 000-0000" labelStyle={commonLabelStyle} value={partner.homePhone} setValue={(val) => registrationFormik.setFieldValue(`ownership.typeB.${index}.homePhone`, val)} /></Col>
                    <Col xs={12} md={4}><Input label="Social Security Number" placeholder="XXX-XX-XXXX" labelStyle={commonLabelStyle} value={partner.ssn} setValue={(val) => registrationFormik.setFieldValue(`ownership.typeB.${index}.ssn`, val)} /></Col>
                    <Col xs={6} md={2}><Input label="DL #" placeholder="Driver License" labelStyle={commonLabelStyle} value={partner.dlNumber} setValue={(val) => registrationFormik.setFieldValue(`ownership.typeB.${index}.dlNumber`, val)} /></Col>
                    <Col xs={6} md={2}><Input label="State" placeholder="State" labelStyle={commonLabelStyle} value={partner.state} setValue={(val) => registrationFormik.setFieldValue(`ownership.typeB.${index}.state`, val)} /></Col>
                  </Row>
                </div>
              ))}
            </div>

            <div className="bg-light p-3 rounded">
              <h4 className="fs-15 fw-700 text-dark mb-3 uppercase">(C) - Corporation</h4>
              <Row className="g-2">
                <Col xs={12} md={4}><Input label="Name of President" placeholder="President name" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.president} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.president", val)} /></Col>
                <Col xs={12} md={4}><Input label="Name of Vice President" placeholder="VP name" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.vicePresident} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.vicePresident", val)} /></Col>
                <Col xs={12} md={4}><Input label="Name of Treasurer" placeholder="Treasurer name" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.treasurer} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.treasurer", val)} /></Col>
                <Col xs={12} md={8}><Input label="Name of Accounts Payable Contact" placeholder="A/P name" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.apContact} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.apContact", val)} /></Col>
                <Col xs={12} md={4}><Input label="Phone Number(s)" placeholder="A/P direct phone" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.apPhone} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.apPhone", val)} /></Col>
                <Col xs={12} md={8}><Input label="Address of Principal Office" placeholder="Street, City, State, Zip" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.principalOfficeAddress} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.principalOfficeAddress", val)} /></Col>
                <Col xs={12} md={4}><Input label="Phone Number(s)" placeholder="Office phone" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.principalOfficePhone} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.principalOfficePhone", val)} /></Col>
                <Col xs={12} md={4}><Input label="State of Incorporation" placeholder="State" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.stateOfIncorporation} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.stateOfIncorporation", val)} /></Col>
                <Col xs={12} md={4}><Input label="Date of Incorporation" placeholder="MM/DD/YYYY" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.dateOfIncorporation} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.dateOfIncorporation", val)} /></Col>
                <Col xs={12} md={4}><Input label="Federal I.D. Number" placeholder="XX-XXXXXXX" labelStyle={commonLabelStyle} value={registrationFormik.values.ownership.typeC?.federalIdNumber} setValue={(val) => registrationFormik.setFieldValue("ownership.typeC.federalIdNumber", val)} /></Col>
              </Row>
            </div>
          </div>
        </Col>

        <Col lg={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Bank References</h3>
            {registrationFormik.values.bankReferences?.map((bank, index) => (
              <Row key={index} className="g-2 mb-3">
                <Col xs={12} md={6}><Input label="Bank Name" placeholder="Institution name" labelStyle={commonLabelStyle} value={bank.bankName} setValue={(val) => registrationFormik.setFieldValue(`bankReferences.${index}.bankName`, val)} /></Col>
                <Col xs={12} md={6}><Input label="Branch" placeholder="Branch location" labelStyle={commonLabelStyle} value={bank.mailingAddress} setValue={(val) => registrationFormik.setFieldValue(`bankReferences.${index}.mailingAddress`, val)} /></Col>
                <Col xs={12} md={4}><Input label="Account #" placeholder="Operating account #" labelStyle={commonLabelStyle} value={bank.checkingAccount} setValue={(val) => registrationFormik.setFieldValue(`bankReferences.${index}.checkingAccount`, val)} /></Col>
                <Col xs={6} md={4}><Input label="Bank Officer" placeholder="Contact person" labelStyle={commonLabelStyle} value={bank.contact} setValue={(val) => registrationFormik.setFieldValue(`bankReferences.${index}.contact`, val)} /></Col>
                <Col xs={6} md={4}><Input label="Bank Phone" placeholder="(555) 000-0000" labelStyle={commonLabelStyle} value={bank.phone} setValue={(val) => registrationFormik.setFieldValue(`bankReferences.${index}.phone`, val)} /></Col>
              </Row>
            ))}
          </div>
        </Col>

        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Trade References</h3>
            <p className="fs-13 text-muted mb-3 italic">Please provide three reliable trade references (no alcohol/liquors).</p>
            {registrationFormik.values.tradeReferences?.map((ref, index) => (
              <Row key={index} className={mergeClass("g-2 pb-3 mb-3", index < 2 ? "border-bottom border-light" : "")}>
                <Col xs={12} md={4}><Input label={`Ref ${index + 1} Name`} placeholder="Company name" labelStyle={commonLabelStyle} value={ref.name} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.name`, val)} /></Col>
                <Col xs={12} md={5}><Input label="Full Mailing Address" placeholder="Street, City, State, Zip" labelStyle={commonLabelStyle} value={ref.address} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.address`, val)} /></Col>
                <Col xs={12} md={3}><Input label="Direct Phone" placeholder="(555) 000-0000" labelStyle={commonLabelStyle} value={ref.phone} setValue={(val) => registrationFormik.setFieldValue(`tradeReferences.${index}.phone`, val)} /></Col>
              </Row>
            ))}
          </div>
        </Col>

        <Col md={12}>
          <div className={classes.sectionCard}>
            <h3 className={classes.sectionTitle}>Terms and Conditions of Sale - This is not a personal guarantee</h3>
            <div className="bg-light p-3 p-md-4 border rounded mb-3 mb-md-4 fs-13 text-muted line-height-1-8 shadow-sm" style={{ maxHeight: '350px', overflowY: 'auto', textAlign: 'justify' }}>
              <p className="mb-3">
                <strong>By signature hereof, the undersigned agrees to the following terms:</strong> The perishable agricultural commodities listed on invoices are sold subject to the statutory trust authorized by Section 5(c) of the Perishable Agricultural Commodities Act, 1930 (7 USC 499(e)(c)). The seller of these commodities retains a trust claim over these commodities, all inventories of food or other products derived from these commodities, any any receivables or proceeds from the sale of these commodities until full payment is received. 
              </p>
              <p className="mb-3">
                <strong>NOTICE:</strong> Past due invoices as well as any judgments arising from the collection of such invoices shall accrue annual interest at the rate of 18% or at the maximum legal rate, whichever is lower. Seller shall be entitled to collect reasonable attorney's fees and expenses as part of an action to collect on unpaid invoices. Actual attorney's fees incurred in bringing any action to collect on unpaid invoices and/or enforcing any judgment granted and interest shall be considered as additional sums owed in connection with the terms and conditions of sale. 
              </p>
              <p className="mb-3">
                If the customer fails or refuses to comply with its obligations under this agreement, Jack Scalisi Wholesale shall be entitled to recover all costs (including pre-suit costs) associated with the enforcement of this increment, including reasonable attorney's fees and all costs (including but not limited to statutory costs) which may be awarded at the trial court or appellate levels as well as bankruptcy proceedings entitlement and amount of attorney's fees and costs. If suit is necessary, venue shall be only in Palm Beach County.
              </p>
              <hr className="my-4 border-secondary-subtle" />
              <p className="mb-0 italic">
                I hereby represent that I am authorized to submit this application of behalf of the company named above ("Customer") and it is understood that Apple Core, Inc., d/b/a Jack Scalisi Wholesale Fruit & Produce ("Scalisi Produce") is authorized to obtain information pertaining to Customer's credit capacity and general credit reputation. The information will be obtained through personal interviews with, and/or inquired directed to third parties, such as business associates, financial sources such as banks, Dun & Bradstreet Reporting, and Credit Bureaus. In consideration of the credit extended to Customer by Jack Scalisi Wholesale and its successors and affiliated companies, Customer agrees that such credit shall be extended on the terms and conditions set forth herein.
              </p>
            </div>
            <div className="d-flex flex-column gap-2 mt-2">
              <Checkbox 
                label="I hereby represent that I am authorized to submit this application and accept the full Terms and Conditions stated above." 
                labelStyle={{ ...commonLabelStyle, paddingBottom: 0, fontSize: '14px', lineHeight: '1.4' }} 
                value={registrationFormik.values.termsAccepted} 
                setValue={(val) => registrationFormik.setFieldValue("termsAccepted", val)} 
                isBool={true} 
              />
              {registrationFormik.touched.termsAccepted && registrationFormik.errors.termsAccepted && (
                <div className="text-danger fs-13 mt-1 fw-600">{registrationFormik.errors.termsAccepted}</div>
              )}
            </div>
          </div>
        </Col>

        <Col md={12} className="mt-4 d-flex flex-column flex-md-row justify-content-end gap-3 gap-md-4">
          <Button label="Back" variant="secondaryButton" onClick={() => setCurrentStep(1)} className="px-4 px-md-5 order-2 order-md-1" />
          <Button label={loading === "signup" ? "Submitting..." : "Submit Application"} type="submit" variant="primary" disabled={loading === "signup"} loading={loading === "signup"} className="px-4 px-md-5 order-1 order-md-2" />
        </Col>
      </Row>
    </div>
  );

  const renderSuccess = () => (
    <div className="d-flex justify-content-center py-4 py-md-5">
      <div className={mergeClass(classes.formBox, "text-center p-4 p-md-5 shadow-lg border-0")} style={{ maxWidth: '520px' }}>
        <div className="mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-green-light rounded-circle p-3 mb-4" style={{ width: '80px', height: '80px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2a4d31" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="fs-28 fs-md-32 fw-700 text-green mb-3">Application Submitted!</h2>
          <p className="fs-15 fs-md-16 text-muted mb-4 px-md-3">
            Thank you for applying with Scalisi. Your business account application has been received and is currently being reviewed by our team.
          </p>
        </div>

        <div className="bg-light p-3 p-md-4 rounded-4 mb-4 border border-light-subtle text-start">
          <h4 className="fs-13 fw-700 text-green-dark mb-3 uppercase tracking-widest text-center">Next Steps</h4>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-start gap-3">
              <span className="fs-18">✅</span>
              <p className="fs-14 text-muted mb-0">We will verify your business and credit references immediately.</p>
            </div>
            <div className="d-flex align-items-start gap-3">
              <span className="fs-18">✅</span>
              <p className="fs-14 text-muted mb-0">An account manager will contact you within <strong>1-2 business days</strong>.</p>
            </div>
            <div className="d-flex align-items-start gap-3">
              <span className="fs-18">✅</span>
              <p className="fs-14 text-muted mb-0">Check your email for status updates and portal activation details.</p>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
          <Button label="Return to Home" variant="primary" onClick={() => router.push("/")} className="px-4 px-md-5" />
          <Button label="Contact Support" variant="secondaryButton" onClick={() => router.push("/contact")} className="px-4 px-md-5" />
        </div>
      </div>
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
        {currentStep < 3 && renderProgress()}
      </Container>

      <Container className="pb-3">
        <Row className="justify-content-center">
          <Col lg={12}>
            <div className={classes.main}>
              <form onSubmit={registrationFormik.handleSubmit}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderSuccess()}
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
