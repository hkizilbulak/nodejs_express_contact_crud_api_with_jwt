const express = require("express");
const {
  createContact,
  updateContact,
  getContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contactController");
const validateResourceMW = require("../middlewares/validateresource");
const validateTokenHandler = require("../middlewares/validateTokenHandler");
const {
  createContactValidationSchema,
} = require("../middlewares/validations/contactValidation");
const router = express.Router();

router.use(validateTokenHandler);
router.post(
  "/",
  validateResourceMW(createContactValidationSchema),
  createContact
);
router.get("/", getAllContacts);
router.put("/:id", updateContact);
router.get("/:id", getContact);
router.delete("/:id", deleteContact);

module.exports = router;
