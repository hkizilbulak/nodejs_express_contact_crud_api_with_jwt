const express = require("express");
const {
  registerUser,
  loginUser,
  me,
} = require("../controllers/userController");
const validateResourceMW = require("../middlewares/validateresource");
const validateTokenHandler = require("../middlewares/validateTokenHandler");
const {
  registerValidationSchema,
} = require("../middlewares/validations/userValidation");
const router = express.Router();

router.post(
  "/register",
  validateResourceMW(registerValidationSchema),
  registerUser
);

router.post("/login", loginUser);
router.get("/me", validateTokenHandler, me);

module.exports = router;
