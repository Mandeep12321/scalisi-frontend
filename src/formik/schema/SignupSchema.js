import * as Yup from "yup";

export const signupSchema = () => {
  return Yup.object({
    // Step 1 validation
    companyName: Yup.string().required("Company Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip is required"),
    phone: Yup.string().required("Phone is required"),
    primaryContact: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    webLogin: Yup.object({
      email: Yup.string().email("Invalid email").required("Login Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    }),

    // Step 2 validation (Optional or conditional can be added later)
    federalTaxId: Yup.string(),
    companyType: Yup.string(),
    termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });
};
