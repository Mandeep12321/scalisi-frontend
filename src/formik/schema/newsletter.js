import * as Yup from "yup";

export const newsletterValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("* Email Address is required"),
});
