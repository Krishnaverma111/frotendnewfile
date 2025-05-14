import * as Yup from "yup";

export const getEMailChangeSchema = (currentEmail) =>
  Yup.object().shape({
    newEmail: Yup.string()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format")
      .notOneOf([currentEmail], "New email must be different from current email").required("Email is required"),

    currentPassword: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character")
      .required("Password is required"),
  });



export const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character")
    .required("Current password is required"),

  newPassword: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character")
    .notOneOf([Yup.ref('currentPassword')], "New password cannot be the same as the current password")
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], "Passwords do not match").required("Confirm password is required"),
});

