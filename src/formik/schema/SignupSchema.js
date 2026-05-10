import * as Yup from "yup";

export const signupSchema = () => {
  return Yup.object({
    // Step 1 validation - Minimum required fields for account creation
    companyName: Yup.string(), // Made optional
    address: Yup.string(),    // Made optional
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    phone: Yup.string(),
    primaryContact: Yup.object({
      name: Yup.string(),
      email: Yup.string().email("Invalid email").required("Primary contact email is required"),
    }),
    webLogin: Yup.object({
      email: Yup.string().email("Invalid email").required("Login Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    }),

    // Step 2 validation
    federalTaxId: Yup.string(),
    companyType: Yup.string(),
    termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms and conditions to submit your application"),
  });
};
