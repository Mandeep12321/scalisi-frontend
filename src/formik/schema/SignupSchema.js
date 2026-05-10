import * as Yup from "yup";

export const signupSchema = () => {
  return Yup.object({
    // Step 1 validation - Everything optional
    companyName: Yup.string(),
    address: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    phone: Yup.string(),
    primaryContact: Yup.object({
      name: Yup.string(),
      email: Yup.string().email("Invalid email"),
    }),
    webLogin: Yup.object({
      email: Yup.string().email("Invalid email"),
      password: Yup.string().min(8, "Password must be at least 8 characters"),
    }),

    // Step 2 validation - Everything optional
    federalTaxId: Yup.string(),
    companyType: Yup.string(),
    termsAccepted: Yup.boolean(),
  });
};
