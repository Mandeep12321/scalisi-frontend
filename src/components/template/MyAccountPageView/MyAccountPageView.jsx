"use client";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import RenderToast from "@/components/atoms/RenderToast/RenderToast";
import { AnnouncementCard } from "@/components/molecules/AnnouncementCard/AnnouncementCard";
import DropDown from "@/components/molecules/DropDown/DropDown";
import HeroSection from "@/components/molecules/HeroSection";
import { LANGUAGE_DROPDOWN } from "@/developmentContent/dropdown-options";
import { MY_ACCOUNT_DATA } from "@/developmentContent/mock-data";
import { USER_ACCOUNT_KEYS } from "@/formik/initial-values/initial-values";
import { MY_ACCOUNT_SCHEMA } from "@/formik/schema/MyAccountSchma";
import UpdatePasswordModal from "@/modals/UpdatePasswordModal/UpdatePasswordModal";
import { isMobileViewHook } from "@/resources/hooks/isMobileViewHook";
import { mergeClass } from "@/resources/utils/helper";
import { signOutRequest } from "@/store/auth/authSlice";
import { clearCart } from "@/store/cart/cartSlice";
import { Country } from "country-state-city";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import classes from "./MyAccountPageView.module.css";
import { persistor } from "@/store";

export default function MyAccountPageView() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState(MY_ACCOUNT_DATA);
  const [countries, setCountries] = useState([]);
  const [language, setLanguage] = useState(() => {
    const googleTrans = Cookies.get("googtrans");
    if (googleTrans === "/en/es") return "ES";
    if (googleTrans === "/en/ht") return "HT";
    return "US";
  });
  const [units, setUnits] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobile375, setIsMobile375] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
  });
  const user = useSelector((state) => state.authReducer.user);

  const myAccountFormik = useFormik({
    initialValues: USER_ACCOUNT_KEYS,
    validationSchema: MY_ACCOUNT_SCHEMA({
      isCityReq: cities?.length > 0 ? true : false,
      isStateReq: states?.length > 0 ? true : false,
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validateOnChange: true,
  });

  const logout = async () => {
    // Language detection before clearing cookies
    const googleTrans = Cookies.get("googtrans");
    const isSpanish = googleTrans === "/en/es";

    // Clear all cookies aggressively
    Cookies.remove("_xpdx_u", { path: "/" });
    Cookies.remove("_xpdx", { path: "/" });
    Cookies.remove("_xpdx_rf", { path: "/" });
    Cookies.remove("googtrans", { path: "/" });
    Cookies.remove("googtrans", {
      path: "/",
      domain: window?.location?.hostname,
    });
    Cookies.remove("googtrans", {
      path: "/",
      domain: `.${window?.location?.hostname}`,
    });

    // Clear localStorage
    localStorage.removeItem("orderPlaced");
    localStorage.removeItem("RT_ERROR_IDENTIFIER");
    localStorage.removeItem("persist:root");

    // Clear all Redux state
    dispatch(signOutRequest());
    dispatch(clearCart());

    // Clear Redux persisted state safely
    persistor.pause();
    await persistor.flush();
    await persistor.purge();

    // Show success message
    RenderToast({
      type: "success",
      message: isSpanish ? "Cierre de sesión exitoso" : "Successfully logout",
    });

    // Navigate to login
    window.location.href = "/login";
  };

  // handleUpdate
  // const handleUpdate = (key, value) => {
  //   setFormData((prev) => ({ ...prev, [key]: value }));
  // };

  //   use effect

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);

    isMobileViewHook(setIsMobile, 768);
  }, []);

  useEffect(() => {
    if (user) {
      myAccountFormik.setFieldValue("username", user);
    }
  }, [user]);

  //   handleCountryChange
  // const handleCountryChange = (selectedCountry) => {
  //   const countryIsoCode = selectedCountry?.value;
  //   const citiesOfCountry = City.getCitiesOfCountry(countryIsoCode);
  //   const statesOfCountry = State.getStatesOfCountry(countryIsoCode);

  //   const updatedCountry = {
  //     ...selectedCountry,
  //     hasCities: citiesOfCountry.length > 0,
  //     hasStates: statesOfCountry.length > 0,
  //   };

  //   myAccountFormik.setFieldValue("country", updatedCountry);
  //   setCities(citiesOfCountry);
  //   setStates(statesOfCountry);

  //   myAccountFormik.setFieldValue("city", null);
  //   myAccountFormik.setFieldValue("state", null);
  //   myAccountFormik.setErrors({});
  // };

  //   handleLanguageChange
  const handleLanguageChange = (selectedLanguage) => {
    const googleTrans = Cookies.get("googtrans");
    let oldData = googleTrans;

    // Remove existing translation cookies
    Cookies.remove("googtrans", {
      path: "/",
      domain: `${window?.location?.hostname}`,
    });
    Cookies.remove("googtrans", {
      path: "/",
      domain: `.${window?.location?.hostname}`,
    });

    // Set new translation based on selected language
    if (selectedLanguage?.value === "ES") {
      Cookies.set("googtrans", `/en/es`);
    } else if (selectedLanguage?.value === "HT") {
      Cookies.set("googtrans", `/en/ht`);
    } else {
      Cookies.set("googtrans", `/en/en`);
    }

    setLanguage(selectedLanguage?.value);

    // Reload page to apply translation
    window.location.reload();
  };

  return (
    <>
      <div className={classes.heroSecColor}>
        <Container>
          <Row>
            <Col md={12} className="p-0 m-0">
              <HeroSection
                isColor={true}
                data={data?.heroSection}
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

      <div className={classes.myAccountMain}>
        <Container className={mergeClass(classes.myAccountContainer, "my-5")}>
          <Row>
            <Col md={12}>
              <div className={classes.loginProfile}>
                <div className={classes.loginHead}>
                  <h3 className="fs-25"> Login & Profile Settings </h3>
                </div>
                <div className={classes.loginBox}>
                  <div className={classes.loginLeft}>
                    <div className={classes.userLoginField}>
                      <Input
                        labelClass={classes.label}
                        inputClass={"fs-13 fw-600"}
                        label={"Username"}
                        placeholder={""}
                        value={myAccountFormik?.values?.username}
                        setValue={(value) =>
                          myAccountFormik?.setFieldValue("username", value)
                        }
                        errorText={
                          myAccountFormik.touched.username &&
                          myAccountFormik.errors.username
                        }
                        disabled={user ? true : false}
                      />

                      {!isMobile && (
                        <Button
                          label={loading ? "Loading..." : "Logout"}
                          leftIcon={<BiLogOut size={18} />}
                          onClick={logout}
                          className={"fs-16"}
                        />
                      )}

                      {/* <Input
                        labelClass={classes.label}
                        label={"Password"}
                        type="password"
                        placeholder={""}
                        inputClass={"fs-13 fw-600"}
                        value={myAccountFormik?.values?.password}
                        setValue={(value) =>
                          myAccountFormik?.setFieldValue("password", value)
                        }
                        errorText={
                          myAccountFormik.touched.password &&
                          myAccountFormik.errors.password
                        }
                      />

                      <Button
                        className={classes.changeBtn}
                        label={"Change"}
                        onClick={() => setShowUpdateModal(true)}
                      /> */}
                    </div>
                    {/* <p className={mergeClass("fs-14 fw-400", classes.subText)}>
                      Your username is your email. Changing your email will also
                      change your username.
                    </p> */}
                  </div>
                  {/* <div className={classes.loginRight}>
                    <UploadImageBox
                      containerClass={classes.uploadImageContainerClass}
                      hideDeleteIcon={true}
                      state={formData?.image}
                      uploadImageBox={classes.uploadImageBox}
                      setter={(file) => {
                        handleUpdate("image", file);
                      }}
                      onDelete={() => {
                        handleUpdate("image", null);
                      }}
                      onEdit={() => {}}
                      imgClass={classes.uploadImage}
                      label={"Add Image"}
                    />
                  </div> */}
                </div>
              </div>
            </Col>
            {/* <Col md={12}>
              <div className={classes.loginProfile}>
                <h3 className="fs-25"> Owner Profile Details</h3>
                <div className={classes.loginProfileBox}>
                  <div className={classes.ownerProfileLeft}>
                    <ShippingDetails
                      handleCountryChange={handleCountryChange}
                      countries={countries}
                      cities={cities}
                      states={states}
                      loading={loading}
                      setIsEditable={setIsEditable}
                      isEditable={isEditable}
                      isShadow={false}
                      labelPhoneClass={classes.labelPhoneClass}
                      labelClass={classes.labelClass}
                      isBottomHeader={true}
                      buttonClass={classes.shipBtn}
                      shippingDetailFormik={myAccountFormik}
                      onSave={myAccountFormik?.handleSubmit}
                      shippingDetailsMain={classes.shippingDetailsMain}
                      nopadding
                    />
                  </div>
                  <div className={classes.ownerProfileRight}>
                    <div className={classes.ownerNotice}>
                      <span>
                        <MdInfo className={classes?.MdInfo} />
                      </span>
                      <p>
                        The information saved here identifies the legal owner of
                        the Scalisi Produce account and all client services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col> */}
            <Col md={12}>
              <div className={classes.languageDiv}>
                <h3 className="fs-25 fw-400"> Language </h3>
                <div className={classes.languageDivField}>
                  <DropDown
                    customStyle={{
                      height: "46px",
                      paddingLeft: "0px",
                      whiteSpace: "nowrap",
                    }}
                    backgroundColor={"#FCFCFC"}
                    labelClassName={classes.labelClassName}
                    value={LANGUAGE_DROPDOWN.find(
                      (option) => option.value === language
                    )}
                    setValue={handleLanguageChange}
                    options={LANGUAGE_DROPDOWN}
                    dropDownContainerClass="notranslate"
                  />
                </div>
              </div>
            </Col>
            {/* <Col md={12}>
              <div className={classes.displayDiv}>
                <h3 className="fs-25 fw-400"> Display Units</h3>
                <div className={classes.displayDivField}>
                  <DropDown
                    customStyle={{ height: "46px", paddingLeft: "0px" }}
                    backgroundColor={"#FCFCFC"}
                    labelClassName={classes.labelClassName}
                    placeholder={"Show all units in pounds/gallons"}
                    value={units}
                    setValue={setUnits}
                    options={UNITS_DROPDOWN}
                  />
                </div>
              </div>
            </Col> */}
          </Row>
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

        <UpdatePasswordModal
          loading={loading}
          setLoading={setLoading}
          show={showUpdateModal}
          setShow={setShowUpdateModal}
        />
      </div>
    </>
  );
}
