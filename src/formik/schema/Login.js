import * as Yup from "yup";

export const loginSchema = Yup.object({
  // email: Yup.string()
  //   .email("Invalid email address")
  //   .required("Email is required"),

  username: Yup.string().required("Username is required"),
  password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
export const updatePasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmNewPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
