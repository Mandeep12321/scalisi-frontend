import * as Yup from "yup";

export const signupSchema = ({ isCityReq, isStateReq }) => {
  return Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .max(11, "Phone number cannot exceed 11 digits"),
    jobTitle: Yup.string().required("Job Title is required"),
    newsletter: Yup.string(),
    companyInformation: Yup.object({
      companyName: Yup.string().required("Company Name is required"),
      companyPhoneNumber: Yup.string()
        .required("Company Phone Number is required")
        .max(11, "Company phone number cannot exceed 11 digits"),
      streetAddress: Yup.string().required("Street Address is required"),
      city: Yup.mixed().test(
        "city-required",
        "City is required",
        function (value) {
          // Always require city if it's not empty/null/undefined
          return (
            value && (typeof value === "string" ? value.trim() !== "" : value)
          );
        }
      ),
      state: Yup.mixed().test(
        "state-required",
        "State is required",
        function (value) {
          // Always require state if it's not empty/null/undefined
          return (
            value && (typeof value === "string" ? value.trim() !== "" : value)
          );
        }
      ),
      country: Yup.mixed().test(
        "country-required",
        "Country is required",
        function (value) {
          return (
            value && (typeof value === "string" ? value.trim() !== "" : value)
          );
        }
      ),
      postalCode: Yup.string().required("Postal Code is required"),
    }),
  });
};
