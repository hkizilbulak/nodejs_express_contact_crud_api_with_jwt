const asyncHandler = require("express-async-handler");
const APIError = require("../helpers/error");
const { Api401Error } = require("../helpers/errors");
const ApiResponse = require("../helpers/response");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userCheck = await User.findOne({ email });
  if (userCheck) {
    throw new Api400Error("User already registered");
  }
  try {
    const newUser = await User.create(req.body);
    return new ApiResponse(newUser).success(res);
  } catch (error) {
    throw new APIError(error);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.isPasswordMatched(password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email,
          id: user._id,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRE_TIME }
    );
    return new ApiResponse(accessToken).success(res);
  } else {
    throw new Api401Error("User not authorized");
  }
});

const me = asyncHandler(async (req, res) => {
  return new ApiResponse(req.user).success(res);
});

module.exports = { registerUser, loginUser, me };
