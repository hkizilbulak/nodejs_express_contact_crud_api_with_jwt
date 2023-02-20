const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
const {
  Api400Error,
  Api403Error,
  Api404Error,
} = require("../helpers/errors/index");
const ApiResponse = require("../helpers/response");
const APIError = require("../helpers/error");
const { isValidId } = require("../helpers/util");

const createContact = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const contactCheck = await Contact.findOne({ email });
  if (contactCheck) {
    throw new Api400Error("Contact already exist");
  }

  try {
    const contact = new Contact(req.body);
    contact.user_id = req.user.id;
    const newContact = await Contact.create(contact);
    return new ApiResponse(newContact).success(res);
  } catch (error) {
    throw new APIError(error);
  }
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    throw new Api404Error("Contact not found");
  }

  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Api404Error("Contact not found");
  }

  if (contact.user_id?.toString() !== req.user.id) {
    throw new Api403Error("User have not permission to update contact");
  }

  try {
    const newContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return new ApiResponse(newContact).created(res);
  } catch (error) {
    throw new APIError(error);
  }
});

const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    throw new Api404Error("Contact not found");
  }

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Api404Error("Contact not found");
    }
    return new ApiResponse(contact).success(res);
  } catch (error) {
    if (error instanceof Api404Error) throw error;
    throw new APIError(error);
  }
});

const getAllContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find();
    return new ApiResponse(contacts).success(res);
  } catch (error) {
    throw new APIError(error);
  }
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    throw new Api404Error("Contact not found");
  }

  const contact = await Contact.findById(id);
  if (!contact) {
    throw new Api404Error("Contact not found");
  }

  if (contact.user_id?.toString() !== req.user.id) {
    throw new Api403Error("User have not permission to delete contact");
  }

  try {
    const contact = await Contact.findByIdAndDelete(id);
    return new ApiResponse(contact).success(res);
  } catch (error) {
    throw new APIError(error);
  }
});

module.exports = {
  createContact,
  updateContact,
  getContact,
  getAllContacts,
  deleteContact,
};
