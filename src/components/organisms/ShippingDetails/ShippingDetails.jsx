"use client";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./shippingDetails.module.css";

import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input/Input";
import DropDown from "@/components/molecules/DropDown/DropDown";
import { mergeClass } from "@/resources/utils/helper";
import CustomPhoneInput from "@/components/atoms/CustomPhoneInput";

export default function ShippingDetails({
  shippingDetailFormik,
  isEditable,
  setIsEditable,
  countries,
  cities,
  handleCountryChange,
  states,
  loading,
  onSave,
  isBottomHeader,
  isTopHeader,
  labelPhoneClass,
  buttonClass,

  isShadow = true,
  shippingDetailsMain,
  nopadding,
}) {
  return (
    <div
      className={mergeClass(
        isShadow ? classes.mainDiv : classes.mainDivTwo,
        shippingDetailsMain
      )}
    >
      <Container className={mergeClass(nopadding && classes.noPadding)}>
        <Row className="gy-4 gy-sm-4">
          {isTopHeader && (
            <Col md={12}>
              <div
                className={mergeClass(
                  classes.header,
                  isEditable && classes.editableHeader
                )}
              >
                <h1 className={"fs-20"}>Shipping Details</h1>
                <div className={classes.buttonDiv}>
                  {isEditable && (
                    <Button
                      type="submit"
                      className={mergeClass(classes.button)}
                      label={loading ? "Submitting..." : "Submit"}
                      variant="primary"
                      disabled={loading}
                      onClick={onSave}
                    />
                  )}
                  <Button
                    className={mergeClass(classes.button)}
                    label={isEditable ? "Lock" : "Edit"}
                    variant="borderRed"
                    onClick={() => {
                      setIsEditable(!isEditable);
                      isEditable && shippingDetailFormik?.handleReset();
                    }}
                  />
                </div>
              </div>
            </Col>
          )}
          <Col
            md={6}
            sm={12}
            className={mergeClass(
              classes.customColumSpace,
              classes.customMargin
            )}
          >
            <Input
              placeholder={"Company Name"}
              labelClass={mergeClass("fs-18 fw-700", classes.label)}
              label={"Company"}
              value={shippingDetailFormik?.values?.company}
              setValue={(value) =>
                shippingDetailFormik?.setFieldValue("company", value)
              }
              errorText={
                shippingDetailFormik.touched.company &&
                shippingDetailFormik.errors.company
              }
              disabled={!isEditable}
            />
          </Col>
          <Col
            md={6}
            sm={12}
            className={mergeClass(
              classes.customColumSpace,
              classes.customMargin
            )}
          >
            {/* <Input
              placeholder={"Phone Number"}
              labelClass={mergeClass(
                "fs-18 fw-700",
                classes.labelPhone,
                labelPhoneClass
              )}
              type={"number"}
              label={"Phone Number"}
              value={shippingDetailFormik?.values?.phoneNumber}
              setValue={(value) =>
                shippingDetailFormik?.setFieldValue("phoneNumber", value)
              }
              errorText={
                shippingDetailFormik.touched.phoneNumber &&
                shippingDetailFormik.errors.phoneNumber
              }
              disabled={!isEditable}
            /> */}
            <CustomPhoneInput
              label={"Phone"}
              value={
                shippingDetailFormik.values.phoneNumber == ""
                  ? ""
                  : `+${shippingDetailFormik.values.callingCode}${shippingDetailFormik.values.phoneNumber}`
              }
              setValue={(value) => {
                shippingDetailFormik.setFieldValue(
                  "callingCode",
                  value?.callingCode
                );
                shippingDetailFormik.setFieldValue(
                  "phoneNumber",
                  value?.phoneNumber
                );
              }}
              labelClass={classes.labelClass}
              errorText={
                shippingDetailFormik.touched.phoneNumber &&
                shippingDetailFormik.errors.phoneNumber
              }
              disabled={!isEditable}
            />
          </Col>
          <Col
            md={6}
            sm={12}
            className={mergeClass("mt-sm-0 mt-20", classes.customColumSpace)}
          >
            <Input
              labelClass={classes.label}
              label={"Street Address"}
              placeholder={"Street Address"}
              value={shippingDetailFormik?.values?.streetAddress}
              setValue={(value) =>
                shippingDetailFormik?.setFieldValue("streetAddress", value)
              }
              errorText={
                shippingDetailFormik.touched.streetAddress &&
                shippingDetailFormik.errors.streetAddress
              }
              disabled={!isEditable}
            />
          </Col>
          <Col
            md={6}
            sm={12}
            className={mergeClass("mt-sm-0 mt-20", classes.customColumSpace)}
          >
            <DropDown
              labelClassName={classes.label}
              placeholder={"Country"}
              label={"Country"}
              value={shippingDetailFormik?.values?.country}
              dropDownContainerClass={classes.dropDownContainerClass}
              setValue={handleCountryChange}
              errorText={
                shippingDetailFormik.touched.country &&
                shippingDetailFormik.errors.country
              }
              options={countries?.map((country) => ({
                label: country.name,
                value: country.isoCode,
              }))}
              disabled={!isEditable}
            />
          </Col>
          <Col
            md={6}
            sm={12}
            className={mergeClass(" mt-sm-0 mt-20", classes.customColumSpace)}
          >
            <DropDown
              labelClassName={classes.label}
              placeholder={"State"}
              label={"State"}
              dropDownContainerClass={classes.dropDownContainerClass}
              value={shippingDetailFormik?.values?.state}
              setValue={(e) => shippingDetailFormik?.setFieldValue("state", e)}
              errorText={
                shippingDetailFormik.touched.state &&
                shippingDetailFormik.errors.state
              }
              options={states?.map((state) => ({
                label: state.name,
                value: state.isoCode,
              }))}
              disabled={!isEditable || !states?.length}
            />
          </Col>
          <Col
            md={6}
            sm={12}
            className={mergeClass("mt-sm-0 ", classes.customColumSpace)}
          >
            <DropDown
              labelClassName={classes.label}
              placeholder={"City"}
              label={"City"}
              dropDownContainerClass={classes.dropDownContainerClass}
              value={shippingDetailFormik?.values?.city}
              setValue={(e) => {
                shippingDetailFormik?.setFieldValue("city", e);
              }}
              errorText={
                shippingDetailFormik.touched.city &&
                shippingDetailFormik.errors.city
              }
              options={cities?.map((city) => ({
                label: city.name,
                value: city.name,
              }))}
              disabled={!isEditable || !cities?.length}
            />
          </Col>
          <Col
            md={6}
            sm={12}
            className={mergeClass("mt-sm-0 mt-20", classes.postalCode)}
          >
            <Input
              labelClass={classes.label}
              label={"Zip / Postal Code"}
              placeholder={"Zip / Postal Code"}
              value={shippingDetailFormik?.values?.postalCode}
              setValue={(value) =>
                shippingDetailFormik?.setFieldValue("postalCode", value)
              }
              errorText={
                shippingDetailFormik.touched.postalCode &&
                shippingDetailFormik.errors.postalCode
              }
              disabled={!isEditable}
            />
          </Col>
          {isBottomHeader && (
            <Col md={12}>
              <div className={mergeClass(classes.buttonDiv, buttonClass)}>
                <Button
                  type="submit"
                  className={mergeClass(classes.button, classes?.changeBtn)}
                  label={loading ? "Updating..." : "Update"}
                  variant="primary"
                  disabled={loading}
                  onClick={onSave}
                />
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
