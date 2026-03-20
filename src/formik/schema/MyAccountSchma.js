import * as Yup from "yup";

export const MY_ACCOUNT_SCHEMA = ({ isCityReq, isStateReq }) => {
  return Yup.object().shape({
    company: Yup.string().required("Company is required."),

    phoneNumber: Yup.string().required("Phone Number is required."),

    country: Yup.object().required("Country is required."),

    ...(isCityReq && {
      city: Yup.object().required("City is required."),
    }),

    ...(isStateReq && {
      state: Yup.object().required("State is required."),
    }),

    postalCode: Yup.string().required("Zip/Postal Code is required."),

    streetAddress: Yup.string().required("Street Address is required."),
  });
};
