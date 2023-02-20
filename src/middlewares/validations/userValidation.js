const yup = require("yup");

const registerValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email address is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be minimum 6 characters")
    .max(36, "Password must be maximum 36 characters"),
});

module.exports = { registerValidationSchema };
