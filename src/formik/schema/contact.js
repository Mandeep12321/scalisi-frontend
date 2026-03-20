import * as Yup from "yup";

export const contactValidationSchema = Yup.object({
  fullName: Yup.string().trim().required("Full Name is required"),
  // phoneNumber: Yup.string()
  //   .trim()
  //   .matches(/^\d{11}$/, "Phone Number must be exactly 11 digits")
  //   .required("Phone Number is required"),
  callingCode: Yup.string().optional(),
  phoneNumber: Yup.string().required("Phone number is required."),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email Address is required"),
  subject: Yup.string().trim().required("Subject is required"),
  message: Yup.string().trim().required("Message is required"),
});

export const personalInfoSchema = ({ isCityReq, isStateReq }) => {
  return Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone Number must be numeric")
      .required("Phone Number is required"),
    jobTitle: Yup.string().required("Job Title is required"),
    companyName: Yup.string().required("Company Name is required"),
    companyPhoneNumber: Yup.string()
      .matches(/^\d+$/, "Company Phone Number must be numeric")
      .required("Company Phone Number is required"),
    streetAddress: Yup.string().required("Street Address is required"),
    country: Yup.object().required("Country is required"),
    ...(isCityReq && {
      city: Yup.object().required("City is required."),
    }),

    ...(isStateReq && {
      state: Yup.object().required("State is required."),
    }),

    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Zip Code must be a 5-digit number")
      .required("Zip Code is required"),
  });
};
